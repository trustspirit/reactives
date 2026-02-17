# useMount

컴포넌트 마운트 시 콜백을 실행합니다.

## API

```ts
function useMount(callback: () => void): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `() => void` | - | 마운트 시 실행할 함수 |

### Returns

`void`

## Usage

```tsx
import { useMount } from 'reactives-hooks'

function Component() {
  useMount(() => {
    console.log('Component mounted!')
    analytics.pageView()
  })

  return <div>Hello</div>
}
```
