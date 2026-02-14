# reactives - Design Document

## Overview

React + Next.js 환경에서 반복적으로 필요한 custom hooks와 utility functions를 모은 오픈소스 npm 패키지.

### 차별화 포인트

- **React + Next.js 통합**: 범용 React hooks와 Next.js 특화 유틸리티를 하나의 패키지에서 제공
- **최소 + 최신**: tree-shaking 최적화, React 18+/19 호환, 외부 의존성 최소화
- **TypeScript-first + DX**: 완벽한 타입 안전성, 일관된 API, 직관적인 문서

## Architecture

### 접근 방식: Single Package

하나의 npm 패키지에 모든 hooks/utils를 포함하되, `exports` subpath와 `sideEffects: false`로 tree-shaking 최적화.

### 기술 스택

| 항목 | 선택 | 이유 |
|---|---|---|
| Build | tsup | esbuild 기반, ESM+CJS 동시 출력, zero-config |
| Test | Vitest + @testing-library/react | 빠른 실행, 네이티브 ESM |
| Lint | ESLint + Prettier | 생태계 표준 |
| TypeScript | 5.5+ strict mode | 최신 타입 기능 활용 |
| Package Manager | pnpm | 빠른 설치, disk 효율 |
| CI/CD | GitHub Actions | npm publish 자동화, PR 테스트 |
| Docs | Docusaurus | React 생태계 표준 문서 프레임워크 |
| React 지원 | React 18+ (19 호환) | 현실적 지원 범위 |

### 프로젝트 구조

```
reactives/
├── src/
│   ├── hooks/
│   │   ├── state/           # useToggle, useBoolean, useCounter, useMap, useSet, ...
│   │   ├── storage/         # useLocalStorage, useSessionStorage
│   │   ├── dom/             # useEventListener, useClickOutside, useHover, ...
│   │   ├── sensor/          # useMediaQuery, useWindowSize, useScroll, useMouse, ...
│   │   ├── performance/     # useDebounce, useThrottle, ...
│   │   ├── lifecycle/       # useMount, useUnmount, useUpdateEffect, ...
│   │   ├── ui/              # useScrollLock, useDarkMode, useFullscreen, ...
│   │   └── data/            # useAsync, useFetch, usePagination, ...
│   ├── next/
│   │   ├── useQueryParams.ts
│   │   ├── useRouteChange.ts
│   │   ├── useSafeAction.ts
│   │   └── useIsServer.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── formatDate.ts
│   │   └── sleep.ts
│   └── index.ts
├── tests/
│   └── hooks/               # src 구조 미러링
├── docs/                    # Docusaurus 문서
├── tsup.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
└── README.md
```

### package.json exports

```json
{
  "exports": {
    ".": "./dist/index.mjs",
    "./hooks/*": "./dist/hooks/*/index.mjs",
    "./next": "./dist/next/index.mjs",
    "./utils": "./dist/utils/index.mjs"
  },
  "sideEffects": false
}
```

### Import 방식

```ts
import { useDebounce, useLocalStorage } from 'reactives'
import { useQueryParams } from 'reactives/next'
import { cn } from 'reactives/utils'
```

## Hooks & Utils 목록 (v0.1.0) - 총 46개

### State (7개)

| Hook | 설명 |
|---|---|
| useToggle | boolean 토글 (on/off/toggle) |
| useBoolean | 명시적 API (setTrue/setFalse/toggle) |
| useCounter | 숫자 증감 (increment/decrement/set/reset) |
| useMap | Map 상태 관리 (set/delete/clear/reset) |
| useSet | Set 상태 관리 (add/delete/clear/reset) |
| usePrevious | 이전 렌더 값 추적 |
| useStateHistory | 상태 변경 이력 (undo/redo) |

### Storage (2개)

| Hook | 설명 |
|---|---|
| useLocalStorage | localStorage 동기화 + SSR safe + 타입 안전 |
| useSessionStorage | sessionStorage 동기화 + SSR safe + 타입 안전 |

### DOM (6개)

| Hook | 설명 |
|---|---|
| useEventListener | 타입 안전한 이벤트 리스너 등록/해제 |
| useClickOutside | 요소 외부 클릭 감지 |
| useHover | 요소 hover 상태 추적 |
| useIntersectionObserver | 뷰포트 교차 감지 |
| useResizeObserver | 요소 크기 변화 감지 |
| useMutationObserver | DOM 변화 감지 |

### Sensor (5개)

| Hook | 설명 |
|---|---|
| useMediaQuery | CSS media query 매칭 |
| useWindowSize | 브라우저 창 크기 추적 |
| useScroll | 스크롤 위치 추적 |
| useMouse | 마우스 좌표 추적 |
| useNetwork | 온/오프라인 상태 및 네트워크 정보 |

### Performance (4개)

| Hook | 설명 |
|---|---|
| useDebounceValue | 값 디바운스 |
| useDebounceCallback | 콜백 디바운스 |
| useThrottleValue | 값 스로틀 |
| useThrottleCallback | 콜백 스로틀 |

### Lifecycle (6개)

| Hook | 설명 |
|---|---|
| useMount | 마운트 시 1회 실행 |
| useUnmount | 언마운트 시 클린업 실행 |
| useUpdateEffect | 첫 렌더 건너뛰는 useEffect |
| useIsMounted | 마운트 여부 ref 반환 |
| useIsomorphicLayoutEffect | SSR-safe layoutEffect |
| useDeepCompareEffect | 깊은 비교 기반 useEffect |

### UI (5개)

| Hook | 설명 |
|---|---|
| useScrollLock | body 스크롤 잠금 |
| useDarkMode | 다크모드 상태 (system + manual) |
| useFullscreen | 전체화면 토글 |
| useCopyToClipboard | 클립보드 복사 + 상태 |
| useHotkeys | 키보드 단축키 바인딩 |

### Data (4개)

| Hook | 설명 |
|---|---|
| useAsync | 비동기 함수 실행 + loading/error/data |
| useFetch | fetch 래퍼 + 캐시/재시도 |
| useInfiniteScroll | 무한 스크롤 |
| usePagination | 페이지네이션 로직 |

### Next.js (4개)

| Hook | 설명 |
|---|---|
| useQueryParams | typed URL query state |
| useRouteChange | 라우트 변경 감지 + 콜백 |
| useSafeAction | Server Action 래퍼 |
| useIsServer | SSR/CSR 환경 판별 |

### Utils (3개)

| Util | 설명 |
|---|---|
| cn | className 병합 (clsx + tailwind-merge) |
| formatDate | 날짜 포맷 (Intl.DateTimeFormat) |
| sleep | Promise 기반 delay |

## API 설계 원칙

### 반환 패턴

```ts
// 단순 값 + 액션: tuple
const [value, toggle] = useToggle(false)
const [count, { increment, decrement, set, reset }] = useCounter(0)

// 복합 상태: object
const { data, loading, error } = useAsync(fetchUser)
const { isIntersecting, ref } = useIntersectionObserver()

// 유틸 훅: 값만 반환
const isMounted = useIsMounted()
```

### 타입 안전성

```ts
// 제네릭으로 저장값 타입 보장
const [user, setUser] = useLocalStorage<User>('user', defaultUser)

// 옵션 객체는 Partial + 합리적 기본값
const { ref } = useIntersectionObserver({ threshold: 0.5, rootMargin: '10px' })
```

### SSR 안전

모든 브라우저 API 접근 hook은 `typeof window !== 'undefined'` 가드를 내장.

### Dependencies

- peer dependency: `react >= 18`, Next.js hooks는 추가로 `next >= 13`
- `cn` util만 `clsx` + `tailwind-merge`를 peer dependency로 가짐
- 나머지 모든 hooks/utils는 외부 의존성 0개

## 테스트 전략

- 모든 hook에 최소 1개의 테스트 파일
- `renderHook` + `act`로 상태 변경 테스트
- DOM hook은 `fireEvent` / `userEvent`로 상호작용 테스트
- SSR hook은 `renderToString`으로 서버 환경 테스트
- 커버리지 목표: 90%+

## 배포 & 버전 관리

- Semantic Versioning: 0.1.0 → 0.2.0 (새 hook 추가) → 1.0.0 (안정화)
- Changesets: 버전 관리 + CHANGELOG 자동 생성
- GitHub Actions: PR merge → 테스트 → npm publish 자동화
- npm provenance: 빌드 출처 증명 활성화
