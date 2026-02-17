# useDebounceValue

Delays value changes (debounce).

## API

```ts
function useDebounceValue<T>(value: T, delay: number): T
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | The value to debounce |
| delay | `number` | - | Delay time (ms) |

### Returns

| Type | Description |
|------|-------------|
| `T` | The debounced value. Updates after no changes for `delay` ms |

## Usage

```tsx
import { useDebounceValue } from 'reactives-hooks'

function SearchInput() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounceValue(search, 300)

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch)
    }
  }, [debouncedSearch])

  return <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
}
```
