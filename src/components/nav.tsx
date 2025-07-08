'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { navFade } from './animations'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './theme-toggle'

const menuItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/services' },
  { name: 'Proyectos', href: '/projects' },
  { name: 'Contacto', href: '/contact' },
]

export function NavBar() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navFade}
      className="w-full px-6 py-4 shadow-md bg-background/90 backdrop-blur-md border-b border-border"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="NovaPage Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xl font-semibold tracking-wide text-primary font-[--font-efour]">
              NovaPage
            </span>
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Idioma */}
        <div className="flex items-center justify-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}
