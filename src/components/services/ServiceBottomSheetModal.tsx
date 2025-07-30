'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { GradientButton } from "@/components/ui/GradientButton"
import { useRouter } from "next/navigation";

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
  ctaButton?: string
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

  const router = useRouter();

  const handleCtaClick = () => {
    router.push("/contact"); // Cambia a la ruta deseada
  };

  // Detecta si es móvil (inline, sin hooks externos)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!open || !service) return null

  // Animaciones y layout condicional
  const modalInitial = isMobile
    ? { y: 120, opacity: 0 }
    : { scale: 0.97, opacity: 0 }
  const modalAnimate = isMobile
    ? { y: 0, opacity: 1 }
    : { scale: 1, opacity: 1 }
  const modalExit = isMobile
    ? { y: 120, opacity: 0 }
    : { scale: 0.97, opacity: 0 }

  return (
    <AnimatePresence>
      <motion.div
        className={
          isMobile
            ? "fixed inset-0 z-[100] flex items-end justify-center"
            : "fixed inset-0 z-[100] flex items-center justify-center"
        }
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
          initial={modalInitial}
          animate={modalAnimate}
          exit={modalExit}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 36,
            duration: 0.32
          }}
          className={`
            relative flex flex-col gap-5 shadow-2xl animate-in
            bg-background
            ${isMobile
              ? "w-full rounded-t-3xl max-w-full px-3 pt-0 pb-7 max-h-[95vh] bottom-0"
              : "max-w-screen-md rounded-3xl px-10 py-0 max-h-[90vh]"
            }
            overflow-y-auto scrollbar-none
          `}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          <style>
            {`
              .scrollbar-none::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                background: transparent !important;
              }
            `}
          </style>

          {/* Sticky Close Button */}
          <div className="sticky top-0 z-20 flex justify-end pt-3 pb-2 px-2" style={{marginLeft: '-0.75rem', marginRight: '-0.75rem'}}>
            <button
              className="
                rounded-full shadow transition
                bg-muted hover:bg-muted/80
                dark:bg-white dark:hover:bg-white/80
                text-muted-foreground hover:text-primary
                p-2 cursor-pointer
              "
              onClick={onClose}
              aria-label="Cerrar"
              type="button"
            >
              <X size={22} />
            </button>
          </div>

          {/* Imagen y título */}
          <div className="flex flex-col items-center mb-2 gap-1 mt-2">
            <Image
              src={service.img}
              alt={service.title}
              width={150}
              height={150}
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

          {/* CTA texto */}
          {service.cta && (
            <div className="w-full max-w-2xl mt-3 text-center text-base sm:text-lg text-primary font-semibold">
              {service.cta}
            </div>
          )}

          {/* Gradient CTA button */}
          <div className="w-full flex justify-center mt-6 mb-2">
            <GradientButton
              onClick={handleCtaClick}
            >
              {service.ctaButton }
            </GradientButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
