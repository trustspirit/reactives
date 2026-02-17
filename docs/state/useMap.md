# useMap

Map 자료구조의 상태를 관리합니다.

## API

```ts
function useMap<K, V>(
  initialValue?: Iterable<[K, V]>
): [Map<K, V>, UseMapActions<K, V>]
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| initialValue | `Iterable<[K, V]>` | `[]` | 초기 Map 엔트리 |

### Returns

`[map, actions]` 튜플을 반환합니다.

| Name | Type | Description |
|------|------|-------------|
| map | `Map<K, V>` | 현재 Map 상태 |
| actions.set | `(key: K, value: V) => void` | 엔트리 추가/수정 |
| actions.setAll | `(entries: Iterable<[K, V]>) => void` | 여러 엔트리 일괄 설정 |
| actions.delete | `(key: K) => void` | 엔트리 삭제 |
| actions.clear | `() => void` | 모든 엔트리 삭제 |
| actions.reset | `() => void` | 초기값으로 리셋 |

## Usage

```tsx
import { useMap } from 'reactives-hooks'

function UserSettings() {
  const [settings, { set, delete: remove, clear }] = useMap<string, string>([
    ['theme', 'dark'],
    ['lang', 'ko'],
  ])

  return (
    <div>
      <p>Theme: {settings.get('theme')}</p>
      <button onClick={() => set('theme', 'light')}>Light Mode</button>
      <button onClick={() => remove('theme')}>Remove Theme</button>
      <button onClick={clear}>Clear All</button>
    </div>
  )
}
```
