# useIsMounted

Checks the mounted state of a component.

## API

```ts
function useIsMounted(): () => boolean
```

### Parameters

None

### Returns

| Type | Description |
|------|-------------|
| `() => boolean` | A function that returns the current mounted state |

## Usage

```tsx
import { useIsMounted } from 'reactives-hooks'

function AsyncComponent() {
  const [data, setData] = useState(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    fetchData().then(result => {
      if (isMounted()) {
        setData(result)
      }
    })
  }, [])

  return <div>{data ?? 'Loading...'}</div>
}
```

## Notes

- Prevents state updates on unmounted components after asynchronous operations complete.
- Returns a function for a stable reference.
