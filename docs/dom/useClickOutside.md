# useClickOutside

요소 외부 클릭을 감지합니다.

## API

```ts
function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<T | null>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| handler | `(event: MouseEvent \| TouchEvent) => void` | - | 외부 클릭 시 실행할 콜백 |

### Returns

| Type | Description |
|------|-------------|
| `RefObject<T \| null>` | 감시할 요소에 연결할 ref |

## Usage

```tsx
import { useClickOutside } from 'reactives-hooks'

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <ul className="dropdown-menu">...</ul>}
    </div>
  )
}
```

## Notes

- `mousedown`과 `touchstart` 이벤트를 모두 감지합니다.
- 중첩된 요소의 클릭은 외부 클릭으로 간주하지 않습니다.
