# useQueryParams

타입 안전한 URL 쿼리 파라미터를 관리합니다.

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

없음 (Next.js navigation 훅을 내부적으로 사용)

### Returns

| Name | Type | Description |
|------|------|-------------|
| params | `Partial<T>` | 현재 쿼리 파라미터 |
| set | `(key: keyof T, value: string) => void` | 단일 파라미터 설정 |
| setAll | `(params: Partial<T>) => void` | 여러 파라미터 일괄 설정 |
| delete | `(key: keyof T) => void` | 파라미터 삭제 |
| clear | `() => void` | 모든 파라미터 초기화 |

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

- `'use client'` 컴포넌트에서만 사용 가능합니다.
- 페이지 새로고침 없이 URL을 업데이트합니다.
- Next.js의 `useSearchParams`, `useRouter`, `usePathname`을 내부적으로 사용합니다.
