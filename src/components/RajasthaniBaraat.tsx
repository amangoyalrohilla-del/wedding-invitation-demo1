"use client";

import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { useReveal } from "@/lib/motion";
import { FortSkyline, ProcessionStrip } from "./art/BaraatArt";
import { Divider } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";
import { PetalCanvas } from "./ui/PetalCanvas";

/** Cinematic dusk procession: fort skyline, festoon lights and a looping baraat. */
export function RajasthaniBaraat() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const b = wedding.baraat;
  return (
    <section id="baraat" ref={ref} className="baraat" aria-labelledby="baraat-title">
      <div className="baraat__sky" aria-hidden="true">
        <span className="baraat__sun" />
        <span className="baraat__stars" />
      </div>
      <div className="baraat__far" data-parallax="0.06" aria-hidden="true">
        <FortSkyline className="baraat__fort" />
      </div>
      <svg className="baraat__lights" viewBox="0 0 1600 140" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        {[
          { d: "M-20,10 Q400,120 820,14", n: 18, off: 0 },
          { d: "M780,14 Q1200,110 1620,8", n: 18, off: 0.4 },
        ].map((s, si) => (
          <g key={si}>
            <path d={s.d} fill="none" stroke="#3a1a10" strokeWidth="1.4" />
            {Array.from({ length: s.n }, (_, i) => {
              const t = (i + 0.5) / s.n;
              const x0 = si === 0 ? -20 : 780;
              const x2 = si === 0 ? 820 : 1620;
              const y0 = si === 0 ? 10 : 14;
              const y2 = si === 0 ? 14 : 8;
              const cxp = si === 0 ? 400 : 1200;
              const cyp = si === 0 ? 120 : 110;
              const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cxp + t * t * x2;
              const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cyp + t * t * y2;
              return <circle key={i} cx={x} cy={y + 5} r="4" className={`bulb bulb--${i % 3}`} style={{ animationDelay: `${(i * 0.23 + s.off) % 2}s` }} />;
            })}
          </g>
        ))}
      </svg>

      <div className="baraat__content">
        <p className="baraat__eyebrow" data-reveal>The Royal Procession</p>
        <h2 className="baraat__title" id="baraat-title" data-reveal lang="hi">{b.title}</h2>
        <Divider light />
        <p className="baraat__line" data-reveal lang="hi">{b.line}</p>
        <div data-reveal>
          <RoyalButton to="celebrations" iconRight="chevronDown">{b.cta}</RoyalButton>
        </div>
      </div>

      <div className="procession" aria-hidden="true">
        <div className="procession__track">
          <ProcessionStrip />
          <ProcessionStrip />
        </div>
      </div>
      <div className="baraat__ground" aria-hidden="true" />
      <PetalCanvas density={0.5} className="baraat__petals" />
      <p className="sr-only">
        चित्रण: सजी हुई सफ़ेद घोड़ी पर सेहरा बाँधे दूल्हा, ऊपर शाही छत्र, आगे ढोल, नगाड़ा और शहनाई वादक, रंग-बिरंगे साफ़ों में बाराती, नाचती महिलाएँ, शाही बग्घी और सजा हुआ ऊँट, पीछे पहाड़ी किला।
      </p>
    </section>
  );
}
