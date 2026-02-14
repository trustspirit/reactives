import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLElement | null>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options
  const ref = useRef<HTMLElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const node = ref.current
    if (!node || frozen) return

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        if (observerEntry) setEntry(observerEntry)
      },
      { threshold, root, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, frozen])

  return {
    ref,
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  }
}
