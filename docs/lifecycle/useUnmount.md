# useUnmount

Executes a callback when the component unmounts.

## API

```ts
function useUnmount(callback: () => void): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `() => void` | - | The function to execute on unmount |

### Returns

`void`

## Usage

```tsx
import { useUnmount } from 'reactives-hooks'

function Timer() {
  const intervalRef = useRef<NodeJS.Timeout>()

  useMount(() => {
    intervalRef.current = setInterval(() => console.log('tick'), 1000)
  })

  useUnmount(() => {
    clearInterval(intervalRef.current)
    console.log('Timer cleaned up')
  })

  return <div>Timer running...</div>
}
```

## Notes

- The callback always captures the latest reference (no stale closure issues).
