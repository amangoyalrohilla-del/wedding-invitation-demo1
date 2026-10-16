"use client";

import { useRef } from "react";
import { wedding, type WeddingEvent } from "@/config/wedding";
import { directionsUrl } from "@/lib/maps";
import { googleCalendarUrl } from "@/lib/calendar";
import { useReveal } from "@/lib/motion";
import { useInvite } from "./InviteContext";
import { EventMotif } from "./art/EventMotifs";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

function EventItem({ ev, index }: { ev: WeddingEvent; index: number }) {
  const { openEventDetails } = useInvite();
  const cta =
    ev.cta.action === "directions" ? (
      <RoyalButton small variant="outline" icon="navigation" href={directionsUrl()} ariaLabel={`${ev.cta.label} — ${ev.titleHi}`}>
        {ev.cta.label}
      </RoyalButton>
    ) : ev.cta.action === "calendar" ? (
      <RoyalButton small variant="outline" icon="calendarPlus" href={googleCalendarUrl(ev)}>
        {ev.cta.label}
      </RoyalButton>
    ) : (
      <RoyalButton small variant="outline" iconRight="chevronRight" onClick={() => openEventDetails(ev.id)}>
        {ev.cta.label}
      </RoyalButton>
    );

  return (
    <li className={`tl ev--${ev.motif}${index % 2 ? " tl--flip" : ""}`} aria-labelledby={`ev-${ev.id}`}>
      <div className="tl__medal">
        <svg className="tl__petals" viewBox="-60 -60 120 120" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <path key={i} d="M0 -58 C 4 -54 4 -50 0 -46 C -4 -50 -4 -54 0 -58 Z" transform={`rotate(${i * 15})`} />
          ))}
        </svg>
        <div className="tl__disc ev__art">
          <EventMotif motif={ev.motif} />
        </div>
      </div>
      <span className="tl__node" aria-hidden="true">
        <svg viewBox="0 0 24 30"><path d="M12 2 c 5 7 7 12 7 16 a 7 7 0 0 1 -14 0 c 0 -4 2 -9 7 -16z" /><path d="M3 26 h18" /></svg>
      </span>
      <div className="tl__text">
        <p className="ev__en">{ev.titleEn}</p>
        <h3 className="ev__title" id={`ev-${ev.id}`} lang="hi">{ev.titleHi}</h3>
        <p className="ev__when">
          <span><Icon name="calendar" size={15} /> {ev.dateHi}</span>
          <span><Icon name="clock" size={15} /> {ev.timeHi}</span>
        </p>
        <p className="ev__desc" lang="hi">{ev.description}</p>
        <div className="ev__cta">{cta}</div>
      </div>
    </li>
  );
}

export function WeddingEvents() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const days = [
    { label: "पहला दिन · 24 दिसंबर", sub: "Thursday · Haldi, Mehendi & Sangeet", events: wedding.events.filter((e) => e.start.startsWith("2026-12-24")) },
    { label: "दूसरा दिन · 25 दिसंबर", sub: "Friday · Baraat, Pheras & Reception", events: wedding.events.filter((e) => !e.start.startsWith("2026-12-24")) },
  ];
  let i = 0;
  return (
    <section id="celebrations" ref={ref} className="events" aria-labelledby="events-title">
      <div className="events__inner">
        <SectionHeading eyebrow="Royal Celebrations" title="शाही उत्सव" id="events-title" />
        <p className="events__intro" data-reveal lang="hi">दो दिन, छह रस्में और अनगिनत यादें — हर कार्यक्रम का विवरण, समय और स्थान यहाँ है।</p>
        {days.map((day) => (
          <div className="events__day" key={day.label}>
            <div className="events__day-head" data-reveal>
              <h3 lang="hi">{day.label}</h3>
              <p>{day.sub}</p>
            </div>
            <ol className="timeline" data-reveal="stagger">
              {day.events.map((ev) => (
                <EventItem key={ev.id} ev={ev} index={i++} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
