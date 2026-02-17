# useFetch

abort 지원이 포함된 fetch 래퍼입니다.

## API

```ts
function useFetch<T>(
  url: string,
  options?: UseFetchOptions
): UseFetchReturn<T>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| url | `string` | - | 요청 URL |
| options.enabled | `boolean` | `true` | fetch 활성화 여부 |
| options.method | `string` | - | HTTP 메서드 |
| options.headers | `HeadersInit` | - | 요청 헤더 |
| options.body | `BodyInit` | - | 요청 본문 |

`options`는 `RequestInit`의 모든 속성을 지원합니다.

### Returns

| Name | Type | Description |
|------|------|-------------|
| data | `T \| null` | 응답 데이터 |
| loading | `boolean` | 로딩 상태 |
| error | `Error \| null` | 에러 객체 |
| refetch | `() => Promise<void>` | 재요청 함수 |

## Usage

```tsx
import { useFetch } from 'reactives-hooks'

function PostList() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>('/api/posts')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {posts?.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}
```

## Notes

- 컴포넌트 언마운트 시 `AbortController`로 자동으로 요청을 취소합니다.
- `enabled`를 `false`로 설정하면 fetch를 비활성화할 수 있습니다.
- HTTP 에러 응답(non-ok status)도 에러로 처리합니다.
