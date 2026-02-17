# useCounter

A numeric counter with min/max range support.

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
| initialValue | `number` | `0` | Initial counter value |
| options.min | `number` | - | Minimum value |
| options.max | `number` | - | Maximum value |

### Returns

Returns a `[count, actions]` tuple.

| Name | Type | Description |
|------|------|-------------|
| count | `number` | Current counter value |
| actions.increment | `(delta?: number) => void` | Increment (default +1) |
| actions.decrement | `(delta?: number) => void` | Decrement (default -1) |
| actions.set | `(value: number) => void` | Set the value directly |
| actions.reset | `() => void` | Reset to the initial value |

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

- When `min`/`max` are set, the value is automatically clamped within the range.
