import { useEffect, useRef } from 'react'

function parseKeyCombo(combo: string): {
  key: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
} {
  const parts = combo.toLowerCase().split('+')
  return {
    key: parts[parts.length - 1]!,
    ctrl: parts.includes('ctrl') || parts.includes('control'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta') || parts.includes('cmd'),
  }
}

export function useHotkeys(
  keyCombo: string,
  callback: (event: KeyboardEvent) => void,
  enabled = true,
): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!enabled) return

    const parsed = parseKeyCombo(keyCombo)

    const handler = (event: KeyboardEvent) => {
      const matches =
        event.key.toLowerCase() === parsed.key &&
        event.ctrlKey === parsed.ctrl &&
        event.shiftKey === parsed.shift &&
        event.altKey === parsed.alt &&
        event.metaKey === parsed.meta

      if (matches) {
        event.preventDefault()
        callbackRef.current(event)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [keyCombo, enabled])
}
