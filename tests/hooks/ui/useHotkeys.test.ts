import { renderHook } from '@testing-library/react'
import { useHotkeys } from '../../../src/hooks/ui/useHotkeys'

describe('useHotkeys', () => {
  it('should call callback on matching key', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('escape', handler))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call callback when disabled', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('escape', handler, false))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).not.toHaveBeenCalled()
  })

  it('should match ctrl+k combo', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('ctrl+k', handler))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not match when modifier is missing', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('ctrl+k', handler))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: false }))
    expect(handler).not.toHaveBeenCalled()
  })

  it('should clean up on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useHotkeys('escape', handler))
    unmount()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).not.toHaveBeenCalled()
  })
})
