# useThrottleCallback

콜백 함수의 실행 빈도를 제한합니다 (throttle).

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
| callback | `T` | - | 쓰로틀할 함수 |
| interval | `number` | - | 최소 실행 간격 (ms) |

### Returns

| Type | Description |
|------|-------------|
| `(...args: Parameters<T>) => void` | 쓰로틀된 함수 |

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

- 컴포넌트 언마운트 시 타이머가 자동으로 정리됩니다.
- interval 내에 호출이 있으면 마지막 호출이 interval 종료 후 실행됩니다.
