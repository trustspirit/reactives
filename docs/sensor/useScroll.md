# useScroll

스크롤 위치를 추적합니다.

## API

```ts
function useScroll(
  element?: RefObject<HTMLElement | null>
): { x: number; y: number }
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| element | `RefObject<HTMLElement \| null>` | `window` | 스크롤을 추적할 요소 (기본: window) |

### Returns

| Name | Type | Description |
|------|------|-------------|
| x | `number` | 수평 스크롤 위치 |
| y | `number` | 수직 스크롤 위치 |

## Usage

```tsx
import { useScroll } from 'reactives-hooks'

function ScrollIndicator() {
  const { y } = useScroll()

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${Math.min((y / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
      height: 3,
      background: '#3b82f6',
    }} />
  )
}
```

## Notes

- SSR 환경에서는 `{ x: 0, y: 0 }`을 반환합니다.
- 성능을 위해 passive 리스너를 사용합니다.
