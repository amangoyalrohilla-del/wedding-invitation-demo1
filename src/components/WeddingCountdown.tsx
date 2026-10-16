"use client";

import { googleCalendarUrl } from "@/lib/calendar";
import { useEffect, useRef, useState } from "react";
import { mainEvent, wedding } from "@/config/wedding";
import { useReveal } from "@/lib/motion";
import { pad2 } from "@/lib/utils";
import { Mandala, SectionHeading } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

/** Single authoritative instant: ISO string with +05:30 offset, so every timezone counts down to the same moment. */
const TARGET = Date.parse(mainEvent.start);

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function remaining(now: number): Remaining {
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

export function WeddingCountdown() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  // null on the server and first client render → identical markup, no hydration mismatch.
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    let timer = 0;
    const tick = () => {
      setLeft(remaining(Date.now()));
      // re-align to the next whole second; recomputing from Date.now() keeps it correct after the tab sleeps
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    tick();
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        window.clearTimeout(timer);
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const units: Array<{ key: keyof Omit<Remaining, "done">; hi: string; en: string }> = [
    { key: "days", hi: "दिन", en: "Days" },
    { key: "hours", hi: "घंटे", en: "Hours" },
    { key: "minutes", hi: "मिनट", en: "Minutes" },
    { key: "seconds", hi: "सेकंड", en: "Seconds" },
  ];
  const c = wedding.countdown;
  const done = left?.done ?? false;

  return (
    <section id="countdown" ref={ref} className="countdown" aria-labelledby="countdown-title">
      <Mandala className="countdown__mandala" />
      <div className="countdown__inner">
        <SectionHeading eyebrow="The Auspicious Hour" title={done ? c.doneHeading : c.heading} id="countdown-title" light />
        {done ? (
          <p className="countdown__done" lang="hi">{c.doneMessage}</p>
        ) : (
          <div className="countdown__grid" role="timer" aria-live="off" aria-label={left ? `${left.days} दिन ${left.hours} घंटे ${left.minutes} मिनट शेष` : "गणना हो रही है"}>
            {units.map((u) => {
              const v = left ? left[u.key] : null;
              const text = v === null ? "––" : u.key === "days" ? String(v) : pad2(v);
              return (
                <div className="cd" key={u.key} data-reveal>
                  <svg className="cd__lotus" viewBox="0 0 40 20" aria-hidden="true">
                    <path d="M20 1 c 5 5 5 12 0 17 c -5 -5 -5 -12 0 -17z M20 18 c -4 -8 -11 -11 -17 -10 c 3 6 9 10 17 10z M20 18 c 4 -8 11 -11 17 -10 c -3 6 -9 10 -17 10z" />
                  </svg>
                  <span className="cd__value" key={u.key === "seconds" ? text : undefined}>{text}</span>
                  <span className="cd__hi" lang="hi">{u.hi}</span>
                  <span className="cd__en">{u.en}</span>
                </div>
              );
            })}
          </div>
        )}
        <p className="countdown__when" data-reveal>
          <span lang="hi">{mainEvent.dateHi}</span> · {mainEvent.timeEn} IST · {wedding.venue.nameEn}
        </p>
        <div className="countdown__cta" data-reveal>
          <RoyalButton variant="ivory" icon="calendarPlus" href={googleCalendarUrl(mainEvent)}>
            Save The Date · कैलेंडर में जोड़ें
          </RoyalButton>
        </div>
      </div>
    </section>
  );
}
