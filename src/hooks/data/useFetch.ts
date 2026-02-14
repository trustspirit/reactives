import { useCallback, useEffect, useRef, useState } from 'react'

interface UseFetchOptions extends RequestInit {
  enabled?: boolean
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}): UseFetchReturn<T> {
  const { enabled = true, ...fetchOptions } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortControllerRef.current.signal,
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const json = (await response.json()) as T
      setData(json)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(err as Error)
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  useEffect(() => {
    if (!enabled) return
    fetchData()
    return () => abortControllerRef.current?.abort()
  }, [fetchData, enabled])

  return { data, loading, error, refetch: fetchData }
}
