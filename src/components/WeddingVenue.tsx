"use client";

import { googleCalendarUrl } from "@/lib/calendar";
import { useRef, useState } from "react";
import { mainEvent, wedding } from "@/config/wedding";
import { directionsUrl, mapsEmbedUrl, mapsSearchUrl } from "@/lib/maps";
import { asset, IS_STATIC_PREVIEW } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { PalaceArt } from "./art/PalaceArt";
import { Icon } from "./ui/Icon";
import { Divider } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

export function WeddingVenue() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  // The real site loads the embedded map lazily; the static preview cannot embed other sites.
  const [mapOn, setMapOn] = useState(!IS_STATIC_PREVIEW);
  const v = wedding.venue;

  return (
    <section id="venue" ref={ref} className="venue" aria-labelledby="venue-title">
      <div className="venue__banner">
        {v.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="venue__photo" src={asset(v.image)} alt={v.imageAlt} loading="lazy" />
        ) : (
          <PalaceArt className="venue__art" />
        )}
        <div className="venue__banner-text">
          <p className="venue__eyebrow" data-reveal>The Royal Venue</p>
          <h2 className="venue__title" id="venue-title" data-reveal lang="hi">शाही विवाह स्थल</h2>
          <p className="venue__name" data-reveal lang="hi">{v.nameHi}</p>
        </div>
      </div>

      <div className="venue__inner">
        <div className="venue__info">
          <Divider />
          <p className="venue__support" data-reveal lang="hi">{v.supporting}</p>
          <address className="venue__address" data-reveal>
            <Icon name="mapPin" size={20} />
            <span>
              <strong>{v.nameEn}</strong>
              {v.addressLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
          </address>
          <div className="venue__ctas" data-reveal>
            <RoyalButton href={directionsUrl()} icon="navigation">Get Directions · लोकेशन देखें</RoyalButton>
            <RoyalButton variant="outline" icon="calendarPlus" href={googleCalendarUrl(mainEvent)}>तारीख़ याद रखें</RoyalButton>
          </div>
          <p className="venue__note" lang="hi">{v.demoNote}</p>
        </div>

        <div className="venue__map" data-reveal>
          {mapOn && !IS_STATIC_PREVIEW ? (
            <iframe
              title={`Google Map — ${v.nameEn}`}
              src={mapsEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="venue__map-cover">
              <svg className="venue__map-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path d="M0 210 C 80 190, 140 230, 220 200 S 340 150, 400 170" />
                <path d="M60 0 C 80 80, 120 140, 110 300" />
                <path d="M0 90 C 120 110, 260 70, 400 100" />
                <path d="M260 0 C 250 80, 290 160, 330 300" />
                <path d="M150 0 L 170 300" className="thin" />
                <path d="M0 260 L 400 240" className="thin" />
                <circle cx="198" cy="148" r="46" className="ring" />
                <circle cx="198" cy="148" r="80" className="ring ring--2" />
              </svg>
              <span className="venue__pin"><Icon name="mapPin" size={30} /></span>
              <p className="venue__map-label">{v.nameEn}</p>
              {IS_STATIC_PREVIEW ? (
                <RoyalButton small variant="ivory" icon="map" href={mapsSearchUrl()}>Google Maps में खोलें</RoyalButton>
              ) : (
                <RoyalButton small variant="ivory" icon="map" onClick={() => setMapOn(true)}>इंटरैक्टिव मानचित्र दिखाएँ</RoyalButton>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
