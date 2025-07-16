'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useEffect, useRef, useState } from 'react'

const SUPPORTED_LANGUAGES = [
  { code: 'es', emoji: '🇪🇸' },
  { code: 'en', emoji: '🇺🇸' },
  { code: 'pt', emoji: '🇧🇷' },
] as const

type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number]['code']

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleEnter = () => {
    if (!isMobile) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }
      setOpen(true)
    }
  }

  const handleLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => setOpen(false), 150)
    }
  }

  const toggleMenu = () => {
    if (isMobile) setOpen((prev) => !prev)
  }

  const selectLanguage = (code: SupportedLocale) => {
    setLocale(code)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        className="relative inline-block"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Cambiar idioma"
            onClick={toggleMenu}
            className={`
              flex items-center justify-center
              transition-transform duration-200 hover:scale-125
              text-black dark:text-white
              hover:text-secondary dark:hover:text-primary
              focus-visible:outline-none
              h-10 w-10
            `}
            style={{ lineHeight: 0 }}
          >
            <Globe className="w-6 h-6 stroke-current cursor-pointer" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          sideOffset={8}
          className="min-w-[7rem] px-2 py-2 rounded-xl shadow-lg border border-border bg-popover text-popover-foreground dark:bg-background dark:text-foreground z-[9999]"
        >
          {SUPPORTED_LANGUAGES.map(({ code, emoji }) => {
            const isActive = locale === code
            return (
              <DropdownMenuItem
                key={code}
                onSelect={() => selectLanguage(code)}
                className={`
                  flex items-center justify-between w-full text-sm font-medium cursor-pointer
                  rounded-md px-2 py-1.5
                  transition-colors duration-200
                  ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <span className="text-lg">{emoji}</span>
                {isActive && <span className="text-xs text-primary">●</span>}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
