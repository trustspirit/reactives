import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from '../../../src/hooks/data/useFetch'

describe('useFetch', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'hello' }),
      }),
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch data on mount', async () => {
    const { result } = renderHook(() => useFetch<{ message: string }>('/api/test'))

    await waitFor(() => {
      expect(result.current.data).toEqual({ message: 'hello' })
      expect(result.current.loading).toBe(false)
    })
  })

  it('should not fetch when disabled', () => {
    const { result } = renderHook(() => useFetch('/api/test', { enabled: false }))
    expect(result.current.loading).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should handle fetch errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      }),
    )

    const { result } = renderHook(() => useFetch('/api/test'))

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
      expect(result.current.error?.message).toContain('404')
    })
  })
})
