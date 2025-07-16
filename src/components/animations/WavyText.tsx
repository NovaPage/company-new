import { useState } from 'react'
import { motion } from 'framer-motion'

type WavyTextProps = {
  text: string
  className?: string
}

export function WavyText({ text, className = '' }: WavyTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer', display: 'inline-block' }}
    >
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ y: 0 }}
          animate={isHovered ? { 
            y: -10, 
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30,
              delay: i * 0.04,
            } 
          } : { y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}
