# useIsomorphicLayoutEffect

A useLayoutEffect that is safe for SSR.

## API

```ts
const useIsomorphicLayoutEffect: typeof useLayoutEffect | typeof useEffect
```

### Parameters

Same as `useLayoutEffect` / `useEffect`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| effect | `EffectCallback` | - | The effect function to execute |
| deps | `DependencyList` | - | Dependency array |

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

- Uses `useLayoutEffect` in the browser and `useEffect` on the server.
- Prevents the "useLayoutEffect does nothing on the server" warning during SSR.
