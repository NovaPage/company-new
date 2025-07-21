'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp } from '@/components/animations/animations'
import CustomServiceModal from '@/components/services/ServiceBottomSheetModal'

type ServiceItem = {
  title?: string
  desc?: string
}
type ServiceSection = {
  title: string
  items: (ServiceItem | string)[]
}
type ServiceDetail = {
  img: string
  title: string
  intro: string
  sections: ServiceSection[]
  cta?: string
}

const services = [
  {
    key: 'web',
    img: '/categories/web.png',
    detailKey: 'web',
    title: 'services.web.title',
    desc: 'services.categories.web.desc'
  },
  {
    key: 'automation',
    img: '/categories/automation.png',
    detailKey: 'automation',
    title: 'services.categories.automation.title',
    desc: 'services.categories.automation.desc'
  },
  {
    key: 'ai',
    img: '/categories/ai.png',
    detailKey: 'ai',
    title: 'services.categories.ai.title',
    desc: 'services.categories.ai.desc'
  },
  {
    key: 'cloud',
    img: '/categories/cloud.png',
    detailKey: 'cloud',
    title: 'services.categories.cloud.title',
    desc: 'services.categories.cloud.desc'
  }
]

// Typeguard seguro sin any
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
    // Encuentra la card para la imagen
    const baseService = services.find(s => s.key === key)
    // Lee toda la info de la traducción (extensa, no solo el título)
    const rawDetail = t(`services.${key}`, { returnObjects: true }) as unknown
    if (baseService && isServiceDetail(rawDetail)) {
      setSelectedService({
        ...rawDetail,
        img: baseService.img
      })
      setModalOpen(true)
    }
  }

  return (
    <section
      id="categories"
      className="relative w-full flex flex-col items-center justify-center py-16 px-4 bg-transparent"
    >
      <div className="w-full max-w-3xl flex flex-col gap-14">
        {services.map((service, idx) => (
          <motion.div
            key={service.key}
            className="
              flex flex-col items-center rounded-3xl bg-background/80 border border-muted/60
              shadow-lg hover:shadow-2xl transition-all px-7 py-12 text-center gap-4
            "
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Image
              src={service.img}
              alt={t(service.title)}
              width={200}
              height={200}
              className="mb-5 object-contain"
            />
            <h3 className="font-efour text-3xl md:text-4xl text-primary mb-12 tracking-wide text-center">
              {t(service.title)}
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl">
              {t(service.desc)}
            </p>
            <button
              type="button"
              className="
                px-7 py-3 rounded-xl border border-primary text-primary font-bold cursor-pointer
                shadow-lg transition hover:bg-primary/10 hover:scale-105 
                focus-visible:ring-2 focus-visible:ring-primary
                text-base tracking-wider
                bg-background/80
              "
              onClick={() => handleOpenModal(service.key)}
            >
              {t('services.categories.seeMore')}
            </button>
          </motion.div>
        ))}
      </div>
      {/* MODAL REUTILIZABLE */}
      <CustomServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService || undefined}
      />
    </section>
  )
}
