# usePrevious

이전 렌더의 값을 반환합니다.

## API

```ts
function usePrevious<T>(value: T): T | undefined
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | 추적할 값 |

### Returns

| Type | Description |
|------|-------------|
| `T \| undefined` | 이전 렌더의 값. 첫 렌더에서는 `undefined` |

## Usage

```tsx
import { usePrevious } from 'reactives-hooks'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount ?? 'N/A'}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
```
