import { renderHook } from '@testing-library/react'
import { useResizeObserver } from '../../../src/hooks/dom/useResizeObserver'

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    })),
  )
  mockObserve.mockClear()
  mockDisconnect.mockClear()
})

describe('useResizeObserver', () => {
  it('should return initial size of 0x0', () => {
    const { result } = renderHook(() => useResizeObserver<HTMLDivElement>())
    expect(result.current[1]).toEqual({ width: 0, height: 0 })
  })

  it('should return a ref', () => {
    const { result } = renderHook(() => useResizeObserver<HTMLDivElement>())
    expect(result.current[0]).toBeDefined()
    expect(result.current[0].current).toBeNull()
  })
})
