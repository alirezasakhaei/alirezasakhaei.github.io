import { motion } from 'framer-motion'
import type { Interest } from '../types'

interface InterestsProps {
  interests: Interest[]
}

export default function Interests({ interests }: InterestsProps) {
  return (
    <section id="interests" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent"
          >
            What I Love Working On
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-transparent hover:border-orange-200 relative overflow-hidden h-full">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-100/0 to-pink-100/0 group-hover:from-orange-100/30 group-hover:to-pink-100/30 transition-all duration-500"
                  initial={false}
                />

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={false}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {interest.emoji}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
