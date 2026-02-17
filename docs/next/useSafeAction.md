# useSafeAction

Safely executes a Server Action.

## API

```ts
function useSafeAction<TInput, TOutput>(
  action: (input: TInput) => Promise<TOutput>
): UseSafeActionReturn<TInput, TOutput>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| action | `(input: TInput) => Promise<TOutput>` | - | The Server Action to execute |

### Returns

| Name | Type | Description |
|------|------|-------------|
| execute | `(input: TInput) => void` | Function to execute the action |
| data | `TOutput \| null` | Execution result |
| error | `Error \| null` | Error object |
| loading | `boolean` | Whether the action is executing |
| reset | `() => void` | Reset state |

## Usage

```tsx
import { useSafeAction } from 'reactives-hooks/next'
import { createPost } from '@/actions/post'

function CreatePostForm() {
  const { execute, data, error, loading } = useSafeAction(createPost)

  const handleSubmit = (formData: FormData) => {
    execute({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    })
  }

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p className="error">{error.message}</p>}
      {data && <p className="success">Post created!</p>}
    </form>
  )
}
```

## Notes

- Can only be used in `'use client'` components.
- Uses `useTransition` internally to prevent UI blocking.
- Provides type-safe input/output.
