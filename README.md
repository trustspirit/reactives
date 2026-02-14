# reactives

A collection of useful React hooks and utilities for React and Next.js.

- **TypeScript-first** — Full type safety with generics
- **Tree-shakeable** — Import only what you need
- **SSR-safe** — Works with Next.js SSR/SSG out of the box
- **Zero dependencies** — No bloat (except `cn` util which uses `clsx` + `tailwind-merge`)
- **React 18+** compatible (React 19 ready)

## Install

```bash
npm install reactives
# or
pnpm add reactives
# or
yarn add reactives
```

## Usage

```tsx
import { useToggle, useLocalStorage, useDebounceValue } from 'reactives'
import { useQueryParams } from 'reactives/next'
import { cn } from 'reactives/utils'

function App() {
  const [isOpen, toggle] = useToggle(false)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const debouncedSearch = useDebounceValue(search, 300)

  return (
    <div className={cn('container', isOpen && 'open')}>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

## Hooks

### State
- `useToggle` — Boolean toggle
- `useBoolean` — Explicit boolean controls (setTrue/setFalse/toggle)
- `useCounter` — Numeric counter with min/max
- `useMap` — Map state management
- `useSet` — Set state management
- `usePrevious` — Previous render value
- `useStateHistory` — Undo/redo state history

### Storage
- `useLocalStorage` — Synced localStorage with SSR safety
- `useSessionStorage` — Synced sessionStorage with SSR safety

### DOM
- `useEventListener` — Type-safe event listener
- `useClickOutside` — Outside click detection
- `useHover` — Hover state tracking
- `useIntersectionObserver` — Viewport intersection detection
- `useResizeObserver` — Element resize detection
- `useMutationObserver` — DOM mutation detection

### Sensor
- `useMediaQuery` — CSS media query matching
- `useWindowSize` — Window dimensions
- `useScroll` — Scroll position tracking
- `useMouse` — Mouse position tracking
- `useNetwork` — Network status and info

### Performance
- `useDebounceValue` — Debounced value
- `useDebounceCallback` — Debounced callback
- `useThrottleValue` — Throttled value
- `useThrottleCallback` — Throttled callback

### Lifecycle
- `useMount` — Run on mount
- `useUnmount` — Run on unmount
- `useUpdateEffect` — Skip first render effect
- `useIsMounted` — Mount status ref
- `useIsomorphicLayoutEffect` — SSR-safe useLayoutEffect
- `useDeepCompareEffect` — Deep comparison effect

### UI
- `useScrollLock` — Body scroll lock
- `useDarkMode` — Dark mode with system preference
- `useFullscreen` — Fullscreen API
- `useCopyToClipboard` — Clipboard copy
- `useHotkeys` — Keyboard shortcut binding

### Data
- `useAsync` — Async function wrapper
- `useFetch` — Fetch wrapper with abort
- `useInfiniteScroll` — Infinite scroll with IntersectionObserver
- `usePagination` — Pagination logic

### Next.js (`reactives/next`)
- `useQueryParams` — Typed URL query state
- `useRouteChange` — Route change detection
- `useSafeAction` — Server Action wrapper
- `useIsServer` — SSR/CSR detection

### Utils (`reactives/utils`)
- `cn` — Class name merge (clsx + tailwind-merge)
- `formatDate` — Date formatting (Intl.DateTimeFormat)
- `sleep` — Promise-based delay

## License

MIT
