# useMap

Manages the state of a Map data structure.

## API

```ts
function useMap<K, V>(
  initialValue?: Iterable<[K, V]>
): [Map<K, V>, UseMapActions<K, V>]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `Iterable<[K, V]>` | `[]` | Initial Map entries |

### Returns

Returns a `[map, actions]` tuple.

| Name | Type | Description |
|------|------|-------------|
| map | `Map<K, V>` | Current Map state |
| actions.set | `(key: K, value: V) => void` | Add or update an entry |
| actions.setAll | `(entries: Iterable<[K, V]>) => void` | Set multiple entries at once |
| actions.delete | `(key: K) => void` | Delete an entry |
| actions.clear | `() => void` | Delete all entries |
| actions.reset | `() => void` | Reset to the initial value |

## Usage

```tsx
import { useMap } from 'reactives-hooks'

function UserSettings() {
  const [settings, { set, delete: remove, clear }] = useMap<string, string>([
    ['theme', 'dark'],
    ['lang', 'ko'],
  ])

  return (
    <div>
      <p>Theme: {settings.get('theme')}</p>
      <button onClick={() => set('theme', 'light')}>Light Mode</button>
      <button onClick={() => remove('theme')}>Remove Theme</button>
      <button onClick={clear}>Clear All</button>
    </div>
  )
}
```
