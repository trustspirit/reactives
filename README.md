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

Boolean 값을 토글합니다.

```tsx
const [isOpen, toggle] = useToggle(false)
toggle()      // true
toggle(false) // false
```

#### [`useBoolean`](./docs/state/useBoolean.md)

명시적인 boolean 제어 메서드를 제공합니다.

```tsx
const { value: isOpen, setTrue: open, setFalse: close, toggle } = useBoolean(false)
```

#### [`useCounter`](./docs/state/useCounter.md)

min/max 범위를 지원하는 숫자 카운터입니다.

```tsx
const [count, { increment, decrement, reset }] = useCounter(0, { min: 0, max: 100 })
```

#### [`useMap`](./docs/state/useMap.md)

Map 자료구조의 상태를 관리합니다.

```tsx
const [map, { set, delete: remove, clear }] = useMap<string, string>([['key', 'value']])
```

#### [`useSet`](./docs/state/useSet.md)

Set 자료구조의 상태를 관리합니다.

```tsx
const [set, { add, toggle, clear }] = useSet<string>(['react'])
```

#### [`usePrevious`](./docs/state/usePrevious.md)

이전 렌더의 값을 반환합니다.

```tsx
const prevCount = usePrevious(count) // undefined on first render
```

#### [`useStateHistory`](./docs/state/useStateHistory.md)

Undo/Redo를 지원하는 상태 관리 hook입니다.

```tsx
const { value, set, undo, redo, canUndo, canRedo } = useStateHistory('')
```

### Storage

#### [`useLocalStorage`](./docs/storage/useLocalStorage.md)

localStorage와 동기화되는 상태를 관리합니다.

```tsx
const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')
```

#### [`useSessionStorage`](./docs/storage/useSessionStorage.md)

sessionStorage와 동기화되는 상태를 관리합니다.

```tsx
const [draft, setDraft, clearDraft] = useSessionStorage('form-draft', '')
```

### DOM

#### [`useEventListener`](./docs/dom/useEventListener.md)

타입 안전한 이벤트 리스너를 등록합니다.

```tsx
useEventListener('keydown', (e) => console.log(e.key))
useEventListener('click', handler, elementRef)
```

#### [`useClickOutside`](./docs/dom/useClickOutside.md)

요소 외부 클릭을 감지합니다.

```tsx
const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))
```

#### [`useHover`](./docs/dom/useHover.md)

요소의 hover 상태를 추적합니다.

```tsx
const [hoverRef, isHovered] = useHover<HTMLDivElement>()
```

#### [`useIntersectionObserver`](./docs/dom/useIntersectionObserver.md)

요소의 뷰포트 교차를 감지합니다.

```tsx
const { ref, isIntersecting } = useIntersectionObserver({ freezeOnceVisible: true })
```

#### [`useResizeObserver`](./docs/dom/useResizeObserver.md)

요소의 크기 변화를 감지합니다.

```tsx
const [ref, { width, height }] = useResizeObserver<HTMLDivElement>()
```

#### [`useMutationObserver`](./docs/dom/useMutationObserver.md)

DOM 변경을 감지합니다.

```tsx
const ref = useMutationObserver((mutations) => { /* ... */ })
```

### Sensor

#### [`useMediaQuery`](./docs/sensor/useMediaQuery.md)

CSS 미디어 쿼리의 매칭 상태를 추적합니다.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
```

#### [`useWindowSize`](./docs/sensor/useWindowSize.md)

브라우저 창의 크기를 추적합니다.

```tsx
const { width, height } = useWindowSize()
```

#### [`useScroll`](./docs/sensor/useScroll.md)

스크롤 위치를 추적합니다.

```tsx
const { x, y } = useScroll()
```

#### [`useMouse`](./docs/sensor/useMouse.md)

마우스 커서 위치를 추적합니다.

```tsx
const { x, y } = useMouse()
```

#### [`useNetwork`](./docs/sensor/useNetwork.md)

네트워크 상태와 연결 정보를 추적합니다.

```tsx
const { online, effectiveType, downlink } = useNetwork()
```

### Performance

#### [`useDebounceValue`](./docs/performance/useDebounceValue.md)

값의 변경을 지연시킵니다 (debounce).

```tsx
const debouncedSearch = useDebounceValue(search, 300)
```

#### [`useDebounceCallback`](./docs/performance/useDebounceCallback.md)

콜백 함수의 실행을 지연시킵니다 (debounce).

```tsx
const save = useDebounceCallback((content: string) => api.save(content), 1000)
```

#### [`useThrottleValue`](./docs/performance/useThrottleValue.md)

값의 업데이트 빈도를 제한합니다 (throttle).

```tsx
const throttledY = useThrottleValue(scrollY, 100)
```

#### [`useThrottleCallback`](./docs/performance/useThrottleCallback.md)

콜백 함수의 실행 빈도를 제한합니다 (throttle).

```tsx
const track = useThrottleCallback((x, y) => analytics.track(x, y), 200)
```

### Lifecycle

#### [`useMount`](./docs/lifecycle/useMount.md)

컴포넌트 마운트 시 콜백을 실행합니다.

```tsx
useMount(() => analytics.pageView())
```

#### [`useUnmount`](./docs/lifecycle/useUnmount.md)

컴포넌트 언마운트 시 콜백을 실행합니다.

```tsx
useUnmount(() => clearInterval(timer))
```

#### [`useUpdateEffect`](./docs/lifecycle/useUpdateEffect.md)

첫 번째 렌더를 건너뛰는 useEffect입니다.

```tsx
useUpdateEffect(() => {
  fetchResults(query)
}, [query])
```

#### [`useIsMounted`](./docs/lifecycle/useIsMounted.md)

컴포넌트의 마운트 상태를 확인합니다.

```tsx
const isMounted = useIsMounted()
if (isMounted()) setData(result)
```

#### [`useIsomorphicLayoutEffect`](./docs/lifecycle/useIsomorphicLayoutEffect.md)

SSR에서 안전한 useLayoutEffect입니다.

```tsx
useIsomorphicLayoutEffect(() => {
  // useLayoutEffect on browser, useEffect on server
}, [])
```

#### [`useDeepCompareEffect`](./docs/lifecycle/useDeepCompareEffect.md)

의존성을 깊은 비교(deep comparison)하는 useEffect입니다.

```tsx
useDeepCompareEffect(() => {
  fetchUsers(filters)
}, [filters])
```

### UI

#### [`useScrollLock`](./docs/ui/useScrollLock.md)

body 스크롤을 잠급니다.

```tsx
useScrollLock(isModalOpen)
```

#### [`useDarkMode`](./docs/ui/useDarkMode.md)

시스템 환경설정을 지원하는 다크 모드를 관리합니다.

```tsx
const { isDark, theme, setTheme, toggle } = useDarkMode('system')
```

#### [`useFullscreen`](./docs/ui/useFullscreen.md)

Fullscreen API를 래핑합니다.

```tsx
const { ref, isFullscreen, toggle } = useFullscreen()
```

#### [`useCopyToClipboard`](./docs/ui/useCopyToClipboard.md)

텍스트를 클립보드에 복사합니다.

```tsx
const { copiedText, copy } = useCopyToClipboard()
await copy('Hello!')
```

#### [`useHotkeys`](./docs/ui/useHotkeys.md)

키보드 단축키를 바인딩합니다.

```tsx
useHotkeys('ctrl+s', () => save())
useHotkeys('cmd+k', () => openPalette())
```

### Data

#### [`useAsync`](./docs/data/useAsync.md)

비동기 함수를 loading/error 상태와 함께 래핑합니다.

```tsx
const { data, loading, error, execute } = useAsync(() => fetchUser(id))
```

#### [`useFetch`](./docs/data/useFetch.md)

abort 지원이 포함된 fetch 래퍼입니다.

```tsx
const { data, loading, error, refetch } = useFetch<Post[]>('/api/posts')
```

#### [`useInfiniteScroll`](./docs/data/useInfiniteScroll.md)

IntersectionObserver 기반의 무한 스크롤을 구현합니다.

```tsx
const { sentinelRef, loading } = useInfiniteScroll(loadMore, hasMore)
```

#### [`usePagination`](./docs/data/usePagination.md)

페이지네이션 로직을 관리합니다.

```tsx
const { page, totalPages, next, prev, hasNext } = usePagination({
  totalItems: 100,
  pageSize: 20,
})
```

### Next.js (`reactives-hooks/next`)

#### [`useQueryParams`](./docs/next/useQueryParams.md)

타입 안전한 URL 쿼리 파라미터를 관리합니다.

```tsx
const { params, set, delete: remove } = useQueryParams<{ q: string; sort: string }>()
set('q', 'react')
```

#### [`useRouteChange`](./docs/next/useRouteChange.md)

라우트 변경을 감지합니다.

```tsx
useRouteChange({ onComplete: (url) => analytics.pageView(url) })
```

#### [`useSafeAction`](./docs/next/useSafeAction.md)

Server Action을 안전하게 실행합니다.

```tsx
const { execute, data, loading, error } = useSafeAction(createPost)
```

#### [`useIsServer`](./docs/next/useIsServer.md)

서버/클라이언트 렌더링 환경을 감지합니다.

```tsx
const isServer = useIsServer() // true on server, false on client
```

### Utils (`reactives-hooks/utils`)

#### [`cn`](./docs/utils/cn.md)

Tailwind CSS 클래스를 조건부로 병합합니다.

```tsx
cn('px-2 py-1', isActive && 'bg-blue-500', className)
```

#### [`formatDate`](./docs/utils/formatDate.md)

날짜를 로케일에 맞게 포맷합니다.

```tsx
formatDate(new Date(), { year: 'numeric', month: 'long', day: 'numeric' }, 'ko-KR')
```

#### [`sleep`](./docs/utils/sleep.md)

Promise 기반의 지연 함수입니다.

```tsx
await sleep(1000) // Wait 1 second
```

## License

MIT
