# useFullscreen

Wraps the Fullscreen API.

## API

```ts
function useFullscreen(): UseFullscreenReturn
```

### Parameters

None

### Returns

| Name | Type | Description |
|------|------|-------------|
| ref | `RefObject<HTMLElement \| null>` | Ref to attach to the element to display in fullscreen |
| isFullscreen | `boolean` | Whether fullscreen is currently active |
| enter | `() => Promise<void>` | Enter fullscreen |
| exit | `() => Promise<void>` | Exit fullscreen |
| toggle | `() => Promise<void>` | Toggle fullscreen |

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
