import { FaBars, FaTimes } from 'react-icons/fa'

interface NavigationProps {
  activeSection: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  scrollToSection: (id: string) => void
}

const navItems = [
  { id: 'education', label: 'Education' },
  { id: 'interests', label: 'Interests' },
  { id: 'experience', label: 'Work' },
  { id: 'publications', label: 'Papers' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-paper border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex justify-between items-center">
        <button onClick={() => scrollToSection('home')} className="font-mono font-semibold text-base tracking-tight">
          sakha<span className="text-coral">.</span>wtf
        </button>

        <div className="hidden md:flex items-center gap-1 font-mono text-sm">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-3 py-1.5 transition-colors ${activeSection === id ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}
            >
              {label}
            </button>
          ))}
          <a
            href="/movies"
            className="ml-2 px-3 py-1.5 border-2 border-ink bg-coral font-semibold shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Movies
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-ink font-mono">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="w-full text-left px-4 py-3.5 border-b border-ink/15 hover:bg-paper-2"
            >
              {label}
            </button>
          ))}
          <a href="/movies" className="block px-4 py-3.5 bg-coral font-semibold">
            Movies →
          </a>
        </div>
      )}
    </nav>
  )
}
