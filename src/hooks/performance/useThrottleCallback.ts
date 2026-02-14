import { useCallback, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number,
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback)
  const lastCalledRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const elapsed = now - lastCalledRef.current

      if (elapsed >= interval) {
        lastCalledRef.current = now
        callbackRef.current(...args)
      } else if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          lastCalledRef.current = Date.now()
          timerRef.current = null
          callbackRef.current(...args)
        }, interval - elapsed)
      }
    },
    [interval],
  )
}
