# sleep

A Promise-based delay function.

## API

```ts
function sleep(ms: number): Promise<void>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ms | `number` | - | Wait time (in milliseconds) |

### Returns

| Type | Description |
|------|-------------|
| `Promise<void>` | A Promise that resolves after the specified time |

## Usage

```tsx
import { sleep } from 'reactives-hooks/utils'

// Delay in an async function
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url)
    } catch (e) {
      if (i < retries - 1) await sleep(1000 * (i + 1))
    }
  }
}

// Usage in tests
async function testLoading() {
  render(<LoadingComponent />)
  await sleep(500)
  expect(screen.getByText('Loaded')).toBeInTheDocument()
}
```

## Notes

- Useful for tests, demos, retry logic, and more.
