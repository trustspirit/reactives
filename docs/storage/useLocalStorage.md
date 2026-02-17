# useLocalStorage

Manages state that is synchronized with localStorage.

## API

```ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string` | - | localStorage key |
| initialValue | `T` | - | Default value to use when no stored value exists |

### Returns

Returns a `[value, setValue, removeValue]` tuple.

| Name | Type | Description |
|------|------|-------------|
| value | `T` | The currently stored value |
| setValue | `(value: T \| ((prev: T) => T)) => void` | Updates the value (supports updater functions) |
| removeValue | `() => void` | Removes the value from localStorage |

## Usage

```tsx
import { useLocalStorage } from 'reactives-hooks'

function Settings() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}>
        Toggle
      </button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  )
}
```

## Notes

- In SSR environments, returns `initialValue`.
- Automatically handles JSON serialization/deserialization.
- Detects changes from other tabs via the `storage` event and keeps state in sync.
