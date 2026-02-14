import { renderHook } from '@testing-library/react'
import { useIsServer } from '../../src/next/useIsServer'

describe('useIsServer', () => {
  it('should return false in browser environment', () => {
    const { result } = renderHook(() => useIsServer())
    expect(result.current).toBe(false)
  })
})
