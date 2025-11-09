import { motion } from 'framer-motion'
import { FaNewspaper } from 'react-icons/fa'
import type { NewsItem } from '../types'

interface NewsProps {
  newsItems: NewsItem[]
}

export default function News({ newsItems }: NewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:sticky lg:top-24"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaNewspaper className="text-blue-600 text-xl sm:text-2xl" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Latest News</h2>
        </div>
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50 rounded-r-lg transition-colors"
            >
              <div className="text-xs sm:text-sm text-gray-500 mb-1">{news.date}</div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{news.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{news.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

