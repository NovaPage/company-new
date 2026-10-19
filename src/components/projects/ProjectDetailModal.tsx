'use client'

import React from 'react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { ExternalLink, CheckCircle2, ShieldCheck, Lock, Sparkles, Building2, Terminal } from 'lucide-react'
import Link from 'next/link'

export type ProjectDetail = {
  id: string
  name: string
  tagline: string
  type: 'saas' | 'beta' | 'custom_private' | 'internal'
  typeLabel: string
  statusNote?: string
  company?: string
  description: string
  techs: string[]
  bullets: string[]
  videoId?: string
  video?: string
  url?: string | null
  hasPublicUrl: boolean
  actionText?: string
}

type Props = {
  open: boolean
  onClose: () => void
  project: ProjectDetail | null
}

export function ProjectDetailModal({ open, onClose, project }: Props) {
  if (!project) return null

  // Status badge styling
  const renderBadge = () => {
    switch (project.type) {
      case 'saas':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30">
            <Sparkles className="w-3.5 h-3.5" />
            {project.typeLabel}
          </span>
        )
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            {project.typeLabel}
          </span>
        )
      case 'custom_private':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5" />
            {project.typeLabel}
          </span>
        )
      case 'internal':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/30">
            <Terminal className="w-3.5 h-3.5" />
            {project.typeLabel}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {project.typeLabel}
          </span>
        )
    }
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      title={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mr-6">
          <span className="font-efour tracking-wide">{project.name}</span>
          <div>{renderBadge()}</div>
        </div>
      }
      description={project.tagline}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-border text-foreground/80 hover:text-foreground hover:bg-muted text-sm font-medium transition cursor-pointer"
          >
            Cerrar
          </button>

          {project.hasPublicUrl && project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:brightness-110 active:scale-98 transition"
            >
              <span>{project.actionText || 'Probar aplicación en vivo'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:brightness-110 active:scale-98 transition"
            >
              <span>{project.actionText || 'Cotizar desarrollo a la medida'}</span>
            </Link>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Optimized Video Player (Lazy-loaded, zero layout shift) */}
        {project.videoId && open && (
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/90 shadow-md border border-border/50 relative">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={`Demo en video de ${project.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        )}

        {/* Status / Availability Notice */}
        {project.statusNote && (
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
            {!project.hasPublicUrl ? (
              <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{project.statusNote}</p>
          </div>
        )}

        {/* Description */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            Visión del proyecto
          </h4>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Key Bullets / Highlights */}
        {project.bullets && project.bullets.length > 0 && (
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
              Aspectos destacados y funcionalidad
            </h4>
            <ul className="space-y-2.5">
              {project.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ResponsiveModal>
  )
}
