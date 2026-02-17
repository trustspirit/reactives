# useAsync

Wraps an async function with loading/error state.

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
| asyncFunction | `() => Promise<T>` | - | The async function to execute |
| immediate | `boolean` | `true` | Whether to execute immediately on mount |

### Returns

| Name | Type | Description |
|------|------|-------------|
| data | `T \| null` | The async result data |
| loading | `boolean` | Loading state |
| error | `Error \| null` | Error object |
| execute | `() => Promise<void>` | Manual execution function |

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

- If `immediate` is set to `false`, the function will not execute until `execute()` is called.
