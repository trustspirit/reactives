# formatDate

Formats a date according to the locale.

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
| date | `Date \| string \| number` | - | The date to format (Date, ISO string, or timestamp) |
| options | `Intl.DateTimeFormatOptions` | - | Format options |
| locale | `string` | `'en-US'` | Locale |

### Returns

| Type | Description |
|------|-------------|
| `string` | Formatted date string |

## Usage

```tsx
import { formatDate } from 'reactives-hooks/utils'

// Default format
formatDate(new Date()) // "2/18/2026"

// Custom format
formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}) // "February 18, 2026"

// Korean locale
formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}, 'ko-KR') // "2026년 2월 18일 수요일"

// ISO string input
formatDate('2026-01-01T00:00:00Z') // "1/1/2026"

// Timestamp input
formatDate(1767225600000) // "1/1/2026"
```

## Notes

- Uses `Intl.DateTimeFormat` to provide locale-aware formatting.
- Accepts Date objects, ISO strings, and Unix timestamps as input.
