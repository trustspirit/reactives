# useEventListener

타입 안전한 이벤트 리스너를 등록합니다.

## API

```ts
function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: RefObject<HTMLElement | null> | null,
  options?: boolean | AddEventListenerOptions
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| eventName | `K` | - | 이벤트 이름 (전체 타입 지원) |
| handler | `(event: EventMap[K]) => void` | - | 이벤트 핸들러 |
| element | `RefObject<HTMLElement \| null>` | `window` | 대상 요소 (기본: window) |
| options | `boolean \| AddEventListenerOptions` | - | addEventListener 옵션 |

### Returns

`void`

## Usage

```tsx
import { useEventListener } from 'reactives-hooks'

function Component() {
  const ref = useRef<HTMLDivElement>(null)

  // Window 이벤트
  useEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key)
  })

  // Element 이벤트
  useEventListener('click', (e) => {
    console.log('Clicked at:', e.clientX, e.clientY)
  }, ref)

  return <div ref={ref}>Click me</div>
}
```

## Notes

- 핸들러는 항상 최신 참조를 캡처합니다 (stale closure 문제 없음).
- 컴포넌트 언마운트 시 자동으로 정리됩니다.
