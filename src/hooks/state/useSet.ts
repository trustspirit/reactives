import { useCallback, useState } from 'react'

interface UseSetActions<T> {
  add: (value: T) => void
  delete: (value: T) => void
  clear: () => void
  reset: () => void
  toggle: (value: T) => void
}

export function useSet<T>(initialValue: Iterable<T> = []): [Set<T>, UseSetActions<T>] {
  const [set, setSet] = useState(() => new Set(initialValue))

  const actions: UseSetActions<T> = {
    add: useCallback((value: T) => {
      setSet((prev) => new Set([...prev, value]))
    }, []),

    delete: useCallback((value: T) => {
      setSet((prev) => {
        const next = new Set(prev)
        next.delete(value)
        return next
      })
    }, []),

    clear: useCallback(() => {
      setSet(new Set())
    }, []),

    reset: useCallback(() => {
      setSet(new Set(initialValue))
    }, []),

    toggle: useCallback((value: T) => {
      setSet((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
        } else {
          next.add(value)
        }
        return next
      })
    }, []),
  }

  return [set, actions]
}
