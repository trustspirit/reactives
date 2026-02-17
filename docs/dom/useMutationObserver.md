# useMutationObserver

Detects DOM changes.

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
| callback | `MutationCallback` | - | Callback to execute on DOM changes |
| options | `MutationObserverInit` | `{ childList: true, subtree: true }` | Observer options |

### Returns

| Type | Description |
|------|-------------|
| `RefObject<HTMLElement \| null>` | A ref to attach to the element to observe |

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

- By default, detects `childList` and `subtree` changes.
- The callback always captures the latest reference.
