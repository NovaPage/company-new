'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { Server, Code2, Cloud, Zap } from 'lucide-react'

const stackItems = [
  { key: 'Backend', icon: Server },
  { key: 'Frontend', icon: Code2 },
  { key: 'Cloud', icon: Cloud },
  { key: 'AI', icon: Zap },
] as const

export function ProfileSummary() {
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
        <h2 className="text-2xl text-primary font-efour mb-6 tracking-wider">
          {t('profile.summary.title')}
        </h2>

        {/* Intro */}
        <p className="text-base md:text-lg leading-relaxed font-medium text-muted-foreground mb-4">
          {t('profile.summary.intro')}
        </p>

        {/* Background */}
        <p className="text-base md:text-lg leading-relaxed font-medium text-muted-foreground mb-4">
          {t('profile.summary.background')}
        </p>

        {/* Current Role */}
        <p className="text-base md:text-lg leading-relaxed font-medium text-muted-foreground mb-6">
          {t('profile.summary.currentRole')}
        </p>

        {/* Stack Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t('profile.summary.stackTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stackItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.key}
                  className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3 border border-border/50 hover:border-primary/40 hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <Icon className="text-primary shrink-0" size={20} />
                  <span className="text-sm font-medium text-foreground">
                    {t(`profile.summary.stack${item.key}`)}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

      </motion.div>
    </motion.section>
  )
}
