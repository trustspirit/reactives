import { renderHook, act } from '@testing-library/react'
import { useWindowSize } from '../../../src/hooks/sensor/useWindowSize'

describe('useWindowSize', () => {
  it('should return current window size', () => {
    const { result } = renderHook(() => useWindowSize())
    expect(result.current.width).toBe(window.innerWidth)
    expect(result.current.height).toBe(window.innerHeight)
  })

  it('should update on resize', () => {
    const { result } = renderHook(() => useWindowSize())
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 300, writable: true })
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(300)
  })
})
