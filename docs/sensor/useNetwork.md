# useNetwork

Tracks network status and connection information.

## API

```ts
function useNetwork(): NetworkState
```

### Parameters

None

### Returns

| Name | Type | Description |
|------|------|-------------|
| online | `boolean` | Whether the browser is online |
| downlink | `number \| undefined` | Estimated download speed (Mbps) |
| effectiveType | `string \| undefined` | Connection type (`'4g'`, `'3g'`, `'2g'`, `'slow-2g'`) |
| rtt | `number \| undefined` | Round-trip time (ms) |
| saveData | `boolean \| undefined` | Whether data saver mode is enabled |

## Usage

```tsx
import { useNetwork } from 'reactives-hooks'

function NetworkStatus() {
  const { online, effectiveType, downlink } = useNetwork()

  if (!online) return <div className="offline-banner">You are offline</div>

  return (
    <div>
      <p>Connection: {effectiveType}</p>
      <p>Speed: {downlink} Mbps</p>
    </div>
  )
}
```

## Notes

- Returns `{ online: true }` in SSR environments.
- `downlink`, `effectiveType`, `rtt`, and `saveData` are only available in browsers that support the Network Information API.
