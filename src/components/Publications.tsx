import type { Publication } from '../types'
import { personalInfo } from '../data'
import Section from './Section'

interface PublicationsProps {
  publications: Publication[]
}

function Authors({ authors }: { authors: string }) {
  const parts = authors.split(personalInfo.name)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="text-ink font-bold underline decoration-coral decoration-2 underline-offset-2">{personalInfo.name}</strong>}
        </span>
      ))}
    </>
  )
}

export default function Publications({ publications }: PublicationsProps) {
  const sorted = [...publications].sort((a, b) => b.year.localeCompare(a.year))

  return (
    <Section id="publications" index="04" title="Publications" className="bg-paper-2">
      <ol className="border-b-2 border-ink">
        {sorted.map((pub, index) => {
          const links = [
            ['arXiv', pub.links?.arxiv],
            ['PDF', pub.links?.pdf],
            ['Code', pub.links?.code],
          ].filter((link): link is [string, string] => Boolean(link[1]))

          return (
            <li key={index} className="grid sm:grid-cols-[4.5rem_1fr] gap-x-6 gap-y-2 py-7 border-t-2 border-ink first:border-t-0 sm:first:pt-0">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-coral leading-none">{pub.year}</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-2">{pub.title}</h3>
                <p className="text-sm text-mute leading-relaxed mb-3">
                  <Authors authors={pub.authors} />
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wide border-2 border-ink px-2 py-0.5">{pub.venue}</span>
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold uppercase tracking-wide bg-ink text-paper px-2 py-1 hover:bg-coral hover:text-ink transition-colors"
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
