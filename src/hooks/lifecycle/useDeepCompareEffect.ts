import { useEffect, useRef } from 'react'
import type { DependencyList, EffectCallback } from 'react'

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true
  if (typeof a !== typeof b) return false
  if (a === null || b === null) return false
  if (typeof a !== 'object') return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => deepEqual(item, b[index]))
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false

  const objA = a as Record<string, unknown>
  const objB = b as Record<string, unknown>

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false
    if (!deepEqual(objA[key], objB[key])) return false
  }

  return true
}

function useDeepCompareMemoize(deps: DependencyList): DependencyList {
  const ref = useRef<DependencyList>(deps)

  if (!deepEqual(deps, ref.current)) {
    ref.current = deps
  }

  return ref.current
}

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(deps))
}
