# useWindowSize

브라우저 창의 크기를 추적합니다.

## API

```ts
function useWindowSize(): { width: number; height: number }
```

### Parameters

없음

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

- SSR 환경에서는 `{ width: 0, height: 0 }`을 반환합니다.
