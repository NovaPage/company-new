'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

type GradientButtonProps = {
  children: React.ReactNode
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  title?: string
  className?: string
}

export function GradientButton({
  children,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick,
  title,
  className = '',
}: GradientButtonProps) {
  // Contenido interno del botón
  const buttonContent = (
    <span
      className="
        group/button relative inline-flex items-center justify-center text-base rounded-xl
        bg-primary text-primary-foreground
        border-2 border-primary
        px-8 py-3 font-semibold
        shadow transition-all duration-200
        hover:shadow-xl hover:-translate-y-0.5
        hover:border-accent focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        select-none
      "
    >
      <span>{children}</span>
      <motion.span
        className="ml-2 -mr-1 flex"
        initial={{ x: 0 }}
        whileHover={{ x: 8 }}
        whileTap={{ x: 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        <ArrowRight className="w-5 h-5 stroke-2" />
      </motion.span>
    </span>
  )

  return (
    <div className={`relative inline-flex items-center justify-center group ${className}`}>
      <div
        className="
          absolute inset-0 pointer-events-none opacity-60 transition-all duration-700
          bg-gradient-to-r from-primary via-accent to-yellow-400
          rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200
        "
      ></div>
      {href ? (
        <a
          role="button"
          className="relative z-10"
          href={href}
          target={target}
          rel={rel}
          title={title}
          tabIndex={0}
        >
          {buttonContent}
        </a>
      ) : (
        <button
          type="button"
          className="relative z-10"
          onClick={onClick}
          title={title}
          tabIndex={0}
        >
          {buttonContent}
        </button>
      )}
    </div>
  )
}
