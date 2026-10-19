'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { Sparkles, ExternalLink, Play, CheckCircle2, ShieldCheck } from 'lucide-react'
import { ProjectDetailModal, ProjectDetail } from '@/components/projects/ProjectDetailModal'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, type: 'spring' as const } },
})

export default function SisSection() {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)

  // Full SIS project definition from projects.list if user wants more details
  const projects = t<ProjectDetail[]>('projects.list', { returnObjects: true })
  const sisProject = Array.isArray(projects) ? projects.find((p) => p.id === 'sis') || null : null

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-primary/[0.07] to-primary/[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 bg-card/70 backdrop-blur-xs rounded-3xl border border-border/80 p-8 sm:p-10 lg:p-12 shadow-xl">
        {/* Left: Info + Key points + CTAs */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-5 text-left"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('home.sis.badge') || 'Producto Estrella SaaS'}</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-efour text-primary tracking-wide leading-tight">
            {t('home.sis.title')}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal max-w-xl">
            {t('home.sis.subtitle')}
          </p>

          {/* Highlights checklist */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-xs sm:text-sm text-foreground/90 my-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Agendamiento guiado 24/7</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Lista de espera &lt; 3 minutos</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Fila virtual con «Ya llegué»</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>100% Marca blanca médica</span>
            </li>
          </ul>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mt-2">
            <a
              href="https://sis.novapage.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              <span>{t('home.sis.cta') || 'Conoce SIS Consultorios'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground/90 hover:text-foreground hover:bg-muted font-medium text-sm transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-primary" />
              <span>{t('home.sis.demoVideo') || 'Ver video demo'}</span>
            </button>
          </div>
        </motion.div>

        {/* Right: Embedded Video Player (16:9, responsive, zero-latency) */}
        <motion.div
          className="w-full lg:w-[480px] shrink-0"
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-border/60 relative group">
            <iframe
              src="https://www.youtube-nocookie.com/embed/K00nwtnonVo?rel=0&modestbranding=1"
              title="Demostración de SIS Consultorios"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Modal responsivo si el usuario solicita ver ficha completa */}
      {sisProject && (
        <ProjectDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          project={sisProject}
        />
      )}
    </section>
  )
}
