import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaHeart, FaList, FaRedoAlt } from 'react-icons/fa'
import { SiLetterboxd } from 'react-icons/si'
import type { DiaryEntry, DiaryResponse } from '../types'

type View = 'list' | 'calendar'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function stars(rating: number | null) {
  if (rating == null) return ''
  return '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '')
}

// Diary dates are plain YYYY-MM-DD; build them as local dates so nothing shifts a day.
function parseDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toIso(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

const monthKey = (iso: string) => iso.slice(0, 7)
const monthLabel = (date: Date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

function readView(): View {
  return new URLSearchParams(window.location.search).get('view') === 'calendar' ? 'calendar' : 'list'
}

export default function Movies() {
  const [data, setData] = useState<DiaryResponse | null>(null)
  const [error, setError] = useState(false)
  const [view, setView] = useState<View>(readView)

  useEffect(() => {
    document.title = 'Movies · Alireza Sakhaeirad'
    fetch('/api/letterboxd')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const chooseView = (next: View) => {
    setView(next)
    const url = new URL(window.location.href)
    if (next === 'calendar') url.searchParams.set('view', 'calendar')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
  }

  const entries = data?.entries ?? []
  const rated = entries.filter((e) => e.rating != null)
  const average = rated.length ? rated.reduce((sum, e) => sum + (e.rating ?? 0), 0) / rated.length : null
  const thisYear = String(new Date().getFullYear())

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors min-w-0">
            <FaArrowLeft className="w-4 h-4 shrink-0" />
            <span className="text-lg sm:text-xl font-bold truncate bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Alireza Sakhaeirad
            </span>
          </a>
          {data && (
            <a
              href={data.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors shrink-0"
            >
              <SiLetterboxd className="w-5 h-5" />
              <span className="hidden sm:inline">Letterboxd</span>
            </a>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Movies
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">What I've been watching, straight from my Letterboxd diary.</p>

          {entries.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              <Stat value={entries.length} label="logged" />
              <Stat value={entries.filter((e) => e.watchedDate.startsWith(thisYear)).length} label={`in ${thisYear}`} />
              {average != null && <Stat value={average.toFixed(1)} label="avg rating" />}
              <Stat value={entries.filter((e) => e.liked).length} label="loved" />
            </div>
          )}
        </motion.header>

        <div className="flex justify-end mb-6">
          <div className="inline-flex bg-white rounded-xl shadow-sm p-1" role="tablist" aria-label="View">
            {([
              ['list', 'List', FaList],
              ['calendar', 'Calendar', FaCalendarAlt],
            ] as const).map(([id, label, Icon]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => chooseView(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === id ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && <Notice>Couldn't reach Letterboxd right now. Try again in a bit.</Notice>}
        {!data && !error && <Notice>Loading the diary…</Notice>}
        {data && entries.length === 0 && <Notice>Nothing logged yet.</Notice>}

        {entries.length > 0 && (view === 'list' ? <ListView entries={entries} /> : <CalendarView entries={entries} />)}
      </main>
    </div>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-4 py-2">
      <span className="text-xl font-bold text-gray-800">{value}</span>
      <span className="text-sm text-gray-500 ml-1.5">{label}</span>
    </div>
  )
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">{children}</div>
}

function Badges({ entry }: { entry: DiaryEntry }) {
  return (
    <span className="inline-flex items-center gap-2">
      {entry.rating != null && <span className="text-orange-500 tracking-wide">{stars(entry.rating)}</span>}
      {entry.liked && <FaHeart className="w-3.5 h-3.5 text-pink-500" aria-label="Liked" />}
      {entry.rewatch && <FaRedoAlt className="w-3 h-3 text-gray-400" aria-label="Rewatch" />}
    </span>
  )
}

function EntryRow({ entry, showDate = true }: { entry: DiaryEntry; showDate?: boolean }) {
  const date = parseDate(entry.watchedDate)
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 p-3 sm:p-4 rounded-xl hover:bg-orange-50 transition-colors"
    >
      {showDate && (
        <div className="w-10 shrink-0 text-center pt-1">
          <div className="text-2xl font-bold text-gray-800 leading-none">{date.getDate()}</div>
          <div className="text-xs text-gray-500 uppercase mt-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        </div>
      )}
      {entry.poster ? (
        <img src={entry.poster} alt="" loading="lazy" className="w-14 sm:w-16 aspect-[2/3] object-cover rounded-md shadow shrink-0" />
      ) : (
        <div className="w-14 sm:w-16 aspect-[2/3] rounded-md bg-gray-200 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-gray-800">
          {entry.title} {entry.year && <span className="font-normal text-gray-500">{entry.year}</span>}
        </div>
        <div className="mt-1">
          <Badges entry={entry} />
        </div>
        {entry.review && <p className="mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line line-clamp-4">{entry.review}</p>}
      </div>
    </a>
  )
}

function ListView({ entries }: { entries: DiaryEntry[] }) {
  const months = useMemo(() => {
    const groups = new Map<string, DiaryEntry[]>()
    for (const entry of entries) {
      const key = monthKey(entry.watchedDate)
      groups.set(key, [...(groups.get(key) ?? []), entry])
    }
    return [...groups.entries()]
  }, [entries])

  return (
    <div className="space-y-6">
      {months.map(([key, group], index) => (
        <motion.section
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
          className="bg-white rounded-2xl shadow-lg p-3 sm:p-4"
        >
          <h2 className="px-3 sm:px-4 pt-2 pb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
            {monthLabel(parseDate(`${key}-01`))}
          </h2>
          <div className="divide-y divide-gray-100">
            {group.map((entry) => (
              <EntryRow key={entry.id} entry={entry} />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

function CalendarView({ entries }: { entries: DiaryEntry[] }) {
  const byDay = useMemo(() => {
    const days = new Map<string, DiaryEntry[]>()
    for (const entry of entries) days.set(entry.watchedDate, [...(days.get(entry.watchedDate) ?? []), entry])
    return days
  }, [entries])

  // Entries arrive newest first: open on the latest month, allow paging back to the first.
  const first = parseDate(entries[entries.length - 1].watchedDate)
  const last = parseDate(entries[0].watchedDate)
  const firstMonth = new Date(first.getFullYear(), first.getMonth(), 1)
  const lastMonth = new Date(Math.max(last.getTime(), Date.now()))
  lastMonth.setDate(1)

  const [month, setMonth] = useState(() => new Date(last.getFullYear(), last.getMonth(), 1))
  const [selected, setSelected] = useState<string | null>(entries[0].watchedDate)

  const shift = (delta: number) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))
    setSelected(null)
  }
  const canPrev = month > firstMonth
  const canNext = month.getFullYear() < lastMonth.getFullYear() || month.getMonth() < lastMonth.getMonth()

  const leading = (month.getDay() + 6) % 7 // Monday-first grid
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ]
  while (cells.length % 7) cells.push(null)

  const today = toIso(new Date())
  const monthCount = entries.filter((e) => monthKey(e.watchedDate) === toIso(month).slice(0, 7)).length
  const selectedEntries = selected ? byDay.get(selected) ?? [] : []

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="p-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <FaChevronLeft />
          </button>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold text-gray-800">{monthLabel(month)}</div>
            <div className="text-xs text-gray-500">{monthCount} {monthCount === 1 ? 'film' : 'films'}</div>
          </div>
          <button
            onClick={() => shift(1)}
            disabled={!canNext}
            aria-label="Next month"
            className="p-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 pb-1">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={i} />
            const iso = toIso(day)
            const films = byDay.get(iso) ?? []
            const isSelected = iso === selected
            return (
              <button
                key={iso}
                onClick={() => films.length && setSelected(isSelected ? null : iso)}
                disabled={!films.length}
                aria-label={`${day.toDateString()}: ${films.length} ${films.length === 1 ? 'film' : 'films'}`}
                className={`relative aspect-[2/3] rounded-md sm:rounded-lg overflow-hidden text-left transition-all ${
                  films.length ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg' : 'bg-gray-50'
                } ${isSelected ? 'ring-2 ring-orange-500 ring-offset-2' : ''}`}
              >
                {films[0]?.poster && <img src={films[0].poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                {films.length > 0 && <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />}
                <span
                  className={`absolute top-1 left-1.5 text-[10px] sm:text-xs font-semibold ${
                    films.length ? 'text-white' : iso === today ? 'text-orange-600' : 'text-gray-400'
                  }`}
                >
                  {day.getDate()}
                </span>
                {films.length > 1 && (
                  <span className="absolute bottom-1 right-1 text-[10px] sm:text-xs font-bold bg-white/90 text-gray-800 rounded px-1">
                    +{films.length - 1}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedEntries.length > 0 && selected && (
          <motion.section
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-3 sm:p-4"
          >
            <h2 className="px-3 sm:px-4 pt-2 pb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {parseDate(selected).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <div className="divide-y divide-gray-100">
              {selectedEntries.map((entry) => (
                <EntryRow key={entry.id} entry={entry} showDate={false} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
