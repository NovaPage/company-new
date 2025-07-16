'use client'
import Image from 'next/image'
import Link from 'next/link'
import { WavyText } from '@/components/animations/WavyText'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { Github, Linkedin } from 'lucide-react'

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 pt-14 pb-20 max-w-3xl mx-auto gap-8">
      {/* Título animado */}
      <motion.h2
        className="text-3xl md:text-4xl font-efour text-primary tracking-wide text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        viewport={{ once: true }}
      >
        <WavyText text={t('home.about.title')} />
      </motion.h2>

      {/* Logo animado y descripción */}
      <div className="flex flex-col items-center gap-4">
        {/* Logo ANIMADO */}
        <motion.div
          className="relative w-40 h-40 flex-shrink-0 drop-shadow-lg group"
          initial={{ scale: 0.7, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
          whileHover={{ scale: 1.07, rotate: 4 }}
        >
          <Image
            src="/favicon.png"
            alt={t("profile.header.photoAlt")}
            fill
            sizes="160px"
            className="object-cover rounded-full border-4 border-primary shadow-lg transition-all duration-300 group-hover:border-accent group-hover:shadow-accent"
            priority
          />
        </motion.div>
        <br />
        {/* Texto breve */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-normal text-center max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
          viewport={{ once: true }}
        >
          {t('home.about.description')}
        </motion.p>

        {/* Fundador, centrado y SIN bold */}
        <motion.span
          className="text-sm text-muted-foreground font-normal text-center mt-2 mb-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.18, type: 'spring' }}
          viewport={{ once: true }}
        >
          {t('home.about.founder')}
        </motion.span>
      </div>

      {/* Enlaces visuales */}
      <div className="flex flex-row gap-4 items-center mt-4">
        <Link
          href="https://www.linkedin.com/in/cesar-perez-327032241/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn NovaPage"
          className="p-2 rounded-full hover:bg-primary/10 transition"
        >
          <Linkedin className="w-6 h-6 text-primary" />
        </Link>
        <Link
          href="https://github.com/NovaPage"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub NovaPage"
          className="p-2 rounded-full hover:bg-primary/10 transition"
        >
          <Github className="w-6 h-6 text-primary" />
        </Link>
      </div>
    </section>
  )
}
