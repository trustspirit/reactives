# useSessionStorage

sessionStorage와 동기화되는 상태를 관리합니다.

## API

```ts
function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string` | - | sessionStorage 키 |
| initialValue | `T` | - | 저장된 값이 없을 때 사용할 기본값 |

### Returns

`[value, setValue, removeValue]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| value | `T` | 현재 저장된 값 |
| setValue | `(value: T \| ((prev: T) => T)) => void` | 값 업데이트 (updater 함수 지원) |
| removeValue | `() => void` | sessionStorage에서 값 제거 |

## Usage

```tsx
import { useSessionStorage } from 'reactives-hooks'

function FormDraft() {
  const [draft, setDraft, clearDraft] = useSessionStorage('form-draft', '')

  return (
    <div>
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="Your draft is auto-saved per session..."
      />
      <button onClick={clearDraft}>Clear Draft</button>
    </div>
  )
}
```

## Notes

- SSR 환경에서는 `initialValue`를 반환합니다.
- 브라우저를 닫으면 데이터가 삭제됩니다.
- 탭 간 동기화는 지원하지 않습니다 (sessionStorage 특성).
