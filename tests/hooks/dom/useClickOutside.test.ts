import { renderHook } from '@testing-library/react'
import { useClickOutside } from '../../../src/hooks/dom/useClickOutside'

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler))

    const div = document.createElement('div')
    document.body.appendChild(div)
    Object.defineProperty(result.current, 'current', { value: div, writable: true })

    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(div)
  })

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler))

    const div = document.createElement('div')
    document.body.appendChild(div)
    Object.defineProperty(result.current, 'current', { value: div, writable: true })

    div.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(div)
  })

  it('should clean up listeners on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useClickOutside<HTMLDivElement>(handler))
    unmount()
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handler).not.toHaveBeenCalled()
  })
})
