import { motion } from 'framer-motion'
import type { Publication } from '../types'

interface PublicationsProps {
  publications: Publication[]
}

export default function Publications({ publications }: PublicationsProps) {
  return (
    <section id="publications" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Publications
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">Research contributions and papers</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-semibold">
                  {pub.venue} {pub.year}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 leading-snug">{pub.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">{pub.authors}</p>
              <div className="flex flex-wrap gap-2">
                {pub.links?.pdf && (
                  <a
                    href={pub.links.pdf}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm hover:bg-red-200 transition-colors"
                  >
                    PDF
                  </a>
                )}
                {pub.links?.arxiv && (
                  <a
                    href={pub.links.arxiv}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs sm:text-sm hover:bg-orange-200 transition-colors"
                  >
                    arXiv
                  </a>
                )}
                {pub.links?.code && (
                  <a
                    href={pub.links.code}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm hover:bg-green-200 transition-colors"
                  >
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

