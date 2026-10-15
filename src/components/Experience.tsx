import type { Experience as ExperienceType } from '../types'
import Section from './Section'

interface ExperienceProps {
  experiences: ExperienceType[]
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <Section id="experience" index="03" title="Work">
      <div className="border-b-2 border-ink">
        {experiences.map((exp, index) => (
          <article
            key={index}
            className="group grid md:grid-cols-[14rem_1fr] gap-x-10 gap-y-3 py-8 border-t-2 border-ink first:border-t-0 md:first:pt-0"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-mute mb-2">{exp.period}</div>
              <div className="text-xl font-extrabold tracking-tight leading-tight">
                <span className="bg-[linear-gradient(var(--color-coral),var(--color-coral))] bg-no-repeat bg-[length:0%_40%] bg-bottom group-hover:bg-[length:100%_40%] transition-[background-size] duration-300">
                  {exp.company}
                </span>
              </div>
              <div className="font-mono text-xs text-mute mt-1">{exp.location}</div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{exp.title}</h3>
              {exp.description.map((paragraph, i) => (
                <p key={i} className="text-mute leading-relaxed max-w-3xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
