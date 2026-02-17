# useDebounceValue

값의 변경을 지연시킵니다 (debounce).

## API

```ts
function useDebounceValue<T>(value: T, delay: number): T
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | 디바운스할 값 |
| delay | `number` | - | 지연 시간 (ms) |

### Returns

| Type | Description |
|------|-------------|
| `T` | 디바운스된 값. `delay` ms 동안 변경이 없으면 업데이트 |

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
