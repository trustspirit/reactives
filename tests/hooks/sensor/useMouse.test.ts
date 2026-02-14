import { renderHook, act } from '@testing-library/react'
import { useMouse } from '../../../src/hooks/sensor/useMouse'

describe('useMouse', () => {
  it('should return initial position 0,0', () => {
    const { result } = renderHook(() => useMouse())
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('should update on mousemove', () => {
    const { result } = renderHook(() => useMouse())
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }))
    })
    expect(result.current.x).toBe(100)
    expect(result.current.y).toBe(200)
  })
})
