# useResizeObserver

요소의 크기 변화를 감지합니다.

## API

```ts
function useResizeObserver<T extends HTMLElement>(): [
  RefObject<T | null>,
  { width: number; height: number }
]
```

### Parameters

없음

### Returns

`[ref, size]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<T \| null>` | 관찰할 요소에 연결할 ref |
| size.width | `number` | 요소 너비 |
| size.height | `number` | 요소 높이 |

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
