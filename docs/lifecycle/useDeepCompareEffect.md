# useDeepCompareEffect

의존성을 깊은 비교(deep comparison)하는 useEffect입니다.

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
| effect | `EffectCallback` | - | 실행할 이펙트 함수 |
| deps | `DependencyList` | - | 깊은 비교할 의존성 배열 |

### Returns

`void`

## Usage

```tsx
import { useDeepCompareEffect } from 'reactives-hooks'

function UserProfile({ filters }: { filters: { role: string; active: boolean } }) {
  const [users, setUsers] = useState([])

  // filters 객체가 매 렌더마다 새로 생성되어도, 값이 같으면 재실행되지 않음
  useDeepCompareEffect(() => {
    fetchUsers(filters).then(setUsers)
  }, [filters])

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

## Notes

- 의존성에 객체나 배열이 포함될 때 불필요한 이펙트 재실행을 방지합니다.
- 재귀적으로 배열과 plain object를 비교합니다.
