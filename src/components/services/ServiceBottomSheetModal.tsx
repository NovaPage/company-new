'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export type ServiceItem = {
  title?: string
  desc?: string
}

export type ServiceSection = {
  title: string
  items: (ServiceItem | string)[]
}

export type ServiceDetail = {
  img: string
  title: string
  intro: string
  sections: ServiceSection[]
  cta?: string
  ctaButton?: string
}

type Props = {
  open: boolean
  onClose: () => void
  service?: ServiceDetail
}

export default function CustomServiceModal({ open, onClose, service }: Props) {
  const router = useRouter()

  if (!service) return null

  const handleCtaClick = () => {
    onClose()
    router.push('/contact')
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      title={
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 shrink-0">
            <Image
              src={service.img}
              alt={service.title}
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <span className="font-efour tracking-wide text-lg sm:text-xl">
            {service.title}
          </span>
        </div>
      }
      description={service.intro}
      footer={
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            {service.cta || '¿Listo para llevar tu proyecto al siguiente nivel?'}
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleCtaClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-md hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              <span>{service.ctaButton || 'Contactar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {service.sections?.map((section, sIdx) => (
          <div
            key={sIdx}
            className="rounded-xl p-4 sm:p-5 bg-muted/30 border border-border/50"
          >
            <h4 className="text-sm sm:text-base font-efour text-primary tracking-wide mb-3">
              {section.title}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {section.items.map((item, iIdx) => {
                if (typeof item === 'string') {
                  return (
                    <div
                      key={iIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  )
                }

                return (
                  <div
                    key={iIdx}
                    className="p-3 rounded-lg bg-background/80 border border-border/40 flex flex-col gap-1 text-left"
                  >
                    {item.title && (
                      <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {item.title}
                      </span>
                    )}
                    {item.desc && (
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-5.5">
                        {item.desc}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ResponsiveModal>
  )
}
