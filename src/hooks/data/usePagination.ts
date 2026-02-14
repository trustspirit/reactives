import { useCallback, useMemo, useState } from 'react'

interface UsePaginationOptions {
  totalItems: number
  pageSize?: number
  initialPage?: number
}

interface UsePaginationReturn {
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  next: () => void
  prev: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  startIndex: number
  endIndex: number
}

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const { totalItems, pageSize: initialPageSize = 10, initialPage = 1 } = options
  const [page, setPageState] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize],
  )

  const setPage = useCallback(
    (newPage: number) => {
      setPageState(Math.min(Math.max(1, newPage), totalPages))
    },
    [totalPages],
  )

  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize)
    setPageState(1)
  }, [])

  const next = useCallback(() => setPage(page + 1), [page, setPage])
  const prev = useCallback(() => setPage(page - 1), [page, setPage])

  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

  return {
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    next,
    prev,
    setPage,
    setPageSize,
    startIndex,
    endIndex,
  }
}
