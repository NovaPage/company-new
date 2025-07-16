'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { navFade } from '../animations/animations'
import { LanguageSwitcher } from '../utils/LanguageSwitcher'
import { ThemeToggle } from '../utils/theme-toggle'
import { useTranslation } from '@/hooks/useTranslation'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { WavyText } from '../animations/WavyText'

export function NavBar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.contact'), href: '/contact' },
  ]

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navFade}
      className="w-full px-6 py-4 shadow-md bg-background/90 backdrop-blur-md border-b border-border z-50"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="NovaPage Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <WavyText
              text="NovaPage"
              className="text-2xl tracking-wider text-primary font-efour hidden md:inline-block"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-transform duration-300 hover:scale-105
                  ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
                `}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop Switchers */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Menú" className="focus:outline-none">
              <Menu className="w-6 h-6 text-foreground" />
            </SheetTrigger>

            <SheetContent side="right" className="w-64 flex flex-col justify-start items-center p-6 space-y-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <span className="text-xl font-semibold tracking-wide text-primary font-efour">
                  NovaPage
                </span>
              </SheetHeader>

              <div className="flex flex-col items-center justify-center w-full gap-5 text-center">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        text-base font-medium transition-transform duration-200 hover:scale-105
                        ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
                      `}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <div className="w-full pt-6 border-t border-border mt-4 flex flex-col gap-4 items-center">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
