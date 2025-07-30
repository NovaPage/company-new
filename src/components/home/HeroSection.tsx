'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

// Animaciones personalizadas
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <div>
      {/* SECCIÓN PRINCIPAL */}
      <section className="
        relative w-full min-h-[80vh] md:min-h-[60vh]
        flex flex-col md:flex-row items-center justify-center px-4 overflow-hidden
      ">
        <div className="
          relative flex flex-col md:flex-row items-center justify-center
          gap-6 md:gap-8 lg:gap-12
          w-full max-w-7xl min-h-[60vh]
        ">
          {/* Texto */}
          <motion.div
            className="
              w-full md:w-1/2 flex flex-col items-center md:items-end justify-center
              text-center md:text-right
            "
            variants={fadeLeft(0)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="
                text-2xl sm:text-3xl md:text-4xl lg:text-6xl
                font-efour text-primary tracking-wider mb-6 drop-shadow-xl
                leading-tight break-words
                max-w-full sm:max-w-xl md:max-w-2xl
                capitalize
                lg:uppercase
              "
              variants={fadeLeft(0.05)}
            >
              {t('home.hero.title')}
            </motion.h1>

            <motion.p
              className="
                max-w-lg md:max-w-md lg:max-w-xl
                text-base sm:text-lg md:text-xl lg:text-2xl
                text-muted-foreground font-semibold
                break-words md:leading-snug
              "
              variants={fadeLeft(0.15)}
            >
              {t('home.hero.subtitle')}
            </motion.p>
          </motion.div>
          {/* Imagen grande */}
          <motion.div
            className="
              w-full md:w-1/2 flex items-center justify-center
            "
            variants={fadeRight(0.05)}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/illustration-hero.png"
              alt="Digital transformation 3D illustration"
              width={800}
              height={640}
              className="
                object-contain
                max-w-[90vw]
                md:max-w-[340px] lg:max-w-[420px] xl:max-w-[520px]
                h-auto drop-shadow-2xl
              "
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* IMPACTO + BOTONES */}
      <section className="w-full flex flex-col items-center justify-center px-4 pt-0 pb-16 relative z-10">
        {/* Frase de impacto */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="
            text-base md:text-lg
            bg-primary/10 text-primary font-efour px-8 py-5 rounded-2xl
            shadow-md mt-2 mb-10 tracking-wide max-w-2xl text-center
            border border-primary/20
          "
        >
          {t('home.hero.impact')}
        </motion.div>
        {/* Botones */}
        <motion.div
          variants={fadeUp(0.22)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link
            href="#projects"
            className="
              px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold 
              shadow-lg transition hover:brightness-110 hover:scale-105 
              focus-visible:ring-2 focus-visible:ring-primary
              text-base tracking-wider
            "
          >
            {t('home.hero.seeProjects')}
          </Link>
          <Link
            href="#contact"
            className="
              px-7 py-3 rounded-xl border border-primary text-primary font-bold 
              shadow-lg transition hover:bg-primary/10 hover:scale-105 
              focus-visible:ring-2 focus-visible:ring-primary
              text-base tracking-wider
              bg-background/80
            "
          >
            {t('home.hero.freeConsult')}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
