# useIsServer

서버/클라이언트 렌더링 환경을 감지합니다.

## API

```ts
function useIsServer(): boolean
```

### Parameters

없음

### Returns

| Type | Description |
|------|-------------|
| `boolean` | 서버에서 렌더링 중이면 `true`, 클라이언트에서는 `false` |

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

- `useSyncExternalStore`를 사용하여 hydration mismatch를 방지합니다.
- `'use client'` 없이도 사용 가능합니다.
- 잘못된 컨텐츠 깜빡임(flash)이 발생하지 않습니다.
