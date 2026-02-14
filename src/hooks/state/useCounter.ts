import { useCallback, useState } from 'react'

interface UseCounterOptions {
  min?: number
  max?: number
}

interface UseCounterActions {
  increment: (delta?: number) => void
  decrement: (delta?: number) => void
  set: (value: number) => void
  reset: () => void
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {},
): [number, UseCounterActions] {
  const { min, max } = options
  const [count, setCount] = useState(initialValue)

  const clamp = useCallback(
    (value: number) => {
      let clamped = value
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    },
    [min, max],
  )

  const increment = useCallback((delta = 1) => setCount((prev) => clamp(prev + delta)), [clamp])
  const decrement = useCallback((delta = 1) => setCount((prev) => clamp(prev - delta)), [clamp])
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return [count, { increment, decrement, set, reset }]
}
