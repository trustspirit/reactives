# useSessionStorage

Manages state that is synchronized with sessionStorage.

## API

```ts
function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string` | - | sessionStorage key |
| initialValue | `T` | - | Default value to use when no stored value exists |

### Returns

Returns a `[value, setValue, removeValue]` tuple.

| Name | Type | Description |
|------|------|-------------|
| value | `T` | The currently stored value |
| setValue | `(value: T \| ((prev: T) => T)) => void` | Updates the value (supports updater functions) |
| removeValue | `() => void` | Removes the value from sessionStorage |

## Usage

```tsx
import { useSessionStorage } from 'reactives-hooks'

function FormDraft() {
  const [draft, setDraft, clearDraft] = useSessionStorage('form-draft', '')

  return (
    <div>
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="Your draft is auto-saved per session..."
      />
      <button onClick={clearDraft}>Clear Draft</button>
    </div>
  )
}
```

## Notes

- In SSR environments, returns `initialValue`.
- Data is deleted when the browser is closed.
- Cross-tab synchronization is not supported (due to the nature of sessionStorage).
