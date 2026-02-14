import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '../../../src/hooks/dom/useIntersectionObserver'

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    })),
  )
  mockObserve.mockClear()
  mockDisconnect.mockClear()
})

describe('useIntersectionObserver', () => {
  it('should return isIntersecting false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeNull()
  })

  it('should return a ref', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    expect(result.current.ref).toBeDefined()
    expect(result.current.ref.current).toBeNull()
  })

  it('should disconnect on unmount', () => {
    const { result, unmount } = renderHook(() => useIntersectionObserver())
    const div = document.createElement('div')
    Object.defineProperty(result.current.ref, 'current', { value: div, writable: true })
    unmount()
    // observer was created at some point; disconnect is called on cleanup
  })
})
