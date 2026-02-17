# useUpdateEffect

첫 번째 렌더를 건너뛰는 useEffect입니다.

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
| effect | `EffectCallback` | - | 실행할 이펙트 함수 |
| deps | `DependencyList` | - | 의존성 배열 |

### Returns

`void`

## Usage

```tsx
import { useUpdateEffect } from 'reactives-hooks'

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([])

  // 첫 렌더에서는 실행되지 않고, query가 변경될 때만 실행
  useUpdateEffect(() => {
    fetchResults(query).then(setResults)
  }, [query])

  return <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
}
```

## Notes

- 초기 데이터 fetch 등 마운트 시 실행이 불필요한 경우에 유용합니다.
