import { useCallback, useState } from 'react'

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.sessionStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(nextValue))
        }
        return nextValue
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
