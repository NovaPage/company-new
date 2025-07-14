'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { Cloud, Zap, Server, Code2, Database, Shield, Layers } from 'lucide-react'

const icons = {
  cloud: Cloud,
  ai: Zap,
  backend: Server,
  frontend: Code2,
  database: Database,
  security: Shield,
  architecture: Layers,
}

const skillCategories = [
  "cloud",
  "ai",
  "backend",
  "frontend",
  "database",
  "security",
  "architecture",
] as const

export function ProfileSkills() {
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
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-8 py-10"
        initial={{ scale: 0.97, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <h2 className="text-2xl text-primary font-efour mb-8 tracking-wider text-center">
          {t('profile.skills.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat) => {
            const Icon = icons[cat]
            // Dinámicamente obtiene los puntos (point1, point2, etc)
            const points: string[] = []
            for (let i = 1; i <= 8; i++) {
              const value = t(`profile.skills.${cat}.point${i}`)
              if (!value || value.startsWith('profile.skills')) break
              points.push(value)
            }
            return (
              <div key={cat}>
                <h3
                className="
                    flex items-center gap-2
                    text-lg
                    mb-3
                    font-efour
                    tracking-wider
                    select-none
                    transition-colors
                    text-primary
                "
                >
                <Icon size={20} className="opacity-90" />
                {t(`profile.skills.${cat}.title`)}
                </h3>

                <ul className="space-y-2">
                  {points.map((skill, idx) => (
                    <motion.li
                      key={idx}
                      className="relative group transition"
                      whileHover={{ x: 8, scale: 1.03 }}
                    >
                      <span className="
                        pl-3 pr-1 py-1 rounded-lg transition-colors
                        group-hover:bg-primary/10
                        group-hover:text-primary
                        group-hover:shadow
                        font-medium
                        cursor-default
                        ">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}
