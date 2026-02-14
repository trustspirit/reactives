import { renderHook } from '@testing-library/react'
import { useScrollLock } from '../../../src/hooks/ui/useScrollLock'

describe('useScrollLock', () => {
  it('should lock body scroll when true', () => {
    renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should not lock when false', () => {
    renderHook(() => useScrollLock(false))
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('should restore on unmount', () => {
    document.body.style.overflow = 'auto'
    const { unmount } = renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('auto')
  })
})
