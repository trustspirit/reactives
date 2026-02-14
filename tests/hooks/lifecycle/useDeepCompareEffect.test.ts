import { renderHook } from '@testing-library/react'
import { useDeepCompareEffect } from '../../../src/hooks/lifecycle/useDeepCompareEffect'

describe('useDeepCompareEffect', () => {
  it('should call effect on mount', () => {
    const fn = vi.fn()
    renderHook(() => useDeepCompareEffect(fn, [{ a: 1 }]))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not re-run when deps are deeply equal', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(
      ({ deps }) => useDeepCompareEffect(fn, deps),
      { initialProps: { deps: [{ a: 1, b: [2, 3] }] as unknown[] } },
    )
    rerender({ deps: [{ a: 1, b: [2, 3] }] })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should re-run when deps change deeply', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(
      ({ deps }) => useDeepCompareEffect(fn, deps),
      { initialProps: { deps: [{ a: 1 }] as unknown[] } },
    )
    rerender({ deps: [{ a: 2 }] })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
