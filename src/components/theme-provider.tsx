// src/components/theme-provider.tsx
"use client"

import { useEffect, useState } from "react"
import { colorMap } from "@/lib/theme-colors"
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = storedTheme === "dark" || (!storedTheme && prefersDark)
    root.classList.toggle("dark", isDark)

    const storedColor = localStorage.getItem("color-theme")
    if (storedColor && storedColor !== "default" && colorMap[storedColor as keyof typeof colorMap]) {
      const { primary, foreground } = colorMap[storedColor as keyof typeof colorMap]
      root.style.setProperty("--primary", primary)
      root.style.setProperty("--primary-foreground", foreground)
    }

    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <>{children}</>
}