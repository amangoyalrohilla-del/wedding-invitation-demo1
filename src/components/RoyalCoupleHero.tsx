"use client";

import { googleCalendarUrl } from "@/lib/calendar";
import { useEffect, useRef } from "react";
import { mainEvent, wedding } from "@/config/wedding";
import { asset, prefersReducedMotion } from "@/lib/utils";
import { ensureGsap } from "@/lib/motion";
import { useInvite } from "./InviteContext";
import { REVEAL_EVENT } from "./RoyalGateIntro";
import { Divider, Ganesh, Mandala } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";
import { PetalCanvas } from "./ui/PetalCanvas";

export function RoyalCoupleHero() {
  const { gateOpen } = useInvite();
  const ref = useRef<HTMLElement | null>(null);
  const h = wedding.hero;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const g = ensureGsap();
    // Listening for an event (instead of React state) means the entrance starts without re-rendering
    // the page in the middle of the door animation.
    const ctx = g.context(() => {}, el);
    const play = () => {
      ctx.add(() => {
      const tl = g.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero__blessing", { opacity: 0, y: -20, duration: 1.4 })
        .from(".hero__pic", { opacity: 0, y: 50, scale: 0.94, duration: 1.8 }, 0.3)
        .from(".hero__pic img", { scale: 1.15, duration: 2.8 }, "<")
        .from(".hero__shadow", { opacity: 0, scaleX: 0.5, duration: 1.6 }, "<0.3")
        .from(".hero [data-hero]", { y: 36, opacity: 0, duration: 1.4, stagger: 0.12 }, 0.7)
        .from(".hero__amp", { scale: 0.4, opacity: 0, rotate: -20, duration: 1.6 }, 1.0)
        .from(".hero__date-line", { scaleX: 0, duration: 1.4, ease: "power3.inOut" }, 1.4)
        .from(".hero__mandala", { opacity: 0, scale: 0.8, duration: 3 }, 0);
      });
    };
    window.addEventListener(REVEAL_EVENT, play);
    return () => {
      window.removeEventListener(REVEAL_EVENT, play);
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-names">
      <div className="hero__bg" aria-hidden="true" />
      <Mandala className="hero__mandala" />
      <div className="hero__inner">
        <div className="hero__blessing">
          <Ganesh className="hero__ganesh" />
          <p className="hero__invocation" lang="hi">{h.invocation}</p>
        </div>
        <div className="hero__text">
          <p className="hero__kicker" data-hero lang="hi">{h.kicker}</p>
          <h1 className="hero__names" id="hero-names">
            <span className="hero__name" data-hero>{wedding.groom.nameEn}</span>
            <span className="hero__amp" aria-label="and">&amp;</span>
            <span className="hero__name" data-hero>{wedding.bride.nameEn}</span>
          </h1>
          <p className="hero__subtitle" data-hero lang="hi">{h.subtitleHi}</p>
          <p className="hero__tagline" data-hero lang="hi">{h.tagline}</p>
          <div className="hero__date" data-hero>
            <span className="hero__date-line" aria-hidden="true" />
            <time dateTime="2026-12-25">{h.dateDisplay}</time>
            <span className="hero__date-line" aria-hidden="true" />
          </div>
          <p className="hero__place" data-hero lang="hi">{h.locationHi}</p>
          <Divider light className="hero__divider" />
          <div className="hero__ctas" data-hero>
            <RoyalButton to="couple" iconRight="chevronDown">हमारी कहानी देखें</RoyalButton>
            <RoyalButton variant="outline" icon="calendarPlus" href={googleCalendarUrl(mainEvent)}>तारीख़ याद रखें</RoyalButton>
          </div>
        </div>
        <div className="hero__photo-wrap">
          <div className="hero__photo">
            <div className="hero__pic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(h.image)} alt={h.imageAlt} width={1000} height={1694} loading="eager" fetchPriority="high" decoding="async" />
            </div>
            <span className="hero__shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
      <PetalCanvas density={0.7} className="hero__petals" active={gateOpen} />
      <a className="hero__scroll" href="#couple" aria-label="नीचे स्क्रॉल करें">
        <span />
      </a>
    </section>
  );
}
