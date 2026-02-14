import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export function useScroll(element?: RefObject<HTMLElement | null>): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const target = element?.current ?? window

    const handleScroll = () => {
      if ('scrollX' in target) {
        setPosition({ x: (target as Window).scrollX ?? 0, y: (target as Window).scrollY ?? 0 })
      } else if (target instanceof HTMLElement) {
        setPosition({ x: target.scrollLeft, y: target.scrollTop })
      }
    }

    handleScroll()
    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => target.removeEventListener('scroll', handleScroll)
  }, [element])

  return position
}
