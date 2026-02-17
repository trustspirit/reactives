# useInfiniteScroll

IntersectionObserver 기반의 무한 스크롤을 구현합니다.

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
| loadMore | `() => Promise<void>` | - | 추가 데이터를 로드하는 비동기 함수 |
| hasMore | `boolean` | - | 더 로드할 데이터가 있는지 여부 |
| options.threshold | `number` | `0` | 교차 임계값 |
| options.rootMargin | `string` | `'100px'` | 트리거 거리 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| sentinelRef | `RefObject<HTMLElement \| null>` | 하단 감시 요소에 연결할 ref |
| loading | `boolean` | 로딩 상태 |
| reset | `() => void` | 로딩 상태 초기화 |

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

- `sentinelRef`를 리스트 하단의 빈 요소에 연결하세요.
- 중복 로드를 방지하는 내부 loading guard가 있습니다.
- `rootMargin`으로 트리거 거리를 조절할 수 있습니다 (기본: 100px 전에 미리 로드).
