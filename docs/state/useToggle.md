# useToggle

Boolean 값을 토글합니다.

## API

```ts
function useToggle(initialValue?: boolean): [boolean, (value?: boolean) => void]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `boolean` | `false` | 초기 토글 상태 |

### Returns

`[value, toggle]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| value | `boolean` | 현재 상태 |
| toggle | `(value?: boolean) => void` | 인자 없이 호출하면 토글, boolean을 전달하면 해당 값으로 설정 |

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
