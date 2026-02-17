# useClickOutside

Detects clicks outside of an element.

## API

```ts
function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<T | null>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| handler | `(event: MouseEvent \| TouchEvent) => void` | - | Callback to execute on outside click |

### Returns

| Type | Description |
|------|-------------|
| `RefObject<T \| null>` | A ref to attach to the element to monitor |

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

- Detects both `mousedown` and `touchstart` events.
- Clicks on nested elements are not considered outside clicks.
