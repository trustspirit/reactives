# useIsServer

Detects the server/client rendering environment.

## API

```ts
function useIsServer(): boolean
```

### Parameters

None

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if rendering on the server, `false` on the client |

## Usage

```tsx
import { useIsServer } from 'reactives-hooks/next'

function ServerAwareComponent() {
  const isServer = useIsServer()

  if (isServer) {
    return <p>Server-rendered content</p>
  }

  return <p>Client-rendered content with {window.innerWidth}px width</p>
}
```

## Notes

- Uses `useSyncExternalStore` to prevent hydration mismatch.
- Can be used without `'use client'`.
- Does not cause incorrect content flash.
