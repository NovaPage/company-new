'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe hook to listen to CSS media queries.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Convenience hook to check if current viewport matches desktop breakpoint (>= 768px).
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 768px)')
}
