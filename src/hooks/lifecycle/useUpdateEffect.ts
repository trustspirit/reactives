import { useEffect, useRef } from 'react'
import type { DependencyList, EffectCallback } from 'react'

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
