"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./utils";

let registered = false;
export function ensureGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveals for everything inside `scope` marked with:
 *   data-reveal            → fade + rise
 *   data-reveal="image"    → curtain wipe + gentle zoom
 *   data-reveal="stagger"  → children rise one after another
 *   data-draw              → SVG strokes draw themselves
 *   data-parallax="0.15"   → drifts while scrolling (desktop only)
 * Content is visible by default; animations only run when JS and motion are allowed.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []): void {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const g = ensureGsap();
    const ctx = g.context(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal;
        const st = { trigger: el, start: "top 88%", once: true } as const;
        if (kind === "image") {
          g.fromTo(
            el,
            { clipPath: "inset(12% 8% 12% 8%)", scale: 1.06, opacity: 0.2 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.5, ease: "expo.out", scrollTrigger: st, clearProps: "clipPath,transform" },
          );
        } else if (kind === "stagger") {
          g.from(el.children, { y: 34, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: st });
        } else {
          g.from(el, { y: 30, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: st });
        }
      });

      root.querySelectorAll<SVGGeometryElement>("[data-draw] path, [data-draw] line, [data-draw] circle").forEach((p) => {
        const len = typeof p.getTotalLength === "function" ? p.getTotalLength() : 0;
        if (!len) return;
        g.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: p.closest("[data-draw]") as Element, start: "top 90%", once: true } },
        );
      });

      if (window.matchMedia("(min-width: 768px)").matches) {
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "0.1");
          g.fromTo(el, { yPercent: amt * 100 }, { yPercent: -amt * 100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
