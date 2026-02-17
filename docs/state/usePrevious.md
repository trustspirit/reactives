# usePrevious

Returns the value from the previous render.

## API

```ts
function usePrevious<T>(value: T): T | undefined
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | The value to track |

### Returns

| Type | Description |
|------|-------------|
| `T \| undefined` | The value from the previous render. Returns `undefined` on the first render |

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
