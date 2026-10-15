// Production server: serves the built site from dist/ (SPA fallback to index.html)
// plus /api/letterboxd. Replaces `serve -s dist`, which can't host an API route.

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleDiary } from './letterboxd.js'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const PORT = Number(process.env.PORT) || 3000

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

async function sendFile(res, path, cacheControl) {
  const body = await readFile(path)
  res.writeHead(200, {
    'Content-Type': TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': cacheControl,
  })
  res.end(body)
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost')

  if (pathname === '/api/letterboxd') return handleDiary(req, res)

  try {
    const path = normalize(join(DIST, decodeURIComponent(pathname)))
    if (path.startsWith(DIST + sep) && (await stat(path).catch(() => null))?.isFile()) {
      const hashed = pathname.startsWith('/assets/')
      return await sendFile(res, path, hashed ? 'public, max-age=31536000, immutable' : 'public, max-age=3600')
    }
    // Client-side routes (/, /movies, …) all get the app shell.
    await sendFile(res, join(DIST, 'index.html'), 'no-cache')
  } catch (err) {
    console.error(err)
    res.writeHead(500)
    res.end('Internal Server Error')
  }
}).listen(PORT, () => console.log(`Listening on :${PORT}`))
