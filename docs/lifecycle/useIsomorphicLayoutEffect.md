# useIsomorphicLayoutEffect

SSR에서 안전한 useLayoutEffect입니다.

## API

```ts
const useIsomorphicLayoutEffect: typeof useLayoutEffect | typeof useEffect
```

### Parameters

`useLayoutEffect` / `useEffect`와 동일합니다.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| effect | `EffectCallback` | - | 실행할 이펙트 함수 |
| deps | `DependencyList` | - | 의존성 배열 |

### Returns

`void`

## Usage

```tsx
import { useIsomorphicLayoutEffect } from 'reactives-hooks'

function MeasureElement() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [])

  return <div ref={ref}>Height: {height}px</div>
}
```

## Notes

- 브라우저에서는 `useLayoutEffect`, 서버에서는 `useEffect`를 사용합니다.
- SSR 시 "useLayoutEffect does nothing on the server" 경고를 방지합니다.
