"use client";

import { useEffect, useRef, useState } from "react";
import { wedding, type FilmClip } from "@/config/wedding";
import { asset } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

/** Pauses every other film when one starts, so only one plays at a time. */
const PLAY_EVENT = "royal-film-play";

/** A film that plays inside its own frame (native controls: pause, volume, fullscreen). */
function FramedFilm({ clip }: { clip: FilmClip }) {
  const video = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== clip.id) video.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOther);
    return () => window.removeEventListener(PLAY_EVENT, onOther);
  }, [clip.id]);

  const start = () => {
    const v = video.current;
    if (!v) return;
    setStarted(true);
    const from = clip.startAt ?? 0;
    if (from) {
      const seek = () => {
        if (v.currentTime < from) v.currentTime = from;
      };
      if (v.readyState >= 1) seek();
      else v.addEventListener("loadedmetadata", seek, { once: true });
    }
    // play() is called inside the tap itself, which every mobile browser accepts.
    v.play().catch(() => {
      v.muted = true; // if sound is blocked, play muted rather than not at all
      void v.play().catch(() => setStarted(false));
    });
  };

  return (
    <figure className="reel">
      <div className="reel__box">
        <span className="tf__knot tf__knot--tl" aria-hidden="true" />
        <span className="tf__knot tf__knot--tr" aria-hidden="true" />
        <span className="tf__knot tf__knot--bl" aria-hidden="true" />
        <span className="tf__knot tf__knot--br" aria-hidden="true" />
        <div className={`reel__screen reel__screen--${clip.orientation}`}>
          <video
            ref={video}
            className="reel__video"
            poster={asset(clip.poster)}
            playsInline
            preload="none"
            controls={started}
            controlsList="nodownload"
            onPlay={() => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: clip.id }))}
            onError={() => setError(true)}
          >
            {clip.webm && <source src={asset(clip.webm)} type="video/webm" />}
            <source src={`${asset(clip.src)}${clip.startAt ? `#t=${clip.startAt}` : ""}`} type="video/mp4" />
          </video>
          {!started && (
            <button type="button" className="reel__play" onClick={start} aria-label={`चलाएँ: ${clip.titleHi}`}>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" className="reel__ring" />
                <circle cx="50" cy="50" r="38" className="reel__ring reel__ring--thin" />
                <path d="M42 34 L68 50 L42 66 Z" />
              </svg>
            </button>
          )}
          {error && <p className="reel__error" lang="hi">वीडियो लोड नहीं हो सका।</p>}
        </div>
      </div>
      <figcaption className="reel__caption">
        <Icon name="play" size={12} />
        <span lang="hi">{clip.titleHi}</span>
        <small>{clip.duration}</small>
      </figcaption>
    </figure>
  );
}

export function PreWeddingFilm() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  return (
    <section id="film" ref={ref} className="film" aria-labelledby="film-title">
      <div className="film__inner">
        <SectionHeading eyebrow={wedding.film.subheading} title={wedding.film.heading} id="film-title" />
        <p className="film__body" data-reveal lang="hi">
          कुछ लम्हें शब्दों में नहीं, नज़रों में बयाँ होते हैं। हमारी प्री-वेडिंग फ़िल्म के ये पल, उन्हीं लम्हों की एक झलक हैं।
        </p>
        <div className="film__reels">
          {wedding.film.clips.map((c) => (
            <FramedFilm key={c.id} clip={c} />
          ))}
        </div>
        <div className="film__ctas" data-reveal>
          <RoyalButton variant="outline" to="gallery" iconRight="chevronDown">यादगार लम्हें देखें</RoyalButton>
        </div>
      </div>
    </section>
  );
}
