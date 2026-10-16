"use client";

import { useRef } from "react";
import { wedding } from "@/config/wedding";
import { asset } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { Divider, TempleFrame } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

const SIZES = [
  { width: 1000, height: 1138 },
  { width: 584, height: 1020 },
  { width: 768, height: 1290 },
];

export function CoupleStory() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const s = wedding.story;
  const [main, second, third] = s.images;
  return (
    <section id="story" ref={ref} className="story" aria-labelledby="story-title">
      <div className="story__pattern" aria-hidden="true" />
      <div className="story__inner">
        <header className="story__head">
          <p className="story__eyebrow" data-reveal>Our Story</p>
          <h2 className="story__title" id="story-title" data-reveal lang="hi">{s.heading}</h2>
          <Divider light />
        </header>
        <div className="story__row">
          <TempleFrame className="story__side story__side--l" src={asset(second.src)} alt={second.alt} {...SIZES[1]} />
          <TempleFrame className="story__main" src={asset(main.src)} alt={main.alt} {...SIZES[0]} />
          <TempleFrame className="story__side story__side--r" src={asset(third.src)} alt={third.alt} {...SIZES[2]} />
        </div>
        <div className="story__text">
          <p className="story__phrase" data-reveal>{s.phrase}</p>
          <p className="story__body" data-reveal lang="hi">{s.text}</p>
          <div data-reveal>
            <RoyalButton to="celebrations" iconRight="chevronDown">शादी के कार्यक्रम देखें</RoyalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
