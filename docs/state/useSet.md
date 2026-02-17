# useSet

Set 자료구조의 상태를 관리합니다.

## API

```ts
function useSet<T>(
  initialValue?: Iterable<T>
): [Set<T>, UseSetActions<T>]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `Iterable<T>` | `[]` | 초기 Set 요소 |

### Returns

`[set, actions]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| set | `Set<T>` | 현재 Set 상태 |
| actions.add | `(value: T) => void` | 요소 추가 |
| actions.delete | `(value: T) => void` | 요소 삭제 |
| actions.clear | `() => void` | 모든 요소 삭제 |
| actions.reset | `() => void` | 초기값으로 리셋 |
| actions.toggle | `(value: T) => void` | 요소가 있으면 삭제, 없으면 추가 |

## Usage

```tsx
import { useSet } from 'reactives-hooks'

function TagSelector() {
  const [selectedTags, { toggle, clear }] = useSet<string>(['react'])

  const tags = ['react', 'typescript', 'nextjs', 'tailwind']

  return (
    <div>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          style={{ fontWeight: selectedTags.has(tag) ? 'bold' : 'normal' }}
        >
          {tag}
        </button>
      ))}
      <button onClick={clear}>Clear All</button>
    </div>
  )
}
```
