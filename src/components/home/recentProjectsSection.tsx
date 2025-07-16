'use client'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '@/components/animations/WavyText'

export default function RecentProjectsSection() {
  const { t } = useTranslation()
  const projectsRaw = t('home.projects.list', { returnObjects: true })
  const projects = Array.isArray(projectsRaw) ? projectsRaw : []

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-14 pb-20 max-w-7xl mx-auto gap-8">
      {/* Título animado */}
      <motion.h2
        className="text-3xl md:text-4xl font-efour text-primary tracking-wide text-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        viewport={{ once: true }}
      >
        <WavyText
         text={t('home.projects.title')}
         className="text-3xl md:text-4xl font-efour text-primary mb-12 tracking-wide text-center"
        />
      </motion.h2>

      {/* Intro y aviso privacidad */}
      <motion.p
        className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mb-4 font-normal"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
        viewport={{ once: true }}
      >
        {t('home.projects.intro')}
      </motion.p>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-7 mt-2 mb-8">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.name}
            className="bg-background/80 rounded-3xl p-7 shadow-xl border border-border flex flex-col gap-4 items-start transition hover:shadow-2xl group h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 * idx, type: 'spring' }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="mb-1">
              <span className="block text-lg md:text-xl font-efour text-primary tracking-wide mb-1">
                {proj.name}
              </span>
              {proj.company && (
                <span className="text-xs text-muted-foreground uppercase font-medium">{proj.company}</span>
              )}
            </div>
            <p className="text-base text-muted-foreground mb-2 font-normal">{proj.description}</p>

            {/* Technologies as chips */}
            <div className="flex flex-wrap gap-2 mb-1">
              {proj.technologies.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-xl font-normal border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bullets */}
            <ul className="list-disc list-inside pl-1 text-sm text-muted-foreground space-y-1 mt-2 font-normal">
              {proj.bullets.map((b: string, i: number) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Aviso de privacidad */}
      <motion.p
        className="text-xs md:text-sm text-muted-foreground text-center max-w-2xl mt-2 font-normal italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
        viewport={{ once: true }}
      >
        {t('home.projects.privacy')}
      </motion.p>
    </section>
  )
}
