# reactives-hooks

A collection of useful React hooks and utilities for React and Next.js.

- **TypeScript-first** — Full type safety with generics
- **Tree-shakeable** — Import only what you need
- **SSR-safe** — Works with Next.js SSR/SSG out of the box
- **Zero dependencies** — No bloat (except `cn` util which uses `clsx` + `tailwind-merge`)
- **React 18+** compatible (React 19 ready)

## Install

```bash
npm install reactives-hooks
# or
pnpm add reactives-hooks
# or
yarn add reactives-hooks
```

## Usage

```tsx
import { useToggle, useLocalStorage, useDebounceValue } from 'reactives-hooks'
import { useQueryParams } from 'reactives-hooks/next'
import { cn } from 'reactives-hooks/utils'

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

#### [`useToggle`](./docs/state/useToggle.md)

Toggles a boolean value.

```tsx
const [isOpen, toggle] = useToggle(false)
toggle()      // true
toggle(false) // false
```

#### [`useBoolean`](./docs/state/useBoolean.md)

Provides explicit boolean control methods.

```tsx
const { value: isOpen, setTrue: open, setFalse: close, toggle } = useBoolean(false)
```

#### [`useCounter`](./docs/state/useCounter.md)

Numeric counter with min/max bounds.

```tsx
const [count, { increment, decrement, reset }] = useCounter(0, { min: 0, max: 100 })
```

#### [`useMap`](./docs/state/useMap.md)

Manages Map data structure state.

```tsx
const [map, { set, delete: remove, clear }] = useMap<string, string>([['key', 'value']])
```

#### [`useSet`](./docs/state/useSet.md)

Manages Set data structure state.

```tsx
const [set, { add, toggle, clear }] = useSet<string>(['react'])
```

#### [`usePrevious`](./docs/state/usePrevious.md)

Returns the value from the previous render.

```tsx
const prevCount = usePrevious(count) // undefined on first render
```

#### [`useStateHistory`](./docs/state/useStateHistory.md)

State management with undo/redo support.

```tsx
const { value, set, undo, redo, canUndo, canRedo } = useStateHistory('')
```

### Storage

#### [`useLocalStorage`](./docs/storage/useLocalStorage.md)

Manages state synced with localStorage.

```tsx
const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')
```

#### [`useSessionStorage`](./docs/storage/useSessionStorage.md)

Manages state synced with sessionStorage.

```tsx
const [draft, setDraft, clearDraft] = useSessionStorage('form-draft', '')
```

### DOM

#### [`useEventListener`](./docs/dom/useEventListener.md)

Registers a type-safe event listener.

```tsx
useEventListener('keydown', (e) => console.log(e.key))
useEventListener('click', handler, elementRef)
```

#### [`useClickOutside`](./docs/dom/useClickOutside.md)

Detects clicks outside an element.

```tsx
const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))
```

#### [`useHover`](./docs/dom/useHover.md)

Tracks hover state of an element.

```tsx
const [hoverRef, isHovered] = useHover<HTMLDivElement>()
```

#### [`useIntersectionObserver`](./docs/dom/useIntersectionObserver.md)

Detects viewport intersection of an element.

```tsx
const { ref, isIntersecting } = useIntersectionObserver({ freezeOnceVisible: true })
```

#### [`useResizeObserver`](./docs/dom/useResizeObserver.md)

Detects element size changes.

```tsx
const [ref, { width, height }] = useResizeObserver<HTMLDivElement>()
```

#### [`useMutationObserver`](./docs/dom/useMutationObserver.md)

Detects DOM mutations.

```tsx
const ref = useMutationObserver((mutations) => { /* ... */ })
```

### Sensor

#### [`useMediaQuery`](./docs/sensor/useMediaQuery.md)

Tracks CSS media query match state.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
```

#### [`useWindowSize`](./docs/sensor/useWindowSize.md)

Tracks browser window dimensions.

```tsx
const { width, height } = useWindowSize()
```

#### [`useScroll`](./docs/sensor/useScroll.md)

Tracks scroll position.

```tsx
const { x, y } = useScroll()
```

#### [`useMouse`](./docs/sensor/useMouse.md)

Tracks mouse cursor position.

```tsx
const { x, y } = useMouse()
```

#### [`useNetwork`](./docs/sensor/useNetwork.md)

Tracks network status and connection info.

```tsx
const { online, effectiveType, downlink } = useNetwork()
```

### Performance

#### [`useDebounceValue`](./docs/performance/useDebounceValue.md)

Debounces a value update.

```tsx
const debouncedSearch = useDebounceValue(search, 300)
```

#### [`useDebounceCallback`](./docs/performance/useDebounceCallback.md)

Debounces a callback function.

```tsx
const save = useDebounceCallback((content: string) => api.save(content), 1000)
```

#### [`useThrottleValue`](./docs/performance/useThrottleValue.md)

Throttles a value update.

```tsx
const throttledY = useThrottleValue(scrollY, 100)
```

#### [`useThrottleCallback`](./docs/performance/useThrottleCallback.md)

Throttles a callback function.

```tsx
const track = useThrottleCallback((x, y) => analytics.track(x, y), 200)
```

### Lifecycle

#### [`useMount`](./docs/lifecycle/useMount.md)

Runs a callback on component mount.

```tsx
useMount(() => analytics.pageView())
```

#### [`useUnmount`](./docs/lifecycle/useUnmount.md)

Runs a callback on component unmount.

```tsx
useUnmount(() => clearInterval(timer))
```

#### [`useUpdateEffect`](./docs/lifecycle/useUpdateEffect.md)

A useEffect that skips the first render.

```tsx
useUpdateEffect(() => {
  fetchResults(query)
}, [query])
```

#### [`useIsMounted`](./docs/lifecycle/useIsMounted.md)

Checks component mount status.

```tsx
const isMounted = useIsMounted()
if (isMounted()) setData(result)
```

#### [`useIsomorphicLayoutEffect`](./docs/lifecycle/useIsomorphicLayoutEffect.md)

SSR-safe useLayoutEffect.

```tsx
useIsomorphicLayoutEffect(() => {
  // useLayoutEffect on browser, useEffect on server
}, [])
```

#### [`useDeepCompareEffect`](./docs/lifecycle/useDeepCompareEffect.md)

A useEffect with deep comparison of dependencies.

```tsx
useDeepCompareEffect(() => {
  fetchUsers(filters)
}, [filters])
```

### UI

#### [`useScrollLock`](./docs/ui/useScrollLock.md)

Locks body scroll.

```tsx
useScrollLock(isModalOpen)
```

#### [`useDarkMode`](./docs/ui/useDarkMode.md)

Manages dark mode with system preference support.

```tsx
const { isDark, theme, setTheme, toggle } = useDarkMode('system')
```

#### [`useFullscreen`](./docs/ui/useFullscreen.md)

Wraps the Fullscreen API.

```tsx
const { ref, isFullscreen, toggle } = useFullscreen()
```

#### [`useCopyToClipboard`](./docs/ui/useCopyToClipboard.md)

Copies text to the clipboard.

```tsx
const { copiedText, copy } = useCopyToClipboard()
await copy('Hello!')
```

#### [`useHotkeys`](./docs/ui/useHotkeys.md)

Binds keyboard shortcuts.

```tsx
useHotkeys('ctrl+s', () => save())
useHotkeys('cmd+k', () => openPalette())
```

### Data

#### [`useAsync`](./docs/data/useAsync.md)

Wraps an async function with loading/error states.

```tsx
const { data, loading, error, execute } = useAsync(() => fetchUser(id))
```

#### [`useFetch`](./docs/data/useFetch.md)

Fetch wrapper with abort support.

```tsx
const { data, loading, error, refetch } = useFetch<Post[]>('/api/posts')
```

#### [`useInfiniteScroll`](./docs/data/useInfiniteScroll.md)

IntersectionObserver-based infinite scroll.

```tsx
const { sentinelRef, loading } = useInfiniteScroll(loadMore, hasMore)
```

#### [`usePagination`](./docs/data/usePagination.md)

Manages pagination logic.

```tsx
const { page, totalPages, next, prev, hasNext } = usePagination({
  totalItems: 100,
  pageSize: 20,
})
```

### Next.js (`reactives-hooks/next`)

#### [`useQueryParams`](./docs/next/useQueryParams.md)

Manages type-safe URL query parameters.

```tsx
const { params, set, delete: remove } = useQueryParams<{ q: string; sort: string }>()
set('q', 'react')
```

#### [`useRouteChange`](./docs/next/useRouteChange.md)

Detects route changes.

```tsx
useRouteChange({ onComplete: (url) => analytics.pageView(url) })
```

#### [`useSafeAction`](./docs/next/useSafeAction.md)

Safely executes Server Actions.

```tsx
const { execute, data, loading, error } = useSafeAction(createPost)
```

#### [`useIsServer`](./docs/next/useIsServer.md)

Detects server/client rendering environment.

```tsx
const isServer = useIsServer() // true on server, false on client
```

### Utils (`reactives-hooks/utils`)

#### [`cn`](./docs/utils/cn.md)

Conditionally merges Tailwind CSS classes.

```tsx
cn('px-2 py-1', isActive && 'bg-blue-500', className)
```

#### [`formatDate`](./docs/utils/formatDate.md)

Formats a date with locale support.

```tsx
formatDate(new Date(), { year: 'numeric', month: 'long', day: 'numeric' }, 'ko-KR')
```

#### [`sleep`](./docs/utils/sleep.md)

Promise-based delay function.

```tsx
await sleep(1000) // Wait 1 second
```

## License

MIT
