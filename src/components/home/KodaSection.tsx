'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '@/components/animations/WavyText'
import { GradientButton } from '@/components/ui/GradientButton'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, type: 'spring' as const } },
})

export default function KodaSection() {
  const { t } = useTranslation()

  const kodaUrl = t('home.koda.url', { returnObjects: false }) as string

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Título */}
        <motion.h2
          className="text-3xl md:text-4xl font-efour text-primary tracking-wide text-center"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <WavyText
            text={t('home.koda.title') as string}
            className="text-3xl md:text-4xl font-efour text-primary tracking-wide text-center"
          />
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-normal text-center max-w-2xl"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t('home.koda.subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GradientButton
            href={kodaUrl}
            title={t('home.koda.cta') as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('home.koda.cta')}
          </GradientButton>
        </motion.div>
      </div>
    </section>
  )
}
