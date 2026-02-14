import { renderHook } from '@testing-library/react'
import { useMount } from '../../../src/hooks/lifecycle/useMount'

describe('useMount', () => {
  it('should call callback on mount', () => {
    const fn = vi.fn()
    renderHook(() => useMount(fn))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call callback on rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useMount(fn))
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
