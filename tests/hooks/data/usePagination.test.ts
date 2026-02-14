import { renderHook, act } from '@testing-library/react'
import { usePagination } from '../../../src/hooks/data/usePagination'

describe('usePagination', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, pageSize: 10 }))
    expect(result.current.page).toBe(1)
    expect(result.current.totalPages).toBe(10)
    expect(result.current.hasNext).toBe(true)
    expect(result.current.hasPrev).toBe(false)
  })

  it('should navigate next/prev', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, pageSize: 10 }))
    act(() => result.current.next())
    expect(result.current.page).toBe(2)
    act(() => result.current.prev())
    expect(result.current.page).toBe(1)
  })

  it('should not go below 1 or above totalPages', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 20, pageSize: 10 }))
    act(() => result.current.prev())
    expect(result.current.page).toBe(1)
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.page).toBe(2)
  })

  it('should calculate correct indices', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 25, pageSize: 10 }))
    expect(result.current.startIndex).toBe(0)
    expect(result.current.endIndex).toBe(9)
    act(() => result.current.next())
    expect(result.current.startIndex).toBe(10)
    expect(result.current.endIndex).toBe(19)
    act(() => result.current.next())
    expect(result.current.startIndex).toBe(20)
    expect(result.current.endIndex).toBe(24)
  })

  it('should reset page on pageSize change', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, pageSize: 10 }))
    act(() => result.current.next())
    act(() => result.current.setPageSize(20))
    expect(result.current.page).toBe(1)
    expect(result.current.totalPages).toBe(5)
  })
})
