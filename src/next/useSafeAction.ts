'use client'

import { useCallback, useState, useTransition } from 'react'

interface UseSafeActionReturn<TInput, TOutput> {
  execute: (input: TInput) => void
  data: TOutput | null
  error: Error | null
  loading: boolean
  reset: () => void
}

export function useSafeAction<TInput, TOutput>(
  action: (input: TInput) => Promise<TOutput>,
): UseSafeActionReturn<TInput, TOutput> {
  const [data, setData] = useState<TOutput | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()

  const execute = useCallback(
    (input: TInput) => {
      startTransition(async () => {
        setError(null)
        try {
          const result = await action(input)
          setData(result)
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })
    },
    [action],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { execute, data, error, loading: isPending, reset }
}
