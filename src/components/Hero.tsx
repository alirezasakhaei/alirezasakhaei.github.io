import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaUser } from 'react-icons/fa'
import { personalInfo, socialLinks } from '../data'

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {/* Replace this div with <img src="your-photo.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
              <FaUser className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300" />
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-20 blur-xl -z-10"
          />
        </motion.div>

        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight"
          >
            {personalInfo.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium"
          >
            {personalInfo.title}
          </motion.p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl"
      >
        {personalInfo.bio}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        <a
          href={socialLinks.email}
          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
        >
          <FaEnvelope />
          <span>Get in Touch</span>
        </a>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

