import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface Size {
  width: number
  height: number
}

export function useResizeObserver<T extends HTMLElement>(): [RefObject<T | null>, Size] {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new ResizeObserver(([resizeEntry]) => {
      if (resizeEntry) {
        const { width, height } = resizeEntry.contentRect
        setSize({ width, height })
      }
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
