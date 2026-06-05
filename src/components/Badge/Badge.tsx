import type { HTMLAttributes } from "react";
import "./Badge.css";

export type BadgeTone = "neutral" | "primary" | "success" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 상태/의미를 나타내는 색조 */
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  const classes = ["nova-badge", `nova-badge--${tone}`, className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}
