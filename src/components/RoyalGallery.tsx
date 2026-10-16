"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { asset } from "@/lib/utils";
import { useReveal } from "@/lib/motion";
import { Icon } from "./ui/Icon";
import { Modal } from "./ui/Modal";
import { SectionHeading } from "./ui/Ornaments";
import { RoyalButton } from "./ui/RoyalButton";

export function RoyalGallery() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  const imgs = wedding.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + imgs.length) % imgs.length)), [imgs.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // warm up neighbours
    [1, -1].forEach((d) => {
      const im = new Image();
      im.src = asset(imgs[(index + d + imgs.length) % imgs.length].src);
    });
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, imgs]);

  const current = index === null ? null : imgs[index];

  return (
    <section id="gallery" ref={ref} className="gallery" aria-labelledby="gallery-title">
      <div className="gallery__inner">
        <SectionHeading eyebrow="Moments in Gold" title="यादगार लम्हें" id="gallery-title" light />
        <ul className="gallery__grid">
          {imgs.map((im, i) => (
            <li key={im.src} className="gallery__item" data-reveal>
              <button type="button" className="gallery__frame" onClick={() => setIndex(i)} aria-label={`बड़ा करके देखें: ${im.caption}`}>
                <span className="gallery__photo" style={{ aspectRatio: `${im.width} / ${im.height}` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(im.src)} alt={im.alt} width={im.width} height={im.height} loading="lazy" decoding="async" />
                </span>
                <span className="gallery__cap" lang="hi">{im.caption}</span>
                <span className="gallery__knot gallery__knot--l" aria-hidden="true" />
                <span className="gallery__knot gallery__knot--r" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className="gallery__cta" data-reveal>
          <RoyalButton to="venue" iconRight="chevronDown">शुभ विवाह की ओर</RoyalButton>
        </div>
      </div>

      <Modal open={current !== null} onClose={() => setIndex(null)} labelledBy="lb-caption" variant="cinema" className="lightbox">
        {current && index !== null && (
          <div
            className="lightbox__stage"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={current.src} className="lightbox__img" src={asset(current.src)} alt={current.alt} width={current.width} height={current.height} />
            <p className="lightbox__caption" id="lb-caption">
              <span lang="hi">{current.caption}</span>
              <small>{index + 1} / {imgs.length}</small>
            </p>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="पिछली तस्वीर">
              <Icon name="chevronLeft" size={26} />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="अगली तस्वीर">
              <Icon name="chevronRight" size={26} />
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
