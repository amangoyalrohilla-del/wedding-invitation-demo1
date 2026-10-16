import { wedding } from "@/config/wedding";

/**
 * One carved wooden palace door (200×600 units). The left and right doors are
 * mirror images; the R & M medallion straddles the seam and splits as they open.
 */
export function DoorPanel({ side }: { side: "left" | "right" }) {
  const id = `door-${side}`;
  const seamX = side === "left" ? 200 : 0;
  const outerRail = side === "left" ? 22 : 178;
  const innerRail = side === "left" ? 178 : 22;
  const studsY = Array.from({ length: 20 }, (_, i) => 44 + i * 28.5);
  const panels = [
    { y: 214, h: 112 },
    { y: 344, h: 120 },
    { y: 482, h: 98 },
  ];

  return (
    <svg className="door-svg" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wood`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3a1a0e" />
          <stop offset="0.18" stopColor="#5b2d18" />
          <stop offset="0.5" stopColor="#6e3a1f" />
          <stop offset="0.82" stopColor="#5a2c17" />
          <stop offset="1" stopColor="#341608" />
        </linearGradient>
        <linearGradient id={`${id}-recess`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a1007" />
          <stop offset="1" stopColor="#4a2312" />
        </linearGradient>
        <radialGradient id={`${id}-brass`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fff1c4" />
          <stop offset="0.35" stopColor="#d8b46c" />
          <stop offset="0.75" stopColor="#9a7136" />
          <stop offset="1" stopColor="#5c3f17" />
        </radialGradient>
        <linearGradient id={`${id}-band`} x1="0" x2="1">
          <stop offset="0" stopColor="#7d5a26" />
          <stop offset="0.5" stopColor="#e2c27c" />
          <stop offset="1" stopColor="#7d5a26" />
        </linearGradient>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.32" numOctaves="3" seed={side === "left" ? 3 : 7} />
          <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0.55 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id={`${id}-jali`} width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#2a1007" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#a9823f" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="2.4" fill="#c8a35c" />
          <circle cx="0" cy="0" r="1.6" fill="#8a6630" />
          <circle cx="20" cy="20" r="1.6" fill="#8a6630" />
        </pattern>
        <clipPath id={`${id}-clip`}>
          <rect width="200" height="600" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {/* timber */}
        <rect width="200" height="600" fill={`url(#${id}-wood)`} />
        <rect width="200" height="600" fill="#6e3a1f" filter={`url(#${id}-grain)`} opacity="0.9" />

        {/* lattice crown (shaped by the doorway arch) */}
        <rect x="14" y="14" width="172" height="186" fill={`url(#${id}-jali)`} opacity="0.95" />
        <rect x="14" y="14" width="172" height="186" fill="none" stroke="#c6a46a" strokeWidth="2" />

        {/* frame */}
        <rect x="6" y="6" width="188" height="588" fill="none" stroke="#2a1007" strokeWidth="6" />
        <rect x="9" y="9" width="182" height="582" fill="none" stroke={`url(#${id}-band)`} strokeWidth="2" />

        {/* carved recessed panels */}
        {panels.map((p, i) => (
          <g key={i}>
            <rect x="34" y={p.y} width="132" height={p.h} rx="3" fill={`url(#${id}-recess)`} />
            <path d={`M34 ${p.y + p.h} V${p.y} H166`} stroke="#1c0a04" strokeWidth="3" fill="none" />
            <path d={`M166 ${p.y} V${p.y + p.h} H34`} stroke="#8a5530" strokeWidth="2" fill="none" />
            <rect x="42" y={p.y + 8} width="116" height={p.h - 16} rx="2" fill="none" stroke="#b08a4c" strokeWidth="1" opacity="0.8" />
            {/* rosette */}
            <g transform={`translate(${side === "left" ? 92 : 108} ${p.y + p.h / 2})`}>
              {Array.from({ length: 12 }, (_, k) => (
                <ellipse key={k} cx="0" cy="-15" rx="5" ry="12" transform={`rotate(${k * 30})`} fill="#5c2c14" stroke="#c09a55" strokeWidth="0.9" />
              ))}
              <circle r="9" fill={`url(#${id}-brass)`} />
              <circle r="3" fill="#5c3f17" />
            </g>
            {/* corner leaves */}
            {[
              [44, p.y + 12, 0],
              [156, p.y + 12, 90],
              [156, p.y + p.h - 12, 180],
              [44, p.y + p.h - 12, 270],
            ].map(([cx, cy, r], k) => (
              <path key={k} d="M0 0 c 8 0 14 4 14 14 c -10 0 -14 -6 -14 -14z" transform={`translate(${cx} ${cy}) rotate(${r})`} fill="#a07a3c" opacity="0.85" />
            ))}
          </g>
        ))}

        {/* horizontal brass straps */}
        {[204, 334, 472, 588].map((y) => (
          <rect key={y} x="12" y={y} width="176" height="5" fill={`url(#${id}-band)`} opacity="0.95" />
        ))}

        {/* brass studs */}
        {studsY.map((y) => (
          <g key={y}>
            <circle cx={outerRail} cy={y} r="5.2" fill={`url(#${id}-brass)`} />
            <circle cx={outerRail} cy={y} r="5.2" fill="none" stroke="#3a2008" strokeWidth="0.6" />
            {y > 210 && <circle cx={innerRail} cy={y} r="4" fill={`url(#${id}-brass)`} />}
          </g>
        ))}
        {[44, 72, 100, 128, 156].flatMap((x) =>
          [209, 339, 477].map((y) => <circle key={`${x}-${y}`} cx={side === "left" ? x : 200 - x} cy={y - 3} r="2.6" fill={`url(#${id}-brass)`} />),
        )}

        {/* seam brass strip */}
        <rect x={side === "left" ? 193 : 0} y="0" width="7" height="600" fill={`url(#${id}-band)`} />

        {/* split royal medallion */}
        <g transform={`translate(${seamX} 404)`}>
          <circle r="64" fill="#2a1007" />
          <circle r="62" fill={`url(#${id}-brass)`} />
          <circle r="54" fill="#4a1c12" />
          {Array.from({ length: 24 }, (_, k) => (
            <path key={k} d="M0 -52 L4 -44 L0 -38 L-4 -44 Z" transform={`rotate(${k * 15})`} fill="#d6b46c" />
          ))}
          <circle r="34" fill="none" stroke="#d6b46c" strokeWidth="1.4" />
          <circle r="30" fill="none" stroke="#d6b46c" strokeWidth="0.6" />
          <text y="11" textAnchor="middle" className="door-mono">
            {wedding.monogram.left}
            <tspan className="door-mono__amp" dx="1" dy="-2">&amp;</tspan>
            <tspan dx="1" dy="2">{wedding.monogram.right}</tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}

/** Carved sandstone pillar that flanks the doorway on larger screens. */
export function Pillar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 70 600" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="pillar-shaft" x1="0" x2="1">
          <stop offset="0" stopColor="#6b3b22" />
          <stop offset="0.3" stopColor="#c08a5c" />
          <stop offset="0.55" stopColor="#d9a877" />
          <stop offset="1" stopColor="#6b3b22" />
        </linearGradient>
      </defs>
      <path d="M2 40 h66 l-6 18 h-54z" fill="url(#pillar-shaft)" />
      <path d="M10 58 h50 c0 14 -8 20 -25 20 s-25 -6 -25 -20z" fill="url(#pillar-shaft)" />
      <rect x="0" y="22" width="70" height="18" fill="url(#pillar-shaft)" />
      <rect x="14" y="78" width="42" height="460" fill="url(#pillar-shaft)" />
      {[22, 30, 38, 46].map((x) => (
        <line key={x} x1={x} y1="96" x2={x} y2="520" stroke="#5a2f19" strokeWidth="1.5" opacity="0.6" />
      ))}
      {[96, 300, 520].map((y) => (
        <rect key={y} x="10" y={y - 6} width="50" height="12" fill="url(#pillar-shaft)" stroke="#5a2f19" strokeWidth="1" />
      ))}
      <path d="M6 538 h58 v22 h6 v40 H0 v-40 h6z" fill="url(#pillar-shaft)" />
    </svg>
  );
}

/** Hanging brass lantern with a flickering glow. */
export function HangingLamp({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="lamp__glow" />
      <svg viewBox="0 0 60 150" className="lamp__svg">
        <line x1="30" y1="0" x2="30" y2="46" stroke="#c6a46a" strokeWidth="1.4" strokeDasharray="3 2" />
        <path d="M18 46 h24 l6 10 H12z" fill="#b08a4c" />
        <path d="M12 56 C 4 76, 4 100, 16 118 h28 C 56 100, 56 76, 48 56 Z" fill="#ffd690" opacity="0.92" />
        <path d="M12 56 C 4 76, 4 100, 16 118 h28 C 56 100, 56 76, 48 56 Z" fill="none" stroke="#9a7136" strokeWidth="2" />
        <path d="M22 56 C 18 80, 18 98, 24 118 M38 56 C 42 80, 42 98, 36 118 M30 56 V118" stroke="#9a7136" strokeWidth="1.4" fill="none" />
        <path d="M16 118 h28 l-8 10 h-12z" fill="#b08a4c" />
        <path d="M30 128 v10 M26 142 l4 8 l4 -8z" stroke="#b08a4c" fill="#b08a4c" />
      </svg>
    </div>
  );
}
