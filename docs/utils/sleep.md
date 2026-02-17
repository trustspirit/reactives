# sleep

Promise 기반의 지연 함수입니다.

## API

```ts
function sleep(ms: number): Promise<void>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ms | `number` | - | 대기 시간 (밀리초) |

### Returns

| Type | Description |
|------|-------------|
| `Promise<void>` | 지정 시간 후 resolve되는 Promise |

## Usage

```tsx
import { sleep } from 'reactives-hooks/utils'

// 비동기 함수에서 지연
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url)
    } catch (e) {
      if (i < retries - 1) await sleep(1000 * (i + 1))
    }
  }
}

// 테스트에서 사용
async function testLoading() {
  render(<LoadingComponent />)
  await sleep(500)
  expect(screen.getByText('Loaded')).toBeInTheDocument()
}
```

## Notes

- 테스트, 데모, 재시도 로직 등에 유용합니다.
