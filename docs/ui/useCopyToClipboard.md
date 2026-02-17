# useCopyToClipboard

Copies text to the clipboard.

## API

```ts
function useCopyToClipboard(): UseCopyToClipboardReturn
```

### Parameters

None

### Returns

| Name | Type | Description |
|------|------|-------------|
| copiedText | `string \| null` | The last copied text |
| copy | `(text: string) => Promise<boolean>` | Copy function (returns whether it succeeded) |

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

- Uses the `navigator.clipboard` API.
- Returns `false` in environments that do not support the Clipboard API.
