'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '@/components/animations/WavyText'
import { ProjectDetailModal, ProjectDetail } from '@/components/projects/ProjectDetailModal'
import { Play, ArrowRight, Sparkles, ShieldCheck, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function RecentProjectsSection() {
  const { t } = useTranslation()
  const allProjects = t<ProjectDetail[]>('projects.list', { returnObjects: true })
  const projectList: ProjectDetail[] = Array.isArray(allProjects) ? allProjects : []

  // Top featured projects
  const featured = projectList.slice(0, 3)

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenDetail = (proj: ProjectDetail) => {
    setSelectedProject(proj)
    setModalOpen(true)
  }

  const renderBadge = (type: string, label: string) => {
    switch (type) {
      case 'saas':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/25">
            <Sparkles className="w-3 h-3" />
            {label}
          </span>
        )
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
            <ShieldCheck className="w-3 h-3" />
            {label}
          </span>
        )
      case 'custom_private':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
            <Building2 className="w-3 h-3" />
            {label}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {label}
          </span>
        )
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-14 pb-20 max-w-7xl mx-auto">
      {/* Título de sección */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <WavyText
          text={t('home.projects.title')}
          className="text-2xl sm:text-3xl md:text-4xl font-efour text-primary tracking-wide text-center"
        />
        <motion.p
          className="text-sm sm:text-base text-muted-foreground text-center mt-3 font-normal"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t('home.projects.intro')}
        </motion.p>
      </div>

      {/* Grid de 3 proyectos destacados */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mt-8 mb-10">
        {featured.map((proj, idx) => (
          <motion.article
            key={proj.id || proj.name}
            className="bg-card rounded-2xl p-6 sm:p-7 shadow-sm border border-border flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all duration-300 group h-full"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            viewport={{ once: true }}
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                {renderBadge(proj.type, proj.typeLabel)}
              </div>

              <h3 className="text-lg sm:text-xl font-efour text-primary tracking-wide mb-1">
                {proj.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground/90 mb-3">
                {proj.tagline}
              </p>

              <p className="text-sm text-foreground/80 mb-4 font-normal leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.techs?.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-md font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-border/50 mt-auto">
              <button
                type="button"
                onClick={() => handleOpenDetail(proj)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ver demo y detalles</span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Enlace para ver todos */}
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 font-semibold text-sm transition-all shadow-xs cursor-pointer"
        >
          <span>Explorar todos los proyectos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Aviso de confidencialidad */}
        <p className="text-xs text-muted-foreground text-center max-w-xl font-normal italic">
          {t('home.projects.privacy')}
        </p>
      </div>

      {/* Modal responsivo centralizado */}
      <ProjectDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </section>
  )
}
