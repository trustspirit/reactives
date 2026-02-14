import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from '../../../src/hooks/ui/useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it('should default to system preference', () => {
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.theme).toBe('system')
    expect(result.current.isDark).toBe(false)
  })

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkMode())
    act(() => result.current.toggle())
    expect(result.current.isDark).toBe(true)
    expect(result.current.theme).toBe('dark')
  })

  it('should set theme explicitly', () => {
    const { result } = renderHook(() => useDarkMode())
    act(() => result.current.setTheme('dark'))
    expect(result.current.isDark).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should read saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.theme).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })
})
