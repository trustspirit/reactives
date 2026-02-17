# useScrollLock

body 스크롤을 잠급니다.

## API

```ts
function useScrollLock(locked: boolean): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| locked | `boolean` | - | 스크롤 잠금 여부 |

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

- 스크롤바 너비만큼 padding을 추가하여 레이아웃 흔들림을 방지합니다.
- 잠금 해제 시 원래 스타일로 복원됩니다.
