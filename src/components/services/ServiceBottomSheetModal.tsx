'use client'

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

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

type Props = {
  open: boolean
  onClose: () => void
  service?: ServiceDetail
}

export default function CustomServiceModal({ open, onClose, service }: Props) {
  // Bloquea scroll fondo al abrir
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open || !service) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"
          onClick={onClose}
        />
        {/* Modal contenido */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 36, duration: 0.32 }}
          className="
            relative w-full max-w-xl bg-background rounded-t-3xl sm:rounded-3xl
            shadow-2xl flex flex-col gap-5
            px-3 py-5 sm:px-10 sm:py-10
            max-h-[90vh] overflow-y-auto
            animate-in
          "
        >
          {/* Botón X */}
          <button
            className="absolute right-3 top-3 text-muted-foreground hover:text-primary p-2 z-10 rounded-full bg-white/70 hover:bg-white shadow transition"
            onClick={onClose}
            aria-label="Cerrar"
            type="button"
          >
            <X size={22} />
          </button>

          {/* Imagen y título */}
          <div className="flex flex-col items-center mb-2 gap-1">
            <Image
              src={service.img}
              alt={service.title}
              width={82}
              height={82}
              className="object-contain mb-2"
            />
            <h2 className="font-efour text-2xl sm:text-3xl text-primary text-center tracking-wide mb-0.5">
              {service.title}
            </h2>
          </div>

          {/* Intro corta */}
          <div className="text-muted-foreground text-base sm:text-lg text-center mb-3 leading-relaxed max-w-2xl mx-auto">
            {service.intro}
          </div>

          {/* Secciones informativas */}
          <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
            {service.sections.map((section, idx) => (
              <section key={idx} className="bg-muted/30 rounded-xl px-4 py-4 flex flex-col gap-1 border border-muted/40">
                <h3 className="text-primary text-[1.05rem] font-semibold mb-1 flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-primary" />
                  {section.title}
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  {section.items.map((item, i) =>
                    typeof item === 'string' ? (
                      <li key={i} className="text-muted-foreground text-base">{item}</li>
                    ) : (
                      <li key={i} className="text-muted-foreground text-base">
                        {item.title && (
                          <span className="text-primary font-medium">{item.title}: </span>
                        )}
                        {item.desc}
                      </li>
                    )
                  )}
                </ul>
              </section>
            ))}
          </div>

          {/* CTA final */}
          {service.cta && (
            <div className="w-full max-w-2xl mt-6 text-center text-base sm:text-lg text-primary font-semibold">
              {service.cta}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
