# useMediaQuery

Tracks the matching state of a CSS media query.

## API

```ts
function useMediaQuery(query: string): boolean
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| query | `string` | - | CSS media query string |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | Whether the media query matches |

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

- Returns `false` in SSR environments.
- Updates in real time when the viewport changes.
