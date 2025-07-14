'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function ProfileSummary() {
  const { t } = useTranslation()
  const [isHover, setIsHover] = useState(false)

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <motion.div
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-8 py-8 group transition-all"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
        whileHover={{ scale: 1.015, boxShadow: '0 12px 36px 0 rgba(0,0,0,0.16)' }}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
      >
        <h2
          className={`
            text-2xl font-efour mb-4 tracking-wider transition-colors
            ${isHover ? 'text-primary/80' : 'text-primary'}
          `}
        >
          {t('profile.summary.title')}
        </h2>
        <p
          className={`
            text-base md:text-lg leading-relaxed font-medium transition-colors
            ${isHover ? 'text-foreground' : 'text-muted-foreground'}
          `}
        >
          {t('profile.summary.paragraph')}
        </p>
      </motion.div>
    </motion.section>
  )
}
