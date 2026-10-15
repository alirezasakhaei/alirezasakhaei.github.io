import type { Interest } from '../types'
import Section from './Section'

interface InterestsProps {
  interests: Interest[]
}

export default function Interests({ interests }: InterestsProps) {
  return (
    <Section id="interests" index="02" title="What I love working on" className="bg-paper-2">
      {/* gap-[2px] over an ink background draws shared 2px rules between cells */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-ink border-2 border-ink">
        {interests.map((interest, index) => (
          <article key={index} className="group bg-paper p-6 sm:p-7 hover:bg-coral transition-colors">
            <div className="font-mono text-sm text-coral-dark group-hover:text-ink mb-8">{String(index + 1).padStart(2, '0')}</div>
            <h3 className="text-2xl font-extrabold tracking-tight leading-tight mb-3">{interest.title}</h3>
            <p className="text-sm leading-relaxed text-mute group-hover:text-ink">{interest.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
