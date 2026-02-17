# useDeepCompareEffect

A useEffect that performs deep comparison on dependencies.

## API

```ts
function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| effect | `EffectCallback` | - | The effect function to execute |
| deps | `DependencyList` | - | Dependency array to deeply compare |

### Returns

`void`

## Usage

```tsx
import { useDeepCompareEffect } from 'reactives-hooks'

function UserProfile({ filters }: { filters: { role: string; active: boolean } }) {
  const [users, setUsers] = useState([])

  // Even if the filters object is recreated on every render, the effect won't re-run if the values are the same
  useDeepCompareEffect(() => {
    fetchUsers(filters).then(setUsers)
  }, [filters])

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

## Notes

- Prevents unnecessary effect re-executions when dependencies include objects or arrays.
- Recursively compares arrays and plain objects.
