'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { ProjectDetailModal, ProjectDetail } from '@/components/projects/ProjectDetailModal'
import { Play, Sparkles, ShieldCheck, Building2, Terminal, CheckCircle2 } from 'lucide-react'

export function ProfileProjects() {
  const { t } = useTranslation()
  const projects = t<ProjectDetail[]>('projects.list', { returnObjects: true })
  const projectList: ProjectDetail[] = Array.isArray(projects) ? projects : []

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenDetail = (proj: ProjectDetail) => {
    setSelectedProject(proj)
    setModalOpen(true)
  }

  const renderBadge = (proj: ProjectDetail) => {
    switch (proj.type) {
      case 'saas':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/25">
            <Sparkles className="w-3 h-3" />
            {proj.typeLabel}
          </span>
        )
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
            <ShieldCheck className="w-3 h-3" />
            {proj.typeLabel}
          </span>
        )
      case 'custom_private':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
            <Building2 className="w-3 h-3" />
            {proj.typeLabel}
          </span>
        )
      case 'internal':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/25">
            <Terminal className="w-3 h-3" />
            {proj.typeLabel}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {proj.typeLabel}
          </span>
        )
    }
  }

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <motion.div
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-6 sm:px-8 py-8"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
          <h2 className="text-2xl text-primary font-efour tracking-wider flex items-center gap-2 group cursor-default">
            {t('profile.projects.title')}
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            {projectList.length} productos y arquitecturas activas
          </span>
        </div>

        <div className="space-y-6">
          {projectList.map((proj, idx) => (
            <motion.article
              key={proj.id || proj.name}
              className="bg-background rounded-xl border border-border shadow-sm hover:shadow-xl hover:border-primary/60 p-6 transition-all duration-300 flex flex-col justify-between group"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * idx, duration: 0.4 }}
            >
              <div>
                {/* Header: Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {renderBadge(proj)}
                  {proj.company && (
                    <span className="text-xs font-semibold text-muted-foreground/80">
                      {proj.company}
                    </span>
                  )}
                </div>

                {/* Name & Tagline */}
                <h3 className="font-efour text-xl text-primary tracking-wide mb-1.5 group-hover:text-primary transition-colors">
                  {proj.name}
                </h3>
                <p className="text-xs font-medium text-muted-foreground/90 mb-3.5 leading-snug">
                  {proj.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/85 leading-relaxed mb-4 font-normal">
                  {proj.description}
                </p>

                {/* Bullets / Logros */}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="space-y-2 mb-5 text-xs sm:text-sm text-foreground/80">
                    {proj.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Button: Opens Drawer / Dialog */}
              <div className="pt-4 border-t border-border/50 mt-auto flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(proj)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Ver demo en video y detalles</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Modal Reutilizable con Drawer en mobile y Dialog en desktop */}
      <ProjectDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </motion.section>
  )
}
