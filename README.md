# Nova UI — 디자인 시스템 샘플 + Git 배포 플로우

디자인 토큰 기반의 작은 React 디자인 시스템 샘플입니다.
**로컬 개발 → Pull Request → CI 검증 → main 병합 → Storybook 배포 / npm 릴리스** 까지
Git 중심의 배포 플로우를 그대로 체험할 수 있도록 구성했습니다.

---

## 무엇이 들어 있나

```
nova-ui/
├── .github/workflows/      # CI · 배포 · 릴리스 자동화
│   ├── ci.yml              # PR/푸시 시 타입체크 + 빌드 검증
│   ├── deploy-storybook.yml# main 병합 시 Storybook → GitHub Pages
│   └── release.yml         # 버전 태그 푸시 시 npm 게시
├── .storybook/             # Storybook 설정
├── src/
│   ├── tokens/             # 디자인 토큰 (CSS 변수 + 타입)
│   ├── components/         # Button · Badge · Card · Input
│   └── index.ts            # 공개 엔트리포인트
├── package.json            # 라이브러리 빌드 + 스크립트
└── vite.config.ts          # 라이브러리 모드 번들 설정
```

핵심 아이디어는 **토큰이 단일 진실 공급원**이라는 점입니다.
색상·간격·타이포그래피를 `src/tokens/tokens.css`에서만 정의하고,
모든 컴포넌트는 하드코딩 값 대신 이 CSS 변수를 참조합니다.
덕분에 다크 모드는 시맨틱 토큰 몇 개만 재정의하면 전체 시스템이 따라옵니다.

---

## 로컬에서 실행

```bash
npm install
npm run dev            # Storybook 개발 서버 (http://localhost:6006)
npm run typecheck      # 타입 검사
npm run build          # 라이브러리 번들(dist/) 생성
npm run build-storybook# 정적 Storybook(storybook-static/) 생성
```

> Node 18+ 권장. 토큰의 폰트 변수(`--nova-font-display` 등)는 폴백 폰트로도 동작하며,
> 실제 폰트를 쓰려면 `.storybook/preview.ts`나 앱에서 웹폰트를 로드하면 됩니다.

---

## Git 배포 플로우

### 0. 저장소에 올리기

```bash
git init
git add .
git commit -m "chore: 디자인 시스템 초기 구성"
git branch -M main
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

### 1. 기능 개발은 브랜치에서

```bash
git switch -c feat/add-tooltip
# ... 컴포넌트 작업 ...
git add .
git commit -m "feat: Tooltip 컴포넌트 추가"
git push -u origin feat/add-tooltip
```

### 2. Pull Request → CI 자동 검증

PR을 열면 `ci.yml`이 자동 실행되어 **타입체크 · 라이브러리 빌드 · Storybook 빌드**를
모두 통과하는지 확인합니다. 초록색 체크가 떠야 머지 대상이 됩니다.

### 3. main 병합 → Storybook 자동 배포

PR이 main에 머지되면 `deploy-storybook.yml`이 Storybook을 빌드해
**GitHub Pages**로 배포합니다. 한 번만 아래 설정을 해두면 됩니다.

- 저장소 **Settings → Pages → Build and deployment → Source: `GitHub Actions`**

배포 후 문서 주소는 보통 `https://<USER>.github.io/<REPO>/` 입니다.

### 4. 자동 버전 발행 → npm 릴리스 (changesets)

버전을 손으로 올리지 않습니다. 변경할 때마다 changeset만 남기면 됩니다.

```bash
npx changeset             # 변경 종류(patch/minor/major) + 요약 기록
git add . && git commit -m "feat: ... (+ changeset)"
git push
```

main에 머지되면 `release.yml`이 자동으로:

1. 대기 중인 changeset을 모아 **"Version Packages" PR**을 생성합니다.
   (버전 bump + `CHANGELOG.md` 갱신이 들어있는 PR — 개발팀 핸드오프 신호)
2. 그 PR을 머지하면 → **npm 게시 + git 태그 + GitHub Release**가 자동 생성됩니다.

사전 준비:

- npm에서 **Automation 토큰** 발급 → 저장소 **Settings → Secrets** 에 `NPM_TOKEN` 등록
- `package.json`의 `name`(`@your-scope/nova-ui`)을 실제 스코프로 변경
- semver 규칙: `patch`=버그수정, `minor`=호환되는 기능 추가, `major`=깨지는 변경.
  이 신호가 아래 소비 앱의 **자동 반영 정책**(자동 머지 여부)을 결정합니다.

---

## 설치한 쪽에서 쓰는 법

```bash
npm install @your-scope/nova-ui
```

```tsx
import { Button, Card, CardTitle, CardBody } from "@your-scope/nova-ui";

export function Example() {
  return (
    <Card>
      <CardTitle>안녕하세요</CardTitle>
      <CardBody>토큰 기반 컴포넌트입니다.</CardBody>
      <Button>확인</Button>
    </Card>
  );
}
```

토큰 CSS는 컴포넌트 import 시 자동으로 포함됩니다.

---

## 다음에 확장해볼 만한 것

- 토큰을 [Style Dictionary](https://amzn.github.io/style-dictionary/)로 관리해 Figma·iOS·Android와 공유
- `changesets`로 버전·체인지로그 자동화
- 시각 회귀 테스트(Chromatic)나 접근성 검사(`@storybook/addon-a11y`) 추가
- 컴포넌트 단위 테스트(Vitest + Testing Library)
