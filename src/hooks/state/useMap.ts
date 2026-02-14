import { useCallback, useState } from 'react'

interface UseMapActions<K, V> {
  set: (key: K, value: V) => void
  setAll: (entries: Iterable<[K, V]>) => void
  delete: (key: K) => void
  clear: () => void
  reset: () => void
}

export function useMap<K, V>(
  initialValue: Iterable<[K, V]> = [],
): [Map<K, V>, UseMapActions<K, V>] {
  const [map, setMap] = useState(() => new Map(initialValue))

  const actions: UseMapActions<K, V> = {
    set: useCallback((key: K, value: V) => {
      setMap((prev) => {
        const next = new Map(prev)
        next.set(key, value)
        return next
      })
    }, []),

    setAll: useCallback((entries: Iterable<[K, V]>) => {
      setMap((prev) => {
        const next = new Map(prev)
        for (const [key, value] of entries) {
          next.set(key, value)
        }
        return next
      })
    }, []),

    delete: useCallback((key: K) => {
      setMap((prev) => {
        const next = new Map(prev)
        next.delete(key)
        return next
      })
    }, []),

    clear: useCallback(() => {
      setMap(new Map())
    }, []),

    reset: useCallback(() => {
      setMap(new Map(initialValue))
    }, []),
  }

  return [map, actions]
}
