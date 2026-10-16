"use client";

import type { ReactNode } from "react";
import { cx, scrollToId } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "gold" | "outline" | "ghost" | "ivory";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  small?: boolean;
  ariaLabel?: string;
}

type ButtonProps = BaseProps & { onClick: () => void; href?: never; to?: never };
type LinkProps = BaseProps & { href: string; onClick?: never; to?: never };
type ScrollProps = BaseProps & { to: string; onClick?: never; href?: never };

/**
 * One CTA design system for the whole site.
 * - onClick → <button>
 * - href    → external <a> that opens safely in a new tab
 * - to      → smooth-scrolls to a section id (real href fallback for no-JS)
 */
export function RoyalButton(props: ButtonProps | LinkProps | ScrollProps) {
  const { children, variant = "gold", icon, iconRight, className, small, ariaLabel } = props;
  const cls = cx("rbtn", `rbtn--${variant}`, small && "rbtn--sm", className);
  const inner = (
    <>
      <span className="rbtn__shine" aria-hidden="true" />
      {icon && <Icon name={icon} size={small ? 16 : 18} />}
      <span className="rbtn__label">{children}</span>
      {iconRight && <Icon name={iconRight} size={small ? 16 : 18} />}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a className={cls} href={props.href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  if ("to" in props && props.to) {
    const to = props.to;
    return (
      <a
        className={cls}
        href={`#${to}`}
        aria-label={ariaLabel}
        onClick={(e) => {
          e.preventDefault();
          scrollToId(to);
        }}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={(props as ButtonProps).onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
