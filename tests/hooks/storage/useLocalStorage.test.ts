import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../../src/hooks/storage/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return initial value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should read existing value from storage', () => {
    localStorage.setItem('key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('should set value to storage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    act(() => result.current[1]('new-value'))
    expect(result.current[0]).toBe('new-value')
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('new-value')
  })

  it('should accept updater function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(1)
  })

  it('should remove value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    act(() => result.current[1]('value'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('default')
    expect(localStorage.getItem('key')).toBeNull()
  })

  it('should handle objects', () => {
    const obj = { name: 'test', count: 1 }
    const { result } = renderHook(() => useLocalStorage('obj', obj))
    act(() => result.current[1]({ name: 'updated', count: 2 }))
    expect(result.current[0]).toEqual({ name: 'updated', count: 2 })
  })
})
