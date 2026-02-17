# useHotkeys

키보드 단축키를 바인딩합니다.

## API

```ts
function useHotkeys(
  keyCombo: string,
  callback: (event: KeyboardEvent) => void,
  enabled?: boolean
): void
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| keyCombo | `string` | - | 키 조합 (예: `'ctrl+s'`, `'cmd+k'`, `'shift+enter'`) |
| callback | `(event: KeyboardEvent) => void` | - | 단축키 매칭 시 실행할 콜백 |
| enabled | `boolean` | `true` | 활성화 여부 |

### Returns

`void`

## Usage

```tsx
import { useHotkeys } from 'reactives-hooks'

function Editor() {
  const [saved, setSaved] = useState(false)

  useHotkeys('ctrl+s', (e) => {
    save()
    setSaved(true)
  })

  useHotkeys('cmd+k', () => {
    openCommandPalette()
  })

  useHotkeys('escape', () => {
    closeModal()
  }, isModalOpen)

  return <div>Press Ctrl+S to save</div>
}
```

## Notes

- 키 이름은 대소문자를 구분하지 않습니다.
- 지원하는 수식 키: `ctrl`, `control`, `shift`, `alt`, `meta`, `cmd`
- 매칭 시 `event.preventDefault()`가 자동으로 호출됩니다.
