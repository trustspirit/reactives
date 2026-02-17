# useRouteChange

Detects route changes.

## API

```ts
function useRouteChange(callbacks: UseRouteChangeCallbacks): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callbacks.onComplete | `(url: string) => void` | - | Callback invoked when a route change completes |

### Returns

`void`

## Usage

```tsx
import { useRouteChange } from 'reactives-hooks/next'

function Analytics() {
  useRouteChange({
    onComplete: (url) => {
      analytics.pageView(url)
      console.log('Navigated to:', url)
    },
  })

  return null
}
```

## Notes

- Can only be used in `'use client'` components.
- The URL includes query parameters.
- Compares the full URL including pathname and search.
