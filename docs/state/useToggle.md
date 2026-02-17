# useToggle

Toggles a boolean value.

## API

```ts
function useToggle(initialValue?: boolean): [boolean, (value?: boolean) => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `boolean` | `false` | Initial toggle state |

### Returns

Returns a `[value, toggle]` tuple.

| Name | Type | Description |
|------|------|-------------|
| value | `boolean` | Current state |
| toggle | `(value?: boolean) => void` | Toggles when called without arguments; sets to the given value when a boolean is passed |

## Usage

```tsx
import { useToggle } from 'reactives-hooks'

function Component() {
  const [isOpen, toggle] = useToggle(false)

  return (
    <div>
      <p>{isOpen ? 'Open' : 'Closed'}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Open</button>
      <button onClick={() => toggle(false)}>Close</button>
    </div>
  )
}
```
