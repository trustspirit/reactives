# usePagination

페이지네이션 로직을 관리합니다.

## API

```ts
function usePagination(options: UsePaginationOptions): UsePaginationReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| options.totalItems | `number` | - | 전체 항목 수 |
| options.pageSize | `number` | `10` | 페이지당 항목 수 |
| options.initialPage | `number` | `1` | 초기 페이지 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| page | `number` | 현재 페이지 |
| pageSize | `number` | 페이지당 항목 수 |
| totalPages | `number` | 전체 페이지 수 |
| hasNext | `boolean` | 다음 페이지 존재 여부 |
| hasPrev | `boolean` | 이전 페이지 존재 여부 |
| next | `() => void` | 다음 페이지로 이동 |
| prev | `() => void` | 이전 페이지로 이동 |
| setPage | `(page: number) => void` | 특정 페이지로 이동 |
| setPageSize | `(size: number) => void` | 페이지 크기 변경 (1페이지로 리셋) |
| startIndex | `number` | 현재 페이지 시작 인덱스 |
| endIndex | `number` | 현재 페이지 끝 인덱스 |

## Usage

```tsx
import { usePagination } from 'reactives-hooks'

function PaginatedList({ items }: { items: Item[] }) {
  const {
    page, totalPages, hasNext, hasPrev,
    next, prev, setPage, startIndex, endIndex,
  } = usePagination({ totalItems: items.length, pageSize: 20 })

  const currentItems = items.slice(startIndex, endIndex)

  return (
    <div>
      <ul>
        {currentItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <div>
        <button onClick={prev} disabled={!hasPrev}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button onClick={next} disabled={!hasNext}>Next</button>
      </div>
    </div>
  )
}
```

## Notes

- 페이지는 유효 범위(1 ~ totalPages) 내로 자동 클램핑됩니다.
- `setPageSize` 호출 시 1페이지로 자동 리셋됩니다.
- 데이터 fetch 없이 순수한 페이지네이션 로직만 제공합니다.
