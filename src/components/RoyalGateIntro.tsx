"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { ensureGsap, ScrollTrigger } from "@/lib/motion";
import { isSmallScreen, prefersReducedMotion } from "@/lib/utils";
import { useInvite } from "./InviteContext";
import { DoorPanel, HangingLamp, Pillar } from "./art/DoorPanel";
import { PetalCanvas } from "./ui/PetalCanvas";
import { ARCH_INNER, ARCH_OUTER } from "./ui/Ornaments";

/** Fired when the doors have opened far enough for the couple section to start its entrance. */
export const REVEAL_EVENT = "invite:reveal";

function Knocker() {
  return (
    <svg className="knocker__svg" viewBox="0 0 40 60" aria-hidden="true">
      <circle cx="20" cy="12" r="10" fill="#b8924f" stroke="#5c3f17" strokeWidth="1.5" />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="20" cy="5" rx="2.4" ry="5" fill="#e4c785" transform={`rotate(${i * 45} 20 12)`} />
      ))}
      <circle cx="20" cy="12" r="3.4" fill="#5c3f17" />
      <g className="knocker__ring">
        <circle cx="20" cy="36" r="15" fill="none" stroke="#5c3f17" strokeWidth="6" />
        <circle cx="20" cy="36" r="15" fill="none" stroke="#e2c27c" strokeWidth="3.4" />
        <circle cx="20" cy="51" r="3.4" fill="#e2c27c" />
      </g>
    </svg>
  );
}

/** Cinematic royal palace door intro. Opens inward in 3D, light floods in, the camera moves through. */
export function RoyalGateIntro() {
  const { gateOpen, openGate } = useInvite();
  const root = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  // Lock page scroll and make the page behind inert while the doors are closed.
  useEffect(() => {
    const html = document.documentElement;
    const main = document.getElementById("main");
    html.classList.toggle("gate-locked", !gateOpen);
    if (main) main.toggleAttribute("inert", !gateOpen);
    if (!gateOpen) {
      setBusy(false);
      root.current?.querySelector<HTMLButtonElement>(".gate__cta")?.focus({ preventScroll: true });
    }
    return () => {
      html.classList.remove("gate-locked");
      main?.removeAttribute("inert");
    };
  }, [gateOpen]);

  if (gateOpen) return null;

  const open = () => {
    if (busy || !root.current) return;
    setBusy(true);
    const g = ensureGsap();
    const q = g.utils.selector(root.current);
    const finish = () => {
      // Hand the page over straight away (scrolling, clicks) without re-rendering anything…
      const gateEl = root.current;
      if (gateEl) {
        gateEl.style.visibility = "hidden";
        gateEl.style.pointerEvents = "none";
      }
      document.documentElement.classList.remove("gate-locked");
      document.getElementById("main")?.removeAttribute("inert");
      // …and only tidy up (remove the gate, show the menu bar) once the couple's entrance has played,
      // so no heavy work lands in the middle of the animation.
      window.setTimeout(() => {
        openGate();
        window.setTimeout(() => ScrollTrigger.refresh(), 300);
      }, 2600);
    };

    if (prefersReducedMotion()) {
      window.dispatchEvent(new Event(REVEAL_EVENT));
      g.to(root.current, { opacity: 0, duration: 0.6, ease: "power1.out", onComplete: finish });
      return;
    }

    const small = isSmallScreen();
    root.current.classList.add("is-opening");
    const tl = g.timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish });
    tl.to(q(".gate__ui"), { opacity: 0, y: 16, duration: 0.45, ease: "power2.in" })
      .set(q(".gate__seal"), { display: "none" })
      .to(q(".gate__blessing"), { opacity: 0, y: -10, duration: 0.45, ease: "power2.in" }, "<")
      // handles lift and drop
      .to(q(".knocker__ring"), { rotation: 32, svgOrigin: "20 22", duration: 0.22, ease: "power2.out" }, "-=0.1")
      .to(q(".knocker__ring"), { rotation: 0, svgOrigin: "20 22", duration: 0.9, ease: "elastic.out(1, 0.3)" })
      // golden light leaks through the seam
      .to(q(".gate__seam"), { scaleY: 1, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.35")
      .to(q(".gate__beyond"), { opacity: 1, duration: 0.8 }, "<")
      // doors swing inward, and the camera starts gliding forward while they are still opening,
      // so the whole move is one continuous motion with no pause in between
      .addLabel("swing", "-=0.1")
      .to(q(".door--left"), { rotationY: 104, duration: 2.4, ease: "power2.inOut" }, "swing")
      .to(q(".door--right"), { rotationY: -104, duration: 2.4, ease: "power2.inOut" }, "swing")
      .to(q(".door__shade"), { opacity: 0.85, duration: 2.2, ease: "none" }, "swing")
      .to(q(".gate__seam"), { opacity: 0, scaleX: 8, duration: 1.0 }, "swing+=0.3")
      .to(q(".gate__rays"), { opacity: 1, scale: 1.35, duration: 3.2, ease: "sine.out" }, "swing+=0.2")
      .to(q(".lamp__glow"), { scale: 1.4, opacity: 1, duration: 1.2 }, "swing")
      .to(q(".gate__stage"), { scale: small ? 2.6 : 3.1, yPercent: small ? 4 : 6, duration: 2.9, ease: "power1.in" }, "swing+=0.6")
      .to(q(".gate__bg"), { scale: 1.35, opacity: 0.4, duration: 2.9, ease: "power1.in" }, "<")
      .add(() => window.dispatchEvent(new Event(REVEAL_EVENT)), "swing+=2.9")
      .to(q(".gate__flash"), { opacity: 1, duration: 0.6, ease: "sine.in" }, "swing+=2.85")
      .to(root.current, { opacity: 0, duration: 0.8, ease: "sine.out" }, "swing+=3.4");
  };

  return (
    <div ref={root} className="gate" role="region" aria-label="शाही निमंत्रण — द्वार">
      <div className="gate__bg" aria-hidden="true" />
      <PetalCanvas density={0.55} className="gate__petals" />
      <div className="gate__stage">
        <p className="gate__blessing">
          <span className="gate__blessing-line" aria-hidden="true" />
          <span lang="hi">॥ {wedding.intro.blessing} ॥</span>
          <span className="gate__blessing-line" aria-hidden="true" />
        </p>

        <div className="gate__portal">
          <Pillar className="gate__pillar gate__pillar--l" />
          <div className="gate__surround">
            <HangingLamp className="lamp lamp--l" />
            <HangingLamp className="lamp lamp--r" />
            <svg className="gate__carving" viewBox="-8 -8 116 156" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="surround-stone" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#a9714a" />
                  <stop offset="1" stopColor="#6d3f25" />
                </linearGradient>
              </defs>
              <path d="M-8,148 V44 C-8,16 16,6 32,1 C42,-2 48,-5 50,-8 C52,-5 58,-2 68,1 C84,6 108,16 108,44 V148 Z" fill="url(#surround-stone)" />
              <path d="M-8,148 V44 C-8,16 16,6 32,1 C42,-2 48,-5 50,-8 C52,-5 58,-2 68,1 C84,6 108,16 108,44 V148" fill="none" stroke="#e2c27c" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              <path d="M-4,148 V45 C-4,20 18,10 33,5.5 C43,2.5 48,-1 50,-4 C52,-1 57,2.5 67,5.5 C82,10 104,20 104,45 V148" fill="none" stroke="#2b120a" strokeWidth="5" vectorEffect="non-scaling-stroke" opacity="0.5" />
              <path d="M-4,148 V45 C-4,20 18,10 33,5.5 C43,2.5 48,-1 50,-4 C52,-1 57,2.5 67,5.5 C82,10 104,20 104,45 V148" fill="none" stroke="#e8c98c" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={ARCH_OUTER} fill="none" stroke="#e2c27c" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="gate__doorway">
              <div className="gate__opening" aria-hidden="true">
                <div className="gate__beyond" />
                <div className="gate__rays" />
              </div>
              <div className="door door--left">
                <DoorPanel side="left" />
                <span className="door__shade" />
                <span className="knocker knocker--l"><Knocker /></span>
              </div>
              <div className="door door--right">
                <DoorPanel side="right" />
                <span className="door__shade" />
                <span className="knocker knocker--r"><Knocker /></span>
              </div>
              <span className="gate__seam" aria-hidden="true" />
              <button type="button" className="gate__seal" onClick={open} disabled={busy} tabIndex={-1} aria-label={wedding.intro.ctaHi} />
              <svg className="gate__arch-line" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true">
                <path d={ARCH_INNER} fill="none" stroke="#e2c27c" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.7" />
              </svg>
            </div>
          </div>

          <Pillar className="gate__pillar gate__pillar--r" />
        </div>

        <div className="gate__ui">
          <button type="button" className="gate__cta" onClick={open} disabled={busy}>
            <span className="gate__cta-hi" lang="hi">{wedding.intro.ctaHi}</span>
            <span className="gate__cta-en">{wedding.intro.ctaEn}</span>
          </button>
          <p className="gate__hint">{wedding.groom.shortEn} &amp; {wedding.bride.shortEn} · {wedding.hero.dateDisplay}</p>
        </div>
      </div>
      <div className="gate__flash" aria-hidden="true" />
    </div>
  );
}
