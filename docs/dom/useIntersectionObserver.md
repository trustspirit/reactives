# useIntersectionObserver

요소의 뷰포트 교차를 감지합니다.

## API

```ts
function useIntersectionObserver(
  options?: UseIntersectionObserverOptions
): UseIntersectionObserverReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| options.threshold | `number \| number[]` | `0` | 교차 비율 임계값 |
| options.root | `Element \| null` | `null` | 루트 요소 |
| options.rootMargin | `string` | `'0px'` | 루트 마진 |
| options.freezeOnceVisible | `boolean` | `false` | 최초 교차 후 관찰 중단 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<HTMLElement \| null>` | 관찰할 요소에 연결할 ref |
| isIntersecting | `boolean` | 현재 교차 상태 |
| entry | `IntersectionObserverEntry \| null` | 전체 교차 정보 |

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

- `freezeOnceVisible`은 lazy loading에 유용합니다 -- 한 번 보이면 다시 관찰하지 않습니다.
