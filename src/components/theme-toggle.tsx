'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
    setIsDark(!isDark)
  }

  return (
    <label className="relative inline-flex justify-center items-center cursor-pointer scale-90">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="sr-only peer"
      />
      <div className="
        w-16 h-8
        rounded-full
        bg-primary
        transition-all duration-500
        
        after:content-['✨']
        after:absolute
        after:top-1
        after:left-1
        after:h-6
        after:w-6
        after:rounded-full
        after:bg-background
        after:flex
        after:items-center
        after:justify-center
        after:transition-all
        after:duration-500
        after:shadow-md
        after:text-primary
        after:bg-white
        peer-checked:after:translate-x-8
        peer-checked:after:content-['🔮']
        peer-checked:after:text-accent
        peer-checked:after:bg-black
      " />
    </label>
  )
}
