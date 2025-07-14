'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'

const jobsKeys = ['job1', 'job2', 'job3', 'job4', 'job5'] as const

export function ProfileExperience() {
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
        <h2 className="text-2xl text-primary font-efour mb-6 tracking-wider flex items-center gap-2 group cursor-default">
          {t('profile.experience.title')}
        </h2>
        <div className="space-y-8">
          {jobsKeys.map((jobKey, idx) => {
            const company = t(`profile.experience.${jobKey}.company`)
            const city = t(`profile.experience.${jobKey}.city`)
            const role = t(`profile.experience.${jobKey}.role`)
            const period = t(`profile.experience.${jobKey}.period`)
            const points: string[] = []
            for (let i = 1; i <= 10; i++) {
              const value = t(`profile.experience.${jobKey}.point${i}`)
              if (!value || value.startsWith('profile.experience')) break
              points.push(value)
            }
            return (
              <motion.div
                key={jobKey}
                className="bg-background rounded-xl border border-border shadow-md p-6 transition hover:shadow-xl hover:border-primary/60"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-foreground group-hover:text-primary transition">
                      {company}
                    </span>
                    <span className="text-sm text-muted-foreground">{city}</span>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-primary font-bold">{role}</span>
                    <span className="text-xs text-muted-foreground">{period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mt-3">
                  {points.map((point, j) => (
                    <motion.li
                      key={j}
                      className="relative group transition"
                      whileHover={{ x: 8, scale: 1.03 }}
                    >
                      <span
                        className="
                          pl-3 pr-1 py-1 rounded-lg transition-colors
                          group-hover:bg-primary/10
                          group-hover:text-primary
                          group-hover:shadow
                          font-medium
                          cursor-default
                          select-text
                        "
                      >
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}
