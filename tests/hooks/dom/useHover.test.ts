import { renderHook, act } from '@testing-library/react'
import { useHover } from '../../../src/hooks/dom/useHover'

describe('useHover', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>())
    expect(result.current[1]).toBe(false)
  })

  it('should detect hover via callback ref', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>())
    const div = document.createElement('div')

    act(() => {
      result.current[0](div)
    })

    act(() => {
      div.dispatchEvent(new MouseEvent('mouseenter'))
    })
    expect(result.current[1]).toBe(true)

    act(() => {
      div.dispatchEvent(new MouseEvent('mouseleave'))
    })
    expect(result.current[1]).toBe(false)
  })

  it('should clean up when node changes', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>())
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    act(() => {
      result.current[0](div1)
    })
    act(() => {
      result.current[0](div2)
    })

    act(() => {
      div1.dispatchEvent(new MouseEvent('mouseenter'))
    })
    expect(result.current[1]).toBe(false)

    act(() => {
      div2.dispatchEvent(new MouseEvent('mouseenter'))
    })
    expect(result.current[1]).toBe(true)
  })
})
