# useWindowSize

Tracks the size of the browser window.

## API

```ts
function useWindowSize(): { width: number; height: number }
```

### Parameters

None

### Returns

| Name | Type | Description |
|------|------|-------------|
| width | `number` | `window.innerWidth` |
| height | `number` | `window.innerHeight` |

## Usage

```tsx
import { useWindowSize } from 'reactives-hooks'

function WindowInfo() {
  const { width, height } = useWindowSize()

  return (
    <p>
      Window size: {width} x {height}
    </p>
  )
}
```

## Notes

- Returns `{ width: 0, height: 0 }` in SSR environments.
