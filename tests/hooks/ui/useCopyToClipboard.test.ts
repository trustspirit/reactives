import { renderHook, act } from '@testing-library/react'
import { useCopyToClipboard } from '../../../src/hooks/ui/useCopyToClipboard'

describe('useCopyToClipboard', () => {
  const mockWriteText = vi.fn()

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText.mockResolvedValue(undefined) },
    })
  })

  it('should initialize with null', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current.copiedText).toBeNull()
  })

  it('should copy text to clipboard', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      const success = await result.current.copy('hello')
      expect(success).toBe(true)
    })
    expect(result.current.copiedText).toBe('hello')
    expect(mockWriteText).toHaveBeenCalledWith('hello')
  })

  it('should return false when clipboard is not available', async () => {
    Object.assign(navigator, { clipboard: undefined })
    const { result } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      const success = await result.current.copy('hello')
      expect(success).toBe(false)
    })
  })
})
