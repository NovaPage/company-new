'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { Globe } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español', emoji: '🇪🇸' },
  { code: 'en', label: 'English', emoji: '🇺🇸' },
  { code: 'pt', label: 'Português', emoji: '🇧🇷' },
] as const

type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]['code']

export function LanguageSwitcher() {
  const { setLocale, locale } = useLanguage()
  const [show, setShow] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const toggleMenu = () => {
    if (isMobile) setShow((prev) => !prev)
  }

  const selectLanguage = (code: SupportedLocale) => {
    setLocale(code)
    setShow(false)
  }

  const isActive = (code: SupportedLocale) => code === locale

  const handleEnter = () => {
    if (!isMobile) {
      clearTimeout(hideTimeout.current)
      setShow(true)
    }
  }

  const handleLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => setShow(false), 100)
    }
  }

  return (
    <div
      className="relative ml-4 z-50"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Botón Globo */}
      <button
        aria-label="Cambiar idioma"
        onClick={toggleMenu}
        className={`
          transition-transform duration-200 hover:scale-125
          ${show ? 'text-accent' : 'text-foreground'}
        `}
      >
        <Globe className={`w-6 h-6 ${show ? 'stroke-accent' : 'stroke-foreground'}`} />
      </button>

      {/* Panel animado y estable */}
      <div
        className={`
          absolute top-10 left-1/2 -translate-x-1/2
          w-40 sm:w-44 px-4 py-2 space-y-1 rounded-xl shadow-xl border border-border
          transition-all duration-300 ease-in-out
          bg-foreground text-background dark:bg-background dark:text-foreground
          ${show ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}
        `}
      >
        {SUPPORTED_LANGUAGES.map(({ code, emoji }) => (
          <button
            key={code}
            onClick={() => selectLanguage(code)}
            className={`
              flex items-center w-full text-sm font-semibold
              hover:text-primary transition-colors
              ${isActive(code) ? 'text-primary' : ''}
            `}
          >
            <span className="text-lg">{emoji}</span>

            {isActive(code) && <span className="ml-auto text-xs">●</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
