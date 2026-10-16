"use client";

import { googleCalendarUrl } from "@/lib/calendar";
import { useRef } from "react";
import { mainEvent, wedding } from "@/config/wedding";
import { directionsUrl } from "@/lib/maps";
import { asset, scrollToId } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { useInvite } from "./InviteContext";
import { PalaceArt } from "./art/PalaceArt";
import { Divider, GoldHeart, Mandala, Monogram, TempleFrame } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";
import { PetalCanvas } from "./ui/PetalCanvas";
import { Icon } from "./ui/Icon";

/** Toran — the mango-leaf and marigold garland hung over Rajasthani doorways. */
function Toran() {
  return (
    <svg className="toran" viewBox="0 0 1200 90" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 8 Q600 34 1200 8" className="toran__string" />
      {Array.from({ length: 41 }, (_, i) => {
        const x = i * 30;
        const y = 8 + Math.sin((x / 1200) * Math.PI) * 13;
        return i % 2 ? (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0 c -9 12 -9 30 0 44 c 9 -14 9 -32 0 -44z" className="toran__leaf" />
            <path d="M0 4 V40" className="toran__vein" />
          </g>
        ) : (
          <g key={i} transform={`translate(${x} ${y})`}>
            <line x1="0" y1="0" x2="0" y2="18" className="toran__vein" />
            <circle cy="24" r="7.5" className={i % 4 ? "toran__mg toran__mg--b" : "toran__mg"} />
            <circle cy="24" r="3" className="toran__mg-c" />
            <path d="M-3 34 h6 l-3 8z" className="toran__bell" />
          </g>
        );
      })}
    </svg>
  );
}

export function FamilyBlessings() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const f = wedding.family;
  return (
    <section id="family" ref={ref} className="family" aria-labelledby="family-title">
      <Toran />
      <Mandala className="family__mandala" />
      <div className="family__inner">
        <p className="family__eyebrow" data-reveal>With the Blessings of Our Families</p>
        <h2 className="family__title" id="family-title" data-reveal lang="hi">{f.heading}</h2>
        <Divider light />
        <p className="family__text" data-reveal lang="hi">{f.invitation}</p>
        <div className="family__sides" data-reveal="stagger">
          <div className="family__side">
            <p className="family__label" lang="hi">{f.groomSideLabel}</p>
            <p className="family__house" lang="hi">{f.groomFamily}</p>
            <p lang="hi">{wedding.groom.father}</p>
            <p lang="hi">{wedding.groom.mother}</p>
          </div>
          <div className="family__knot" aria-hidden="true">
            <svg viewBox="0 0 60 120">
              <path d="M30 4 C 10 30, 50 50, 30 60 C 10 70, 50 90, 30 116" />
              <path d="M30 4 C 50 30, 10 50, 30 60 C 50 70, 10 90, 30 116" />
              <circle cx="30" cy="60" r="5" />
            </svg>
          </div>
          <div className="family__side">
            <p className="family__label" lang="hi">{f.brideSideLabel}</p>
            <p className="family__house" lang="hi">{f.brideFamily}</p>
            <p lang="hi">{wedding.bride.father}</p>
            <p lang="hi">{wedding.bride.mother}</p>
          </div>
        </div>
        <p className="family__closing" data-reveal lang="hi">{f.closing}</p>
        <div data-reveal>
          <RoyalButton variant="ivory" to="celebrations" iconRight="chevronRight">समारोह की जानकारी देखें</RoyalButton>
        </div>
      </div>
    </section>
  );
}

export function FinalInvitation() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const fin = wedding.finale;
  return (
    <section id="invitation" ref={ref} className="finale" aria-labelledby="finale-title">
      <div className="finale__glow" aria-hidden="true" />
      <PalaceArt className="finale__palace" mode="silhouette" />
      <PetalCanvas density={0.8} className="finale__petals" />
      <div className="finale__inner">
        <TempleFrame className="finale__photo" src={asset(fin.image)} alt={fin.imageAlt} width={900} height={1600} />
        <div className="finale__text">
          <h2 className="finale__headline" id="finale-title" data-reveal lang="hi">{fin.headline}</h2>
          <p className="finale__names" data-reveal lang="hi">
            {wedding.groom.shortHi} <GoldHeart /> {wedding.bride.shortHi}
          </p>
          <p className="finale__date" data-reveal lang="hi">{fin.dateHi}</p>
          <Divider light />
          <p className="finale__blessing" data-reveal lang="hi">{fin.blessing}</p>
          <div className="finale__ctas" data-reveal>
            <RoyalButton icon="calendarPlus" href={googleCalendarUrl(mainEvent)}>Save The Date</RoyalButton>
            <RoyalButton variant="outline" icon="navigation" href={directionsUrl()}>Get Directions</RoyalButton>
            <RoyalButton variant="ghost" icon="arrowUp" onClick={() => scrollToId("home")}>Back To Top</RoyalButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WeddingFooter() {
  const { replayIntro } = useInvite();
  return (
    <footer className="footer">
      <Monogram className="footer__mono" />
      <p className="footer__names">{wedding.groom.shortEn} &amp; {wedding.bride.shortEn}</p>
      <p className="footer__date" lang="hi">24–25 दिसंबर 2026 · जयपुर</p>
      <div className="footer__actions">
        <button type="button" className="footer__link" onClick={replayIntro}>
          <Icon name="rotate" size={15} /> महल का द्वार फिर से खोलें
        </button>
        <button type="button" className="footer__link" onClick={() => scrollToId("home")}>
          <Icon name="arrowUp" size={15} /> ऊपर जाएँ
        </button>
      </div>
      <p className="footer__credit">{wedding.footer.credit}</p>
    </footer>
  );
}
