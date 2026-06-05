import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 강조 단계 */
  variant?: ButtonVariant;
  /** 크기 */
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = ["nova-button", `nova-button--${variant}`, `nova-button--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...props} />;
}
