import { renderHook, act } from '@testing-library/react'
import { useMap } from '../../../src/hooks/state/useMap'

describe('useMap', () => {
  it('should initialize empty', () => {
    const { result } = renderHook(() => useMap<string, number>())
    expect(result.current[0].size).toBe(0)
  })

  it('should initialize with entries', () => {
    const { result } = renderHook(() =>
      useMap([
        ['a', 1],
        ['b', 2],
      ]),
    )
    expect(result.current[0].get('a')).toBe(1)
    expect(result.current[0].size).toBe(2)
  })

  it('should set a value', () => {
    const { result } = renderHook(() => useMap<string, number>())
    act(() => result.current[1].set('key', 42))
    expect(result.current[0].get('key')).toBe(42)
  })

  it('should delete a value', () => {
    const { result } = renderHook(() => useMap([['a', 1]] as [string, number][]))
    act(() => result.current[1].delete('a'))
    expect(result.current[0].has('a')).toBe(false)
  })

  it('should clear all values', () => {
    const { result } = renderHook(() =>
      useMap([
        ['a', 1],
        ['b', 2],
      ] as [string, number][]),
    )
    act(() => result.current[1].clear())
    expect(result.current[0].size).toBe(0)
  })

  it('should reset to initial values', () => {
    const initial: [string, number][] = [['a', 1]]
    const { result } = renderHook(() => useMap(initial))
    act(() => result.current[1].set('b', 2))
    act(() => result.current[1].reset())
    expect(result.current[0].size).toBe(1)
    expect(result.current[0].get('a')).toBe(1)
  })
})
