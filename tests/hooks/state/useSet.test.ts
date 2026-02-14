import { renderHook, act } from '@testing-library/react'
import { useSet } from '../../../src/hooks/state/useSet'

describe('useSet', () => {
  it('should initialize empty', () => {
    const { result } = renderHook(() => useSet<number>())
    expect(result.current[0].size).toBe(0)
  })

  it('should initialize with values', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]))
    expect(result.current[0].size).toBe(3)
  })

  it('should add a value', () => {
    const { result } = renderHook(() => useSet<number>())
    act(() => result.current[1].add(1))
    expect(result.current[0].has(1)).toBe(true)
  })

  it('should delete a value', () => {
    const { result } = renderHook(() => useSet([1, 2]))
    act(() => result.current[1].delete(1))
    expect(result.current[0].has(1)).toBe(false)
  })

  it('should toggle a value', () => {
    const { result } = renderHook(() => useSet<number>())
    act(() => result.current[1].toggle(1))
    expect(result.current[0].has(1)).toBe(true)
    act(() => result.current[1].toggle(1))
    expect(result.current[0].has(1)).toBe(false)
  })

  it('should clear', () => {
    const { result } = renderHook(() => useSet([1, 2]))
    act(() => result.current[1].clear())
    expect(result.current[0].size).toBe(0)
  })
})
