# useUpdateEffect

A useEffect that skips the first render.

## API

```ts
function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| effect | `EffectCallback` | - | The effect function to execute |
| deps | `DependencyList` | - | Dependency array |

### Returns

`void`

## Usage

```tsx
import { useUpdateEffect } from 'reactives-hooks'

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([])

  // Does not run on the first render; only runs when query changes
  useUpdateEffect(() => {
    fetchResults(query).then(setResults)
  }, [query])

  return <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
}
```

## Notes

- Useful when execution on mount is unnecessary, such as for initial data fetching.
