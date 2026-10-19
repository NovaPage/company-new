'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type ScrollIndicatorProps = {
  targetId?: string
  label?: string
  className?: string
}

export function ScrollIndicator({
  targetId,
  label = 'Scroll',
  className = '',
}: ScrollIndicatorProps) {
  const handleScroll = () => {
    if (targetId) {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Fallback: smooth scroll past the current viewport
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      type="button"
      onClick={handleScroll}
      className={`
        group flex flex-col items-center gap-1.5 cursor-pointer outline-none
        text-muted-foreground/70 hover:text-primary transition-colors duration-300
        focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2
        ${className}
      `}
      aria-label="Desplazarse hacia abajo"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase transition-colors group-hover:text-primary">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/5 border border-primary/15 group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors"
      >
        <ChevronDown className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-y-0.5" />
      </motion.div>
    </motion.button>
  )
}
