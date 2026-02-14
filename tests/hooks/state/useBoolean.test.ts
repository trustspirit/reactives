import { renderHook, act } from '@testing-library/react'
import { useBoolean } from '../../../src/hooks/state/useBoolean'

describe('useBoolean', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useBoolean())
    expect(result.current.value).toBe(false)
  })

  it('should setTrue', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.setTrue())
    expect(result.current.value).toBe(true)
  })

  it('should setFalse', () => {
    const { result } = renderHook(() => useBoolean(true))
    act(() => result.current.setFalse())
    expect(result.current.value).toBe(false)
  })

  it('should toggle', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.toggle())
    expect(result.current.value).toBe(true)
  })

  it('should setValue directly', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.setValue(true))
    expect(result.current.value).toBe(true)
  })
})
