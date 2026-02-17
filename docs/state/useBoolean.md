# useBoolean

Provides explicit boolean control methods.

## API

```ts
function useBoolean(initialValue?: boolean): UseBooleanReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `boolean` | `false` | Initial state |

### Returns

| Name | Type | Description |
|------|------|-------------|
| value | `boolean` | Current state |
| setTrue | `() => void` | Set to `true` |
| setFalse | `() => void` | Set to `false` |
| toggle | `() => void` | Toggle the current value |
| setValue | `(value: boolean) => void` | Set the value directly |

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
