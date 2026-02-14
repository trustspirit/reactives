import { useEffect, useRef, useState } from 'react'

export function useThrottleValue<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdated = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    const elapsed = now - lastUpdated.current

    if (elapsed >= interval) {
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
      }, interval - elapsed)
      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}
