# useHotkeys

Binds keyboard shortcuts.

## API

```ts
function useHotkeys(
  keyCombo: string,
  callback: (event: KeyboardEvent) => void,
  enabled?: boolean
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| keyCombo | `string` | - | Key combination (e.g., `'ctrl+s'`, `'cmd+k'`, `'shift+enter'`) |
| callback | `(event: KeyboardEvent) => void` | - | Callback to execute when the shortcut matches |
| enabled | `boolean` | `true` | Whether the shortcut is enabled |

### Returns

`void`

## Usage

```tsx
import { useHotkeys } from 'reactives-hooks'

function Editor() {
  const [saved, setSaved] = useState(false)

  useHotkeys('ctrl+s', (e) => {
    save()
    setSaved(true)
  })

  useHotkeys('cmd+k', () => {
    openCommandPalette()
  })

  useHotkeys('escape', () => {
    closeModal()
  }, isModalOpen)

  return <div>Press Ctrl+S to save</div>
}
```

## Notes

- Key names are case-insensitive.
- Supported modifier keys: `ctrl`, `control`, `shift`, `alt`, `meta`, `cmd`
- `event.preventDefault()` is called automatically when a match occurs.
