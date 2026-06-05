/**
 * 타입 안전한 토큰 참조.
 * 컴포넌트나 앱 코드에서 `tokens.color.primary` 처럼 사용하면
 * CSS 변수 문자열을 오타 없이 안전하게 쓸 수 있습니다.
 */
export const tokens = {
  color: {
    bg: "var(--nova-color-bg)",
    surface: "var(--nova-color-surface)",
    text: "var(--nova-color-text)",
    textMuted: "var(--nova-color-text-muted)",
    border: "var(--nova-color-border)",
    primary: "var(--nova-color-primary)",
    primaryHover: "var(--nova-color-primary-hover)",
    onPrimary: "var(--nova-color-on-primary)",
  },
  space: {
    1: "var(--nova-space-1)",
    2: "var(--nova-space-2)",
    3: "var(--nova-space-3)",
    4: "var(--nova-space-4)",
    5: "var(--nova-space-5)",
    6: "var(--nova-space-6)",
  },
  radius: {
    sm: "var(--nova-radius-sm)",
    md: "var(--nova-radius-md)",
    lg: "var(--nova-radius-lg)",
    pill: "var(--nova-radius-pill)",
  },
  font: {
    display: "var(--nova-font-display)",
    body: "var(--nova-font-body)",
    mono: "var(--nova-font-mono)",
  },
} as const;

export type Tokens = typeof tokens;
