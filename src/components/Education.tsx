import { motion } from 'framer-motion'
import { FaGraduationCap, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa'
import type { Education as EducationType } from '../types'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <FaGraduationCap className="text-5xl sm:text-6xl text-orange-600" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Academic Background
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
                  className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl shadow-lg flex-shrink-0"
                >
                  <FaGraduationCap className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-lg text-orange-600 font-semibold">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-orange-500 flex-shrink-0" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendar className="text-orange-500 flex-shrink-0" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {edu.gpa && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 rounded-lg text-sm font-semibold mb-4"
                >
                  GPA: {edu.gpa}
                </motion.div>
              )}

              {edu.description && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
