import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

interface UseInfiniteScrollReturn {
  sentinelRef: RefObject<HTMLElement | null>
  loading: boolean
  reset: () => void
}

export function useInfiniteScroll(
  loadMore: () => Promise<void>,
  hasMore: boolean,
  options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollReturn {
  const { threshold = 0, rootMargin = '100px' } = options
  const sentinelRef = useRef<HTMLElement | null>(null)
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(false)

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    try {
      await loadMore()
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          handleLoadMore()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [handleLoadMore, hasMore, threshold, rootMargin])

  const reset = useCallback(() => {
    loadingRef.current = false
    setLoading(false)
  }, [])

  return { sentinelRef, loading, reset }
}
