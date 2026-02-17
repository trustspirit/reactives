# useBoolean

명시적인 boolean 제어 메서드를 제공합니다.

## API

```ts
function useBoolean(initialValue?: boolean): UseBooleanReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `boolean` | `false` | 초기 상태 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| value | `boolean` | 현재 상태 |
| setTrue | `() => void` | `true`로 설정 |
| setFalse | `() => void` | `false`로 설정 |
| toggle | `() => void` | 현재 값 토글 |
| setValue | `(value: boolean) => void` | 직접 값 설정 |

## Usage

```tsx
import { useBoolean } from 'reactives-hooks'

function Modal() {
  const { value: isOpen, setTrue: open, setFalse: close, toggle } = useBoolean(false)

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <dialog open>
          <p>Modal content</p>
          <button onClick={close}>Close</button>
        </dialog>
      )}
    </div>
  )
}
```
