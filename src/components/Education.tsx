import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaAward, FaTrophy, FaStar } from 'react-icons/fa'
import type { Education as EducationType } from '../types'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.2])

  return (
    <section ref={sectionRef} id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY, opacity }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <FaGraduationCap className="text-5xl sm:text-6xl text-purple-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-base sm:text-lg font-medium"
          >
            Academic journey and achievements
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 80,
                damping: 15
              }}
              whileHover={{ 
                y: -16,
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.4, type: 'spring', stiffness: 300 }
              }}
              className="relative group perspective-1000"
              style={{ perspective: '1000px' }}
            >
              {/* Card */}
              <motion.div
                className="relative h-full bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)] transition-all border-2 border-transparent overflow-hidden"
                whileHover={{
                  borderColor: 'rgba(168, 85, 247, 0.3)',
                }}
              >
                {/* Animated gradient border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  initial={false}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899, #6366f1, #a855f7)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                >
                  <div className="absolute inset-[2px] bg-white/90 backdrop-blur-md rounded-2xl" />
                </motion.div>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  }}
                />

                {/* Floating particles effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60"
                    initial={false}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut'
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                    }}
                  />
                ))}

                {/* Content */}
                <div className="relative z-10">
                  {/* Degree Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.3, 
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white rounded-full text-sm font-bold mb-4 shadow-lg relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear'
                      }}
                    />
                    <FaTrophy className="text-xs relative z-10" />
                    <span className="relative z-10">{edu.degree}</span>
                  </motion.div>

                  {/* Field */}
                  <motion.h3
                    initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.4,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 relative"
                  >
                    <motion.span
                      className="absolute -left-2 top-0 text-purple-400 opacity-0 group-hover:opacity-100"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <FaStar className="text-sm" />
                    </motion.span>
                    {edu.field}
                  </motion.h3>

                  {/* Institution */}
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.5,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      color: '#9333ea'
                    }}
                    className="text-lg sm:text-xl text-purple-600 font-semibold mb-2 transition-colors"
                  >
                    {edu.institution}
                  </motion.p>

                  {/* Location */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="text-sm text-gray-600 mb-3"
                  >
                    {edu.location}
                  </motion.p>

                  {/* Period */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                    className="text-xs text-gray-500 mb-4 font-medium"
                  >
                    {edu.period}
                  </motion.p>

                  {/* GPA */}
                  {edu.gpa && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.2 + 0.7, 
                        type: 'spring',
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                      className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 rounded-lg text-sm font-semibold mb-4 shadow-md relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'linear'
                        }}
                      />
                      <span className="relative z-10">GPA: {edu.gpa}</span>
                    </motion.div>
                  )}

                  {/* Description */}
                  {edu.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.8 }}
                      className="text-sm text-gray-700 mb-4 leading-relaxed"
                    >
                      {edu.description}
                    </motion.p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.9 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FaAward className="text-purple-600 text-sm" />
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Achievements</span>
                      </div>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.2 + 1.0 + i * 0.12,
                              type: 'spring',
                              stiffness: 150
                            }}
                            whileHover={{ 
                              x: 5,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 group/achievement cursor-default"
                          >
                            <motion.span
                              className="text-purple-500 mt-1 flex-shrink-0 text-base"
                              animate={{
                                scale: [1, 1.4, 1],
                                rotate: [0, 15, -15, 0],
                                y: [0, -3, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                delay: index * 0.2 + 1.0 + i * 0.12 + 0.5,
                                repeat: Infinity,
                                repeatDelay: 4,
                                ease: 'easeInOut'
                              }}
                            >
                              ✨
                            </motion.span>
                            <motion.span 
                              className="group-hover/achievement:text-gray-900 transition-colors"
                              whileHover={{ fontWeight: 600 }}
                            >
                              {achievement}
                            </motion.span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

