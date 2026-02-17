# useDarkMode

시스템 환경설정을 지원하는 다크 모드를 관리합니다.

## API

```ts
function useDarkMode(defaultTheme?: Theme): UseDarkModeReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| defaultTheme | `'light' \| 'dark' \| 'system'` | `'system'` | 초기 테마 |

### Returns

| Name | Type | Description |
|------|------|-------------|
| isDark | `boolean` | 현재 다크 모드 여부 |
| theme | `Theme` | 현재 테마 설정 (`'light'`, `'dark'`, `'system'`) |
| setTheme | `(theme: Theme) => void` | 테마 변경 |
| toggle | `() => void` | light ↔ dark 토글 |

## Usage

```tsx
import { useDarkMode } from 'reactives-hooks'

function ThemeToggle() {
  const { isDark, theme, setTheme, toggle } = useDarkMode('system')

  return (
    <div>
      <p>Current: {theme} (isDark: {isDark ? 'Yes' : 'No'})</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}
```

## Notes

- localStorage에 테마를 저장하여 새로고침 후에도 유지됩니다.
- `'system'` 모드에서는 OS의 `prefers-color-scheme`을 따릅니다.
- `document.documentElement`에 `'dark'` 클래스를 추가/제거합니다.
- SSR 환경에서는 `defaultTheme`을 반환합니다.
