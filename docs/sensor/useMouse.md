# useMouse

Tracks the mouse cursor position.

## API

```ts
function useMouse(): { x: number; y: number }
```

### Parameters

None

### Returns

| Name | Type | Description |
|------|------|-------------|
| x | `number` | X coordinate of the cursor (clientX) |
| y | `number` | Y coordinate of the cursor (clientY) |

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

- Returns `{ x: 0, y: 0 }` in SSR environments.
- Uses viewport-relative coordinates (`clientX`, `clientY`).
