// Reads the public Letterboxd diary RSS feed and watchlist page, and turns them into
// JSON for /movies. Letterboxd sends no CORS headers, so the browser can't read them.
// Note: the feed carries the 50 most recent diary entries at most.

const USERNAME = 'alirezasakhaei'
const FEED_URL = `https://letterboxd.com/${USERNAME}/rss/`
const TTL_MS = 60 * 60 * 1000

const HEADERS = { 'User-Agent': 'sakha.wtf (personal site)' }

let cache = { at: 0, entries: null }
let watchlistCache = { at: 0, films: null }
// Poster URLs never change for a film, so they're kept for the life of the process.
const posters = new Map()

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
  return m ? decode(m[1].trim()) : null
}

function decode(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function stripHtml(s) {
  return decode(s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).trim()
}

export function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
  return items
    .map((item) => {
      const watchedDate = tag(item, 'letterboxd:watchedDate')
      const title = tag(item, 'letterboxd:filmTitle')
      // Lists and other non-diary items have no watched date or film title.
      if (!watchedDate || !title) return null

      const description = item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? ''
      const html = description.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      const poster = html.match(/<img src="([^"]+)"/)?.[1] ?? null
      const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
        .map((m) => m[1])
        .filter((p) => !p.includes('<img'))
        .map(stripHtml)
        .filter((p) => p && !/^Watched on /.test(p))

      const rating = tag(item, 'letterboxd:memberRating')
      const year = tag(item, 'letterboxd:filmYear')
      return {
        id: tag(item, 'guid'),
        title,
        year: year ? Number(year) : null,
        watchedDate,
        rating: rating ? Number(rating) : null,
        liked: tag(item, 'letterboxd:memberLike') === 'Yes',
        rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
        review: paragraphs.length ? paragraphs.join('\n\n') : null,
        poster,
        url: tag(item, 'link'),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.watchedDate.localeCompare(a.watchedDate))
}

export async function getDiary() {
  if (cache.entries && Date.now() - cache.at < TTL_MS) return cache.entries
  try {
    const res = await fetch(FEED_URL, { headers: HEADERS })
    if (!res.ok) throw new Error(`Letterboxd feed returned HTTP ${res.status}`)
    cache = { at: Date.now(), entries: parseFeed(await res.text()) }
  } catch (err) {
    // Serve the last good copy rather than nothing.
    if (!cache.entries) throw err
    console.warn('Letterboxd fetch failed, serving cached diary:', err.message)
  }
  return cache.entries
}

// There is no watchlist feed (its RSS URL is 403), so this reads the public watchlist
// page. If Letterboxd changes that markup, parsing yields nothing and the section hides.
export function parseWatchlistPage(html) {
  return [...html.matchAll(/<li class="griditem">[\s\S]*?data-item-slug="([^"]+)"[\s\S]*?<\/li>/g)]
    .map(([li, slug]) => {
      const name = decode(li.match(/data-item-name="([^"]+)"/)?.[1] ?? '')
      const m = name.match(/^(.*) \((\d{4})\)$/)
      return {
        slug,
        title: m ? m[1] : name,
        year: m ? Number(m[2]) : null,
        url: `https://letterboxd.com/film/${slug}/`,
      }
    })
    .filter((film) => film.title)
}

async function posterFor(slug) {
  if (posters.has(slug)) return posters.get(slug)
  try {
    const res = await fetch(`https://letterboxd.com/film/${slug}/poster/std/230/`, { headers: HEADERS })
    if (!res.ok) return null
    const { url } = await res.json()
    posters.set(slug, url ?? null)
    return url ?? null
  } catch {
    return null
  }
}

async function fetchWatchlist() {
  const films = []
  for (let page = 1; page <= 10; page++) {
    const path = page === 1 ? '' : `page/${page}/`
    const res = await fetch(`https://letterboxd.com/${USERNAME}/watchlist/${path}`, { headers: HEADERS })
    if (!res.ok) throw new Error(`Letterboxd watchlist returned HTTP ${res.status}`)
    const html = await res.text()
    films.push(...parseWatchlistPage(html))
    if (!/class="next"/.test(html)) break
  }
  // A few poster lookups at a time; only films not seen before cost a request.
  for (let i = 0; i < films.length; i += 6) {
    const batch = films.slice(i, i + 6)
    const urls = await Promise.all(batch.map((film) => posterFor(film.slug)))
    batch.forEach((film, j) => (film.poster = urls[j]))
  }
  return films
}

export async function getWatchlist() {
  if (watchlistCache.films && Date.now() - watchlistCache.at < TTL_MS) return watchlistCache.films
  try {
    watchlistCache = { at: Date.now(), films: await fetchWatchlist() }
  } catch (err) {
    if (!watchlistCache.films) throw err
    console.warn('Letterboxd watchlist fetch failed, serving cached copy:', err.message)
  }
  return watchlistCache.films
}

export async function handleDiary(_req, res) {
  try {
    const [entries, watchlist] = await Promise.all([
      getDiary(),
      // The watchlist is best-effort: without it the page still shows the diary.
      getWatchlist().catch((err) => {
        console.error('Letterboxd watchlist unavailable:', err)
        return null
      }),
    ])
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    })
    res.end(JSON.stringify({ username: USERNAME, profile: `https://letterboxd.com/${USERNAME}/`, entries, watchlist }))
  } catch (err) {
    console.error('Letterboxd diary unavailable:', err)
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ error: 'Letterboxd diary unavailable' }))
  }
}
