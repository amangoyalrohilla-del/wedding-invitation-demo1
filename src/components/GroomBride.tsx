"use client";

import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { asset } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { Divider, Mandala, RoyalEmblem, TempleFrame } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

/**
 * The groom and bride portraits are finished artworks with their own gold frame and flowers,
 * so they are shown as they are (same size for both). Set a path to null for an empty frame instead.
 */
const PORTRAIT = { width: 1145, height: 1374 };

function Portrait({ src, alt, empty }: { src: string | null; alt: string; empty: string }) {
  if (!src) return <TempleFrame className="person__frame" src={null} alt={alt} width={500} height={600} emptyLabel={empty} />;
  return (
    <figure className="portrait" data-reveal>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} {...PORTRAIT} loading="lazy" decoding="async" />
    </figure>
  );
}

export function GroomIntroduction() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const g = wedding.groom;
  return (
    <section id="couple" ref={ref} className="person person--groom" aria-labelledby="groom-name">
      <Mandala className="person__mandala" />
      <div className="person__inner">
        <div className="person__media">
          <Portrait src={g.portrait ? asset(g.portrait) : null} alt={g.portraitAlt} empty="दूल्हे की फ़ोटो" />
        </div>
        <div className="person__text">
          <RoyalEmblem className="person__emblem" />
          <p className="person__eyebrow" data-reveal>The Groom</p>
          <h2 className="person__heading" data-reveal lang="hi">हमारे राजकुमार</h2>
          <p className="person__name" id="groom-name" data-reveal lang="hi">{g.nameHi}</p>
          <p className="person__name-en" data-reveal>{g.nameEn}</p>
          <Divider />
          <p className="person__family" data-reveal lang="hi">{g.familyLine}</p>
          <blockquote className="person__poem" data-reveal lang="hi">“{g.poem}”</blockquote>
          <div data-reveal>
            <RoyalButton to="bride" variant="gold" iconRight="chevronDown">दुल्हन से मिलें</RoyalButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrideIntroduction() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const b = wedding.bride;
  return (
    <section id="bride" ref={ref} className="person person--bride" aria-labelledby="bride-name">
      <div className="person__inner">
        <div className="person__text">
          <p className="person__eyebrow" data-reveal>The Bride</p>
          <h2 className="person__heading" data-reveal lang="hi">हमारी राजकुमारी</h2>
          <p className="person__name" id="bride-name" data-reveal lang="hi">{b.nameHi}</p>
          <p className="person__name-en" data-reveal>{b.nameEn}</p>
          <Divider />
          <p className="person__family" data-reveal lang="hi">{b.familyLine}</p>
          <blockquote className="person__poem" data-reveal lang="hi">“{b.poem}”</blockquote>
          <div data-reveal>
            <RoyalButton to="story" variant="gold" iconRight="chevronDown">दो दिलों का मिलन देखें</RoyalButton>
          </div>
        </div>
        <div className="person__media">
          <Portrait src={b.portrait ? asset(b.portrait) : null} alt={b.portraitAlt} empty="दुल्हन की फ़ोटो" />
        </div>
      </div>
    </section>
  );
}
