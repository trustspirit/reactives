# useThrottleCallback

Limits the execution frequency of a callback function (throttle).

## API

```ts
function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number
): (...args: Parameters<T>) => void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `T` | - | The function to throttle |
| interval | `number` | - | Minimum execution interval (ms) |

### Returns

| Type | Description |
|------|-------------|
| `(...args: Parameters<T>) => void` | The throttled function |

## Usage

```tsx
import { useThrottleCallback } from 'reactives-hooks'

function TrackingComponent() {
  const track = useThrottleCallback((x: number, y: number) => {
    analytics.trackPosition(x, y)
  }, 200)

  useEventListener('mousemove', (e) => {
    track(e.clientX, e.clientY)
  })

  return <div>Move your mouse around</div>
}
```

## Notes

- The timer is automatically cleaned up when the component unmounts.
- If a call occurs within the interval, the last call will be executed after the interval ends.
