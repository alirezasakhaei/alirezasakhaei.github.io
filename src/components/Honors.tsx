import { motion } from 'framer-motion'
import { FaTrophy } from 'react-icons/fa'
import type { Honor } from '../types'

interface HonorsProps {
  honors: Honor[]
}

export default function Honors({ honors }: HonorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl">
          <FaTrophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Honors & Awards</h2>
      </div>

      <div className="space-y-4">
        {honors.map((honor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {honor.title}
              </h3>
              {honor.description && (
                <p className="text-gray-600 text-sm">{honor.description}</p>
              )}
              {honor.year && (
                <p className="text-gray-500 text-sm mt-1">{honor.year}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
