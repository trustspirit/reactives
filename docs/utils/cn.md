# cn

Conditionally merges Tailwind CSS classes.

## API

```ts
function cn(...inputs: ClassValue[]): string
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ...inputs | `ClassValue[]` | - | Class values (strings, objects, arrays, etc.) |

### Returns

| Type | Description |
|------|-------------|
| `string` | Merged class string |

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

// Automatic Tailwind conflict resolution
cn('px-2 py-1', 'px-4') // → 'py-1 px-4'
cn('text-red-500', 'text-blue-500') // → 'text-blue-500'
```

## Notes

- Uses `clsx` + `tailwind-merge` internally.
- Automatically resolves Tailwind CSS class conflicts (later values take precedence).
- Supports conditional classes, arrays, and object syntax.
