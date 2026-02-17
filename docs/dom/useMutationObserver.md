# useMutationObserver

DOM 변경을 감지합니다.

## API

```ts
function useMutationObserver(
  callback: MutationCallback,
  options?: MutationObserverInit
): RefObject<HTMLElement | null>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `MutationCallback` | - | DOM 변경 시 실행할 콜백 |
| options | `MutationObserverInit` | `{ childList: true, subtree: true }` | 관찰 옵션 |

### Returns

| Type | Description |
|------|-------------|
| `RefObject<HTMLElement \| null>` | 관찰할 요소에 연결할 ref |

## Usage

```tsx
import { useMutationObserver } from 'reactives-hooks'

function DomWatcher() {
  const ref = useMutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log('DOM changed:', mutation.type)
    })
  }, { childList: true, attributes: true, subtree: true })

  return <div ref={ref}>Watch this element for changes</div>
}
```

## Notes

- 기본적으로 `childList`와 `subtree` 변경을 감지합니다.
- 콜백은 항상 최신 참조를 캡처합니다.
