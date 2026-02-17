# useScroll

Tracks the scroll position.

## API

```ts
function useScroll(
  element?: RefObject<HTMLElement | null>
): { x: number; y: number }
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| element | `RefObject<HTMLElement \| null>` | `window` | The element to track scroll position for (default: window) |

### Returns

| Name | Type | Description |
|------|------|-------------|
| x | `number` | Horizontal scroll position |
| y | `number` | Vertical scroll position |

## Usage

```tsx
import { useScroll } from 'reactives-hooks'

function ScrollIndicator() {
  const { y } = useScroll()

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${Math.min((y / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
      height: 3,
      background: '#3b82f6',
    }} />
  )
}
```

## Notes

- Returns `{ x: 0, y: 0 }` in SSR environments.
- Uses passive listeners for better performance.
