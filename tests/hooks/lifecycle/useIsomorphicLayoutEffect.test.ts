import { renderHook } from '@testing-library/react'
import { useIsomorphicLayoutEffect } from '../../../src/hooks/lifecycle/useIsomorphicLayoutEffect'

describe('useIsomorphicLayoutEffect', () => {
  it('should be a function', () => {
    expect(typeof useIsomorphicLayoutEffect).toBe('function')
  })

  it('should execute the callback', () => {
    const fn = vi.fn()
    renderHook(() => useIsomorphicLayoutEffect(fn, []))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
