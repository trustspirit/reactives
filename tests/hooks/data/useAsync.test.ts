import { renderHook, act, waitFor } from '@testing-library/react'
import { useAsync } from '../../../src/hooks/data/useAsync'

describe('useAsync', () => {
  it('should execute immediately by default', async () => {
    const asyncFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAsync(asyncFn))
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.data).toBe('result')
      expect(result.current.loading).toBe(false)
    })
  })

  it('should not execute when immediate is false', () => {
    const asyncFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAsync(asyncFn, false))
    expect(asyncFn).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
  })

  it('should handle errors', async () => {
    const error = new Error('fail')
    const asyncFn = vi.fn().mockRejectedValue(error)
    const { result } = renderHook(() => useAsync(asyncFn))

    await waitFor(() => {
      expect(result.current.error).toBe(error)
      expect(result.current.loading).toBe(false)
    })
  })

  it('should execute manually', async () => {
    const asyncFn = vi.fn().mockResolvedValue('manual')
    const { result } = renderHook(() => useAsync(asyncFn, false))

    await act(async () => {
      await result.current.execute()
    })
    expect(result.current.data).toBe('manual')
  })
})
