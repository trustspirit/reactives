# useDarkMode

Manages dark mode with system preference support.

## API

```ts
function useDarkMode(defaultTheme?: Theme): UseDarkModeReturn
```

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| defaultTheme | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme |

### Returns

| Name | Type | Description |
|------|------|-------------|
| isDark | `boolean` | Whether dark mode is currently active |
| theme | `Theme` | Current theme setting (`'light'`, `'dark'`, `'system'`) |
| setTheme | `(theme: Theme) => void` | Change the theme |
| toggle | `() => void` | Toggle between light and dark |

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

- Persists the theme to localStorage so it is retained after a page refresh.
- In `'system'` mode, follows the OS `prefers-color-scheme` setting.
- Adds/removes the `'dark'` class on `document.documentElement`.
- Returns `defaultTheme` in SSR environments.
