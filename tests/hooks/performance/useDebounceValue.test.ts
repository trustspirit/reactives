import { renderHook, act } from '@testing-library/react'
import { useDebounceValue } from '../../../src/hooks/performance/useDebounceValue'

describe('useDebounceValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounceValue('hello', 500))
    expect(result.current).toBe('hello')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'hello' } },
    )
    rerender({ value: 'world' })
    expect(result.current).toBe('hello')

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe('world')
  })

  it('should reset timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'a' } },
    )
    rerender({ value: 'b' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    rerender({ value: 'c' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe('c')
  })
})
