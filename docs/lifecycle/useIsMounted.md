# useIsMounted

컴포넌트의 마운트 상태를 확인합니다.

## API

```ts
function useIsMounted(): () => boolean
```

### Parameters

없음

### Returns

| Type | Description |
|------|-------------|
| `() => boolean` | 현재 마운트 상태를 반환하는 함수 |

## Usage

```tsx
import { useIsMounted } from 'reactives-hooks'

function AsyncComponent() {
  const [data, setData] = useState(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    fetchData().then(result => {
      if (isMounted()) {
        setData(result)
      }
    })
  }, [])

  return <div>{data ?? 'Loading...'}</div>
}
```

## Notes

- 비동기 작업 완료 후 언마운트된 컴포넌트에 상태 업데이트를 방지합니다.
- 안정적인 참조를 위해 함수를 반환합니다.
