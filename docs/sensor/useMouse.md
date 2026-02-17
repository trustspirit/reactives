# useMouse

마우스 커서 위치를 추적합니다.

## API

```ts
function useMouse(): { x: number; y: number }
```

### Parameters

없음

### Returns

| Name | Type | Description |
|------|------|-------------|
| x | `number` | 커서의 X 좌표 (clientX) |
| y | `number` | 커서의 Y 좌표 (clientY) |

## Usage

```tsx
import { useMouse } from 'reactives-hooks'

function Cursor() {
  const { x, y } = useMouse()

  return (
    <div
      style={{
        position: 'fixed',
        left: x - 10,
        top: y - 10,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'rgba(59, 130, 246, 0.5)',
        pointerEvents: 'none',
      }}
    />
  )
}
```

## Notes

- SSR 환경에서는 `{ x: 0, y: 0 }`을 반환합니다.
- 뷰포트 기준 좌표(`clientX`, `clientY`)를 사용합니다.
