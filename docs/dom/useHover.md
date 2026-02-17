# useHover

Tracks the hover state of an element.

## API

```ts
function useHover<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean
]
```

### Parameters

None

### Returns

Returns a `[callbackRef, isHovered]` tuple.

| Name | Type | Description |
|------|------|-------------|
| callbackRef | `(node: T \| null) => void` | A callback ref to attach to the element |
| isHovered | `boolean` | Current hover state |

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

- Uses the callback ref pattern, so it is safe to use with dynamically changing elements.
