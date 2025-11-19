import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaHome, FaTwitter } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import type { SocialLinks } from '../types'

interface ContactProps {
  socialLinks: SocialLinks
}

const contactItems = [
  { icon: FaEnvelope, label: 'Email', href: (links: SocialLinks) => links.email, color: 'from-blue-500 to-blue-600' },
  { icon: FaHome, label: 'EPFL', href: (links: SocialLinks) => links.epfl, color: 'from-red-500 to-red-600' },
  { icon: FaLinkedin, label: 'LinkedIn', href: (links: SocialLinks) => links.linkedin, color: 'from-blue-700 to-blue-800' },
  { icon: SiGooglescholar, label: 'Scholar', href: (links: SocialLinks) => links.scholar, color: 'from-blue-400 to-blue-500' },
  { icon: FaGithub, label: 'GitHub', href: (links: SocialLinks) => links.github, color: 'from-gray-700 to-gray-800' },
  { icon: FaTwitter, label: 'Twitter', href: (links: SocialLinks) => links.X, color: 'from-black to-gray-800' }
]

export default function Contact({ socialLinks }: ContactProps) {
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">Let's connect and collaborate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          {contactItems.map(({ icon: Icon, label, href, color }, index) => (
            <motion.a
              key={label}
              href={href(socialLinks)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${color} text-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all flex flex-col items-center gap-2 sm:gap-3`}
            >
              <Icon className="text-2xl sm:text-3xl" />
              <span className="font-semibold text-sm sm:text-base">{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

