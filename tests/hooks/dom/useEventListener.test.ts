import { renderHook } from '@testing-library/react'
import { useEventListener } from '../../../src/hooks/dom/useEventListener'

describe('useEventListener', () => {
  it('should add event listener to window by default', () => {
    const handler = vi.fn()
    renderHook(() => useEventListener('click', handler))
    window.dispatchEvent(new Event('click'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should add event listener to element ref', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    const ref = { current: div }
    renderHook(() => useEventListener('click', handler, ref))
    div.dispatchEvent(new Event('click'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should remove event listener on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useEventListener('click', handler))
    unmount()
    window.dispatchEvent(new Event('click'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('should use latest handler without re-registering', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    const { rerender } = renderHook(({ handler }) => useEventListener('click', handler), {
      initialProps: { handler: handler1 },
    })
    rerender({ handler: handler2 })
    window.dispatchEvent(new Event('click'))
    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).toHaveBeenCalledTimes(1)
  })
})
