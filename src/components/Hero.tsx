import { FaEnvelope, FaGithub, FaTelegramPlane } from 'react-icons/fa'
import { personalInfo, socialLinks } from '../data'
import LastWatched from './LastWatched'

const buttons = [
  { href: socialLinks.email, label: 'Email', icon: FaEnvelope, primary: true },
  { href: socialLinks.telegram, label: 'Telegram', icon: FaTelegramPlane },
  { href: socialLinks.github, label: 'GitHub', icon: FaGithub },
]

export default function Hero() {
  const [first, ...rest] = personalInfo.name.split(' ')

  return (
    <div className="w-full">
      <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-mute mb-5">{personalInfo.title}</p>

      <h1 className="text-[clamp(3.25rem,11vw,8.5rem)] font-extrabold tracking-tighter leading-[0.85] mb-8">
        {first}
        <br />
        {rest.join(' ')}
        <span className="text-coral">.</span>
      </h1>

      <p className="text-lg sm:text-2xl leading-snug mb-6 max-w-2xl">
        {personalInfo.dreams.map(({ age, what }) => (
          <span key={age}>
            At {age},{' '}
            <s className="decoration-coral decoration-[3px] text-mute">{what}</s>.{' '}
          </span>
        ))}
        <span className="font-bold bg-amber px-1 box-decoration-clone">Turned out {personalInfo.became}</span>
      </p>

      <p className="text-base sm:text-lg text-mute leading-relaxed max-w-2xl mb-10">{personalInfo.bio}</p>

      <div className="flex flex-wrap gap-3 mb-10">
        {buttons.map(({ href, label, icon: Icon, primary }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-3 border-2 border-ink font-bold shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${
              primary ? 'bg-coral text-ink' : 'bg-paper'
            }`}
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>

      <LastWatched />
    </div>
  )
}
