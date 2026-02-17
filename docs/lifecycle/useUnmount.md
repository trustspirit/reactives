# useUnmount

컴포넌트 언마운트 시 콜백을 실행합니다.

## API

```ts
function useUnmount(callback: () => void): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `() => void` | - | 언마운트 시 실행할 함수 |

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

- 콜백은 항상 최신 참조를 캡처합니다 (stale closure 문제 없음).
