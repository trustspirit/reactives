import { renderHook, act } from '@testing-library/react'
import { useStateHistory } from '../../../src/hooks/state/useStateHistory'

describe('useStateHistory', () => {
  it('should initialize with value', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('should set new values and track history', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.set('c'))
    expect(result.current.value).toBe('c')
    expect(result.current.history).toEqual(['a', 'b', 'c'])
  })

  it('should undo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.undo())
    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(true)
  })

  it('should redo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.undo())
    act(() => result.current.redo())
    expect(result.current.value).toBe('b')
  })

  it('should discard future on new set after undo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.set('c'))
    act(() => result.current.undo())
    act(() => result.current.set('d'))
    expect(result.current.history).toEqual(['a', 'b', 'd'])
    expect(result.current.canRedo).toBe(false)
  })
})
