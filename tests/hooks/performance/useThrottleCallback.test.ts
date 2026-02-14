import { renderHook, act } from '@testing-library/react'
import { useThrottleCallback } from '../../../src/hooks/performance/useThrottleCallback'

describe('useThrottleCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call immediately on first invocation', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottleCallback(fn, 500))

    act(() => {
      result.current('first')
    })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')
  })

  it('should throttle subsequent calls', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottleCallback(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
      result.current('c')
    })
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
