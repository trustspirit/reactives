# useIntersectionObserver

Detects viewport intersection of an element.

## API

```ts
function useIntersectionObserver(
  options?: UseIntersectionObserverOptions
): UseIntersectionObserverReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| options.threshold | `number \| number[]` | `0` | Intersection ratio threshold |
| options.root | `Element \| null` | `null` | Root element |
| options.rootMargin | `string` | `'0px'` | Root margin |
| options.freezeOnceVisible | `boolean` | `false` | Stop observing after first intersection |

### Returns

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<HTMLElement \| null>` | A ref to attach to the element to observe |
| isIntersecting | `boolean` | Current intersection state |
| entry | `IntersectionObserverEntry \| null` | Full intersection information |

## Usage

```tsx
import { useIntersectionObserver } from 'reactives-hooks'

function LazyImage({ src }: { src: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref}>
      {isIntersecting ? <img src={src} alt="" /> : <div className="placeholder" />}
    </div>
  )
}
```

## Notes

- `freezeOnceVisible` is useful for lazy loading -- once visible, the element is no longer observed.
