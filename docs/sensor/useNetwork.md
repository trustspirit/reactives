# useNetwork

네트워크 상태와 연결 정보를 추적합니다.

## API

```ts
function useNetwork(): NetworkState
```

### Parameters

없음

### Returns

| Name | Type | Description |
|------|------|-------------|
| online | `boolean` | 온라인 여부 |
| downlink | `number \| undefined` | 예상 다운로드 속도 (Mbps) |
| effectiveType | `string \| undefined` | 연결 유형 (`'4g'`, `'3g'`, `'2g'`, `'slow-2g'`) |
| rtt | `number \| undefined` | 왕복 시간 (ms) |
| saveData | `boolean \| undefined` | 데이터 절약 모드 활성화 여부 |

## Usage

```tsx
import { useNetwork } from 'reactives-hooks'

function NetworkStatus() {
  const { online, effectiveType, downlink } = useNetwork()

  if (!online) return <div className="offline-banner">오프라인 상태입니다</div>

  return (
    <div>
      <p>연결: {effectiveType}</p>
      <p>속도: {downlink} Mbps</p>
    </div>
  )
}
```

## Notes

- SSR 환경에서는 `{ online: true }`를 반환합니다.
- `downlink`, `effectiveType`, `rtt`, `saveData`는 Network Information API를 지원하는 브라우저에서만 사용 가능합니다.
