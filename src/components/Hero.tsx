import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub } from 'react-icons/fa'
import { personalInfo, socialLinks } from '../data'

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
      >
        {personalInfo.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6 font-medium"
      >
        {personalInfo.title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl"
      >
        {personalInfo.bio}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        <a
          href={socialLinks.email}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <FaEnvelope />
          <span>Get in Touch</span>
        </a>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

