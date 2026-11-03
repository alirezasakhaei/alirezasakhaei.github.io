// Writes dist/api/letterboxd.json for the static (GitHub Pages) build. The deploy workflow
// runs this after `vite build` and again every hour, so /movies stays current without a server.
// If Letterboxd is down, the copy that is live right now is kept instead of breaking the page.

import { mkdir, writeFile } from 'node:fs/promises'
import { getPayload } from '../server/letterboxd.js'

const OUT = new URL('../dist/api/letterboxd.json', import.meta.url)
const LIVE = 'https://sakha.wtf/api/letterboxd.json'

let payload
try {
  payload = await getPayload()
} catch (err) {
  console.warn('Letterboxd unavailable, keeping the live copy:', err.message)
  const res = await fetch(LIVE)
  if (!res.ok) throw new Error(`No Letterboxd data and no live copy (HTTP ${res.status})`)
  payload = await res.json()
}

await mkdir(new URL('.', OUT), { recursive: true })
await writeFile(OUT, JSON.stringify(payload))
console.log(`letterboxd.json: ${payload.entries.length} diary entries, ${payload.watchlist?.length ?? 0} watchlist films`)
