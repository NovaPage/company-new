'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { ProjectDetailModal, ProjectDetail } from '@/components/projects/ProjectDetailModal'
import { Play, ExternalLink, Lock, Sparkles, ShieldCheck, Building2, Terminal } from 'lucide-react'

export default function ProjectsSection() {
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
    <section className="w-full max-w-7xl mx-auto mb-20 px-4">
      {/* Header de la sección */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-efour text-primary tracking-wide mb-4">
          {t('projects.sectionTitle')}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t('home.projects.intro')}
        </p>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {projectList.map((proj, idx) => (
          <motion.article
            key={proj.id || proj.name}
            className="group relative flex flex-col justify-between bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * idx, duration: 0.4 }}
          >
            {/* Top: Status Badge & Tagline */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                {renderBadge(proj)}
                {!proj.hasPublicUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    Privado
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-efour text-primary group-hover:text-primary transition-colors tracking-wide mb-1.5">
                {proj.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground/90 mb-3.5 leading-snug">
                {proj.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-foreground/80 font-normal leading-relaxed mb-4 line-clamp-3">
                {proj.description}
              </p>

              {/* Bullets Preview */}
              {proj.bullets && proj.bullets.length > 0 && (
                <ul className="space-y-1.5 mb-5 text-xs text-muted-foreground">
                  {proj.bullets.slice(0, 2).map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="line-clamp-2 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Bottom: Tech Stack & Actions */}
            <div className="mt-auto pt-4 border-t border-border/50">
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.techs?.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {proj.techs && proj.techs.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    +{proj.techs.length - 4}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(proj)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Ver demo y detalles</span>
                </button>

                {proj.hasPublicUrl && proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                    title={`Abrir ${proj.name} en vivo`}
                    aria-label={`Abrir ${proj.name} en vivo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal responsivo centralizado (Drawer en móvil, Dialog en desktop) */}
      <ProjectDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </section>
  )
}
