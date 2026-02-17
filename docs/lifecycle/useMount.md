# useMount

Executes a callback when the component mounts.

## API

```ts
function useMount(callback: () => void): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| callback | `() => void` | - | The function to execute on mount |

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
