# useThrottleValue

값의 업데이트 빈도를 제한합니다 (throttle).

## API

```ts
function useThrottleValue<T>(value: T, interval: number): T
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `T` | - | 쓰로틀할 값 |
| interval | `number` | - | 최소 업데이트 간격 (ms) |

### Returns

| Type | Description |
|------|-------------|
| `T` | 쓰로틀된 값. 최대 `interval` ms마다 한 번 업데이트 |

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

- 연속적인 이벤트(scroll, resize 등)에서의 성능 최적화에 적합합니다.
- 마지막 값이 반영되도록 interval 종료 후 최종 업데이트를 스케줄링합니다.
