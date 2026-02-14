import { renderHook } from '@testing-library/react'
import { useInfiniteScroll } from '../../../src/hooks/data/useInfiniteScroll'

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    })),
  )
})

describe('useInfiniteScroll', () => {
  it('should return loading false initially', () => {
    const loadMore = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useInfiniteScroll(loadMore, true))
    expect(result.current.loading).toBe(false)
  })

  it('should return a sentinel ref', () => {
    const loadMore = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useInfiniteScroll(loadMore, true))
    expect(result.current.sentinelRef).toBeDefined()
  })

  it('should expose reset function', () => {
    const loadMore = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useInfiniteScroll(loadMore, true))
    expect(typeof result.current.reset).toBe('function')
  })
})
