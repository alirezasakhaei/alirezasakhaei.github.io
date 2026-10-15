import { FaEnvelope, FaLinkedin, FaGithub, FaUniversity, FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import type { SocialLinks } from '../types'
import Section from './Section'

interface ContactProps {
  socialLinks: SocialLinks
}

const contactItems = [
  { icon: FaEnvelope, label: 'Email', href: (links: SocialLinks) => links.email },
  { icon: FaTelegramPlane, label: 'Telegram', href: (links: SocialLinks) => links.telegram },
  { icon: FaLinkedin, label: 'LinkedIn', href: (links: SocialLinks) => links.linkedin },
  { icon: SiGooglescholar, label: 'Scholar', href: (links: SocialLinks) => links.scholar },
  { icon: FaGithub, label: 'GitHub', href: (links: SocialLinks) => links.github },
  { icon: FaXTwitter, label: 'X', href: (links: SocialLinks) => links.X },
  { icon: FaUniversity, label: 'EPFL', href: (links: SocialLinks) => links.epfl },
]

export default function Contact({ socialLinks }: ContactProps) {
  return (
    <Section id="contact" index="05" title="Get in touch">
      <p className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl mb-10">
        Got something cool in mind? <span className="text-coral">Text me.</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[2px] bg-ink border-2 border-ink">
        {contactItems.map(({ icon: Icon, label, href }) => {
          const url = href(socialLinks)
          return (
            <a
              key={label}
              href={url}
              target={url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group bg-paper hover:bg-coral transition-colors p-5 flex flex-col gap-6"
            >
              <Icon className="text-2xl" />
              <span className="font-mono text-sm font-semibold flex justify-between">
                {label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </span>
            </a>
          )
        })}
      </div>
    </Section>
  )
}
