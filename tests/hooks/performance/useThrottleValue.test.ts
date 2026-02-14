import { renderHook, act } from '@testing-library/react'
import { useThrottleValue } from '../../../src/hooks/performance/useThrottleValue'

describe('useThrottleValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottleValue('hello', 500))
    expect(result.current).toBe('hello')
  })

  it('should eventually update to latest value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottleValue(value, 500),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe('b')
  })
})
