import { useSyncExternalStore } from 'react'

const subscribe = (): (() => void) => () => {}
const getSnapshot = (): boolean => false
const getServerSnapshot = (): boolean => true

export function useIsServer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
