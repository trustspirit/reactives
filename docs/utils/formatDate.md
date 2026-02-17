# formatDate

날짜를 로케일에 맞게 포맷합니다.

## API

```ts
function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| date | `Date \| string \| number` | - | 포맷할 날짜 (Date, ISO 문자열, 타임스탬프) |
| options | `Intl.DateTimeFormatOptions` | - | 포맷 옵션 |
| locale | `string` | `'en-US'` | 로케일 |

### Returns

| Type | Description |
|------|-------------|
| `string` | 포맷된 날짜 문자열 |

## Usage

```tsx
import { formatDate } from 'reactives-hooks/utils'

// 기본 포맷
formatDate(new Date()) // "2/18/2026"

// 커스텀 포맷
formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}) // "February 18, 2026"

// 한국어 로케일
formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}, 'ko-KR') // "2026년 2월 18일 수요일"

// ISO 문자열 입력
formatDate('2026-01-01T00:00:00Z') // "1/1/2026"

// 타임스탬프 입력
formatDate(1767225600000) // "1/1/2026"
```

## Notes

- `Intl.DateTimeFormat`을 사용하여 로케일 인식 포맷을 제공합니다.
- Date 객체, ISO 문자열, Unix 타임스탬프를 모두 입력으로 받을 수 있습니다.
