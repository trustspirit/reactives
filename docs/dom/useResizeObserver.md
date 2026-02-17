# useResizeObserver

Detects size changes of an element.

## API

```ts
function useResizeObserver<T extends HTMLElement>(): [
  RefObject<T | null>,
  { width: number; height: number }
]
```

### Parameters

None

### Returns

Returns a `[ref, size]` tuple.

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<T \| null>` | A ref to attach to the element to observe |
| size.width | `number` | Element width |
| size.height | `number` | Element height |

## Usage

```tsx
import { useResizeObserver } from 'reactives-hooks'

function ResponsiveBox() {
  const [ref, { width, height }] = useResizeObserver<HTMLDivElement>()

  return (
    <div ref={ref} style={{ resize: 'both', overflow: 'auto', border: '1px solid #ccc' }}>
      <p>{width} x {height}</p>
    </div>
  )
}
```
