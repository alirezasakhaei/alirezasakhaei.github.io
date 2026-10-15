import type { Honor } from '../types'

interface HonorsProps {
  honors: Honor[]
}

export default function Honors({ honors }: HonorsProps) {
  return (
    <div className="border-2 border-ink bg-paper">
      <div className="bg-ink text-paper font-mono text-xs uppercase tracking-wider px-4 py-2">Honors &amp; awards</div>
      {honors.map((honor, index) => (
        <div key={index} className="flex gap-4 sm:gap-5 p-4 sm:p-5 border-t-2 border-ink first-of-type:border-t-0">
          {honor.stat && (
            <div className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none text-coral w-20 sm:w-24 shrink-0">
              {honor.stat}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold leading-snug">{honor.title}</h3>
            {(honor.description || honor.year) && (
              <p className="font-mono text-xs text-mute mt-1.5">{[honor.description, honor.year].filter(Boolean).join(' · ')}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
