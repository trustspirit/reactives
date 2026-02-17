# useCopyToClipboard

텍스트를 클립보드에 복사합니다.

## API

```ts
function useCopyToClipboard(): UseCopyToClipboardReturn
```

### Parameters

없음

### Returns

| Name | Type | Description |
|------|------|-------------|
| copiedText | `string \| null` | 마지막으로 복사된 텍스트 |
| copy | `(text: string) => Promise<boolean>` | 복사 함수 (성공 여부 반환) |

## Usage

```tsx
import { useCopyToClipboard } from 'reactives-hooks'

function CopyButton({ text }: { text: string }) {
  const { copiedText, copy } = useCopyToClipboard()

  return (
    <button onClick={() => copy(text)}>
      {copiedText === text ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

## Notes

- `navigator.clipboard` API를 사용합니다.
- Clipboard API를 지원하지 않는 환경에서는 `false`를 반환합니다.
