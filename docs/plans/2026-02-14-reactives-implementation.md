# reactives Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** React + Next.js 환경에서 유용한 custom hooks와 utility functions 46개를 제공하는 오픈소스 npm 패키지를 만든다.

**Architecture:** Single package 구조. `src/hooks/`, `src/next/`, `src/utils/`로 분류하고, tsup으로 ESM+CJS 빌드, subpath exports로 tree-shaking 최적화. 모든 hook은 TypeScript-first, SSR-safe.

**Tech Stack:** TypeScript 5.5+, tsup (빌드), Vitest + @testing-library/react (테스트), ESLint + Prettier (린트), pnpm (패키지매니저), Changesets (버전관리)

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsup.config.ts`
- Create: `vitest.config.ts`
- Create: `eslint.config.ts`
- Create: `.prettierrc`
- Create: `.gitignore`
- Create: `tests/setup.ts`

**Step 1: Initialize project**

```bash
cd /Users/shinyoung/Workspace/reactives
pnpm init
```

**Step 2: Write package.json**

```json
{
  "name": "reactives",
  "version": "0.1.0",
  "description": "A collection of useful React hooks and utilities for React and Next.js",
  "type": "module",
  "sideEffects": false,
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./next": {
      "import": {
        "types": "./dist/next/index.d.mts",
        "default": "./dist/next/index.mjs"
      },
      "require": {
        "types": "./dist/next/index.d.cts",
        "default": "./dist/next/index.cjs"
      }
    },
    "./utils": {
      "import": {
        "types": "./dist/utils/index.d.mts",
        "default": "./dist/utils/index.mjs"
      },
      "require": {
        "types": "./dist/utils/index.d.cts",
        "default": "./dist/utils/index.cjs"
      }
    },
    "./package.json": "./package.json"
  },
  "typesVersions": {
    "*": {
      "next": ["./dist/next/index.d.ts"],
      "utils": ["./dist/utils/index.d.ts"]
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "pnpm run build",
    "clean": "rm -rf dist",
    "release": "pnpm build && changeset publish"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": { "optional": true }
  },
  "keywords": ["react", "hooks", "nextjs", "typescript", "utilities"],
  "license": "MIT",
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

**Step 3: Install dependencies**

```bash
pnpm add -D tsup typescript vitest @vitest/coverage-v8 @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event eslint @eslint/js typescript-eslint eslint-plugin-react-hooks prettier @changesets/cli @types/react @types/react-dom react react-dom
```

**Step 4: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Step 5: Write tsup.config.ts**

```typescript
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'next/index': 'src/next/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom', 'next'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.mjs' : '.cjs' }
    },
    esbuildOptions(options) {
      options.jsx = 'automatic'
    },
    target: 'es2020',
    banner: { js: '"use client";' },
  },
  {
    entry: { 'utils/index': 'src/utils/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['clsx', 'tailwind-merge'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.mjs' : '.cjs' }
    },
    target: 'es2020',
  },
])
```

**Step 6: Write vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/index.ts'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
})
```

**Step 7: Write tests/setup.ts**

```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

**Step 8: Write eslint.config.ts**

```typescript
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.*'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
)
```

**Step 9: Write .prettierrc**

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

**Step 10: Write .gitignore**

```
node_modules/
dist/
coverage/
.DS_Store
*.tsbuildinfo
```

**Step 11: Create placeholder entry files for build verification**

```typescript
// src/index.ts
export {}

// src/next/index.ts
export {}

// src/utils/index.ts
export {}
```

**Step 12: Run build to verify setup**

```bash
pnpm build
```

Expected: 빌드 성공, `dist/` 에 `index.mjs`, `index.cjs`, `next/index.mjs`, `utils/index.mjs` 생성

**Step 13: Commit**

```bash
git add -A
git commit -m "chore: project scaffolding with tsup, vitest, eslint, prettier"
```

---

## Task 2: State Hooks (7개)

**Files:**
- Create: `src/hooks/state/useToggle.ts`
- Create: `src/hooks/state/useBoolean.ts`
- Create: `src/hooks/state/useCounter.ts`
- Create: `src/hooks/state/useMap.ts`
- Create: `src/hooks/state/useSet.ts`
- Create: `src/hooks/state/usePrevious.ts`
- Create: `src/hooks/state/useStateHistory.ts`
- Create: `src/hooks/state/index.ts`
- Create: `tests/hooks/state/useToggle.test.ts`
- Create: `tests/hooks/state/useBoolean.test.ts`
- Create: `tests/hooks/state/useCounter.test.ts`
- Create: `tests/hooks/state/useMap.test.ts`
- Create: `tests/hooks/state/useSet.test.ts`
- Create: `tests/hooks/state/usePrevious.test.ts`
- Create: `tests/hooks/state/useStateHistory.test.ts`

### useToggle (full TDD example)

**Step 1: Write the failing test**

```typescript
// tests/hooks/state/useToggle.test.ts
import { renderHook, act } from '@testing-library/react'
import { useToggle } from '../../../src/hooks/state/useToggle'

describe('useToggle', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  it('should set specific value', () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current[1](true))
    expect(result.current[0]).toBe(true)
    act(() => result.current[1](true))
    expect(result.current[0]).toBe(true)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/hooks/state/useToggle.test.ts
```

Expected: FAIL - module not found

**Step 3: Write minimal implementation**

```typescript
// src/hooks/state/useToggle.ts
import { useCallback, useState } from 'react'

export function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback((newValue?: boolean) => {
    setValue((prev) => (typeof newValue === 'boolean' ? newValue : !prev))
  }, [])

  return [value, toggle]
}
```

**Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/hooks/state/useToggle.test.ts
```

Expected: PASS

### useBoolean

```typescript
// src/hooks/state/useBoolean.ts
import { useCallback, useState } from 'react'

interface UseBooleanReturn {
  value: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
  setValue: (value: boolean) => void
}

export function useBoolean(initialValue = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((prev) => !prev), [])

  return { value, setTrue, setFalse, toggle, setValue }
}
```

```typescript
// tests/hooks/state/useBoolean.test.ts
import { renderHook, act } from '@testing-library/react'
import { useBoolean } from '../../../src/hooks/state/useBoolean'

describe('useBoolean', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useBoolean())
    expect(result.current.value).toBe(false)
  })

  it('should setTrue', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.setTrue())
    expect(result.current.value).toBe(true)
  })

  it('should setFalse', () => {
    const { result } = renderHook(() => useBoolean(true))
    act(() => result.current.setFalse())
    expect(result.current.value).toBe(false)
  })

  it('should toggle', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.toggle())
    expect(result.current.value).toBe(true)
  })

  it('should setValue directly', () => {
    const { result } = renderHook(() => useBoolean(false))
    act(() => result.current.setValue(true))
    expect(result.current.value).toBe(true)
  })
})
```

### useCounter

```typescript
// src/hooks/state/useCounter.ts
import { useCallback, useState } from 'react'

interface UseCounterOptions {
  min?: number
  max?: number
}

interface UseCounterActions {
  increment: (delta?: number) => void
  decrement: (delta?: number) => void
  set: (value: number) => void
  reset: () => void
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {},
): [number, UseCounterActions] {
  const { min, max } = options
  const [count, setCount] = useState(initialValue)

  const clamp = useCallback(
    (value: number) => {
      let clamped = value
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    },
    [min, max],
  )

  const increment = useCallback((delta = 1) => setCount((prev) => clamp(prev + delta)), [clamp])
  const decrement = useCallback((delta = 1) => setCount((prev) => clamp(prev - delta)), [clamp])
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return [count, { increment, decrement, set, reset }]
}
```

```typescript
// tests/hooks/state/useCounter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../../../src/hooks/state/useCounter'

describe('useCounter', () => {
  it('should initialize with 0 by default', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current[0]).toBe(0)
  })

  it('should increment', () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current[1].increment())
    expect(result.current[0]).toBe(1)
  })

  it('should increment by delta', () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current[1].increment(5))
    expect(result.current[0]).toBe(5)
  })

  it('should decrement', () => {
    const { result } = renderHook(() => useCounter(5))
    act(() => result.current[1].decrement())
    expect(result.current[0]).toBe(4)
  })

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10))
    act(() => result.current[1].increment(5))
    act(() => result.current[1].reset())
    expect(result.current[0]).toBe(10)
  })

  it('should clamp to min', () => {
    const { result } = renderHook(() => useCounter(0, { min: 0 }))
    act(() => result.current[1].decrement())
    expect(result.current[0]).toBe(0)
  })

  it('should clamp to max', () => {
    const { result } = renderHook(() => useCounter(10, { max: 10 }))
    act(() => result.current[1].increment())
    expect(result.current[0]).toBe(10)
  })
})
```

### useMap

```typescript
// src/hooks/state/useMap.ts
import { useCallback, useState } from 'react'

interface UseMapActions<K, V> {
  set: (key: K, value: V) => void
  setAll: (entries: Iterable<[K, V]>) => void
  delete: (key: K) => void
  clear: () => void
  reset: () => void
}

export function useMap<K, V>(
  initialValue: Iterable<[K, V]> = [],
): [Map<K, V>, UseMapActions<K, V>] {
  const [map, setMap] = useState(() => new Map(initialValue))

  const actions: UseMapActions<K, V> = {
    set: useCallback((key: K, value: V) => {
      setMap((prev) => {
        const next = new Map(prev)
        next.set(key, value)
        return next
      })
    }, []),

    setAll: useCallback((entries: Iterable<[K, V]>) => {
      setMap((prev) => {
        const next = new Map(prev)
        for (const [key, value] of entries) {
          next.set(key, value)
        }
        return next
      })
    }, []),

    delete: useCallback((key: K) => {
      setMap((prev) => {
        const next = new Map(prev)
        next.delete(key)
        return next
      })
    }, []),

    clear: useCallback(() => {
      setMap(new Map())
    }, []),

    reset: useCallback(() => {
      setMap(new Map(initialValue))
    }, []),
  }

  return [map, actions]
}
```

```typescript
// tests/hooks/state/useMap.test.ts
import { renderHook, act } from '@testing-library/react'
import { useMap } from '../../../src/hooks/state/useMap'

describe('useMap', () => {
  it('should initialize empty', () => {
    const { result } = renderHook(() => useMap<string, number>())
    expect(result.current[0].size).toBe(0)
  })

  it('should initialize with entries', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]))
    expect(result.current[0].get('a')).toBe(1)
    expect(result.current[0].size).toBe(2)
  })

  it('should set a value', () => {
    const { result } = renderHook(() => useMap<string, number>())
    act(() => result.current[1].set('key', 42))
    expect(result.current[0].get('key')).toBe(42)
  })

  it('should delete a value', () => {
    const { result } = renderHook(() => useMap([['a', 1]]))
    act(() => result.current[1].delete('a'))
    expect(result.current[0].has('a')).toBe(false)
  })

  it('should clear all values', () => {
    const { result } = renderHook(() => useMap([['a', 1], ['b', 2]]))
    act(() => result.current[1].clear())
    expect(result.current[0].size).toBe(0)
  })

  it('should reset to initial values', () => {
    const initial: [string, number][] = [['a', 1]]
    const { result } = renderHook(() => useMap(initial))
    act(() => result.current[1].set('b', 2))
    act(() => result.current[1].reset())
    expect(result.current[0].size).toBe(1)
    expect(result.current[0].get('a')).toBe(1)
  })
})
```

### useSet

```typescript
// src/hooks/state/useSet.ts
import { useCallback, useState } from 'react'

interface UseSetActions<T> {
  add: (value: T) => void
  delete: (value: T) => void
  clear: () => void
  reset: () => void
  toggle: (value: T) => void
}

export function useSet<T>(initialValue: Iterable<T> = []): [Set<T>, UseSetActions<T>] {
  const [set, setSet] = useState(() => new Set(initialValue))

  const actions: UseSetActions<T> = {
    add: useCallback((value: T) => {
      setSet((prev) => new Set([...prev, value]))
    }, []),

    delete: useCallback((value: T) => {
      setSet((prev) => {
        const next = new Set(prev)
        next.delete(value)
        return next
      })
    }, []),

    clear: useCallback(() => {
      setSet(new Set())
    }, []),

    reset: useCallback(() => {
      setSet(new Set(initialValue))
    }, []),

    toggle: useCallback((value: T) => {
      setSet((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
        } else {
          next.add(value)
        }
        return next
      })
    }, []),
  }

  return [set, actions]
}
```

```typescript
// tests/hooks/state/useSet.test.ts
import { renderHook, act } from '@testing-library/react'
import { useSet } from '../../../src/hooks/state/useSet'

describe('useSet', () => {
  it('should initialize empty', () => {
    const { result } = renderHook(() => useSet<number>())
    expect(result.current[0].size).toBe(0)
  })

  it('should initialize with values', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]))
    expect(result.current[0].size).toBe(3)
  })

  it('should add a value', () => {
    const { result } = renderHook(() => useSet<number>())
    act(() => result.current[1].add(1))
    expect(result.current[0].has(1)).toBe(true)
  })

  it('should delete a value', () => {
    const { result } = renderHook(() => useSet([1, 2]))
    act(() => result.current[1].delete(1))
    expect(result.current[0].has(1)).toBe(false)
  })

  it('should toggle a value', () => {
    const { result } = renderHook(() => useSet<number>())
    act(() => result.current[1].toggle(1))
    expect(result.current[0].has(1)).toBe(true)
    act(() => result.current[1].toggle(1))
    expect(result.current[0].has(1)).toBe(false)
  })

  it('should clear', () => {
    const { result } = renderHook(() => useSet([1, 2]))
    act(() => result.current[1].clear())
    expect(result.current[0].size).toBe(0)
  })
})
```

### usePrevious

```typescript
// src/hooks/state/usePrevious.ts
import { useEffect, useRef } from 'react'

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
```

```typescript
// tests/hooks/state/usePrevious.test.ts
import { renderHook } from '@testing-library/react'
import { usePrevious } from '../../../src/hooks/state/usePrevious'

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0))
    expect(result.current).toBeUndefined()
  })

  it('should return previous value after rerender', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    })
    rerender({ value: 1 })
    expect(result.current).toBe(0)
    rerender({ value: 2 })
    expect(result.current).toBe(1)
  })
})
```

### useStateHistory

```typescript
// src/hooks/state/useStateHistory.ts
import { useCallback, useRef, useState } from 'react'

interface UseStateHistoryReturn<T> {
  value: T
  set: (value: T) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  history: T[]
}

export function useStateHistory<T>(initialValue: T): UseStateHistoryReturn<T> {
  const [value, setValue] = useState(initialValue)
  const historyRef = useRef<T[]>([initialValue])
  const pointerRef = useRef(0)

  const set = useCallback((newValue: T) => {
    const pointer = pointerRef.current
    const newHistory = historyRef.current.slice(0, pointer + 1)
    newHistory.push(newValue)
    historyRef.current = newHistory
    pointerRef.current = newHistory.length - 1
    setValue(newValue)
  }, [])

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current -= 1
      setValue(historyRef.current[pointerRef.current]!)
    }
  }, [])

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current += 1
      setValue(historyRef.current[pointerRef.current]!)
    }
  }, [])

  return {
    value,
    set,
    undo,
    redo,
    canUndo: pointerRef.current > 0,
    canRedo: pointerRef.current < historyRef.current.length - 1,
    history: historyRef.current,
  }
}
```

```typescript
// tests/hooks/state/useStateHistory.test.ts
import { renderHook, act } from '@testing-library/react'
import { useStateHistory } from '../../../src/hooks/state/useStateHistory'

describe('useStateHistory', () => {
  it('should initialize with value', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('should set new values and track history', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.set('c'))
    expect(result.current.value).toBe('c')
    expect(result.current.history).toEqual(['a', 'b', 'c'])
  })

  it('should undo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.undo())
    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(true)
  })

  it('should redo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.undo())
    act(() => result.current.redo())
    expect(result.current.value).toBe('b')
  })

  it('should discard future on new set after undo', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => result.current.set('b'))
    act(() => result.current.set('c'))
    act(() => result.current.undo())
    act(() => result.current.set('d'))
    expect(result.current.history).toEqual(['a', 'b', 'd'])
    expect(result.current.canRedo).toBe(false)
  })
})
```

### Barrel export

```typescript
// src/hooks/state/index.ts
export { useToggle } from './useToggle'
export { useBoolean } from './useBoolean'
export { useCounter } from './useCounter'
export { useMap } from './useMap'
export { useSet } from './useSet'
export { usePrevious } from './usePrevious'
export { useStateHistory } from './useStateHistory'
```

**Step: Run all state tests**

```bash
pnpm vitest run tests/hooks/state/
```

Expected: 모든 테스트 PASS

**Step: Commit**

```bash
git add src/hooks/state/ tests/hooks/state/
git commit -m "feat: add state hooks (useToggle, useBoolean, useCounter, useMap, useSet, usePrevious, useStateHistory)"
```

---

## Task 3: Storage Hooks (2개)

**Files:**
- Create: `src/hooks/storage/useLocalStorage.ts`
- Create: `src/hooks/storage/useSessionStorage.ts`
- Create: `src/hooks/storage/index.ts`
- Create: `tests/hooks/storage/useLocalStorage.test.ts`
- Create: `tests/hooks/storage/useSessionStorage.test.ts`

### useLocalStorage

```typescript
// src/hooks/storage/useLocalStorage.ts
import { useCallback, useEffect, useState } from 'react'

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(nextValue))
        }
        return nextValue
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T)
        } catch {
          // ignore parse errors
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, removeValue]
}
```

```typescript
// tests/hooks/storage/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../../src/hooks/storage/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return initial value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should read existing value from storage', () => {
    localStorage.setItem('key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('should set value to storage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    act(() => result.current[1]('new-value'))
    expect(result.current[0]).toBe('new-value')
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('new-value')
  })

  it('should accept updater function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(1)
  })

  it('should remove value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    act(() => result.current[1]('value'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('default')
    expect(localStorage.getItem('key')).toBeNull()
  })

  it('should handle objects', () => {
    const obj = { name: 'test', count: 1 }
    const { result } = renderHook(() => useLocalStorage('obj', obj))
    act(() => result.current[1]({ name: 'updated', count: 2 }))
    expect(result.current[0]).toEqual({ name: 'updated', count: 2 })
  })
})
```

### useSessionStorage

```typescript
// src/hooks/storage/useSessionStorage.ts
import { useCallback, useState } from 'react'

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue
  try {
    const item = window.sessionStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(nextValue))
        }
        return nextValue
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
```

```typescript
// tests/hooks/storage/useSessionStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useSessionStorage } from '../../../src/hooks/storage/useSessionStorage'

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should return initial value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('should set and get value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    act(() => result.current[1]('new'))
    expect(result.current[0]).toBe('new')
    expect(JSON.parse(sessionStorage.getItem('key')!)).toBe('new')
  })

  it('should remove value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'))
    act(() => result.current[1]('value'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('default')
    expect(sessionStorage.getItem('key')).toBeNull()
  })
})
```

### Barrel export

```typescript
// src/hooks/storage/index.ts
export { useLocalStorage } from './useLocalStorage'
export { useSessionStorage } from './useSessionStorage'
```

**Step: Run tests and commit**

```bash
pnpm vitest run tests/hooks/storage/
git add src/hooks/storage/ tests/hooks/storage/
git commit -m "feat: add storage hooks (useLocalStorage, useSessionStorage)"
```

---

## Task 4: DOM Hooks (6개)

**Files:**
- Create: `src/hooks/dom/useEventListener.ts`
- Create: `src/hooks/dom/useClickOutside.ts`
- Create: `src/hooks/dom/useHover.ts`
- Create: `src/hooks/dom/useIntersectionObserver.ts`
- Create: `src/hooks/dom/useResizeObserver.ts`
- Create: `src/hooks/dom/useMutationObserver.ts`
- Create: `src/hooks/dom/index.ts`
- Create: `tests/hooks/dom/*.test.ts` (each hook)

### useEventListener

```typescript
// src/hooks/dom/useEventListener.ts
import { useEffect, useRef } from 'react'

type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap

export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: RefObject<HTMLElement | null> | null,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const target = element?.current ?? window
    if (!target?.addEventListener) return

    const listener = (event: Event) => savedHandler.current(event as EventMap[K])
    target.addEventListener(eventName, listener, options)
    return () => target.removeEventListener(eventName, listener, options)
  }, [eventName, element, options])
}
```

NOTE: `import type { RefObject } from 'react'` 를 상단에 추가할 것.

```typescript
// tests/hooks/dom/useEventListener.test.ts
import { renderHook } from '@testing-library/react'
import { useEventListener } from '../../../src/hooks/dom/useEventListener'

describe('useEventListener', () => {
  it('should add event listener to window by default', () => {
    const handler = vi.fn()
    renderHook(() => useEventListener('click', handler))
    window.dispatchEvent(new Event('click'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should add event listener to element ref', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    const ref = { current: div }
    renderHook(() => useEventListener('click', handler, ref))
    div.dispatchEvent(new Event('click'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should remove event listener on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useEventListener('click', handler))
    unmount()
    window.dispatchEvent(new Event('click'))
    expect(handler).not.toHaveBeenCalled()
  })
})
```

### useClickOutside

```typescript
// src/hooks/dom/useClickOutside.ts
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      savedHandler.current(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [])

  return ref
}
```

```typescript
// tests/hooks/dom/useClickOutside.test.ts
import { renderHook } from '@testing-library/react'
import { useClickOutside } from '../../../src/hooks/dom/useClickOutside'

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler))
    const div = document.createElement('div')
    document.body.appendChild(div)
    Object.defineProperty(result.current, 'current', { value: div, writable: true })
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handler).toHaveBeenCalledTimes(1)
    document.body.removeChild(div)
  })

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler))
    const div = document.createElement('div')
    document.body.appendChild(div)
    Object.defineProperty(result.current, 'current', { value: div, writable: true })
    div.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(div)
  })
})
```

### useHover

```typescript
// src/hooks/dom/useHover.ts
import { useCallback, useRef, useState } from 'react'
import type { RefObject } from 'react'

export function useHover<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T | null>(null)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const callbackRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter)
        ref.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      ref.current = node
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)
      }
    },
    [handleMouseEnter, handleMouseLeave],
  )

  return [callbackRef as unknown as RefObject<T | null>, isHovered]
}
```

```typescript
// tests/hooks/dom/useHover.test.ts
import { renderHook } from '@testing-library/react'
import { useHover } from '../../../src/hooks/dom/useHover'

describe('useHover', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>())
    expect(result.current[1]).toBe(false)
  })
})
```

### useIntersectionObserver

```typescript
// src/hooks/dom/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLElement | null>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options
  const ref = useRef<HTMLElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const node = ref.current
    if (!node || frozen) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setEntry(entry)
      },
      { threshold, root, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, frozen])

  return {
    ref,
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  }
}
```

```typescript
// tests/hooks/dom/useIntersectionObserver.test.ts
import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '../../../src/hooks/dom/useIntersectionObserver'

// jsdom doesn't have IntersectionObserver, mock it
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
  })))
})

describe('useIntersectionObserver', () => {
  it('should return isIntersecting false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeNull()
  })
})
```

### useResizeObserver

```typescript
// src/hooks/dom/useResizeObserver.ts
import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface Size {
  width: number
  height: number
}

export function useResizeObserver<T extends HTMLElement>(): [RefObject<T | null>, Size] {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
```

### useMutationObserver

```typescript
// src/hooks/dom/useMutationObserver.ts
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new MutationObserver((...args) => savedCallback.current(...args))
    observer.observe(node, options)
    return () => observer.disconnect()
  }, [options])

  return ref
}
```

### Barrel & Commit

```typescript
// src/hooks/dom/index.ts
export { useEventListener } from './useEventListener'
export { useClickOutside } from './useClickOutside'
export { useHover } from './useHover'
export { useIntersectionObserver } from './useIntersectionObserver'
export { useResizeObserver } from './useResizeObserver'
export { useMutationObserver } from './useMutationObserver'
```

```bash
pnpm vitest run tests/hooks/dom/
git add src/hooks/dom/ tests/hooks/dom/
git commit -m "feat: add DOM hooks (useEventListener, useClickOutside, useHover, useIntersectionObserver, useResizeObserver, useMutationObserver)"
```

---

## Task 5: Sensor Hooks (5개)

**Files:**
- Create: `src/hooks/sensor/useMediaQuery.ts`
- Create: `src/hooks/sensor/useWindowSize.ts`
- Create: `src/hooks/sensor/useScroll.ts`
- Create: `src/hooks/sensor/useMouse.ts`
- Create: `src/hooks/sensor/useNetwork.ts`
- Create: `src/hooks/sensor/index.ts`
- Create: `tests/hooks/sensor/*.test.ts`

### useMediaQuery

```typescript
// src/hooks/sensor/useMediaQuery.ts
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
```

```typescript
// tests/hooks/sensor/useMediaQuery.test.ts
import { renderHook } from '@testing-library/react'
import { useMediaQuery } from '../../../src/hooks/sensor/useMediaQuery'

describe('useMediaQuery', () => {
  it('should return false for non-matching query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })
})
```

### useWindowSize

```typescript
// src/hooks/sensor/useWindowSize.ts
import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }))

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

```typescript
// tests/hooks/sensor/useWindowSize.test.ts
import { renderHook } from '@testing-library/react'
import { useWindowSize } from '../../../src/hooks/sensor/useWindowSize'

describe('useWindowSize', () => {
  it('should return current window size', () => {
    const { result } = renderHook(() => useWindowSize())
    expect(result.current.width).toBe(window.innerWidth)
    expect(result.current.height).toBe(window.innerHeight)
  })
})
```

### useScroll

```typescript
// src/hooks/sensor/useScroll.ts
import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export function useScroll(element?: RefObject<HTMLElement | null>): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const target = element?.current ?? window

    const handleScroll = () => {
      if (target instanceof Window) {
        setPosition({ x: target.scrollX, y: target.scrollY })
      } else {
        setPosition({ x: target.scrollLeft, y: target.scrollTop })
      }
    }

    handleScroll()
    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => target.removeEventListener('scroll', handleScroll)
  }, [element])

  return position
}
```

### useMouse

```typescript
// src/hooks/sensor/useMouse.ts
import { useEffect, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMouse(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
```

### useNetwork

```typescript
// src/hooks/sensor/useNetwork.ts
import { useEffect, useState } from 'react'

interface NetworkState {
  online: boolean
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
}

export function useNetwork(): NetworkState {
  const [state, setState] = useState<NetworkState>(() => ({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  }))

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection
      setState({
        online: navigator.onLine,
        downlink: connection?.downlink,
        effectiveType: connection?.effectiveType,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      })
    }

    updateNetworkInfo()
    window.addEventListener('online', updateNetworkInfo)
    window.addEventListener('offline', updateNetworkInfo)

    const connection = (navigator as any).connection
    connection?.addEventListener?.('change', updateNetworkInfo)

    return () => {
      window.removeEventListener('online', updateNetworkInfo)
      window.removeEventListener('offline', updateNetworkInfo)
      connection?.removeEventListener?.('change', updateNetworkInfo)
    }
  }, [])

  return state
}
```

### Barrel & Commit

```typescript
// src/hooks/sensor/index.ts
export { useMediaQuery } from './useMediaQuery'
export { useWindowSize } from './useWindowSize'
export { useScroll } from './useScroll'
export { useMouse } from './useMouse'
export { useNetwork } from './useNetwork'
```

```bash
pnpm vitest run tests/hooks/sensor/
git add src/hooks/sensor/ tests/hooks/sensor/
git commit -m "feat: add sensor hooks (useMediaQuery, useWindowSize, useScroll, useMouse, useNetwork)"
```

---

## Task 6: Performance Hooks (4개)

**Files:**
- Create: `src/hooks/performance/useDebounceValue.ts`
- Create: `src/hooks/performance/useDebounceCallback.ts`
- Create: `src/hooks/performance/useThrottleValue.ts`
- Create: `src/hooks/performance/useThrottleCallback.ts`
- Create: `src/hooks/performance/index.ts`
- Create: `tests/hooks/performance/*.test.ts`

### useDebounceValue

```typescript
// src/hooks/performance/useDebounceValue.ts
import { useEffect, useState } from 'react'

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

```typescript
// tests/hooks/performance/useDebounceValue.test.ts
import { renderHook, act } from '@testing-library/react'
import { useDebounceValue } from '../../../src/hooks/performance/useDebounceValue'

describe('useDebounceValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounceValue('hello', 500))
    expect(result.current).toBe('hello')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'hello' } },
    )
    rerender({ value: 'world' })
    expect(result.current).toBe('hello')

    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current).toBe('world')
  })

  it('should reset timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'a' } },
    )
    rerender({ value: 'b' })
    act(() => { vi.advanceTimersByTime(300) })
    rerender({ value: 'c' })
    act(() => { vi.advanceTimersByTime(300) })
    expect(result.current).toBe('a')

    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('c')
  })
})
```

### useDebounceCallback

```typescript
// src/hooks/performance/useDebounceCallback.ts
import { useCallback, useEffect, useRef } from 'react'

export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
    },
    [delay],
  )
}
```

### useThrottleValue

```typescript
// src/hooks/performance/useThrottleValue.ts
import { useEffect, useRef, useState } from 'react'

export function useThrottleValue<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdated = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    const elapsed = now - lastUpdated.current

    if (elapsed >= interval) {
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
      }, interval - elapsed)
      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}
```

### useThrottleCallback

```typescript
// src/hooks/performance/useThrottleCallback.ts
import { useCallback, useEffect, useRef } from 'react'

export function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number,
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback)
  const lastCalledRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const elapsed = now - lastCalledRef.current

      if (elapsed >= interval) {
        lastCalledRef.current = now
        callbackRef.current(...args)
      } else if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          lastCalledRef.current = Date.now()
          timerRef.current = null
          callbackRef.current(...args)
        }, interval - elapsed)
      }
    },
    [interval],
  )
}
```

### Barrel & Commit

```typescript
// src/hooks/performance/index.ts
export { useDebounceValue } from './useDebounceValue'
export { useDebounceCallback } from './useDebounceCallback'
export { useThrottleValue } from './useThrottleValue'
export { useThrottleCallback } from './useThrottleCallback'
```

```bash
pnpm vitest run tests/hooks/performance/
git add src/hooks/performance/ tests/hooks/performance/
git commit -m "feat: add performance hooks (useDebounceValue, useDebounceCallback, useThrottleValue, useThrottleCallback)"
```

---

## Task 7: Lifecycle Hooks (6개)

**Files:**
- Create: `src/hooks/lifecycle/useMount.ts`
- Create: `src/hooks/lifecycle/useUnmount.ts`
- Create: `src/hooks/lifecycle/useUpdateEffect.ts`
- Create: `src/hooks/lifecycle/useIsMounted.ts`
- Create: `src/hooks/lifecycle/useIsomorphicLayoutEffect.ts`
- Create: `src/hooks/lifecycle/useDeepCompareEffect.ts`
- Create: `src/hooks/lifecycle/index.ts`
- Create: `tests/hooks/lifecycle/*.test.ts`

### useMount

```typescript
// src/hooks/lifecycle/useMount.ts
import { useEffect } from 'react'

export function useMount(callback: () => void): void {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

```typescript
// tests/hooks/lifecycle/useMount.test.ts
import { renderHook } from '@testing-library/react'
import { useMount } from '../../../src/hooks/lifecycle/useMount'

describe('useMount', () => {
  it('should call callback on mount', () => {
    const fn = vi.fn()
    renderHook(() => useMount(fn))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call callback on rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useMount(fn))
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

### useUnmount

```typescript
// src/hooks/lifecycle/useUnmount.ts
import { useEffect, useRef } from 'react'

export function useUnmount(callback: () => void): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    return () => callbackRef.current()
  }, [])
}
```

```typescript
// tests/hooks/lifecycle/useUnmount.test.ts
import { renderHook } from '@testing-library/react'
import { useUnmount } from '../../../src/hooks/lifecycle/useUnmount'

describe('useUnmount', () => {
  it('should call callback on unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useUnmount(fn))
    expect(fn).not.toHaveBeenCalled()
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

### useUpdateEffect

```typescript
// src/hooks/lifecycle/useUpdateEffect.ts
import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react'

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
```

```typescript
// tests/hooks/lifecycle/useUpdateEffect.test.ts
import { renderHook } from '@testing-library/react'
import { useUpdateEffect } from '../../../src/hooks/lifecycle/useUpdateEffect'

describe('useUpdateEffect', () => {
  it('should not call on first render', () => {
    const fn = vi.fn()
    renderHook(() => useUpdateEffect(fn))
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call on subsequent renders', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(fn, [value]),
      { initialProps: { value: 0 } },
    )
    expect(fn).not.toHaveBeenCalled()
    rerender({ value: 1 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

### useIsMounted

```typescript
// src/hooks/lifecycle/useIsMounted.ts
import { useCallback, useEffect, useRef } from 'react'

export function useIsMounted(): () => boolean {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
```

### useIsomorphicLayoutEffect

```typescript
// src/hooks/lifecycle/useIsomorphicLayoutEffect.ts
import { useEffect, useLayoutEffect } from 'react'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
```

### useDeepCompareEffect

```typescript
// src/hooks/lifecycle/useDeepCompareEffect.ts
import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react'

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true
  if (typeof a !== typeof b) return false
  if (a === null || b === null) return false
  if (typeof a !== 'object') return false

  const objA = a as Record<string, unknown>
  const objB = b as Record<string, unknown>

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false
    if (!deepEqual(objA[key], objB[key])) return false
  }

  return true
}

function useDeepCompareMemoize(deps: DependencyList): DependencyList {
  const ref = useRef<DependencyList>(deps)

  if (!deepEqual(deps, ref.current)) {
    ref.current = deps
  }

  return ref.current
}

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(deps))
}
```

### Barrel & Commit

```typescript
// src/hooks/lifecycle/index.ts
export { useMount } from './useMount'
export { useUnmount } from './useUnmount'
export { useUpdateEffect } from './useUpdateEffect'
export { useIsMounted } from './useIsMounted'
export { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
export { useDeepCompareEffect } from './useDeepCompareEffect'
```

```bash
pnpm vitest run tests/hooks/lifecycle/
git add src/hooks/lifecycle/ tests/hooks/lifecycle/
git commit -m "feat: add lifecycle hooks (useMount, useUnmount, useUpdateEffect, useIsMounted, useIsomorphicLayoutEffect, useDeepCompareEffect)"
```

---

## Task 8: UI Hooks (5개)

**Files:**
- Create: `src/hooks/ui/useScrollLock.ts`
- Create: `src/hooks/ui/useDarkMode.ts`
- Create: `src/hooks/ui/useFullscreen.ts`
- Create: `src/hooks/ui/useCopyToClipboard.ts`
- Create: `src/hooks/ui/useHotkeys.ts`
- Create: `src/hooks/ui/index.ts`
- Create: `tests/hooks/ui/*.test.ts`

### useScrollLock

```typescript
// src/hooks/ui/useScrollLock.ts
import { useEffect } from 'react'

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [locked])
}
```

### useDarkMode

```typescript
// src/hooks/ui/useDarkMode.ts
import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface UseDarkModeReturn {
  isDark: boolean
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

export function useDarkMode(defaultTheme: Theme = 'system'): UseDarkModeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem('theme') as Theme) ?? defaultTheme
  })

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const isDark = theme === 'system' ? systemDark : theme === 'dark'

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  const toggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, theme, setTheme, toggle }
}
```

### useFullscreen

```typescript
// src/hooks/ui/useFullscreen.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseFullscreenReturn {
  ref: RefObject<HTMLElement | null>
  isFullscreen: boolean
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
}

export function useFullscreen(): UseFullscreenReturn {
  const ref = useRef<HTMLElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const enter = useCallback(async () => {
    const element = ref.current
    if (element) await element.requestFullscreen()
  }, [])

  const exit = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
  }, [])

  const toggle = useCallback(async () => {
    if (isFullscreen) await exit()
    else await enter()
  }, [isFullscreen, enter, exit])

  return { ref, isFullscreen, enter, exit, toggle }
}
```

### useCopyToClipboard

```typescript
// src/hooks/ui/useCopyToClipboard.ts
import { useCallback, useState } from 'react'

interface UseCopyToClipboardReturn {
  copiedText: string | null
  copy: (text: string) => Promise<boolean>
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not supported')
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch {
      setCopiedText(null)
      return false
    }
  }, [])

  return { copiedText, copy }
}
```

```typescript
// tests/hooks/ui/useCopyToClipboard.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCopyToClipboard } from '../../../src/hooks/ui/useCopyToClipboard'

describe('useCopyToClipboard', () => {
  const mockWriteText = vi.fn()

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText.mockResolvedValue(undefined) },
    })
  })

  it('should initialize with null', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current.copiedText).toBeNull()
  })

  it('should copy text to clipboard', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    await act(async () => {
      const success = await result.current.copy('hello')
      expect(success).toBe(true)
    })
    expect(result.current.copiedText).toBe('hello')
    expect(mockWriteText).toHaveBeenCalledWith('hello')
  })
})
```

### useHotkeys

```typescript
// src/hooks/ui/useHotkeys.ts
import { useEffect, useRef } from 'react'

type KeyCombo = string // e.g. "ctrl+k", "shift+enter", "escape"

function parseKeyCombo(combo: string): { key: string; ctrl: boolean; shift: boolean; alt: boolean; meta: boolean } {
  const parts = combo.toLowerCase().split('+')
  return {
    key: parts[parts.length - 1]!,
    ctrl: parts.includes('ctrl') || parts.includes('control'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta') || parts.includes('cmd'),
  }
}

export function useHotkeys(
  keyCombo: KeyCombo,
  callback: (event: KeyboardEvent) => void,
  enabled = true,
): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!enabled) return

    const parsed = parseKeyCombo(keyCombo)

    const handler = (event: KeyboardEvent) => {
      const matches =
        event.key.toLowerCase() === parsed.key &&
        event.ctrlKey === parsed.ctrl &&
        event.shiftKey === parsed.shift &&
        event.altKey === parsed.alt &&
        event.metaKey === parsed.meta

      if (matches) {
        event.preventDefault()
        callbackRef.current(event)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [keyCombo, enabled])
}
```

```typescript
// tests/hooks/ui/useHotkeys.test.ts
import { renderHook } from '@testing-library/react'
import { useHotkeys } from '../../../src/hooks/ui/useHotkeys'

describe('useHotkeys', () => {
  it('should call callback on matching key combo', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('escape', handler))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call callback when disabled', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('escape', handler, false))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).not.toHaveBeenCalled()
  })

  it('should match ctrl+k combo', () => {
    const handler = vi.fn()
    renderHook(() => useHotkeys('ctrl+k', handler))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
```

### Barrel & Commit

```typescript
// src/hooks/ui/index.ts
export { useScrollLock } from './useScrollLock'
export { useDarkMode } from './useDarkMode'
export { useFullscreen } from './useFullscreen'
export { useCopyToClipboard } from './useCopyToClipboard'
export { useHotkeys } from './useHotkeys'
```

```bash
pnpm vitest run tests/hooks/ui/
git add src/hooks/ui/ tests/hooks/ui/
git commit -m "feat: add UI hooks (useScrollLock, useDarkMode, useFullscreen, useCopyToClipboard, useHotkeys)"
```

---

## Task 9: Data Hooks (4개)

**Files:**
- Create: `src/hooks/data/useAsync.ts`
- Create: `src/hooks/data/useFetch.ts`
- Create: `src/hooks/data/useInfiniteScroll.ts`
- Create: `src/hooks/data/usePagination.ts`
- Create: `src/hooks/data/index.ts`
- Create: `tests/hooks/data/*.test.ts`

### useAsync

```typescript
// src/hooks/data/useAsync.ts
import { useCallback, useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: () => Promise<void>
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await asyncFunction()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error })
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}
```

```typescript
// tests/hooks/data/useAsync.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAsync } from '../../../src/hooks/data/useAsync'

describe('useAsync', () => {
  it('should execute immediately by default', async () => {
    const asyncFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAsync(asyncFn))
    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.data).toBe('result')
      expect(result.current.loading).toBe(false)
    })
  })

  it('should not execute when immediate is false', () => {
    const asyncFn = vi.fn().mockResolvedValue('result')
    const { result } = renderHook(() => useAsync(asyncFn, false))
    expect(asyncFn).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
  })

  it('should handle errors', async () => {
    const error = new Error('fail')
    const asyncFn = vi.fn().mockRejectedValue(error)
    const { result } = renderHook(() => useAsync(asyncFn))

    await waitFor(() => {
      expect(result.current.error).toBe(error)
      expect(result.current.loading).toBe(false)
    })
  })

  it('should execute manually', async () => {
    const asyncFn = vi.fn().mockResolvedValue('manual')
    const { result } = renderHook(() => useAsync(asyncFn, false))

    await act(async () => {
      await result.current.execute()
    })
    expect(result.current.data).toBe('manual')
  })
})
```

### useFetch

```typescript
// src/hooks/data/useFetch.ts
import { useEffect, useRef, useState } from 'react'

interface UseFetchOptions extends RequestInit {
  enabled?: boolean
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}): UseFetchReturn<T> {
  const { enabled = true, ...fetchOptions } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = async () => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortControllerRef.current.signal,
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const json = (await response.json()) as T
      setData(json)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(err as Error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return
    fetchData()
    return () => abortControllerRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled])

  return { data, loading, error, refetch: fetchData }
}
```

### useInfiniteScroll

```typescript
// src/hooks/data/useInfiniteScroll.ts
import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

interface UseInfiniteScrollReturn {
  sentinelRef: RefObject<HTMLElement | null>
  loading: boolean
  reset: () => void
}

export function useInfiniteScroll(
  loadMore: () => Promise<void>,
  hasMore: boolean,
  options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollReturn {
  const { threshold = 0, rootMargin = '100px' } = options
  const sentinelRef = useRef<HTMLElement | null>(null)
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(false)

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    try {
      await loadMore()
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          handleLoadMore()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [handleLoadMore, hasMore, threshold, rootMargin])

  const reset = useCallback(() => {
    loadingRef.current = false
    setLoading(false)
  }, [])

  return { sentinelRef, loading, reset }
}
```

### usePagination

```typescript
// src/hooks/data/usePagination.ts
import { useCallback, useMemo, useState } from 'react'

interface UsePaginationOptions {
  totalItems: number
  pageSize?: number
  initialPage?: number
}

interface UsePaginationReturn {
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  next: () => void
  prev: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  startIndex: number
  endIndex: number
}

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const { totalItems, pageSize: initialPageSize = 10, initialPage = 1 } = options
  const [page, setPageState] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize])

  const setPage = useCallback(
    (newPage: number) => {
      setPageState(Math.min(Math.max(1, newPage), totalPages))
    },
    [totalPages],
  )

  const setPageSize = useCallback(
    (newSize: number) => {
      setPageSizeState(newSize)
      setPageState(1)
    },
    [],
  )

  const next = useCallback(() => setPage(page + 1), [page, setPage])
  const prev = useCallback(() => setPage(page - 1), [page, setPage])

  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

  return {
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    next,
    prev,
    setPage,
    setPageSize,
    startIndex,
    endIndex,
  }
}
```

```typescript
// tests/hooks/data/usePagination.test.ts
import { renderHook, act } from '@testing-library/react'
import { usePagination } from '../../../src/hooks/data/usePagination'

describe('usePagination', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, pageSize: 10 }))
    expect(result.current.page).toBe(1)
    expect(result.current.totalPages).toBe(10)
    expect(result.current.hasNext).toBe(true)
    expect(result.current.hasPrev).toBe(false)
  })

  it('should navigate next/prev', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, pageSize: 10 }))
    act(() => result.current.next())
    expect(result.current.page).toBe(2)
    act(() => result.current.prev())
    expect(result.current.page).toBe(1)
  })

  it('should not go below 1 or above totalPages', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 20, pageSize: 10 }))
    act(() => result.current.prev())
    expect(result.current.page).toBe(1)
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.page).toBe(2)
  })

  it('should calculate correct indices', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 25, pageSize: 10 }))
    expect(result.current.startIndex).toBe(0)
    expect(result.current.endIndex).toBe(9)
    act(() => result.current.next())
    expect(result.current.startIndex).toBe(10)
    expect(result.current.endIndex).toBe(19)
    act(() => result.current.next())
    expect(result.current.startIndex).toBe(20)
    expect(result.current.endIndex).toBe(24)
  })

  it('should reset page on pageSize change', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, pageSize: 10 }))
    act(() => result.current.next())
    act(() => result.current.setPageSize(20))
    expect(result.current.page).toBe(1)
    expect(result.current.totalPages).toBe(5)
  })
})
```

### Barrel & Commit

```typescript
// src/hooks/data/index.ts
export { useAsync } from './useAsync'
export { useFetch } from './useFetch'
export { useInfiniteScroll } from './useInfiniteScroll'
export { usePagination } from './usePagination'
```

```bash
pnpm vitest run tests/hooks/data/
git add src/hooks/data/ tests/hooks/data/
git commit -m "feat: add data hooks (useAsync, useFetch, useInfiniteScroll, usePagination)"
```

---

## Task 10: Next.js Hooks (4개)

**Files:**
- Create: `src/next/useQueryParams.ts`
- Create: `src/next/useRouteChange.ts`
- Create: `src/next/useSafeAction.ts`
- Create: `src/next/useIsServer.ts`
- Create: `src/next/index.ts`
- Create: `tests/next/*.test.ts`

NOTE: Next.js hooks는 `next/navigation`에 의존하므로 `next`를 devDependency에 추가 필요:

```bash
pnpm add -D next
```

### useQueryParams

```typescript
// src/next/useQueryParams.ts
'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function useQueryParams<T extends Record<string, string>>(): {
  params: Partial<T>
  set: (key: keyof T, value: string) => void
  setAll: (params: Partial<T>) => void
  delete: (key: keyof T) => void
  clear: () => void
} {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const params = Object.fromEntries(searchParams.entries()) as Partial<T>

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => URLSearchParams) => {
      const newParams = updater(new URLSearchParams(searchParams.toString()))
      const query = newParams.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    },
    [searchParams, router, pathname],
  )

  const set = useCallback(
    (key: keyof T, value: string) => {
      updateParams((params) => {
        params.set(key as string, value)
        return params
      })
    },
    [updateParams],
  )

  const setAll = useCallback(
    (newParams: Partial<T>) => {
      updateParams((params) => {
        Object.entries(newParams).forEach(([key, value]) => {
          if (value !== undefined) params.set(key, value as string)
        })
        return params
      })
    },
    [updateParams],
  )

  const deleteParam = useCallback(
    (key: keyof T) => {
      updateParams((params) => {
        params.delete(key as string)
        return params
      })
    },
    [updateParams],
  )

  const clear = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  return { params, set, setAll, delete: deleteParam, clear }
}
```

### useRouteChange

```typescript
// src/next/useRouteChange.ts
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface UseRouteChangeCallbacks {
  onStart?: (url: string) => void
  onComplete?: (url: string) => void
}

export function useRouteChange(callbacks: UseRouteChangeCallbacks): void {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const savedCallbacks = useRef(callbacks)
  const prevUrl = useRef(`${pathname}?${searchParams.toString()}`)

  useEffect(() => {
    savedCallbacks.current = callbacks
  }, [callbacks])

  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`
    if (currentUrl !== prevUrl.current) {
      savedCallbacks.current.onComplete?.(currentUrl)
      prevUrl.current = currentUrl
    }
  }, [pathname, searchParams])
}
```

### useSafeAction

```typescript
// src/next/useSafeAction.ts
'use client'

import { useCallback, useState, useTransition } from 'react'

interface UseSafeActionReturn<TInput, TOutput> {
  execute: (input: TInput) => Promise<void>
  data: TOutput | null
  error: Error | null
  loading: boolean
  reset: () => void
}

export function useSafeAction<TInput, TOutput>(
  action: (input: TInput) => Promise<TOutput>,
): UseSafeActionReturn<TInput, TOutput> {
  const [data, setData] = useState<TOutput | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()

  const execute = useCallback(
    async (input: TInput) => {
      startTransition(async () => {
        setError(null)
        try {
          const result = await action(input)
          setData(result)
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })
    },
    [action],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { execute, data, error, loading: isPending, reset }
}
```

### useIsServer

```typescript
// src/next/useIsServer.ts
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getSnapshot = () => false
const getServerSnapshot = () => true

export function useIsServer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
```

```typescript
// tests/next/useIsServer.test.ts
import { renderHook } from '@testing-library/react'
import { useIsServer } from '../../src/next/useIsServer'

describe('useIsServer', () => {
  it('should return false in browser environment', () => {
    const { result } = renderHook(() => useIsServer())
    expect(result.current).toBe(false)
  })
})
```

### Barrel & Commit

```typescript
// src/next/index.ts
export { useQueryParams } from './useQueryParams'
export { useRouteChange } from './useRouteChange'
export { useSafeAction } from './useSafeAction'
export { useIsServer } from './useIsServer'
```

```bash
pnpm vitest run tests/next/
git add src/next/ tests/next/
git commit -m "feat: add Next.js hooks (useQueryParams, useRouteChange, useSafeAction, useIsServer)"
```

---

## Task 11: Utils (3개)

**Files:**
- Create: `src/utils/cn.ts`
- Create: `src/utils/formatDate.ts`
- Create: `src/utils/sleep.ts`
- Create: `src/utils/index.ts`
- Create: `tests/utils/*.test.ts`

NOTE: cn util을 위한 peer dependency 추가:

```bash
# package.json의 peerDependencies에 추가 (optional)
# clsx와 tailwind-merge
```

### cn

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

NOTE: `clsx`와 `tailwind-merge`를 dependencies로 추가:

```bash
pnpm add clsx tailwind-merge
```

```typescript
// tests/utils/cn.test.ts
import { cn } from '../../src/utils/cn'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should merge tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })
})
```

### formatDate

```typescript
// src/utils/formatDate.ts
type DateInput = Date | string | number

export function formatDate(
  date: DateInput,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US',
): string {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, options).format(d)
}
```

```typescript
// tests/utils/formatDate.test.ts
import { formatDate } from '../../src/utils/formatDate'

describe('formatDate', () => {
  it('should format date with default options', () => {
    const result = formatDate(new Date('2024-01-15'))
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should accept string input', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'long', day: 'numeric' }, 'en-US')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('should accept locale', () => {
    const result = formatDate('2024-01-15', { year: 'numeric', month: 'long' }, 'ko-KR')
    expect(result).toContain('2024')
  })

  it('should accept timestamp', () => {
    const ts = new Date('2024-06-15').getTime()
    const result = formatDate(ts)
    expect(typeof result).toBe('string')
  })
})
```

### sleep

```typescript
// src/utils/sleep.ts
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

```typescript
// tests/utils/sleep.test.ts
import { sleep } from '../../src/utils/sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should resolve after specified delay', async () => {
    const fn = vi.fn()
    sleep(1000).then(fn)

    expect(fn).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1000)
    expect(fn).toHaveBeenCalled()
  })
})
```

### Barrel & Commit

```typescript
// src/utils/index.ts
export { cn } from './cn'
export { formatDate } from './formatDate'
export { sleep } from './sleep'
```

```bash
pnpm vitest run tests/utils/
git add src/utils/ tests/utils/
git commit -m "feat: add utilities (cn, formatDate, sleep)"
```

---

## Task 12: Main Barrel Export & Build Verification

**Files:**
- Modify: `src/index.ts`

**Step 1: Write main barrel export**

```typescript
// src/index.ts

// State
export { useToggle } from './hooks/state/useToggle'
export { useBoolean } from './hooks/state/useBoolean'
export { useCounter } from './hooks/state/useCounter'
export { useMap } from './hooks/state/useMap'
export { useSet } from './hooks/state/useSet'
export { usePrevious } from './hooks/state/usePrevious'
export { useStateHistory } from './hooks/state/useStateHistory'

// Storage
export { useLocalStorage } from './hooks/storage/useLocalStorage'
export { useSessionStorage } from './hooks/storage/useSessionStorage'

// DOM
export { useEventListener } from './hooks/dom/useEventListener'
export { useClickOutside } from './hooks/dom/useClickOutside'
export { useHover } from './hooks/dom/useHover'
export { useIntersectionObserver } from './hooks/dom/useIntersectionObserver'
export { useResizeObserver } from './hooks/dom/useResizeObserver'
export { useMutationObserver } from './hooks/dom/useMutationObserver'

// Sensor
export { useMediaQuery } from './hooks/sensor/useMediaQuery'
export { useWindowSize } from './hooks/sensor/useWindowSize'
export { useScroll } from './hooks/sensor/useScroll'
export { useMouse } from './hooks/sensor/useMouse'
export { useNetwork } from './hooks/sensor/useNetwork'

// Performance
export { useDebounceValue } from './hooks/performance/useDebounceValue'
export { useDebounceCallback } from './hooks/performance/useDebounceCallback'
export { useThrottleValue } from './hooks/performance/useThrottleValue'
export { useThrottleCallback } from './hooks/performance/useThrottleCallback'

// Lifecycle
export { useMount } from './hooks/lifecycle/useMount'
export { useUnmount } from './hooks/lifecycle/useUnmount'
export { useUpdateEffect } from './hooks/lifecycle/useUpdateEffect'
export { useIsMounted } from './hooks/lifecycle/useIsMounted'
export { useIsomorphicLayoutEffect } from './hooks/lifecycle/useIsomorphicLayoutEffect'
export { useDeepCompareEffect } from './hooks/lifecycle/useDeepCompareEffect'

// UI
export { useScrollLock } from './hooks/ui/useScrollLock'
export { useDarkMode } from './hooks/ui/useDarkMode'
export { useFullscreen } from './hooks/ui/useFullscreen'
export { useCopyToClipboard } from './hooks/ui/useCopyToClipboard'
export { useHotkeys } from './hooks/ui/useHotkeys'

// Data
export { useAsync } from './hooks/data/useAsync'
export { useFetch } from './hooks/data/useFetch'
export { useInfiniteScroll } from './hooks/data/useInfiniteScroll'
export { usePagination } from './hooks/data/usePagination'
```

**Step 2: Build & verify**

```bash
pnpm build
```

Expected: 빌드 성공. `dist/` 에 아래 파일들 생성 확인:
- `dist/index.mjs`, `dist/index.cjs`, `dist/index.d.mts`, `dist/index.d.cts`
- `dist/next/index.mjs`, `dist/next/index.cjs`, `dist/next/index.d.mts`, `dist/next/index.d.cts`
- `dist/utils/index.mjs`, `dist/utils/index.cjs`, `dist/utils/index.d.mts`, `dist/utils/index.d.cts`

**Step 3: Run all tests**

```bash
pnpm vitest run
```

Expected: 모든 테스트 PASS

**Step 4: Type check**

```bash
pnpm typecheck
```

Expected: 에러 없음

**Step 5: Commit**

```bash
git add src/index.ts
git commit -m "feat: add main barrel export and verify build"
```

---

## Task 13: CI/CD & README

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/publish.yml`
- Create: `README.md`
- Create: `LICENSE`

**Step 1: Write CI workflow**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test:run
      - run: pnpm build
```

**Step 2: Write publish workflow**

```yaml
# .github/workflows/publish.yml
name: Publish

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: read
  id-token: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: https://registry.npmjs.org
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:run
      - run: pnpm build
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Step 3: Write LICENSE (MIT)**

```
MIT License

Copyright (c) 2026 reactives contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Step 4: Write README.md**

```markdown
# reactives

A collection of useful React hooks and utilities for React and Next.js.

- **TypeScript-first** — Full type safety with generics
- **Tree-shakeable** — Import only what you need
- **SSR-safe** — Works with Next.js SSR/SSG out of the box
- **Zero dependencies** — No bloat (except `cn` util which uses `clsx` + `tailwind-merge`)
- **React 18+** compatible (React 19 ready)

## Install

```bash
npm install reactives
# or
pnpm add reactives
# or
yarn add reactives
```

## Usage

```tsx
import { useToggle, useLocalStorage, useDebounceValue } from 'reactives'
import { useQueryParams } from 'reactives/next'
import { cn } from 'reactives/utils'

function App() {
  const [isOpen, toggle] = useToggle(false)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const debouncedSearch = useDebounceValue(search, 300)

  return (
    <div className={cn('container', isOpen && 'open')}>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

## Hooks

### State
- `useToggle` — Boolean toggle
- `useBoolean` — Explicit boolean controls (setTrue/setFalse/toggle)
- `useCounter` — Numeric counter with min/max
- `useMap` — Map state management
- `useSet` — Set state management
- `usePrevious` — Previous render value
- `useStateHistory` — Undo/redo state history

### Storage
- `useLocalStorage` — Synced localStorage with SSR safety
- `useSessionStorage` — Synced sessionStorage with SSR safety

### DOM
- `useEventListener` — Type-safe event listener
- `useClickOutside` — Outside click detection
- `useHover` — Hover state tracking
- `useIntersectionObserver` — Viewport intersection detection
- `useResizeObserver` — Element resize detection
- `useMutationObserver` — DOM mutation detection

### Sensor
- `useMediaQuery` — CSS media query matching
- `useWindowSize` — Window dimensions
- `useScroll` — Scroll position tracking
- `useMouse` — Mouse position tracking
- `useNetwork` — Network status and info

### Performance
- `useDebounceValue` — Debounced value
- `useDebounceCallback` — Debounced callback
- `useThrottleValue` — Throttled value
- `useThrottleCallback` — Throttled callback

### Lifecycle
- `useMount` — Run on mount
- `useUnmount` — Run on unmount
- `useUpdateEffect` — Skip first render effect
- `useIsMounted` — Mount status ref
- `useIsomorphicLayoutEffect` — SSR-safe useLayoutEffect
- `useDeepCompareEffect` — Deep comparison effect

### UI
- `useScrollLock` — Body scroll lock
- `useDarkMode` — Dark mode with system preference
- `useFullscreen` — Fullscreen API
- `useCopyToClipboard` — Clipboard copy
- `useHotkeys` — Keyboard shortcut binding

### Data
- `useAsync` — Async function wrapper
- `useFetch` — Fetch wrapper with abort
- `useInfiniteScroll` — Infinite scroll with IntersectionObserver
- `usePagination` — Pagination logic

### Next.js (`reactives/next`)
- `useQueryParams` — Typed URL query state
- `useRouteChange` — Route change detection
- `useSafeAction` — Server Action wrapper
- `useIsServer` — SSR/CSR detection

### Utils (`reactives/utils`)
- `cn` — Class name merge (clsx + tailwind-merge)
- `formatDate` — Date formatting (Intl.DateTimeFormat)
- `sleep` — Promise-based delay

## License

MIT
```

**Step 5: Commit**

```bash
git add .github/ README.md LICENSE
git commit -m "chore: add CI/CD workflows, README, and LICENSE"
```

---

## Task 14: Final Verification

**Step 1: Run full test suite with coverage**

```bash
pnpm test:coverage
```

Expected: 모든 테스트 PASS, 커버리지 90%+

**Step 2: Build verification**

```bash
pnpm build && ls -la dist/
```

Expected: 모든 entry point 파일 생성 확인

**Step 3: Lint check**

```bash
pnpm lint
```

Expected: 에러 없음

**Step 4: Type check**

```bash
pnpm typecheck
```

Expected: 에러 없음

**Step 5: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "chore: final verification and fixes"
```
