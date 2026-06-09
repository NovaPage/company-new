'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { GradientButton } from '@/components/ui/GradientButton'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, type: 'spring' as const } },
})

export default function KodaSection() {
  const { t } = useTranslation()

  const kodaUrl = t('home.koda.url', { returnObjects: false }) as string

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Gradient background — subtle diagonal fade */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-primary/[0.08] to-primary/[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Logo — left side on desktop, top on mobile */}
        <motion.div
          className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 relative"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/koda-logo.svg"
            alt="Koda logo"
            fill
            sizes="(max-width: 768px) 112px, 176px"
            className="object-contain drop-shadow-xl"
            priority
          />
        </motion.div>

        {/* Texto + CTA */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-5 text-center md:text-left flex-1"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-efour text-primary tracking-wide leading-tight">
            {t('home.koda.title') as string}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-xl">
            {t('home.koda.subtitle')}
          </p>
          <div className="mt-2">
            <GradientButton
              href={kodaUrl}
              title={t('home.koda.cta') as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('home.koda.cta')}
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
