import { useCallback, useState } from 'react'

interface UseCopyToClipboardReturn {
  copiedText: string | null
  copy: (text: string) => Promise<boolean>
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch {
      setCopiedText(null)
      return false
    }
  }, [])

  return { copiedText, copy }
}
