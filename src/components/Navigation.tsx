import { FaBriefcase, FaFileAlt, FaEnvelope, FaHome, FaBars, FaTimes, FaGraduationCap, FaLinkedin, FaGithub, FaGoogle, FaUniversity } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { socialLinks } from '../data'

interface NavigationProps {
  activeSection: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  scrollToSection: (id: string) => void
}

const navItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'publications', label: 'Publications', icon: FaFileAlt },
  { id: 'contact', label: 'Contact', icon: FaEnvelope }
]

const socialIcons = [
  { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
  { href: socialLinks.github, icon: FaGithub, label: 'GitHub', color: 'hover:text-gray-800' },
  { href: socialLinks.scholar, icon: FaGoogle, label: 'Google Scholar', color: 'hover:text-red-600' },
  { href: socialLinks.epfl, icon: FaUniversity, label: 'EPFL', color: 'hover:text-purple-600' }
]

export default function Navigation({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Alireza Sakhaei
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {socialIcons.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${color} transition-colors`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  activeSection === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-left"
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

