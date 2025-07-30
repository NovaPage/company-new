'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

// Animaciones
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})

export default function ProjectsHeroSection() {
  const { t } = useTranslation()

  return (
    <div>
      <section className="
        relative w-full min-h-[92vh] flex flex-col md:flex-row items-center justify-center px-4 overflow-hidden
      ">
        <div className="
          relative flex flex-col md:flex-row items-center justify-center
          gap-12 w-full max-w-7xl min-h-[70vh]
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
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-efour text-primary tracking-wider
                mb-6 drop-shadow-xl uppercase
                max-w-xl md:max-w-lg lg:max-w-2xl
                leading-tight break-words
              "
              variants={fadeLeft(0.05)}
            >
              {t('projects.hero.title')}
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
              {t('projects.hero.subtitle')}
            </motion.p>
          </motion.div>
          {/* Imagen */}
          <motion.div
            className="
              w-full md:w-1/2 flex items-center justify-center
            "
            variants={fadeRight(0.05)}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/illustration-projects.png"
              alt={t('projects.hero.imgAlt')}
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
    </div>
  )
}
