import { useEffect, useMemo, useState } from 'react'
import { FaBookmark, FaCalendarAlt, FaHeart, FaList, FaRedoAlt } from 'react-icons/fa'
import { SiLetterboxd } from 'react-icons/si'
import type { DiaryEntry, DiaryResponse, WatchlistFilm } from '../types'
import { stars } from '../lib/stars'

type View = 'list' | 'calendar' | 'watchlist'

const TABS = [
  { id: 'list', label: 'List', icon: FaList },
  { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt },
  { id: 'watchlist', label: 'Watchlist', icon: FaBookmark },
] as const

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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
  const view = new URLSearchParams(window.location.search).get('view')
  return view === 'calendar' || view === 'watchlist' ? view : 'list'
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
    if (next === 'list') url.searchParams.delete('view')
    else url.searchParams.set('view', next)
    window.history.replaceState(null, '', url)
  }

  const entries = data?.entries ?? []
  const watchlist = data?.watchlist ?? null
  // The Watchlist tab only appears once there's a watchlist to show.
  const tabs = TABS.filter((tab) => tab.id !== 'watchlist' || watchlist?.length)
  const activeTab = Math.max(0, tabs.findIndex((tab) => tab.id === view))
  const rated = entries.filter((e) => e.rating != null)
  const average = rated.length ? rated.reduce((sum, e) => sum + (e.rating ?? 0), 0) / rated.length : null
  const thisYear = String(new Date().getFullYear())

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-paper border-b-2 border-ink px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto h-14 flex items-center justify-between gap-4 font-mono text-sm">
          <a href="/" className="font-semibold text-base tracking-tight">
            sakha<span className="text-coral">.</span>wtf
          </a>
          <div className="flex items-center gap-1">
            {data && (
              <a
                href={data.profile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Letterboxd profile"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors"
              >
                <SiLetterboxd className="w-4 h-4" />
                <span className="hidden sm:inline">Letterboxd ↗</span>
              </a>
            )}
            <a
              href="/"
              className="ml-2 px-3 py-1.5 border-2 border-ink bg-coral font-semibold shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              ← Back
            </a>
          </div>
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-[clamp(3.5rem,12vw,7rem)] font-extrabold tracking-tighter leading-[0.85] mb-5">
              Movies<span className="text-coral">.</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl">What I've been watching, and what's next, straight from Letterboxd.</p>

            {entries.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[2px] bg-ink border-2 border-ink mt-8">
                <Stat value={entries.length} label="logged" />
                <Stat value={entries.filter((e) => e.watchedDate.startsWith(thisYear)).length} label={`in ${thisYear}`} />
                {average != null && <Stat value={average.toFixed(1)} label="avg rating" />}
                <Stat value={entries.filter((e) => e.liked).length} label="loved" />
              </div>
            )}
          </header>

          <div className="flex justify-end mb-6">
            {/* Equal-width tabs so the ink block slides exactly one tab per step. */}
            <div
              className="relative grid auto-cols-fr grid-flow-col border-2 border-ink bg-paper shadow-hard font-mono text-sm"
              role="tablist"
              aria-label="View"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                style={{ width: `${100 / tabs.length}%`, transform: `translateX(${activeTab * 100}%)` }}
              />
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={view === id}
                  onClick={() => chooseView(id)}
                  className={`relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2 font-semibold transition-colors duration-300 ${
                    view === id ? 'text-paper' : 'hover:bg-paper-2'
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

          {view === 'watchlist' && watchlist?.length ? (
            <div key={view} className="animate-view-in">
              <WatchlistView films={watchlist} />
            </div>
          ) : (
            entries.length > 0 && (
              <div key={view} className="animate-view-in">
                {view === 'calendar' ? <CalendarView entries={entries} /> : <ListView entries={entries} />}
              </div>
            )
          )}
        </div>
      </main>

    </div>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="bg-paper px-4 py-3">
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">{value}</div>
      <div className="font-mono text-xs uppercase tracking-wider text-mute mt-1.5">{label}</div>
    </div>
  )
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="border-2 border-ink p-8 text-center font-mono text-sm text-mute">{children}</div>
}

function Badges({ entry }: { entry: DiaryEntry }) {
  return (
    <span className="inline-flex items-center gap-2">
      {entry.rating != null && <span className="text-coral-dark tracking-wide">{stars(entry.rating)}</span>}
      {entry.liked && <FaHeart className="w-3.5 h-3.5 text-coral" aria-label="Liked" />}
      {entry.rewatch && <FaRedoAlt className="w-3 h-3 text-mute" aria-label="Rewatch" />}
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
      className="group flex gap-4 sm:gap-5 p-4 hover:bg-paper-2 transition-colors"
    >
      {showDate && (
        <div className="w-10 shrink-0 pt-0.5">
          <div className="text-3xl font-extrabold tracking-tight leading-none">{date.getDate()}</div>
          <div className="font-mono text-[11px] text-mute uppercase mt-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        </div>
      )}
      {entry.poster ? (
        <img src={entry.poster} alt="" loading="lazy" className="w-14 sm:w-16 aspect-[2/3] object-cover border-2 border-ink shrink-0" />
      ) : (
        <div className="w-14 sm:w-16 aspect-[2/3] border-2 border-ink bg-paper-2 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-lg font-bold leading-tight group-hover:underline decoration-coral decoration-2 underline-offset-2">
          {entry.title} {entry.year && <span className="font-mono text-sm font-normal text-mute">{entry.year}</span>}
        </div>
        <div className="mt-1">
          <Badges entry={entry} />
        </div>
        {entry.review && <p className="mt-2 text-sm text-mute leading-relaxed whitespace-pre-line line-clamp-4">{entry.review}</p>}
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
      {months.map(([key, group]) => (
        <section key={key} className="border-2 border-ink">
          <h2 className="bg-ink text-paper font-mono text-xs uppercase tracking-wider px-4 py-2 flex justify-between">
            <span>{monthLabel(parseDate(`${key}-01`))}</span>
            <span>{group.length}</span>
          </h2>
          <div className="divide-y-2 divide-ink/10">
            {group.map((entry) => (
              <EntryRow key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
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
      <div className="border-2 border-ink">
        <div className="flex items-stretch justify-between border-b-2 border-ink">
          <button
            onClick={() => shift(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="px-5 font-mono text-lg border-r-2 border-ink hover:bg-ink hover:text-paper disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ink transition-colors"
          >
            ←
          </button>
          <div className="text-center py-3">
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight">{monthLabel(month)}</div>
            <div className="font-mono text-xs text-mute">{monthCount} {monthCount === 1 ? 'film' : 'films'}</div>
          </div>
          <button
            onClick={() => shift(1)}
            disabled={!canNext}
            aria-label="Next month"
            className="px-5 font-mono text-lg border-l-2 border-ink hover:bg-ink hover:text-paper disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ink transition-colors"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 p-2 sm:p-4">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center font-mono text-[10px] sm:text-xs uppercase tracking-wider text-mute pb-1">
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
                className={`relative aspect-[2/3] overflow-hidden text-left transition-all ${
                  films.length ? 'cursor-pointer border-2 border-ink hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard' : 'bg-paper-2'
                } ${isSelected ? 'outline-3 outline-coral outline-offset-2' : ''}`}
              >
                {films[0]?.poster && <img src={films[0].poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                <span
                  className={`absolute top-0 left-0 font-mono text-[10px] sm:text-xs font-semibold px-1 ${
                    films.length ? 'bg-ink text-paper' : iso === today ? 'bg-coral text-ink m-0.5' : 'text-mute m-0.5'
                  }`}
                >
                  {day.getDate()}
                </span>
                {films.length > 1 && (
                  <span className="absolute bottom-0 right-0 font-mono text-[10px] sm:text-xs font-bold bg-coral text-ink px-1">
                    +{films.length - 1}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {selectedEntries.length > 0 && selected && (
          <section className="border-2 border-ink">
            <h2 className="bg-ink text-paper font-mono text-xs uppercase tracking-wider px-4 py-2">
              {parseDate(selected).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <div className="divide-y-2 divide-ink/10">
              {selectedEntries.map((entry) => (
                <EntryRow key={entry.id} entry={entry} showDate={false} />
              ))}
            </div>
          </section>
        )}
    </div>
  )
}

function WatchlistView({ films }: { films: WatchlistFilm[] }) {
  return (
    <section className="border-2 border-ink">
      <h2 className="bg-ink text-paper font-mono text-xs uppercase tracking-wider px-4 py-2 flex justify-between">
        <span>Up next</span>
        <span>{films.length}</span>
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6">
        {films.map((film) => (
          <a key={film.slug} href={film.url} target="_blank" rel="noopener noreferrer" className="group min-w-0">
            {film.poster ? (
              <img
                src={film.poster}
                alt=""
                loading="lazy"
                className="w-full aspect-[2/3] object-cover border-2 border-ink transition-all group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-hover:shadow-hard"
              />
            ) : (
              <div className="w-full aspect-[2/3] border-2 border-ink bg-paper-2" />
            )}
            <div className="mt-2 font-bold leading-tight text-sm sm:text-base group-hover:underline decoration-coral decoration-2 underline-offset-2">
              {film.title}
            </div>
            {film.year && <div className="font-mono text-xs text-mute">{film.year}</div>}
          </a>
        ))}
      </div>
    </section>
  )
}
