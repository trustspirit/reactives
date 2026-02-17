# useEventListener

Registers a type-safe event listener.

## API

```ts
function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: RefObject<HTMLElement | null> | null,
  options?: boolean | AddEventListenerOptions
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| eventName | `K` | - | Event name (full type support) |
| handler | `(event: EventMap[K]) => void` | - | Event handler |
| element | `RefObject<HTMLElement \| null>` | `window` | Target element (default: window) |
| options | `boolean \| AddEventListenerOptions` | - | addEventListener options |

### Returns

`void`

## Usage

```tsx
import { useEventListener } from 'reactives-hooks'

function Component() {
  const ref = useRef<HTMLDivElement>(null)

  // Window event
  useEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key)
  })

  // Element event
  useEventListener('click', (e) => {
    console.log('Clicked at:', e.clientX, e.clientY)
  }, ref)

  return <div ref={ref}>Click me</div>
}
```

## Notes

- The handler always captures the latest reference (no stale closure issues).
- Automatically cleaned up when the component unmounts.
