# useAsync

비동기 함수를 loading/error 상태와 함께 래핑합니다.

## API

```ts
function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate?: boolean
): UseAsyncReturn<T>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| asyncFunction | `() => Promise<T>` | - | 실행할 비동기 함수 |
| immediate | `boolean` | `true` | 마운트 시 즉시 실행 여부 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| data | `T \| null` | 비동기 결과 데이터 |
| loading | `boolean` | 로딩 상태 |
| error | `Error \| null` | 에러 객체 |
| execute | `() => Promise<void>` | 수동 실행 함수 |

## Usage

```tsx
import { useAsync } from 'reactives-hooks'

function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error, execute } = useAsync(
    () => fetch(`/api/users/${userId}`).then(r => r.json()),
    true
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={execute}>Refresh</button>
    </div>
  )
}
```

## Notes

- `immediate`를 `false`로 설정하면 `execute()`를 호출할 때까지 실행되지 않습니다.
