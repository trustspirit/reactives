import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap

export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: RefObject<HTMLElement | null> | null,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const target = element?.current ?? window
    if (!target?.addEventListener) return

    const listener = (event: Event) => savedHandler.current(event as EventMap[K])
    target.addEventListener(eventName, listener, options)
    return () => target.removeEventListener(eventName, listener, options)
  }, [eventName, element, options])
}
