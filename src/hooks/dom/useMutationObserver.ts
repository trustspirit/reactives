import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new MutationObserver((...args) => savedCallback.current(...args))
    observer.observe(node, options)
    return () => observer.disconnect()
  }, [options])

  return ref
}
