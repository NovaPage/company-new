'use client'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { WavyText } from '@/components/animations/WavyText'

const benefitList = [
  {
    titleKey: 'home.benefits.customTitle',
    descKey: 'home.benefits.customDesc',
  },
  {
    titleKey: 'home.benefits.aiTitle',
    descKey: 'home.benefits.aiDesc',
  },
  {
    titleKey: 'home.benefits.secureTitle',
    descKey: 'home.benefits.secureDesc',
  },
]

// Opcional: Animación por bloque
const fadeBenefit = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, type: 'spring' as const } },
})

export default function BenefitsSection() {
  const { t } = useTranslation()

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-10 pb-16 max-w-7xl mx-auto">
      {/* Título */}
      <motion.h2
        className="text-3xl md:text-4xl font-efour text-primary mb-12 tracking-wide text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        viewport={{ once: true }}
      >
        <WavyText
        text={t('home.benefits.title')}
        className="text-3xl md:text-4xl font-efour text-primary mb-12 tracking-wide text-center"
        />

      </motion.h2>

      {/* Bloques de beneficios */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefitList.map((benefit, idx) => (
          <motion.div
            key={idx}
            className="bg-background/80 rounded-3xl p-8 shadow-xl flex flex-col gap-4 items-center text-center border border-border hover:shadow-2xl transition"
            variants={fadeBenefit(0.1 * idx)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl text-primary mb-2 font-efour">
              {t(benefit.titleKey)}
            </h3>
            <p className="text-base text-muted-foreground font-medium">
              {t(benefit.descKey)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
