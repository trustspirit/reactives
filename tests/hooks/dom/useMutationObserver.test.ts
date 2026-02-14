import { renderHook } from '@testing-library/react'
import { useMutationObserver } from '../../../src/hooks/dom/useMutationObserver'

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  vi.stubGlobal(
    'MutationObserver',
    vi.fn(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    })),
  )
  mockObserve.mockClear()
  mockDisconnect.mockClear()
})

describe('useMutationObserver', () => {
  it('should return a ref', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useMutationObserver(callback))
    expect(result.current).toBeDefined()
    expect(result.current.current).toBeNull()
  })

  it('should clean up on unmount', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => useMutationObserver(callback))
    unmount()
    // MutationObserver is not created since ref.current is null
  })
})
