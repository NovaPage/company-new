'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { GradientButton } from '@/components/ui/GradientButton'

const projectsKeys = ['proj1', 'proj2'] as const

export function ProfileProjects() {
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
          {t('profile.projects.title')}
        </h2>
        <div className="space-y-8">
          {projectsKeys.map((projKey, idx) => {
            // Nombre y descripción
            const name = t(`profile.projects.${projKey}.name`)
            const description = t(`profile.projects.${projKey}.description`)

            // Tecnologías clave
            const techs: string[] = []
            for (let i = 1; i <= 8; i++) {
              const value = t(`profile.projects.${projKey}.tech${i}`)
              if (!value || value.startsWith('profile.projects')) break
              techs.push(value)
            }

            // Logros
            const achievements: string[] = []
            for (let i = 1; i <= 8; i++) {
              const value = t(`profile.projects.${projKey}.achievement${i}`)
              if (!value || value.startsWith('profile.projects')) break
              achievements.push(value)
            }

            // Links
            const video = t(`profile.projects.${projKey}.video`)

            return (
              <motion.div
                key={projKey}
                className="bg-background rounded-xl border border-border shadow-md p-6 transition hover:shadow-xl hover:border-primary/60"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
                  <span className="font-semibold text-lg text-primary group-hover:text-accent transition tracking-wide">
                    {name}
                  </span>
                </div>
                <div className="text-base text-muted-foreground mb-3 mt-2">{description}</div>
                {/* Tecnologías clave */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {techs.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold tracking-wider shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Logros */}
                <ul className="space-y-2 mb-2">
                  {achievements.map((ach, j) => (
                    <motion.li
                      key={j}
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
                        select-text
                      ">
                        {ach}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                {/* Enlaces */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">

                {video && video !== `profile.projects.${projKey}.video` && (
                    <GradientButton
                    href={video}
                    title="Ver video demo del proyecto"
                    >
                    Video
                    </GradientButton>
                )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}
