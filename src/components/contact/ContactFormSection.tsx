'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { ArrowUpRight, MessageSquare, Mail, Sparkles } from 'lucide-react'

type DirectChannel = {
  key: 'whatsapp' | 'email'
  icon: string
  actionLabel: string
}

type SocialChannel = {
  key: 'linkedin' | 'instagram' | 'tiktok'
  icon: string
  handle: string
}

const directChannels: DirectChannel[] = [
  {
    key: 'whatsapp',
    icon: '/contact/whatsapp.png',
    actionLabel: 'Abrir chat de WhatsApp'
  },
  {
    key: 'email',
    icon: '/contact/email.png',
    actionLabel: 'Enviar correo directo'
  }
]

const socialChannels: SocialChannel[] = [
  {
    key: 'linkedin',
    icon: '/contact/linkedin.png',
    handle: '/company/novapage'
  },
  {
    key: 'instagram',
    icon: '/contact/instagram.png',
    handle: '@novapage_co'
  },
  {
    key: 'tiktok',
    icon: '/contact/tiktok.png',
    handle: '@novapage_co'
  }
]

export default function ContactCardsSection() {
  const { t } = useTranslation()

  const whatsappMsg = encodeURIComponent(
    t('contact.cards.whatsapp.defaultMsg') ||
      'Hola, tengo un proyecto de software que me gustaría discutir con ustedes.'
  )
  const whatsappUrl = `https://wa.me/573108118722?text=${whatsappMsg}`

  const mailtoUrl = `mailto:novapagecompany@gmail.com?subject=${encodeURIComponent(
    t('contact.cards.email.subject') || 'Consulta sobre desarrollo de software'
  )}`

  const linkedinUrl = 'https://www.linkedin.com/in/novapage/'
  const instagramUrl = 'https://www.instagram.com/novapage_co/'
  const tiktokUrl = 'https://www.tiktok.com/@novapage_co'

  const getUrl = (key: string) => {
    switch (key) {
      case 'whatsapp':
        return whatsappUrl
      case 'email':
        return mailtoUrl
      case 'linkedin':
        return linkedinUrl
      case 'instagram':
        return instagramUrl
      case 'tiktok':
        return tiktokUrl
      default:
        return '#'
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-10 pb-24 max-w-6xl mx-auto">
      {/* Título de sección */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-efour text-primary tracking-wide mb-3">
          {t('contact.cards.title')}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t('contact.hero.subtitle')}
        </p>
      </div>

      {/* Bloque 1: Canales Directos (WhatsApp & Email) - 2 cards amplias y destacadas */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mb-7">
        {directChannels.map((card, idx) => {
          const url = getUrl(card.key)
          const isWhatsApp = card.key === 'whatsapp'

          return (
            <motion.a
              key={card.key}
              href={url}
              target={isWhatsApp ? '_blank' : undefined}
              rel={isWhatsApp ? 'noopener noreferrer' : undefined}
              className="group relative bg-card/90 hover:bg-card rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl border border-border hover:border-primary/50 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={card.icon}
                  alt={t(`contact.cards.${card.key}.alt`)}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>

              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
                    {isWhatsApp ? (
                      <>
                        <MessageSquare className="w-3 h-3" />
                        <span>Respuesta rápida</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3 h-3" />
                        <span>Canal oficial</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-efour text-primary group-hover:text-primary transition-colors tracking-wide mb-1.5">
                    {t(`contact.cards.${card.key}.label`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {t(`contact.cards.${card.key}.desc`)}
                  </p>
                </div>

                <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                  <span>{card.actionLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* Bloque 2: Redes Sociales & Comunidad (LinkedIn, Instagram, TikTok) - 3 cards equilibradas */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Comunidad y presencia digital
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {socialChannels.map((card, idx) => {
            const url = getUrl(card.key)

            return (
              <motion.a
                key={card.key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-card/80 hover:bg-card rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg border border-border/70 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center gap-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + 0.08 * idx, duration: 0.4 }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 transition-transform duration-300 group-hover:scale-108">
                  <Image
                    src={card.icon}
                    alt={t(`contact.cards.${card.key}.alt`)}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-contain drop-shadow-sm"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <h4 className="text-base sm:text-lg font-efour text-primary tracking-wide mb-1">
                    {t(`contact.cards.${card.key}.label`)}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {t(`contact.cards.${card.key}.desc`)}
                  </p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <span>{card.handle}</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
