import { renderHook } from '@testing-library/react'
import { usePrevious } from '../../../src/hooks/state/usePrevious'

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0))
    expect(result.current).toBeUndefined()
  })

  it('should return previous value after rerender', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    })
    rerender({ value: 1 })
    expect(result.current).toBe(0)
    rerender({ value: 2 })
    expect(result.current).toBe(1)
  })
})
