import type { Education as EducationType } from '../types'
import Section from './Section'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <Section id="education" index="01" title="Education">
      <div className="grid md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <article key={index} className="border-2 border-ink bg-paper p-6 sm:p-8 flex flex-col">
            <div className="font-mono text-xs uppercase tracking-wider text-mute mb-6 flex justify-between gap-4">
              <span>{edu.period}</span>
              <span className="text-right">{edu.location}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none mb-2">{edu.institution}</h3>
            <p className="text-lg font-medium mb-6">
              {edu.degree} in {edu.field}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              {edu.gpa && <span className="font-mono text-sm font-semibold bg-ink text-paper px-2.5 py-1">GPA {edu.gpa}</span>}
              {edu.description && <span className="text-sm text-mute">{edu.description}</span>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
