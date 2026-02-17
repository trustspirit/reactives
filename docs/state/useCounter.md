# useCounter

min/max 범위를 지원하는 숫자 카운터입니다.

## API

```ts
function useCounter(
  initialValue?: number,
  options?: UseCounterOptions
): [number, UseCounterActions]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `number` | `0` | 초기 카운터 값 |
| options.min | `number` | - | 최솟값 |
| options.max | `number` | - | 최댓값 |

### Returns

`[count, actions]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| count | `number` | 현재 카운터 값 |
| actions.increment | `(delta?: number) => void` | 증가 (기본 +1) |
| actions.decrement | `(delta?: number) => void` | 감소 (기본 -1) |
| actions.set | `(value: number) => void` | 직접 값 설정 |
| actions.reset | `() => void` | 초기값으로 리셋 |

## Usage

```tsx
import { useCounter } from 'reactives-hooks'

function Counter() {
  const [count, { increment, decrement, reset }] = useCounter(0, { min: 0, max: 100 })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => increment(5)}>+5</button>
      <button onClick={() => decrement()}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

## Notes

- `min`/`max`가 설정된 경우 값이 자동으로 범위 내로 클램핑됩니다.
