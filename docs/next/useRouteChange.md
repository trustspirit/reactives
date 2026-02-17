# useRouteChange

라우트 변경을 감지합니다.

## API

```ts
function useRouteChange(callbacks: UseRouteChangeCallbacks): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callbacks.onComplete | `(url: string) => void` | - | 라우트 변경 완료 시 콜백 |

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

- `'use client'` 컴포넌트에서만 사용 가능합니다.
- URL에 쿼리 파라미터가 포함됩니다.
- pathname과 search를 포함한 전체 URL을 비교합니다.
