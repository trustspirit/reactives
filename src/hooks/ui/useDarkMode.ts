import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface UseDarkModeReturn {
  isDark: boolean
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

export function useDarkMode(defaultTheme: Theme = 'system'): UseDarkModeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem('theme') as Theme) ?? defaultTheme
  })

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const isDark = theme === 'system' ? systemDark : theme === 'dark'

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  const toggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, theme, setTheme, toggle }
}
