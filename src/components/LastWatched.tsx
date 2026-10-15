import { useEffect, useState } from 'react'
import type { DiaryEntry, DiaryResponse } from '../types'
import { stars } from '../lib/stars'

// A small "last watched" ticket linking to /movies. Renders nothing until the diary loads.
export default function LastWatched() {
  const [latest, setLatest] = useState<DiaryEntry | null>(null)

  useEffect(() => {
    fetch('/api/letterboxd')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: DiaryResponse) => setLatest(data.entries[0] ?? null))
      .catch(() => {})
  }, [])

  if (!latest) return null

  return (
    <a
      href="/movies"
      className="group inline-flex items-stretch border-2 border-ink bg-paper shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all max-w-full"
    >
      {latest.poster && <img src={latest.poster} alt="" className="w-12 object-cover border-r-2 border-ink shrink-0" />}
      <span className="px-4 py-2 min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-mute">Last watched</span>
        <span className="block font-bold truncate">
          {latest.title} <span className="text-coral-dark font-normal">{stars(latest.rating)}</span>
        </span>
      </span>
      <span className="flex items-center px-3 border-l-2 border-ink font-mono text-sm group-hover:bg-ink group-hover:text-paper transition-colors">
        →
      </span>
    </a>
  )
}
