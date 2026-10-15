import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: string
  title: string
  aside?: ReactNode
  className?: string
  children: ReactNode
}

// Every home-page section: a numbered mono label over a heavy rule, then a big heading.
export default function Section({ id, index, title, aside, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`px-4 sm:px-6 lg:px-8 py-16 sm:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="border-t-2 border-ink pt-4 mb-10 sm:mb-14 flex items-baseline justify-between gap-4">
          <div>
            <div className="font-mono text-xs sm:text-sm text-coral-dark mb-3">{index} /</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">{title}</h2>
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  )
}
