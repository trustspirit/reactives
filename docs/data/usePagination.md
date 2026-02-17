# usePagination

Manages pagination logic.

## API

```ts
function usePagination(options: UsePaginationOptions): UsePaginationReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| options.totalItems | `number` | - | Total number of items |
| options.pageSize | `number` | `10` | Number of items per page |
| options.initialPage | `number` | `1` | Initial page |

### Returns

| Name | Type | Description |
|------|------|-------------|
| page | `number` | Current page |
| pageSize | `number` | Number of items per page |
| totalPages | `number` | Total number of pages |
| hasNext | `boolean` | Whether a next page exists |
| hasPrev | `boolean` | Whether a previous page exists |
| next | `() => void` | Go to the next page |
| prev | `() => void` | Go to the previous page |
| setPage | `(page: number) => void` | Go to a specific page |
| setPageSize | `(size: number) => void` | Change the page size (resets to page 1) |
| startIndex | `number` | Start index of the current page |
| endIndex | `number` | End index of the current page |

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

- Pages are automatically clamped to the valid range (1 to totalPages).
- Calling `setPageSize` automatically resets to page 1.
- Provides pure pagination logic without data fetching.
