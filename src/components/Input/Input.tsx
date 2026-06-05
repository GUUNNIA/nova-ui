import { useId, type InputHTMLAttributes } from "react";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 위에 표시되는 라벨 */
  label?: string;
  /** 라벨 아래 보조 설명 또는 에러 메시지 */
  hint?: string;
  /** 에러 상태 */
  invalid?: boolean;
}

export function Input({ label, hint, invalid = false, id, className = "", ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={["nova-field", className].filter(Boolean).join(" ")}>
      {label && (
        <label className="nova-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={["nova-input", invalid && "nova-input--invalid"].filter(Boolean).join(" ")}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        {...props}
      />
      {hint && (
        <p id={hintId} className={["nova-field__hint", invalid && "nova-field__hint--error"].filter(Boolean).join(" ")}>
          {hint}
        </p>
      )}
    </div>
  );
}
