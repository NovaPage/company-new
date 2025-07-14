'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { Book, Flame } from 'lucide-react'

const degreesKeys = ['degree1', 'degree2'] as const
const bootcampsKeys = ['bootcamp1', 'bootcamp2', 'bootcamp3'] as const
const selfLearningKeys = ['selfLearning1', 'selfLearning2', 'selfLearning3', 'selfLearning4', 'selfLearning5'] as const

export function ProfileEducation() {
  const { t } = useTranslation()

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <motion.div
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-8 py-8"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <h2 className="text-2xl text-primary font-efour mb-8 tracking-wider flex items-center gap-2 group cursor-default">
          {t('profile.education.title')}
        </h2>

        {/* Títulos oficiales */}
        <div className="mb-8">
          <h3 className="text-lg flex items-center gap-2 mb-3 text-primary font-efour tracking-wide">
            <Book className="w-5 h-5" />
            {t('profile.education.degreesTitle')}
          </h3>
          <ul className="space-y-3">
            {degreesKeys.map((degKey, idx) => {
              const degree = t(`profile.education.${degKey}_degree`)
              const institution = t(`profile.education.${degKey}_institution`)
              const year = t(`profile.education.${degKey}_year`)
              if (!degree || !institution) return null
              return (
                <motion.li
                  key={degKey}
                  className="relative group flex items-center gap-3 transition"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx, duration: 0.5 }}
                >
                  <span
                  className="
                     inline-block
                     px-3 py-1
                     bg-primary/10 text-primary
                     rounded-xl text-xs font-semibold
                     tracking-wider
                     group-hover:bg-primary/20 transition-colors
                     max-w-[80vw] sm:max-w-[300px] 
                     min-w-[120px]
                     w-fit
                     break-words whitespace-normal
                     text-center
                     leading-snug
                     overflow-hidden
                  "
                  >
                {degree}
                </span>
                  <span className="font-medium text-foreground">{institution}</span>
                  {year && (
                    <span className="ml-2 text-muted-foreground text-xs font-semibold">{year}</span>
                  )}
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* Bootcamps y cursos */}
        <div className="mb-8">
          <h3 className="text-lg flex items-center gap-2 mb-3 text-primary font-efour tracking-wide">
            <Book className="w-5 h-5" />
            {t('profile.education.bootcampsTitle')}
          </h3>
          <ul className="space-y-3">
            {bootcampsKeys.map((key, idx) => {
              const name = t(`profile.education.${key}_name`)
              const institution = t(`profile.education.${key}_institution`)
              const year = t(`profile.education.${key}_year`)
              if (!name || !institution) return null
              return (
                <motion.li
                  key={key}
                  className="relative group flex items-center gap-3 transition"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.07 * idx, duration: 0.5 }}
                >
                  <span
                  className="
                     inline-block
                     px-3 py-1
                     bg-primary/10 text-primary
                     rounded-xl text-xs font-semibold
                     tracking-wider
                     group-hover:bg-primary/20 transition-colors
                     max-w-[80vw] sm:max-w-[300px] 
                     min-w-[120px]
                     w-fit
                     break-words whitespace-normal
                     text-center
                     leading-snug
                     overflow-hidden
                  "
                  >
                  {name}
                  </span>
                  <span className="font-medium text-foreground">{institution}</span>
                  {year && (
                    <span className="ml-2 text-muted-foreground text-xs font-semibold">{year}</span>
                  )}
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* Autodidacta */}
        <div>
          <h3 className="text-lg flex items-center gap-2 mb-3 text-primary font-efour tracking-wide">
            <Flame className="w-5 h-5" />
            {t('profile.education.selfLearningTitle')}
          </h3>
          <ul className="space-y-2 ml-2 list-disc list-inside">
            {selfLearningKeys.map((key, idx) => {
              const desc = t(`profile.education.${key}`)
              if (!desc) return null
              return (
                <motion.li
                  key={key}
                  className="text-sm text-muted-foreground font-medium transition group-hover:text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  {desc}
                </motion.li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  )
}
