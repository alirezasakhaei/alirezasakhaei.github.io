import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Experience as ExperienceType } from '../types'

interface ExperienceProps {
  experiences: ExperienceType[]
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={sectionRef} id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Work Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg"
          >
            My professional journey
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-6 sm:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
              style={{
                height: `${timelineProgress}%`,
                transition: 'height 0.3s ease-out'
              }}
            />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex items-start gap-4 sm:gap-8"
                >
                  {/* Animated Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.3 }}
                    className="absolute left-4 sm:left-6 lg:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10 cursor-pointer"
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>

                  {/* Content Card - Left Side for Even, Right Side for Odd */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.2,
                      type: 'spring',
                      stiffness: 100
                    }}
                    className={`flex-1 ml-12 sm:ml-16 lg:ml-0 ${
                      isEven 
                        ? 'lg:mr-auto lg:pr-8 lg:max-w-md lg:text-right' 
                        : 'lg:ml-auto lg:pl-8 lg:max-w-md lg:text-left'
                    }`}
                  >
                    <motion.div
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 }
                      }}
                      className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all w-full border border-transparent hover:border-blue-200 relative overflow-hidden group"
                    >
                      {/* Animated background gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-purple-100/0 group-hover:from-blue-100/20 group-hover:to-purple-100/20 transition-all duration-500"
                        initial={false}
                      />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        initial={false}
                      />

                      <div className={`relative z-10 flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.4 }}
                          className="text-xl sm:text-2xl font-bold text-gray-800 mb-1"
                        >
                          {exp.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.5 }}
                          className="text-lg sm:text-xl text-blue-600 font-semibold mb-2"
                        >
                          {exp.company}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.6 }}
                          className="text-sm sm:text-base text-gray-600 mb-2"
                        >
                          {exp.location}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.7 }}
                          className="text-xs sm:text-sm text-gray-500 mb-4"
                        >
                          {exp.period}
                        </motion.p>
                        <ul className={`space-y-2 text-sm sm:text-base text-gray-700 w-full ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: index * 0.15 + 0.8 + i * 0.1,
                                type: 'spring',
                                stiffness: 100
                              }}
                              className={`flex items-start gap-2 ${isEven ? 'lg:flex-row-reverse lg:justify-end' : 'lg:justify-start'} group/item`}
                            >
                              <motion.span
                                className="text-blue-600 mt-1 flex-shrink-0"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{
                                  duration: 0.5,
                                  delay: index * 0.15 + 0.8 + i * 0.1 + 0.2
                                }}
                              >
                                •
                              </motion.span>
                              <span className="group-hover/item:text-gray-900 transition-colors">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

