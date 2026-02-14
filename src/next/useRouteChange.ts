'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface UseRouteChangeCallbacks {
  onComplete?: (url: string) => void
}

export function useRouteChange(callbacks: UseRouteChangeCallbacks): void {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const savedCallbacks = useRef(callbacks)
  const prevUrl = useRef(`${pathname}?${searchParams.toString()}`)

  useEffect(() => {
    savedCallbacks.current = callbacks
  }, [callbacks])

  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`
    if (currentUrl !== prevUrl.current) {
      savedCallbacks.current.onComplete?.(currentUrl)
      prevUrl.current = currentUrl
    }
  }, [pathname, searchParams])
}
