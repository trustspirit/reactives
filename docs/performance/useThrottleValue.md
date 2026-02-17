# useThrottleValue

Limits the update frequency of a value (throttle).

## API

```ts
function useThrottleValue<T>(value: T, interval: number): T
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | The value to throttle |
| interval | `number` | - | Minimum update interval (ms) |

### Returns

| Type | Description |
|------|-------------|
| `T` | The throttled value. Updates at most once every `interval` ms |

## Usage

```tsx
import { useThrottleValue } from 'reactives-hooks'

function ScrollTracker() {
  const { y } = useScroll()
  const throttledY = useThrottleValue(y, 100)

  return <p>Scroll position: {throttledY}px</p>
}
```

## Notes

- Ideal for performance optimization with continuous events (scroll, resize, etc.).
- Schedules a final update after the interval ends to ensure the latest value is reflected.
