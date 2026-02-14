import { renderHook } from '@testing-library/react'
import { useIsMounted } from '../../../src/hooks/lifecycle/useIsMounted'

describe('useIsMounted', () => {
  it('should return true when mounted', () => {
    const { result } = renderHook(() => useIsMounted())
    expect(result.current()).toBe(true)
  })

  it('should return false after unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted())
    const isMounted = result.current
    unmount()
    expect(isMounted()).toBe(false)
  })
})
