'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

const contactCards = [
  {
    key: 'whatsapp',
    icon: '/contact/whatsapp.png',
    isExternal: true
  },
  {
    key: 'email',
    icon: '/contact/email.png',
    isExternal: false
  },
  {
    key: 'linkedin',
    icon: '/contact/linkedin.png',
    isExternal: true
  }
] as const

export default function ContactCardsSection() {
  const { t } = useTranslation()

  // WhatsApp mensaje según idioma activo
  const whatsappMsg = encodeURIComponent(
    t('contact.cards.whatsapp.defaultMsg')
  )
  const whatsappUrl = `https://wa.me/573216221606?text=${whatsappMsg}`

  // Email con subject (sin mensaje por UX, pero podrías agregarlo)
  const mailtoUrl = `mailto:novapagecompany@gmail.com?subject=${encodeURIComponent(
    t('contact.cards.email.subject')
  )}`

  const linkedinUrl = 'https://www.linkedin.com/in/novapage/'

  const getUrl = (key: string) => {
    if (key === 'whatsapp') return whatsappUrl
    if (key === 'email') return mailtoUrl
    if (key === 'linkedin') return linkedinUrl
    return '#'
  }

  // Animación por card
  const fadeCard = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, type: 'spring' as const } },
  })

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-10 pb-20 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-efour text-primary mb-12 tracking-wide text-center">
        {t('contact.cards.title')}
      </h2>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        {contactCards.map((card, idx) => {
          const isExternal = card.isExternal
          const url = getUrl(card.key)
          return (
            <motion.a
              key={card.key}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`
                bg-background/90 rounded-3xl p-10 shadow-xl flex flex-col gap-6 items-center text-center
                border border-border hover:shadow-2xl hover:border-primary/50 transition
                min-h-[320px] w-full cursor-pointer outline-none focus:ring-2 focus:ring-primary
              `}
              variants={fadeCard(0.1 * idx)}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <div className="w-20 h-20 flex items-center justify-center mb-2">
                <Image
                  src={card.icon}
                  alt={t(`contact.cards.${card.key}.alt`)}
                  width={90}
                  height={90}
                  className="object-contain drop-shadow-xl"
                  priority={idx === 0}
                />
              </div>
              <span className="text-xl text-primary font-bold tracking-wide mb-2">
                {t(`contact.cards.${card.key}.label`)}
              </span>
              <p className="text-base text-muted-foreground font-medium">
                {t(`contact.cards.${card.key}.desc`)}
              </p>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
