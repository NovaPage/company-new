'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CustomServiceModal, { ServiceDetail } from '@/components/services/ServiceBottomSheetModal'
import { ArrowRight, CheckCircle2, Sparkles, Code2, Stethoscope, Cpu, Cloud } from 'lucide-react'

type ServiceMeta = {
  key: string
  img: string
  icon: typeof Code2
  badge: string
}

const serviceCatalog: ServiceMeta[] = [
  {
    key: 'web',
    img: '/categories/web.png',
    icon: Code2,
    badge: 'Nuestra Especialidad'
  },
  {
    key: 'automation',
    img: '/categories/automation.png',
    icon: Stethoscope,
    badge: 'SaaS & Automatización'
  },
  {
    key: 'ai',
    img: '/categories/ai.png',
    icon: Cpu,
    badge: 'Investigación & Agentes'
  },
  {
    key: 'cloud',
    img: '/categories/cloud.png',
    icon: Cloud,
    badge: 'Arquitectura Escalable'
  }
]

function isServiceDetail(obj: unknown): obj is Omit<ServiceDetail, 'img'> {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    typeof (obj as { title: unknown }).title === 'string' &&
    'intro' in obj &&
    typeof (obj as { intro: unknown }).intro === 'string' &&
    'sections' in obj &&
    Array.isArray((obj as { sections: unknown }).sections)
  )
}

export default function ServicesCategoriesSection() {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)

  const handleOpenModal = (key: string) => {
    const meta = serviceCatalog.find((s) => s.key === key)
    const rawDetail = t(`services.${key}`, { returnObjects: true }) as unknown

    if (meta && isServiceDetail(rawDetail)) {
      setSelectedService({
        ...rawDetail,
        img: meta.img
      })
      setModalOpen(true)
    }
  }

  return (
    <section
      id="categories"
      className="relative w-full flex flex-col items-center justify-center py-12 px-4 bg-transparent max-w-6xl mx-auto"
    >
      {/* Grid 2x2 en desktop para distribución equilibrada */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {serviceCatalog.map((service, idx) => {
          const Icon = service.icon
          const title = t(`services.categories.${service.key}.title`) || t(`services.${service.key}.title`)
          const desc = t(`services.categories.${service.key}.desc`)
          const rawDetail = t(`services.${service.key}`, { returnObjects: true }) as Record<string, unknown> | null
          const sections = (rawDetail?.sections as Array<{ title?: string; items?: Array<unknown> }>) || []
          const previewItems = (sections[0]?.items || []).slice(0, 3)

          return (
            <motion.article
              key={service.key}
              className="
                group relative flex flex-col justify-between rounded-3xl bg-card border border-border
                shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 p-7 sm:p-8
              "
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <div>
                {/* Header card: Icono 3D y Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={service.img}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 64px, 80px"
                      className="object-contain drop-shadow-md"
                    />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{service.badge}</span>
                  </span>
                </div>

                {/* Título y Descripción */}
                <h3 className="font-efour text-xl sm:text-2xl text-primary group-hover:text-primary transition-colors tracking-wide mb-2.5">
                  {title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                  {desc}
                </p>

                {/* Highlights preview */}
                {previewItems.length > 0 && (
                  <div className="mb-6 space-y-2">
                    {previewItems.map((item, iIdx) => {
                      const itemTitle =
                        typeof item === 'string'
                          ? item
                          : (item as { title?: string })?.title || ''

                      return (
                        <div
                          key={iIdx}
                          className="flex items-center gap-2 text-xs text-foreground/80 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="line-clamp-1">{itemTitle}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Botón trigger para Drawer (mobile) / Dialog (desktop) */}
              <div className="pt-4 border-t border-border/50 mt-auto">
                <button
                  type="button"
                  onClick={() => handleOpenModal(service.key)}
                  className="
                    w-full inline-flex items-center justify-between px-5 py-3 rounded-xl
                    bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground
                    font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-xs
                    group-hover:bg-primary group-hover:text-primary-foreground
                  "
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('services.categories.seeMore')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Modal Reutilizable con Drawer en mobile y Dialog en desktop */}
      <CustomServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService || undefined}
      />
    </section>
  )
}
