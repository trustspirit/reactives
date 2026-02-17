# useDebounceCallback

Delays the execution of a callback function (debounce).

## API

```ts
function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `T` | - | The function to debounce |
| delay | `number` | - | Delay time (ms) |

### Returns

| Type | Description |
|------|-------------|
| `(...args: Parameters<T>) => void` | The debounced function |

## Usage

```tsx
import { useDebounceCallback } from 'reactives-hooks'

function AutoSave() {
  const save = useDebounceCallback((content: string) => {
    api.save(content)
  }, 1000)

  return <textarea onChange={e => save(e.target.value)} />
}
```

## Notes

- The timer is automatically cleaned up when the component unmounts.
