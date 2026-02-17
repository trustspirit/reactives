# useMediaQuery

CSS 미디어 쿼리의 매칭 상태를 추적합니다.

## API

```ts
function useMediaQuery(query: string): boolean
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| query | `string` | - | CSS 미디어 쿼리 문자열 |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | 미디어 쿼리 매칭 여부 |

## Usage

```tsx
import { useMediaQuery } from 'reactives-hooks'

function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      <p>Dark mode: {prefersDark ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

## Notes

- SSR 환경에서는 `false`를 반환합니다.
- 뷰포트 변경 시 실시간으로 업데이트됩니다.
