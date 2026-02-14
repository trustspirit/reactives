import { renderHook } from '@testing-library/react'
import { useScroll } from '../../../src/hooks/sensor/useScroll'

describe('useScroll', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollX', { value: 0, writable: true })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('should return initial scroll position', () => {
    const { result } = renderHook(() => useScroll())
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })
})
