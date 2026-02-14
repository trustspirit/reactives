import { renderHook } from '@testing-library/react'
import { useUnmount } from '../../../src/hooks/lifecycle/useUnmount'

describe('useUnmount', () => {
  it('should not call callback while mounted', () => {
    const fn = vi.fn()
    renderHook(() => useUnmount(fn))
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call callback on unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useUnmount(fn))
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should use latest callback', () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const { rerender, unmount } = renderHook(({ fn }) => useUnmount(fn), {
      initialProps: { fn: fn1 },
    })
    rerender({ fn: fn2 })
    unmount()
    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).toHaveBeenCalledTimes(1)
  })
})
