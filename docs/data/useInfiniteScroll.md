# useInfiniteScroll

Implements infinite scrolling based on IntersectionObserver.

## API

```ts
function useInfiniteScroll(
  loadMore: () => Promise<void>,
  hasMore: boolean,
  options?: UseInfiniteScrollOptions
): UseInfiniteScrollReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| loadMore | `() => Promise<void>` | - | Async function to load additional data |
| hasMore | `boolean` | - | Whether there is more data to load |
| options.threshold | `number` | `0` | Intersection threshold |
| options.rootMargin | `string` | `'100px'` | Trigger distance |

### Returns

| Name | Type | Description |
|------|------|-------------|
| sentinelRef | `RefObject<HTMLElement \| null>` | Ref to attach to the bottom sentinel element |
| loading | `boolean` | Loading state |
| reset | `() => void` | Reset the loading state |

## Usage

```tsx
import { useInfiniteScroll } from 'reactives-hooks'

function InfiniteList() {
  const [items, setItems] = useState<Item[]>([])
  const [hasMore, setHasMore] = useState(true)
  const page = useRef(1)

  const loadMore = async () => {
    const newItems = await fetchItems(page.current++)
    setItems(prev => [...prev, ...newItems])
    if (newItems.length === 0) setHasMore(false)
  }

  const { sentinelRef, loading } = useInfiniteScroll(loadMore, hasMore)

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div ref={sentinelRef} />
      {loading && <p>Loading more...</p>}
    </div>
  )
}
```

## Notes

- Attach `sentinelRef` to an empty element at the bottom of the list.
- Has an internal loading guard to prevent duplicate loads.
- Use `rootMargin` to adjust the trigger distance (default: preloads 100px before reaching the bottom).
