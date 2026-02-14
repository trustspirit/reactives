'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function useQueryParams<T extends Record<string, string>>(): {
  params: Partial<T>
  set: (key: keyof T, value: string) => void
  setAll: (params: Partial<T>) => void
  delete: (key: keyof T) => void
  clear: () => void
} {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const params = Object.fromEntries(searchParams.entries()) as Partial<T>

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => URLSearchParams) => {
      const newParams = updater(new URLSearchParams(searchParams.toString()))
      const query = newParams.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    },
    [searchParams, router, pathname],
  )

  const set = useCallback(
    (key: keyof T, value: string) => {
      updateParams((p) => {
        p.set(key as string, value)
        return p
      })
    },
    [updateParams],
  )

  const setAll = useCallback(
    (newParams: Partial<T>) => {
      updateParams((p) => {
        Object.entries(newParams).forEach(([key, value]) => {
          if (value !== undefined) p.set(key, value as string)
        })
        return p
      })
    },
    [updateParams],
  )

  const deleteParam = useCallback(
    (key: keyof T) => {
      updateParams((p) => {
        p.delete(key as string)
        return p
      })
    },
    [updateParams],
  )

  const clear = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  return { params, set, setAll, delete: deleteParam, clear }
}
