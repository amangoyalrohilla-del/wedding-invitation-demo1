"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Icon } from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  variant?: "card" | "cinema";
  closeLabel?: string;
}

let openCount = 0;
function lockScroll(lock: boolean) {
  openCount = Math.max(0, openCount + (lock ? 1 : -1));
  document.documentElement.classList.toggle("is-locked", openCount > 0);
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

/** Accessible dialog: focus trap, Escape to close, scroll lock, focus restore. */
export function Modal({ open, onClose, labelledBy, children, className, variant = "card", closeLabel = "बंद करें" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      } else if (e.key === "Tab" && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className={cx("modal", `modal--${variant}`)} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panelRef} className={cx("modal__panel", className)} role="dialog" aria-modal="true" aria-labelledby={labelledBy} tabIndex={-1}>
        <button type="button" className="modal__close" onClick={onClose} aria-label={closeLabel}>
          <Icon name="x" size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
