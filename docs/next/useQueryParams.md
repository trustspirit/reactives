# useQueryParams

Manages type-safe URL query parameters.

## API

```ts
function useQueryParams<T extends Record<string, string>>(): {
  params: Partial<T>
  set: (key: keyof T, value: string) => void
  setAll: (params: Partial<T>) => void
  delete: (key: keyof T) => void
  clear: () => void
}
```

### Parameters

None (uses Next.js navigation hooks internally)

### Returns

| Name | Type | Description |
|------|------|-------------|
| params | `Partial<T>` | Current query parameters |
| set | `(key: keyof T, value: string) => void` | Set a single parameter |
| setAll | `(params: Partial<T>) => void` | Set multiple parameters at once |
| delete | `(key: keyof T) => void` | Delete a parameter |
| clear | `() => void` | Clear all parameters |

## Usage

```tsx
import { useQueryParams } from 'reactives-hooks/next'

type SearchParams = {
  q: string
  page: string
  sort: string
}

function SearchPage() {
  const { params, set, setAll, delete: remove } = useQueryParams<SearchParams>()

  return (
    <div>
      <input
        value={params.q ?? ''}
        onChange={e => set('q', e.target.value)}
        placeholder="Search..."
      />
      <select onChange={e => set('sort', e.target.value)} value={params.sort ?? 'recent'}>
        <option value="recent">Recent</option>
        <option value="popular">Popular</option>
      </select>
      <button onClick={() => remove('q')}>Clear Search</button>
    </div>
  )
}
```

## Notes

- Can only be used in `'use client'` components.
- Updates the URL without a page reload.
- Uses Next.js `useSearchParams`, `useRouter`, and `usePathname` internally.
