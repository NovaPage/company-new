'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function ProfileHeader() {
  const { t } = useTranslation()

  return (
    <motion.header
      className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8 bg-card/70 rounded-2xl shadow-xl px-6 py-10 mb-10 border border-border"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      {/* Foto (hover animado) */}
      <motion.div
        className="relative w-40 h-40 flex-shrink-0 drop-shadow-lg group"
        initial={{ scale: 0.7, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
        whileHover={{ scale: 1.07, rotate: 4 }}
      >
        <Image
          src="/profile.png"
          alt={t("profile.header.photoAlt")}
          fill
          sizes="160px"
          className="object-cover rounded-full border-4 border-primary shadow-lg transition-all duration-300 group-hover:border-accent group-hover:shadow-accent"
          priority
        />
      </motion.div>

      {/* Info */}
      <motion.div
        className="flex-1 flex flex-col items-center md:items-start gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold font-efour text-primary uppercase tracking-wider drop-shadow-lg">
          {t("profile.header.name")}
        </h1>
        <div className="text-base md:text-lg font-semibold text-muted-foreground text-center md:text-left">
          {t("profile.header.role")}
        </div>

        {/* Contacto con hover/active */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start mt-2">
          <span className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary/80">
            <MapPin size={18} className="opacity-70 group-hover:opacity-100 transition-all" />
            {t("profile.header.location")}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary/80">
            <Phone size={18} className="opacity-70 group-hover:opacity-100 transition-all" />
            {t("profile.header.phone")}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary/80">
            <Mail size={18} className="opacity-70 group-hover:opacity-100 transition-all" />
            {t("profile.header.email")}
          </span>
          <Link
            href={t("profile.header.linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm group/link focus-visible:outline-none transition-all
              hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-primary focus:text-primary"
          >
            <Linkedin size={18} className="transition-colors group-hover/link:text-primary" /> LinkedIn
          </Link>
          <Link
            href={t("profile.header.github")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm group/link focus-visible:outline-none transition-all
              hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-primary focus:text-primary"
          >
            <Github size={18} className="transition-colors group-hover/link:text-primary" /> GitHub
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}
