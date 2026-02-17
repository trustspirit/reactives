# useSafeAction

Server Action을 안전하게 실행합니다.

## API

```ts
function useSafeAction<TInput, TOutput>(
  action: (input: TInput) => Promise<TOutput>
): UseSafeActionReturn<TInput, TOutput>
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| action | `(input: TInput) => Promise<TOutput>` | - | 실행할 Server Action |

### Returns

| Name | Type | Description |
|------|------|-------------|
| execute | `(input: TInput) => void` | 액션 실행 함수 |
| data | `TOutput \| null` | 실행 결과 |
| error | `Error \| null` | 에러 객체 |
| loading | `boolean` | 실행 중 여부 |
| reset | `() => void` | 상태 초기화 |

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

- `'use client'` 컴포넌트에서만 사용 가능합니다.
- 내부적으로 `useTransition`을 사용하여 UI 블로킹을 방지합니다.
- 타입 안전한 입력/출력을 제공합니다.
