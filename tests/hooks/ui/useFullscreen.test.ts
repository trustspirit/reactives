import { renderHook } from '@testing-library/react'
import { useFullscreen } from '../../../src/hooks/ui/useFullscreen'

describe('useFullscreen', () => {
  it('should return isFullscreen false initially', () => {
    const { result } = renderHook(() => useFullscreen())
    expect(result.current.isFullscreen).toBe(false)
  })

  it('should return a ref', () => {
    const { result } = renderHook(() => useFullscreen())
    expect(result.current.ref).toBeDefined()
  })

  it('should expose enter, exit, toggle functions', () => {
    const { result } = renderHook(() => useFullscreen())
    expect(typeof result.current.enter).toBe('function')
    expect(typeof result.current.exit).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
  })
})
