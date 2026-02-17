# useSet

Manages the state of a Set data structure.

## API

```ts
function useSet<T>(
  initialValue?: Iterable<T>
): [Set<T>, UseSetActions<T>]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `Iterable<T>` | `[]` | Initial Set elements |

### Returns

Returns a `[set, actions]` tuple.

| Name | Type | Description |
|------|------|-------------|
| set | `Set<T>` | Current Set state |
| actions.add | `(value: T) => void` | Add an element |
| actions.delete | `(value: T) => void` | Delete an element |
| actions.clear | `() => void` | Delete all elements |
| actions.reset | `() => void` | Reset to the initial value |
| actions.toggle | `(value: T) => void` | Remove the element if it exists; add it if it does not |

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
