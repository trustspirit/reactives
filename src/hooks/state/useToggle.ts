import { useCallback, useState } from 'react'

export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback((newValue?: boolean) => {
    setValue((prev) => (typeof newValue === 'boolean' ? newValue : !prev))
  }, [])

  return [value, toggle]
}
