import { useState } from 'react'
import { motion } from 'framer-motion'

type WavyTextProps = {
  text: string
  className?: string
}

export function WavyText({ text, className = '' }: WavyTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  const words = text.split(' ')

  return (
    <span
      className={`${className} break-words`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer', display: 'inline' }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{
            display: 'inline-block',
            marginRight: wordIdx !== words.length - 1 ? '0.5em' : undefined,
          }}
        >
          {word.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 0 }}
              animate={
                isHovered
                  ? {
                      y: -10,
                      transition: {
                        type: 'spring' as const,
                        stiffness: 500,
                        damping: 30,
                        delay: (wordIdx * 8 + i) * 0.04, // delay progresivo global
                      },
                    }
                  : {
                      y: 0,
                      transition: {
                        type: 'spring' as const,
                        stiffness: 500,
                        damping: 30,
                      },
                    }
              }
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
