import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../../../src/hooks/state/useCounter'

describe('useCounter', () => {
  it('should initialize with 0 by default', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current[0]).toBe(0)
  })

  it('should increment', () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current[1].increment())
    expect(result.current[0]).toBe(1)
  })

  it('should increment by delta', () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current[1].increment(5))
    expect(result.current[0]).toBe(5)
  })

  it('should decrement', () => {
    const { result } = renderHook(() => useCounter(5))
    act(() => result.current[1].decrement())
    expect(result.current[0]).toBe(4)
  })

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10))
    act(() => result.current[1].increment(5))
    act(() => result.current[1].reset())
    expect(result.current[0]).toBe(10)
  })

  it('should clamp to min', () => {
    const { result } = renderHook(() => useCounter(0, { min: 0 }))
    act(() => result.current[1].decrement())
    expect(result.current[0]).toBe(0)
  })

  it('should clamp to max', () => {
    const { result } = renderHook(() => useCounter(10, { max: 10 }))
    act(() => result.current[1].increment())
    expect(result.current[0]).toBe(10)
  })
})
