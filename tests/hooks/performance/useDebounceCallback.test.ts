import { renderHook, act } from '@testing-library/react'
import { useDebounceCallback } from '../../../src/hooks/performance/useDebounceCallback'

describe('useDebounceCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce the callback', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebounceCallback(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
      result.current('c')
    })
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })

  it('should clean up on unmount', () => {
    const fn = vi.fn()
    const { result, unmount } = renderHook(() => useDebounceCallback(fn, 500))

    act(() => {
      result.current('a')
    })
    unmount()

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(fn).not.toHaveBeenCalled()
  })
})
