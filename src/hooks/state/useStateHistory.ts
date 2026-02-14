import { useCallback, useRef, useState } from 'react'

interface UseStateHistoryReturn<T> {
  value: T
  set: (value: T) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  history: T[]
}

export function useStateHistory<T>(initialValue: T): UseStateHistoryReturn<T> {
  const [value, setValue] = useState(initialValue)
  const historyRef = useRef<T[]>([initialValue])
  const pointerRef = useRef(0)

  const set = useCallback((newValue: T) => {
    const pointer = pointerRef.current
    const newHistory = historyRef.current.slice(0, pointer + 1)
    newHistory.push(newValue)
    historyRef.current = newHistory
    pointerRef.current = newHistory.length - 1
    setValue(newValue)
  }, [])

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current -= 1
      setValue(historyRef.current[pointerRef.current]!)
    }
  }, [])

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current += 1
      setValue(historyRef.current[pointerRef.current]!)
    }
  }, [])

  return {
    value,
    set,
    undo,
    redo,
    canUndo: pointerRef.current > 0,
    canRedo: pointerRef.current < historyRef.current.length - 1,
    history: historyRef.current,
  }
}
