// Reads the public Letterboxd diary RSS feed and turns it into JSON for /movies.
// Letterboxd sends no CORS headers, so the browser can't read the feed itself.
// Note: the feed carries the 50 most recent diary entries at most.

const USERNAME = 'alirezasakhaei'
const FEED_URL = `https://letterboxd.com/${USERNAME}/rss/`
const TTL_MS = 60 * 60 * 1000

let cache = { at: 0, entries: null }

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
    const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'sakha.wtf (personal site)' } })
    if (!res.ok) throw new Error(`Letterboxd feed returned HTTP ${res.status}`)
    cache = { at: Date.now(), entries: parseFeed(await res.text()) }
  } catch (err) {
    // Serve the last good copy rather than nothing.
    if (!cache.entries) throw err
    console.warn('Letterboxd fetch failed, serving cached diary:', err.message)
  }
  return cache.entries
}

export async function handleDiary(_req, res) {
  try {
    const entries = await getDiary()
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    })
    res.end(JSON.stringify({ username: USERNAME, profile: `https://letterboxd.com/${USERNAME}/`, entries }))
  } catch (err) {
    console.error('Letterboxd diary unavailable:', err)
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ error: 'Letterboxd diary unavailable' }))
  }
}
