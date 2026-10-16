import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/utils";
import { wedding } from "@/config/wedding";

/* Ogee (Mughal-Rajput) arch in a 100×140 box; used for masks and gold borders. */
export const ARCH_OUTER = "M0,140 V46 C0,24 20,15 34,10 C43,7 48,4 50,0 C52,4 57,7 66,10 C80,15 100,24 100,46 V140 Z";
export const ARCH_INNER = "M4.5,135.5 V47 C4.5,27.5 22.5,19 35.5,14.5 C43,11.5 48,8.5 50,5.5 C52,8.5 57,11.5 64.5,14.5 C77.5,19 95.5,27.5 95.5,47 V135.5 Z";
export const ROUND_OUTER = "M0,140 V50 C0,22 22,0 50,0 C78,0 100,22 100,50 V140 Z";
export const ROUND_INNER = "M4.5,135.5 V50 C4.5,25 25,4.5 50,4.5 C75,4.5 95.5,25 95.5,50 V135.5 Z";

/** Shri Ganesh line-art (crown, ears, curled trunk, lotus seat) in antique gold. */
export function Ganesh({ className }: { className?: string }) {
  return (
    <svg className={cx("ganesh", className)} viewBox="0 0 120 130" role="img" aria-label="श्री गणेश">
      <circle cx="60" cy="62" r="56" className="ganesh__halo" />
      <g className="ganesh__line">
        <path className="ganesh__fill" d="M46 40 C46 32 50 28 52 26 C54 30 56 30 57 24 C58 18 60 14 60 12 C60 14 62 18 63 24 C64 30 66 30 68 26 C70 28 74 32 74 40 Z" />
        <path d="M45 40 H75 M47 36 H73" />
        <circle cx="60" cy="9" r="2.4" className="ganesh__dot" />
        <circle cx="60" cy="31" r="2.2" className="ganesh__dot" />
        <circle cx="52" cy="34" r="1.2" className="ganesh__dot" />
        <circle cx="68" cy="34" r="1.2" className="ganesh__dot" />
        <path d="M45 46 C34 36 16 38 13 52 C10 66 22 80 38 76 C42 75 44 72 45 68" />
        <path d="M75 46 C86 36 104 38 107 52 C110 66 98 80 82 76 C78 75 76 72 75 68" />
        <path className="ganesh__thin" d="M40 50 C30 46 22 50 21 58 C20 64 26 70 34 69 M80 50 C90 46 98 50 99 58 C100 64 94 70 86 69" />
        <path d="M45 42 C44 54 46 66 52 72 M75 42 C76 54 74 66 68 72" />
        <path d="M50 55 q3 -3 6 0 M64 55 q3 -3 6 0" />
        <path className="ganesh__tilak" d="M60 42 V49" />
        <circle cx="60" cy="52" r="1.4" className="ganesh__tilak-dot" />
        <path d="M52 72 C52 86 50 98 56 106 C62 114 74 112 76 104 C78 97 70 94 67 99 C65 103 69 105 71 103" />
        <path d="M68 72 C66 84 63 94 64 100" />
        <path className="ganesh__thin" d="M55 82 h9 M54 89 h9" />
        <path d="M70 74 L77 82 L72 78" />
        <path className="ganesh__fill" d="M60 123 C54 118 54 112 60 106 C66 112 66 118 60 123 Z M60 123 C50 122 42 116 38 110 C48 110 56 114 60 123 Z M60 123 C70 122 78 116 82 110 C72 110 64 114 60 123 Z" />
        <path d="M30 125 H90" />
      </g>
    </svg>
  );
}

function EdgeLotus({ pos }: { pos: "top" | "bottom" }) {
  return (
    <svg className={`tf__lotus tf__lotus--${pos}`} viewBox="0 0 40 20" aria-hidden="true">
      <path d="M20 1 c 5 5 5 12 0 17 c -5 -5 -5 -12 0 -17z M20 18 c -4 -8 -11 -11 -17 -10 c 3 6 9 10 17 10z M20 18 c 4 -8 11 -11 17 -10 c -3 6 -9 10 -17 10z" />
    </svg>
  );
}

interface TempleFrameProps {
  /** photo path; leave empty/null to show an elegant empty frame to fill in later */
  src?: string | null;
  alt: string;
  /** frame proportions (use the photo's own pixel size so nothing is cropped) */
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  reveal?: boolean;
  style?: CSSProperties;
  emptyLabel?: string;
}

/**
 * Royal photo frame (same family as the gallery frames): ivory mount, double antique-gold
 * border, gold diamond knots at the corners and a small lotus on the top edge. The photo box keeps the photo's own proportions, so nothing is cut off.
 */
export function TempleFrame({ src, alt, width, height, className, eager, reveal = true, style, emptyLabel = "फ़ोटो" }: TempleFrameProps) {
  return (
    <figure className={cx("tf", className)} style={style} data-reveal={reveal ? "" : undefined}>
      <div className="tf__box">
        <div className="tf__photo" style={{ aspectRatio: `${width} / ${height}` }}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="tf__img"
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={eager ? "high" : undefined}
              width={width}
              height={height}
            />
          ) : (
            <span className="tf__empty" role="img" aria-label={alt}>
              <Monogram className="tf__empty-mono" />
              <span lang="hi">{emptyLabel}</span>
            </span>
          )}
        </div>
        <span className="tf__knot tf__knot--tl" aria-hidden="true" />
        <span className="tf__knot tf__knot--tr" aria-hidden="true" />
        <span className="tf__knot tf__knot--bl" aria-hidden="true" />
        <span className="tf__knot tf__knot--br" aria-hidden="true" />
        <EdgeLotus pos="top" />
      </div>
    </figure>
  );
}

/** Gold calligraphic divider with a lotus at the centre; strokes draw on scroll. */
export function Divider({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg className={cx("divider", light && "divider--light", className)} viewBox="0 0 320 28" aria-hidden="true" data-draw>
      <path d="M8 14 H118" />
      <path d="M202 14 H312" />
      <path d="M118 14 c8 -8 16 -8 22 0 c-6 8 -14 8 -22 0z" />
      <path d="M202 14 c-8 -8 -16 -8 -22 0 c6 8 14 8 22 0z" />
      <path d="M160 3 c6 5 8 9 0 22 c-8 -13 -6 -17 0 -22z" />
      <path d="M150 9 c5 1 8 4 10 11 c-7 -1 -10 -5 -10 -11z" />
      <path d="M170 9 c-5 1 -8 4 -10 11 c7 -1 10 -5 10 -11z" />
      <circle cx="4" cy="14" r="2.2" />
      <circle cx="316" cy="14" r="2.2" />
    </svg>
  );
}

/** Procedurally drawn Rajasthani mandala (stroke only). */
export function Mandala({ className, style }: { className?: string; style?: CSSProperties }) {
  const rings = [
    { n: 8, r: 18, rx: 6, ry: 13 },
    { n: 16, r: 40, rx: 6, ry: 15 },
    { n: 24, r: 66, rx: 6, ry: 16 },
    { n: 32, r: 92, rx: 5, ry: 14 },
  ];
  return (
    <svg className={cx("mandala", className)} viewBox="-120 -120 240 240" aria-hidden="true" style={style}>
      {[10, 28, 54, 80, 106, 116].map((r) => (
        <circle key={r} r={r} />
      ))}
      {rings.map((ring, ri) => (
        <g key={ri}>
          {Array.from({ length: ring.n }, (_, i) => (
            <ellipse key={i} cx={0} cy={-ring.r} rx={ring.rx} ry={ring.ry} transform={`rotate(${(360 / ring.n) * i + (ri % 2 ? 180 / ring.n : 0)})`} />
          ))}
        </g>
      ))}
      {Array.from({ length: 48 }, (_, i) => (
        <circle key={`d${i}`} cx={0} cy={-111} r={1.6} transform={`rotate(${7.5 * i})`} />
      ))}
    </svg>
  );
}

/** Sunburst royal emblem with the couple's monogram; rays turn slowly. */
export function RoyalEmblem({ className }: { className?: string }) {
  return (
    <svg className={cx("emblem", className)} viewBox="-60 -60 120 120" role="img" aria-label={`${wedding.monogram.left} & ${wedding.monogram.right}`}>
      <g className="emblem__rays">
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d={i % 2 ? "M0,-58 L3,-42 L-3,-42 Z" : "M0,-54 L2.2,-42 L-2.2,-42 Z"} transform={`rotate(${15 * i})`} />
        ))}
      </g>
      <circle r="40" className="emblem__ring" />
      <circle r="35" className="emblem__ring emblem__ring--thin" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} r="1.6" cx="0" cy="-37.5" transform={`rotate(${30 * i + 15})`} className="emblem__dot" />
      ))}
      <text className="emblem__text" y="9" textAnchor="middle">
        {wedding.monogram.left}
        <tspan className="emblem__amp" dx="2" dy="-2">&amp;</tspan>
        <tspan dx="2" dy="2">{wedding.monogram.right}</tspan>
      </text>
    </svg>
  );
}

export function GoldHeart({ className }: { className?: string }) {
  return (
    <svg className={cx("gold-heart", className)} viewBox="0 0 24 22" role="img" aria-label="और">
      <path d="M12 21s-8.5-5.3-10.6-10.4C-0.2 6.4 2.6 1.5 7 1.5c2.3 0 3.9 1.2 5 3 1.1-1.8 2.7-3 5-3 4.4 0 7.2 4.9 5.6 9.1C20.5 15.7 12 21 12 21z" />
    </svg>
  );
}

/** Small arched monogram used by the navbar and footer. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg className={cx("monogram", className)} viewBox="0 0 100 120" aria-hidden="true">
      <circle cx="50" cy="70" r="46" className="monogram__arch" />
      <circle cx="50" cy="70" r="39" className="monogram__arch monogram__arch--inner" />
      <path d="M50 8 c 4 5 4 9 0 12 c -4 -3 -4 -7 0 -12z" className="monogram__kalash" />
      <text x="50" y="82" textAnchor="middle" className="monogram__text">
        {wedding.monogram.left}
        <tspan className="monogram__amp">&amp;</tspan>
        {wedding.monogram.right}
      </text>
    </svg>
  );
}

/** Section heading: small English caps eyebrow, Hindi title, gold divider. */
export function SectionHeading({ eyebrow, title, light, as: Tag = "h2", id }: { eyebrow?: string; title: string; light?: boolean; as?: "h1" | "h2"; id?: string }) {
  return (
    <header className={cx("sh", light && "sh--light")} data-reveal>
      {eyebrow && <p className="sh__eyebrow">{eyebrow}</p>}
      <Tag className="sh__title" id={id}>
        {title}
      </Tag>
      <Divider light={light} />
    </header>
  );
}

