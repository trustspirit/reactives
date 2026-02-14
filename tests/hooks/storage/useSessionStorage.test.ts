import { renderHook, act } from '@testing-library/react'
import { useSessionStorage } from '../../../src/hooks/storage/useSessionStorage'

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should return initial value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should set and get value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    act(() => result.current[1]('new'))
    expect(result.current[0]).toBe('new')
    expect(JSON.parse(sessionStorage.getItem('key')!)).toBe('new')
  })

  it('should remove value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    act(() => result.current[1]('value'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('default')
    expect(sessionStorage.getItem('key')).toBeNull()
  })
})
