import { renderHook, act } from '@testing-library/react'
import { useNetwork } from '../../../src/hooks/sensor/useNetwork'

describe('useNetwork', () => {
  it('should return online status', () => {
    const { result } = renderHook(() => useNetwork())
    expect(result.current.online).toBe(navigator.onLine)
  })

  it('should update when going offline', () => {
    const { result } = renderHook(() => useNetwork())
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false, writable: true })
      window.dispatchEvent(new Event('offline'))
    })
    expect(result.current.online).toBe(false)
  })

  it('should update when going online', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true })
    const { result } = renderHook(() => useNetwork())
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: true, writable: true })
      window.dispatchEvent(new Event('online'))
    })
    expect(result.current.online).toBe(true)
  })
})
