# useLocalStorage

localStorage와 동기화되는 상태를 관리합니다.

## API

```ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string` | - | localStorage 키 |
| initialValue | `T` | - | 저장된 값이 없을 때 사용할 기본값 |

### Returns

`[value, setValue, removeValue]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| value | `T` | 현재 저장된 값 |
| setValue | `(value: T \| ((prev: T) => T)) => void` | 값 업데이트 (updater 함수 지원) |
| removeValue | `() => void` | localStorage에서 값 제거 |

## Usage

```tsx
import { useLocalStorage } from 'reactives-hooks'

function Settings() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}>
        Toggle
      </button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  )
}
```

## Notes

- SSR 환경에서는 `initialValue`를 반환합니다.
- JSON 직렬화/역직렬화를 자동으로 처리합니다.
- 다른 탭에서의 변경을 `storage` 이벤트로 감지하여 동기화합니다.
