'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const SUPPORTED_LANGUAGES = [
  { code: 'es', emoji: '🇪🇸' },
  { code: 'en', emoji: '🇺🇸' },
  { code: 'pt', emoji: '🇧🇷' },
] as const

type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]['code']

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [show, setShow] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const toggleMenu = () => {
    if (isMobile) setShow((prev) => !prev)
  }

  const handleEnter = () => {
    if (!isMobile) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }
      setShow(true)
    }
  }

  const handleLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => setShow(false), 150)
    }
  }

  const selectLanguage = (code: SupportedLocale) => {
    setLocale(code)
    setShow(false)
  }

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Globe button */}
      <button
        aria-label="Cambiar idioma"
        onClick={toggleMenu}
        className={`
          transition-transform duration-200 hover:scale-125
          text-black dark:text-white
          hover:text-secondary dark:hover:text-primary
        `}
      >
        <Globe className="w-6 h-6 stroke-current cursor-pointer" />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-10 left-1/2 -translate-x-1/2
          min-w-[6rem] px-3 py-2
          rounded-xl shadow-lg border border-border
          transition-all duration-200 ease-in-out
          bg-popover text-popover-foreground
          dark:bg-background dark:text-foreground
          ${show ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        {SUPPORTED_LANGUAGES.map(({ code, emoji }) => {
          const isActive = locale === code
          return (
            <button
              key={code}
              onClick={() => selectLanguage(code)}
              className={`
                flex items-center justify-between w-full text-sm font-medium cursor-pointer
                rounded-md px-2 py-1.5
                transition-colors duration-200
                ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <span className="text-lg">{emoji}</span>
              {isActive && <span className="text-xs text-primary">●</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
