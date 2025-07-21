'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '../animations/WavyText'

// Animaciones personalizadas
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, type: 'spring' as const } }
})

export default function ServicesHeroSection() {
  const { t } = useTranslation()

  return (
    <div>
      {/* SECCIÓN PRINCIPAL SERVICIOS */}
      <section className="relative w-full min-h-[92vh] flex flex-col md:flex-row items-center justify-center px-4 overflow-hidden">
        {/* Contenido principal */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-7xl min-h-[70vh]">
          {/* Texto */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center text-center md:text-right"
            variants={fadeLeft(0)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-efour text-primary tracking-wider mb-6 drop-shadow-xl uppercase max-w-2xl leading-tight"
              variants={fadeLeft(0.05)}
            >
               <WavyText 
                  text={t('services.hero.title')}
               />
              
            </motion.h1>
            <motion.p
              className="max-w-xl text-lg md:text-2xl text-muted-foreground font-semibold"
              variants={fadeLeft(0.15)}
            >
              {t('services.hero.subtitle')}
            </motion.p>
          </motion.div>
          {/* Imagen grande */}
          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center"
            variants={fadeRight(0.05)}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/illustration-services.png"
              alt={t('services.hero.imgAlt')}
              width={800}
              height={640}
              className="object-contain max-w-[90vw] md:max-w-[520px] h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
