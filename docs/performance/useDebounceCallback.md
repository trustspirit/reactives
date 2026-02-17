# useDebounceCallback

콜백 함수의 실행을 지연시킵니다 (debounce).

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
| callback | `T` | - | 디바운스할 함수 |
| delay | `number` | - | 지연 시간 (ms) |

### Returns

| Type | Description |
|------|-------------|
| `(...args: Parameters<T>) => void` | 디바운스된 함수 |

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

- 컴포넌트 언마운트 시 타이머가 자동으로 정리됩니다.
