# cn

Tailwind CSS 클래스를 조건부로 병합합니다.

## API

```ts
function cn(...inputs: ClassValue[]): string
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ...inputs | `ClassValue[]` | - | 클래스 값 (문자열, 객체, 배열 등) |

### Returns

| Type | Description |
|------|-------------|
| `string` | 병합된 클래스 문자열 |

## Usage

```tsx
import { cn } from 'reactives-hooks/utils'

function Button({ variant, className }: { variant: 'primary' | 'secondary'; className?: string }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800',
        className,
      )}
    >
      Click me
    </button>
  )
}

// Tailwind 충돌 자동 해결
cn('px-2 py-1', 'px-4') // → 'py-1 px-4'
cn('text-red-500', 'text-blue-500') // → 'text-blue-500'
```

## Notes

- 내부적으로 `clsx` + `tailwind-merge`를 사용합니다.
- Tailwind CSS 클래스 충돌을 자동으로 해결합니다 (뒤에 오는 값 우선).
- 조건부 클래스, 배열, 객체 구문을 모두 지원합니다.
