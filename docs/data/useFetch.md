# useFetch

A fetch wrapper with abort support.

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
| url | `string` | - | Request URL |
| options.enabled | `boolean` | `true` | Whether fetch is enabled |
| options.method | `string` | - | HTTP method |
| options.headers | `HeadersInit` | - | Request headers |
| options.body | `BodyInit` | - | Request body |

`options` supports all properties of `RequestInit`.

### Returns

| Name | Type | Description |
|------|------|-------------|
| data | `T \| null` | Response data |
| loading | `boolean` | Loading state |
| error | `Error \| null` | Error object |
| refetch | `() => Promise<void>` | Refetch function |

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

- Automatically cancels the request with `AbortController` when the component unmounts.
- Set `enabled` to `false` to disable the fetch.
- HTTP error responses (non-ok status) are also treated as errors.
