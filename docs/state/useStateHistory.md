# useStateHistory

A state management hook with Undo/Redo support.

## API

```ts
function useStateHistory<T>(initialValue: T): UseStateHistoryReturn<T>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `T` | - | Initial state value |

### Returns

| Name | Type | Description |
|------|------|-------------|
| value | `T` | Current state |
| set | `(value: T) => void` | Set a new value (clears the redo stack) |
| undo | `() => void` | Restore the previous state |
| redo | `() => void` | Restore the next state |
| canUndo | `boolean` | Whether undo is available |
| canRedo | `boolean` | Whether redo is available |
| history | `T[]` | Full state history |

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

- Setting a new value clears the redo stack.
