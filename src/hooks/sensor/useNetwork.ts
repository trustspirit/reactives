import { useEffect, useState } from 'react'

interface NetworkState {
  online: boolean
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
}

interface NetworkInformation extends EventTarget {
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
}

export function useNetwork(): NetworkState {
  const [state, setState] = useState<NetworkState>(() => ({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  }))

  useEffect(() => {
    const connection = (navigator as unknown as { connection?: NetworkInformation }).connection

    const updateNetworkInfo = () => {
      setState({
        online: navigator.onLine,
        downlink: connection?.downlink,
        effectiveType: connection?.effectiveType,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      })
    }

    updateNetworkInfo()
    window.addEventListener('online', updateNetworkInfo)
    window.addEventListener('offline', updateNetworkInfo)
    connection?.addEventListener?.('change', updateNetworkInfo)

    return () => {
      window.removeEventListener('online', updateNetworkInfo)
      window.removeEventListener('offline', updateNetworkInfo)
      connection?.removeEventListener?.('change', updateNetworkInfo)
    }
  }, [])

  return state
}
