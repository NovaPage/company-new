'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp } from '@/components/animations/animations'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '@/components/animations/WavyText'

export default function CallToActionSection() {
  const { t } = useTranslation()

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-24 relative z-10 text-center">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-efour text-primary max-w-2xl tracking-wide mb-6 leading-tight"
      >
         <WavyText
            text={t('home.cta.title')}
            className="text-3xl md:text-4xl font-efour text-primary mb-12 tracking-wide text-center"
         />
      </motion.h2>
   
      <motion.p
        className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mb-4 font-normal"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
        viewport={{ once: true }}
      >
        {t('home.cta.subtitle')}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          href="/contact"
          className="
            mt-4 inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl 
            text-base font-semibold tracking-wide shadow-md 
            transition hover:scale-105 hover:brightness-110
            focus-visible:ring-2 focus-visible:ring-primary
          "
        >
          {t('home.cta.button')}
        </Link>
      </motion.div>
    </section>
  )
}
