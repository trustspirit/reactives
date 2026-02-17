# useHover

요소의 hover 상태를 추적합니다.

## API

```ts
function useHover<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean
]
```

### Parameters

없음

### Returns

`[callbackRef, isHovered]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| callbackRef | `(node: T \| null) => void` | 요소에 연결할 callback ref |
| isHovered | `boolean` | 현재 hover 상태 |

## Usage

```tsx
import { useHover } from 'reactives-hooks'

function HoverCard() {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  return (
    <div ref={hoverRef} style={{
      padding: 20,
      background: isHovered ? '#e0e0e0' : '#fff',
      transition: 'background 0.2s',
    }}>
      {isHovered ? 'Hovering!' : 'Hover me'}
    </div>
  )
}
```

## Notes

- Callback ref 패턴을 사용하므로 동적으로 변경되는 요소에도 안전합니다.
