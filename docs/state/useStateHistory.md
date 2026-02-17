# useStateHistory

Undo/Redo를 지원하는 상태 관리 hook입니다.

## API

```ts
function useStateHistory<T>(initialValue: T): UseStateHistoryReturn<T>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `T` | - | 초기 상태 값 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| value | `T` | 현재 상태 |
| set | `(value: T) => void` | 새 값 설정 (redo 스택 초기화) |
| undo | `() => void` | 이전 상태로 복원 |
| redo | `() => void` | 다음 상태로 복원 |
| canUndo | `boolean` | undo 가능 여부 |
| canRedo | `boolean` | redo 가능 여부 |
| history | `T[]` | 전체 상태 기록 |

## Usage

```tsx
import { useStateHistory } from 'reactives-hooks'

function TextEditor() {
  const { value, set, undo, redo, canUndo, canRedo } = useStateHistory('')

  return (
    <div>
      <textarea value={value} onChange={e => set(e.target.value)} />
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  )
}
```

## Notes

- 새 값을 설정하면 redo 스택이 초기화됩니다.
