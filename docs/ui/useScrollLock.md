# useScrollLock

Locks body scroll.

## API

```ts
function useScrollLock(locked: boolean): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| locked | `boolean` | - | Whether to lock scrolling |

### Returns

`void`

## Usage

```tsx
import { useScrollLock } from 'reactives-hooks'

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useScrollLock(isOpen)

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Modal content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
```

## Notes

- Adds padding equal to the scrollbar width to prevent layout shift.
- Restores the original styles when the lock is released.
