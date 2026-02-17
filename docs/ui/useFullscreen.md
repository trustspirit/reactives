# useFullscreen

Fullscreen API를 래핑합니다.

## API

```ts
function useFullscreen(): UseFullscreenReturn
```

### Parameters

없음

### Returns

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<HTMLElement \| null>` | 전체 화면으로 표시할 요소에 연결할 ref |
| isFullscreen | `boolean` | 현재 전체 화면 여부 |
| enter | `() => Promise<void>` | 전체 화면 진입 |
| exit | `() => Promise<void>` | 전체 화면 종료 |
| toggle | `() => Promise<void>` | 전체 화면 토글 |

## Usage

```tsx
import { useFullscreen } from 'reactives-hooks'

function VideoPlayer() {
  const { ref, isFullscreen, toggle } = useFullscreen()

  return (
    <div ref={ref}>
      <video src="/video.mp4" controls />
      <button onClick={toggle}>
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
    </div>
  )
}
```
