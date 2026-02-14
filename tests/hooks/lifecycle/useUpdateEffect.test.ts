import { renderHook } from '@testing-library/react'
import { useUpdateEffect } from '../../../src/hooks/lifecycle/useUpdateEffect'

describe('useUpdateEffect', () => {
  it('should not call on first render', () => {
    const fn = vi.fn()
    renderHook(() => useUpdateEffect(fn))
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call on subsequent renders', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(fn, [value]),
      { initialProps: { value: 0 } },
    )
    expect(fn).not.toHaveBeenCalled()
    rerender({ value: 1 })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call cleanup on deps change', () => {
    const cleanup = vi.fn()
    const fn = vi.fn(() => cleanup)
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(fn, [value]),
      { initialProps: { value: 0 } },
    )
    rerender({ value: 1 })
    rerender({ value: 2 })
    expect(cleanup).toHaveBeenCalledTimes(1)
  })
})
