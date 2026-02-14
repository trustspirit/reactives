import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseFullscreenReturn {
  ref: RefObject<HTMLElement | null>
  isFullscreen: boolean
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
}

export function useFullscreen(): UseFullscreenReturn {
  const ref = useRef<HTMLElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const enter = useCallback(async () => {
    const element = ref.current
    if (element) await element.requestFullscreen()
  }, [])

  const exit = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
  }, [])

  const toggle = useCallback(async () => {
    if (isFullscreen) await exit()
    else await enter()
  }, [isFullscreen, enter, exit])

  return { ref, isFullscreen, enter, exit, toggle }
}
