import type { HTMLAttributes } from "react";
import "./Card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 강조 정도 */
  elevated?: boolean;
}

export function Card({ elevated = false, className = "", ...props }: CardProps) {
  const classes = ["nova-card", elevated && "nova-card--elevated", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes} {...props} />;
}

export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="nova-card__header" {...props} />;
}

export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="nova-card__title" {...props} />;
}

export function CardBody(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="nova-card__body" {...props} />;
}
