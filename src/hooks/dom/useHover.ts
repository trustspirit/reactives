import { useCallback, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean,
] {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T | null>(null)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const callbackRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter)
        ref.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      ref.current = node
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)
      }
    },
    [handleMouseEnter, handleMouseLeave],
  )

  return [callbackRef, isHovered]
}
