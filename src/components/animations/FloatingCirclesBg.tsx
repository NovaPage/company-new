'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a
}

type CircleProps = {
  style: React.CSSProperties
  className: string
  animation: string
}

function CirclesContent() {
  const [circles, setCircles] = useState<CircleProps[]>([])

  useEffect(() => {
    setCircles([
      {
        style: {
          left: `${randomBetween(2, 18)}vw`,
          top: `${randomBetween(5, 40)}vh`,
          width: `${randomBetween(220, 300)}px`,
          height: `${randomBetween(220, 300)}px`,
          animationDelay: `${randomBetween(0, 6)}s`
        },
        className: "fixed rounded-full blur-2xl opacity-80 bg-secondary dark:bg-primary/10",
        animation: "floatY1 14s ease-in-out infinite"
      },
      {
        style: {
          right: `${randomBetween(2, 22)}vw`,
          top: `${randomBetween(8, 28)}vh`,
          width: `${randomBetween(120, 180)}px`,
          height: `${randomBetween(120, 180)}px`,
          animationDelay: `${randomBetween(2, 8)}s`
        },
        className: "fixed rounded-full blur-2xl opacity-80 bg-secondary dark:bg-primary/20",
        animation: "floatY2 19s ease-in-out infinite"
      },
      {
        style: {
          right: `${randomBetween(6, 32)}vw`,
          bottom: `${randomBetween(10, 35)}vh`,
          width: `${randomBetween(240, 340)}px`,
          height: `${randomBetween(240, 340)}px`,
          animationDelay: `${randomBetween(1, 9)}s`
        },
        className: "fixed rounded-full blur-2xl opacity-80 bg-secondary dark:bg-primary/15",
        animation: "floatXY 24s ease-in-out infinite"
      }
    ])
  }, [])

  return (
    <>
      <style>{`
        @keyframes floatY1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(16px); }
        }
        @keyframes floatXY {
          0%, 100% { transform: translate(0,0); }
          33% { transform: translate(-16px, 20px);}
          66% { transform: translate(18px, -14px);}
        }
      `}</style>
      {circles.map((circle, i) => (
        <span
          key={i}
          className={circle.className + " pointer-events-none z-[0]"}
          style={{
            ...circle.style,
            animation: circle.animation,
            position: 'fixed',
            zIndex: 0
          }}
        />
      ))}
    </>
  )
}

export function FloatingCirclesBg() {
  // Solo renderiza en el cliente (Next.js)
  if (typeof window === 'undefined') return null
  return createPortal(<CirclesContent />, document.body)
}
