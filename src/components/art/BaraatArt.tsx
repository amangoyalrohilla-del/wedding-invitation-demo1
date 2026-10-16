import type { CSSProperties, ReactNode } from "react";

/**
 * Hand-built SVG baraat procession, styled like Rajasthani shadow-puppetry:
 * ink silhouettes against a dusk sky, lit by colourful safas, odhnis and gold.
 * Everyone faces left, the direction of travel.
 */

const INK = "#1d0b10";
const GOLD = "#d9b56d";
const GOLD_LIGHT = "#f0d79c";
const IVORY = "#f4ead6";
const SKIN = "#b07a55";
const GROOM_SKIN = "#9a6646";
const MAROON = "#7a1d2a";

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Safa({ color, y = 0 }: { color: string; y?: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <path d="M9,-127 C17,-121 19,-104 16,-86 L12,-86 C13,-104 11,-118 6,-124 Z" fill={color} />
      <path d="M-11,-125 C-13,-137 -4,-143 3,-142 C11,-141 14,-133 12,-124 C5,-127 -5,-128 -11,-125 Z" fill={color} />
      <path d="M-10,-127 L-4,-139 M-5,-127 L1,-141 M0,-127 L6,-140 M5,-126 L10,-136" stroke="rgba(255,255,255,.35)" strokeWidth="1.3" fill="none" />
      <path d="M-11,-125 C-4,-128 5,-128 12,-124" stroke="rgba(0,0,0,.25)" strokeWidth="1.2" fill="none" />
      <circle cx="-6" cy="-133" r="1.6" fill={GOLD_LIGHT} />
    </g>
  );
}

function ManBody({ sash }: { sash: string }) {
  return (
    <>
      <path d="M-10,-36 L-11,-2 L-4,-2 L-3,-36 Z M3,-36 L4,-2 L11,-2 L10,-36 Z" fill="#efe6d4" />
      <path d="M-16,0 Q-20,-5 -14,-4 L-3,-4 L-3,0 Z M2,0 Q-2,-5 4,-4 L12,-4 L12,0 Z" fill="#8a1c24" />
      <path d="M-12,-74 C-16,-58 -24,-46 -27,-34 C-12,-29 12,-29 27,-34 C24,-46 16,-58 12,-74 Z" fill="currentColor" />
      <path d="M-12,-74 C-16,-58 -24,-46 -27,-34 C-12,-29 12,-29 27,-34 C24,-46 16,-58 12,-74 Z" fill="url(#bx-skirt-shade)" />
      <path d="M-27,-34 C-12,-29 12,-29 27,-34" stroke={GOLD} strokeWidth="1.8" fill="none" />
      <path d="M-12,-104 C-6,-108 6,-108 12,-104 L13,-74 L-13,-74 Z" fill="currentColor" />
      <path d="M-10,-103 C-2,-96 4,-88 10,-78" stroke="rgba(0,0,0,.22)" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="-90" r="1.3" fill={GOLD} />
      <path d="M-13,-77 L13,-77 L13,-71 L-13,-71 Z" fill={sash} />
      <path d="M-10,-72 C-14,-62 -15,-54 -13,-46 L-8,-47 C-9,-55 -8,-63 -5,-72 Z" fill={sash} />
      <rect x="-3.5" y="-113" width="7" height="10" fill={SKIN} />
      <ellipse cx="0" cy="-121" rx="9" ry="10" fill={SKIN} />
      <path d="M-8.5,-123 L-12,-118.5 L-8.5,-117.5 Z" fill={SKIN} />
      <ellipse cx="3" cy="-121" rx="1.8" ry="2.6" fill="#7a4a30" />
      <circle cx="-5" cy="-124" r="1" fill={INK} />
      <path d="M-10,-116 C-13,-118 -16,-116 -17,-112 C-14,-114 -11,-114 -8,-113.5 C-5,-114 -2,-114 0,-112 C-1,-116 -5,-117 -10,-116 Z" fill={INK} />
      <path d="M-5,-104 Q0,-98 5,-104" stroke={GOLD} strokeWidth="1.2" fill="none" />
    </>
  );
}

const ARMS_DOWN = "M-12,-102 L-18,-66 L-12.5,-64 L-7,-98 Z M12,-102 L17,-66 L12,-64 L8,-98 Z";

interface FigProps {
  x: number;
  turban: string;
  cloth?: string;
  sash?: string;
  d?: number;
  hideSm?: boolean;
}

function Walker({ x, d = 0, hideSm, cloth = "#f1e6d0", className = "walker", children }: { x: number; d?: number; hideSm?: boolean; cloth?: string; className?: string; children: ReactNode }) {
  return (
    <g transform={`translate(${x} 290)`} className={hideSm ? "hide-sm" : undefined} style={{ color: cloth }}>
      <g className={className} style={delay(d)}>
        {children}
      </g>
    </g>
  );
}

export function Guest({ x, turban, cloth, sash = GOLD, d, hideSm, wave }: FigProps & { wave?: boolean }) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} cloth={cloth}>
      <ManBody sash={sash} />
      {wave ? (
        <>
          <path d="M12,-102 L17,-66 L12,-64 L8,-98 Z" fill="currentColor" />
          <g transform="translate(-10 -100)">
            <g className="wave" style={delay(d ?? 0)}>
              <path d="M-2,0 L-14,-26 L-9,-28 L3,-4 Z" fill="currentColor" />
              <circle cx="-12" cy="-28" r="3" fill={SKIN} />
            </g>
          </g>
        </>
      ) : (
        <path d={ARMS_DOWN} fill="currentColor" />
      )}
      <Safa color={turban} />
    </Walker>
  );
}

export function DholPlayer({ x, turban, cloth, sash = GOLD, d, hideSm }: FigProps) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} cloth={cloth}>
      <ManBody sash={sash} />
      <line x1="-8" y1="-104" x2="10" y2="-64" stroke={GOLD} strokeWidth="2" />
      <path d="M-30,-86 L22,-86 Q26,-74 22,-62 L-30,-62 Q-34,-74 -30,-86 Z" fill="#7a2a1a" />
      <path d="M-26,-86 L-20,-62 L-14,-86 L-8,-62 L-2,-86 L4,-62 L10,-86 L16,-62" stroke={GOLD} strokeWidth="1.3" fill="none" />
      <ellipse cx="-31" cy="-74" rx="3.5" ry="12" fill="#e9d6b0" />
      <ellipse cx="23" cy="-74" rx="3.5" ry="12" fill="#e9d6b0" />
      <g transform="translate(-9 -100)">
        <g className="beat" style={delay((d ?? 0) + 0.1)}>
          <path d="M-3,0 L-20,22 L-16,26 L2,4 Z" fill="currentColor" />
          <path d="M-18,24 C-26,22 -30,18 -32,12" stroke="#c9a46a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(9 -100)">
        <g className="beat beat--b" style={delay((d ?? 0) + 0.35)}>
          <path d="M3,0 L16,24 L12,27 L-2,4 Z" fill="currentColor" />
          <path d="M14,26 L18,20" stroke="#c9a46a" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      <Safa color={turban} />
    </Walker>
  );
}

export function NagadaPlayer({ x, turban, cloth, sash = GOLD, d, hideSm }: FigProps) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} cloth={cloth}>
      <ManBody sash={sash} />
      <path d="M-38,-82 A14,12 0 0 0 -10,-82 Z" fill="#6a2416" />
      <ellipse cx="-24" cy="-82" rx="14" ry="3.5" fill="#e9d6b0" />
      <path d="M-12,-80 A10,9 0 0 0 8,-80 Z" fill="#6a2416" />
      <ellipse cx="-2" cy="-80" rx="10" ry="2.8" fill="#e9d6b0" />
      <path d="M-38,-82 Q-24,-92 -10,-82" stroke={GOLD} strokeWidth="1" fill="none" />
      <g transform="translate(-9 -100)">
        <g className="beat beat--big" style={delay((d ?? 0) + 0.2)}>
          <path d="M-3,0 L-14,-16 L-10,-19 L2,-3 Z" fill="currentColor" />
          <path d="M-12,-18 L-20,8" stroke="#c9a46a" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(9 -100)">
        <g className="beat beat--big beat--b" style={delay((d ?? 0) + 0.55)}>
          <path d="M3,0 L-4,-18 L0,-20 L6,-2 Z" fill="currentColor" />
          <path d="M-2,-19 L-8,12" stroke="#c9a46a" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>
      <Safa color={turban} />
    </Walker>
  );
}

export function ShehnaiPlayer({ x, turban, cloth, sash = GOLD, d, hideSm }: FigProps) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} cloth={cloth}>
      <ManBody sash={sash} />
      <path d="M-11,-102 L-24,-110 L-22,-115 L-7,-107 Z M10,-100 L-17,-106 L-15,-111 L10,-106 Z" fill="currentColor" />
      <g className="sway-sm" style={delay(d ?? 0)}>
        <path d="M-10,-118 L-36,-104 L-48,-95 L-33,-99 L-9,-115 Z" fill={GOLD} />
        <circle cx="-26" cy="-108" r="1.2" fill={INK} />
        <circle cx="-31" cy="-105" r="1.2" fill={INK} />
      </g>
      <Safa color={turban} />
    </Walker>
  );
}

export function FlagBearer({ x, turban, cloth, flag, sash = GOLD, d, hideSm }: FigProps & { flag: string }) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} cloth={cloth}>
      <ManBody sash={sash} />
      <path d="M-12,-102 L-18,-66 L-12.5,-64 L-7,-98 Z" fill="currentColor" />
      <path d="M10,-100 L-6,-122 L-10,-118 L6,-96 Z" fill="currentColor" />
      <line x1="-9" y1="-60" x2="-9" y2="-214" stroke={GOLD} strokeWidth="2.6" />
      <circle cx="-9" cy="-217" r="3.4" fill={GOLD_LIGHT} />
      <g transform="translate(-9 -210)">
        <g className="flutter" style={delay(d ?? 0)}>
          <path d="M0,0 L-46,9 Q-38,17 -46,25 L0,34 Z" fill={flag} />
          <path d="M0,0 L-46,9 Q-38,17 -46,25 L0,34" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.4" />
          <circle cx="-16" cy="17" r="5" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" />
        </g>
      </g>
      <Safa color={turban} />
    </Walker>
  );
}

export function Woman({ x, skirt, odhni, d, hideSm, dance = true }: { x: number; skirt: string; odhni: string; d?: number; hideSm?: boolean; dance?: boolean }) {
  return (
    <Walker x={x} d={d} hideSm={hideSm} className={dance ? "dancer" : "walker"}>
      <path d="M-11,-78 C-18,-52 -28,-24 -36,0 L36,0 C28,-24 18,-52 11,-78 Z" fill={skirt} />
      <path d="M-11,-78 C-18,-52 -28,-24 -36,0 L36,0 C28,-24 18,-52 11,-78 Z" fill="url(#bx-skirt-shade)" />
      <path d="M-36,0 L36,0 L33,-8 L-33,-8 Z" fill={GOLD} />
      <path d="M-24,-30 L24,-30" stroke={GOLD} strokeWidth="1.6" opacity="0.8" />
      <path d="M-9,-104 C-4,-107 4,-107 9,-104 L11,-78 L-11,-78 Z" fill="#7a1d2a" />
      <path d="M-9,-90 L9,-90" stroke={GOLD} strokeWidth="1.4" />
      <rect x="-3" y="-112" width="6" height="9" fill={SKIN} />
      <ellipse cx="0" cy="-118" rx="8" ry="9" fill={SKIN} />
      <path d="M-7.5,-120 L-11,-116 L-7.5,-115 Z" fill={SKIN} />
      <circle cx="-4" cy="-121" r="0.9" fill={INK} />
      <circle cx="-2" cy="-125" r="1.1" fill="#c0262f" />
      <path d="M-7,-112 q3,1.5 5,0" stroke="#b02a3a" strokeWidth="1.2" fill="none" />
      {dance ? (
        <>
          <path d="M-8,-102 L-20,-124 L-16,-127 L-4,-104 Z M8,-102 L18,-128 L22,-125 L12,-100 Z" fill={SKIN} />
          <path d="M-19,-120 l3,1.6 M-18,-117 l3,1.6 M19,-123 l-3,1.6 M18,-120 l-3,1.6" stroke={GOLD} strokeWidth="1.6" />
        </>
      ) : (
        <>
          <path d="M-9,-102 L-15,-72 L-10,-70 L-5,-98 Z M9,-102 L14,-72 L9,-70 L5,-98 Z" fill={SKIN} />
          <path d="M-14,-78 h5 M10,-78 h5" stroke={GOLD} strokeWidth="1.6" />
        </>
      )}
      <path d="M-9,-126 C-2,-134 10,-131 13,-117 C16,-104 20,-86 24,-62 L15,-64 C12,-82 8,-96 3,-106 C0,-112 -4,-116 -11,-120 Z" fill={odhni} opacity="0.94" />
      <path d="M-9,-126 C-2,-134 10,-131 13,-117 C16,-104 20,-86 24,-62" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.2" />
      <circle cx="-9" cy="-114" r="1.4" fill={GOLD_LIGHT} />
    </Walker>
  );
}

function Leg({ x, cls, far, d }: { x: number; cls: string; far?: boolean; d: number }) {
  return (
    <g transform={`translate(${x} -52)`}>
      <g className={cls} style={delay(d)}>
        <path d="M-6,0 L6,0 L5,22 L4,26 L4,44 L7,50 L-5,50 L-3,26 L-5,22 Z" fill={far ? "#cdbb9d" : "#eadcc4"} />
        <path d="M-5,46 h12 v4 h-12z" fill="#3a2a1e" />
        <path d="M-4,40 h10" stroke={GOLD} strokeWidth="1.6" />
      </g>
    </g>
  );
}

/** Decorated white baraat horse ("ghodi"). Origin = ground under the saddle. */
export function Horse({ d = 0, children }: { d?: number; children?: ReactNode }) {
  return (
    <g className="horse">
      <Leg x={-36} cls="leg leg--b" far d={d} />
      <Leg x={60} cls="leg leg--a" far d={d} />
      <path d="M70,-90 C84,-84 90,-62 86,-36 C84,-30 78,-32 78,-38 C80,-58 76,-76 66,-84 Z" fill="#cdbb9d" />
      <path d="M-58,-96 C-42,-110 42,-110 62,-97 C76,-88 80,-64 68,-52 C52,-44 -46,-44 -60,-54 C-70,-64 -68,-88 -58,-96 Z" fill="#eee2cc" />
      <path d="M-44,-100 C-58,-118 -68,-138 -76,-152 L-94,-144 C-86,-126 -80,-108 -68,-82 Z" fill="#eee2cc" />
      <path d="M-76,-156 C-82,-164 -95,-162 -99,-154 L-117,-122 C-120,-115 -115,-109 -108,-111 L-94,-126 C-90,-132 -86,-140 -84,-144 Z" fill="#eee2cc" />
      <path d="M-80,-158 L-78,-170 L-74,-157 Z M-86,-160 L-86,-171 L-81,-159 Z" fill="#e2d3b8" />
      <path d="M-74,-152 C-66,-140 -58,-122 -46,-104 L-40,-106 C-52,-124 -60,-142 -70,-156 Z" fill="#d6c4a6" />
      <circle cx="-93" cy="-146" r="1.8" fill="#2a1a12" />
      {/* jewellery & bridle */}
      <path d="M-82,-152 L-110,-118 M-97,-141 L-86,-128 M-84,-144 C-80,-136 -74,-130 -68,-126" stroke={GOLD} strokeWidth="1.6" fill="none" />
      <path d="M-70,-128 C-62,-112 -56,-104 -48,-98" stroke={GOLD} strokeWidth="3" strokeDasharray="1 4" strokeLinecap="round" fill="none" />
      <path d="M-84,-160 C-88,-176 -82,-190 -76,-196 C-76,-184 -78,-172 -80,-160 Z" fill="#c0262f" />
      <circle cx="-81" cy="-162" r="3" fill={GOLD} />
      {/* caparison (jhool) */}
      <path d="M-46,-106 C-20,-113 30,-113 56,-104 L60,-62 C30,-54 -20,-54 -50,-62 Z" fill={MAROON} />
      <path d="M-46,-106 C-20,-113 30,-113 56,-104 L60,-62 C30,-54 -20,-54 -50,-62 Z" fill="none" stroke={GOLD} strokeWidth="2" />
      <path d="M-40,-98 C-16,-104 26,-104 50,-97 L52,-70 C26,-64 -16,-64 -42,-70 Z" fill="none" stroke={GOLD} strokeWidth="0.9" strokeDasharray="3 2" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <path d={`M${-50 + i * 11} ${-62 + Math.sin((i / 9) * Math.PI) * 6} a5.5 5.5 0 0 0 11 0`} fill={GOLD} />
          <circle cx={-44.5 + i * 11} cy={-52 + Math.sin((i / 9) * Math.PI) * 6} r="2" fill="#c0262f" />
        </g>
      ))}
      <Leg x={-50} cls="leg leg--a" d={d} />
      <Leg x={46} cls="leg leg--b" d={d} />
      {children}
    </g>
  );
}

/** The groom on horseback, with sehra (veil of pearls) and kalgi. */
export function Groom() {
  return (
    <g className="groom">
      <path d="M10,-112 L-8,-102 L-10,-74 L-2,-74 L0,-98 L16,-106 Z" fill={IVORY} />
      <path d="M-12,-74 q-6,-1 -4,-4 h10 v4 Z" fill={GOLD} />
      <path d="M-4,-170 C2,-174 14,-174 20,-170 L22,-112 L-6,-112 Z" fill={IVORY} />
      {[-160, -150, -140, -130, -120].map((y) => (
        <circle key={y} cx="5" cy={y} r="1.3" fill={GOLD} />
      ))}
      <path d="M-2,-168 L20,-118 L14,-116 L-6,-162 Z" fill={MAROON} />
      <path d="M-2,-164 L-24,-132 L-20,-128 L4,-156 Z" fill={IVORY} />
      <line x1="-22" y1="-130" x2="-100" y2="-140" stroke={GOLD} strokeWidth="1" />
      <rect x="4" y="-180" width="7" height="10" fill={GROOM_SKIN} />
      <circle cx="8" cy="-188" r="9.5" fill={GROOM_SKIN} />
      <path d="M18,-196 C26,-188 28,-170 24,-156 L20,-156 C22,-170 20,-184 15,-192 Z" fill="#c0262f" />
      <path d="M-3,-192 C-5,-205 4,-211 11,-210 C19,-209 22,-201 20,-191 C13,-194 3,-195 -3,-192 Z" fill="#c0262f" />
      <path d="M-2,-198 C4,-201 13,-201 20,-197" stroke={GOLD} strokeWidth="1.2" fill="none" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={-3 + i * 2.6} y1="-192" x2={-4 + i * 2.6} y2="-173" stroke={GOLD_LIGHT} strokeWidth="1.1" strokeDasharray="2 1.4" />
      ))}
      <path d="M6,-206 C2,-218 4,-226 10,-232 C10,-222 9,-214 8,-206 Z" fill={GOLD_LIGHT} />
      <circle cx="6" cy="-205" r="3" fill={GOLD} />
    </g>
  );
}

/** Royal processional umbrella (chhatra). Origin = centre of its rim. */
export function Chhatra() {
  return (
    <g className="chhatra">
      <path d="M-60,0 Q0,-56 60,0 Z" fill={MAROON} />
      <path d="M-60,0 Q0,-56 60,0" fill="none" stroke={GOLD} strokeWidth="2" />
      <path d="M-30,0 Q0,-36 30,0 M0,-28 V0" stroke={GOLD} strokeWidth="1" fill="none" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${-60 + i * 12} 0 a6 6 0 0 0 12 0`} fill={GOLD} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <path key={`t${i}`} d={`M${-54 + i * 21.6} 6 v9`} stroke={GOLD_LIGHT} strokeWidth="1.2" />
      ))}
      <path d="M0,-30 c 4 -6 4 -12 0 -18 c -4 6 -4 12 0 18z" fill={GOLD} />
    </g>
  );
}

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="wheel">
        <circle r={r} fill="none" stroke={INK} strokeWidth="6" />
        <circle r={r} fill="none" stroke={GOLD} strokeWidth="2.4" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2={-r} stroke={GOLD} strokeWidth="1.8" transform={`rotate(${i * 30})`} />
        ))}
        <circle r={r * 0.18} fill={GOLD} />
      </g>
    </g>
  );
}

/** Ornate royal carriage (baggi). Origin = ground under the front wheel. */
export function Baggi() {
  return (
    <g>
      <line x1="-30" y1="-62" x2="-118" y2="-82" stroke={GOLD} strokeWidth="3" />
      <rect x="18" y="-148" width="4" height="66" fill={GOLD} />
      <rect x="74" y="-148" width="4" height="66" fill={GOLD} />
      <rect x="34" y="-122" width="18" height="36" fill="#f1e6d0" />
      <rect x="40" y="-140" width="6" height="10" fill={SKIN} />
      <ellipse cx="43" cy="-130" rx="8" ry="9" fill={SKIN} />
      <path d="M36,-125 C33,-127 31,-125 30,-122 C33,-124 36,-124 39,-123 Z" fill="#e8e0d0" />
      <g transform="translate(43 0)">
        <Safa color="#e8b830" y={-9} />
      </g>
      <path d="M-30,-56 L92,-56 C98,-80 94,-100 80,-108 L76,-108 C72,-90 58,-84 42,-84 L12,-84 C2,-84 -8,-94 -12,-106 L-20,-106 C-28,-90 -34,-70 -30,-56 Z" fill="#b8924f" />
      <path d="M-24,-60 L86,-60 C90,-76 88,-90 80,-98 C74,-84 60,-78 42,-78 L12,-78 C0,-78 -10,-86 -16,-98 C-22,-86 -26,-72 -24,-60 Z" fill={MAROON} />
      <path d="M0,-70 h60" stroke={GOLD} strokeWidth="1.2" strokeDasharray="2 3" />
      <path d="M8,-148 Q48,-196 88,-148 Z" fill={MAROON} />
      <path d="M8,-148 Q48,-196 88,-148" fill="none" stroke={GOLD} strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${8 + i * 10} -148 a5 5 0 0 0 10 0`} fill={GOLD} />
      ))}
      <path d="M48,-172 c 4 -6 4 -12 0 -18 c -4 6 -4 12 0 18z" fill={GOLD} />
      <Wheel cx={-14} cy={-28} r={28} />
      <Wheel cx={66} cy={-40} r={40} />
    </g>
  );
}

/** Decorated camel with a handler's rope. Origin = ground under the hump. */
export function Camel() {
  const C = "#b07a4a";
  return (
    <g className="camel">
      {[
        [-36, "leg--b", true],
        [36, "leg--a", true],
      ].map(([x, cls, far]) => (
        <g key={String(x)} transform={`translate(${x} -98)`}>
          <g className={`leg ${cls}`}>
            <path d="M-5,0 L5,0 L4,44 L6,50 L4,92 L8,98 L-6,98 L-3,50 L-5,44 Z" fill={far ? "#8a5a34" : C} />
          </g>
        </g>
      ))}
      <path d="M-55,-118 C-45,-128 -25,-170 5,-168 C30,-166 45,-140 55,-122 C60,-108 52,-96 40,-96 L-42,-96 C-56,-98 -60,-110 -55,-118 Z" fill={C} />
      <path d="M-48,-120 C-70,-118 -80,-130 -86,-150 C-90,-162 -96,-170 -104,-172 L-112,-166 C-102,-160 -98,-150 -96,-138 C-90,-110 -70,-100 -52,-100 Z" fill={C} />
      <path d="M-104,-176 C-110,-180 -124,-176 -128,-168 C-130,-164 -126,-160 -120,-161 L-108,-162 Z" fill={C} />
      <path d="M-104,-176 L-100,-182 L-98,-174 Z" fill={C} />
      <path d="M50,-118 C62,-112 64,-96 60,-84" stroke={C} strokeWidth="3" fill="none" />
      {/* saddle blanket and pom-poms */}
      <path d="M-34,-150 C-14,-170 22,-168 36,-146 L32,-108 C10,-102 -16,-102 -36,-110 Z" fill="#c0262f" />
      <path d="M-34,-150 C-14,-170 22,-168 36,-146 L32,-108 C10,-102 -16,-102 -36,-110 Z" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <path d="M-30,-126 L30,-126" stroke="#e8b830" strokeWidth="4" />
      <path d="M-30,-126 L30,-126" stroke="#2f7a4a" strokeWidth="1.6" strokeDasharray="4 4" />
      {[-30, -18, -6, 6, 18, 30].map((x) => (
        <g key={x}>
          <line x1={x} y1={-106} x2={x} y2={-96} stroke={GOLD} strokeWidth="1" />
          <circle cx={x} cy={-94} r="3.2" fill={x % 12 ? "#e8b830" : "#d6457a"} />
        </g>
      ))}
      {[
        [-60, -114],
        [-72, -122],
        [-80, -136],
        [-86, -150],
        [-92, -162],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill={i % 2 ? "#e8b830" : "#d6457a"} />
      ))}
      <path d="M-120,-166 C-140,-150 -150,-120 -156,-100" stroke={GOLD} strokeWidth="1.2" fill="none" />
      {[
        [-24, "leg--a", false],
        [26, "leg--b", false],
      ].map(([x, cls]) => (
        <g key={String(x)} transform={`translate(${x} -98)`}>
          <g className={`leg ${cls}`}>
            <path d="M-5,0 L5,0 L4,44 L6,50 L4,92 L8,98 L-6,98 L-3,50 L-5,44 Z" fill={C} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** The whole procession strip: 2000 × 300 units, figures placed left (front) to right (rear). */
export function ProcessionStrip() {
  return (
    <svg className="procession__svg" viewBox="0 0 2000 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="bx-skirt-shade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <FlagBearer x={60} turban="#e2802a" cloth="#f1e6d0" flag="#e2802a" d={0} />
      <ShehnaiPlayer x={140} turban="#e8b830" cloth="#9a2433" d={0.2} />
      <DholPlayer x={215} turban="#c0262f" cloth="#f1e6d0" d={0.1} />
      <DholPlayer x={290} turban="#d6457a" cloth="#e9a23b" sash="#2f7a4a" d={0.3} hideSm />
      <NagadaPlayer x={368} turban="#e2802a" cloth="#7a1d2a" d={0.15} />
      <Woman x={448} skirt="#c43a6e" odhni="#c0262f" d={0.1} />
      <Woman x={514} skirt="#d9a12b" odhni="#2f7a4a" d={0.5} hideSm />
      <Guest x={578} turban="#2f7a4a" cloth="#f6efe0" wave d={0.25} />

      {/* umbrella bearer walks behind the horse */}
      <g transform="translate(724 290)" style={{ color: "#e9a23b" }}>
        <g className="walker" style={delay(0.4)}>
          <ManBody sash={GOLD} />
          <path d="M10,-100 L-4,-124 L-8,-120 L6,-96 Z" fill="currentColor" />
          <path d="M-12,-102 L-18,-66 L-12.5,-64 L-7,-98 Z" fill="currentColor" />
          <Safa color="#e8b830" />
        </g>
      </g>
      <line x1="718" y1="168" x2="690" y2="58" stroke={GOLD} strokeWidth="2.6" />
      <g transform="translate(688 62)">
        <g className="sway-sm">
          <Chhatra />
        </g>
      </g>
      <g transform="translate(680 290)">
        <g className="horse-gait">
          <Horse d={0}>
            <Groom />
          </Horse>
        </g>
      </g>

      <Guest x={830} turban="#d6457a" cloth="#f1e6d0" d={0.2} />
      <Guest x={892} turban="#c0262f" cloth="#e9cf9a" sash="#c0262f" wave d={0.45} hideSm />
      <Woman x={956} skirt="#a8243a" odhni="#e8b830" d={0.3} dance={false} />

      <g transform="translate(1090 290)">
        <g className="horse-gait" style={delay(0.3)}>
          <Horse d={0.3} />
        </g>
      </g>
      <g transform="translate(1240 290)">
        <g className="baggi">
          <Baggi />
        </g>
      </g>

      <Guest x={1400} turban="#e8b830" cloth="#2f6b4a" d={0.15} hideSm />
      <g transform="translate(1460 290)" style={{ color: "#f1e6d0" }}>
        <g className="walker" style={delay(0.35)}>
          <ManBody sash="#c0262f" />
          <path d="M12,-102 L17,-66 L12,-64 L8,-98 Z" fill="currentColor" />
          <path d="M-10,-100 L6,-84 L10,-88 L-6,-102 Z" fill="currentColor" />
          <Safa color="#c0262f" />
        </g>
      </g>
      <g transform="translate(1610 290)">
        <g className="camel-gait">
          <Camel />
        </g>
      </g>
      <FlagBearer x={1770} turban="#2f7a4a" cloth="#f1e6d0" flag="#2f7a4a" d={0.2} hideSm />
      <DholPlayer x={1850} turban="#e2802a" cloth="#9a2433" d={0.4} />
      <Woman x={1930} skirt="#c43a6e" odhni="#e2802a" d={0.2} hideSm />
    </svg>
  );
}

/** Distant Rajasthani hill fort and chhatris, with lit windows. */
export function FortSkyline({ className }: { className?: string }) {
  const crenels = Array.from({ length: 33 }, (_, i) => 800 + i * 16);
  const windows: Array<[number, number]> = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) windows.push([930 + c * 21, 124 + r * 17]);
  return (
    <svg className={className} viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0,300 C180,280 320,236 520,250 C700,262 820,214 1000,198 C1180,182 1320,226 1600,240 V400 H0 Z" fill="#3a1222" />
      {/* cenotaph chhatris on the left hill */}
      <g fill="#2c0d19">
        <rect x="240" y="236" width="140" height="12" />
        {[262, 310, 358].map((x, i) => (
          <g key={x}>
            <rect x={x - 14} y={i === 1 ? 206 : 216} width="28" height={i === 1 ? 30 : 20} />
            <path d={`M${x - 18} ${i === 1 ? 206 : 216} Q${x} ${i === 1 ? 170 : 188} ${x + 18} ${i === 1 ? 206 : 216} Z`} />
            <rect x={x - 1} y={i === 1 ? 166 : 184} width="2" height="8" />
          </g>
        ))}
      </g>
      {/* fort */}
      <g fill="#2c0d19">
        <rect x="796" y="170" width="532" height="70" />
        {crenels.map((x) => (
          <rect key={x} x={x} y="162" width="9" height="9" />
        ))}
        {[800, 1000, 1180, 1300].map((x) => (
          <g key={x}>
            <rect x={x - 6} y="138" width="36" height="102" />
            <path d={`M${x - 8} 138 Q${x + 12} 112 ${x + 32} 138 Z`} />
          </g>
        ))}
        <rect x="918" y="110" width="210" height="62" />
        <path d="M986,110 Q1022,46 1058,110 Z" />
        <rect x="1020" y="40" width="3" height="14" />
        {[934, 966, 1080, 1112].map((x) => (
          <g key={x}>
            <rect x={x - 9} y="96" width="18" height="14" />
            <path d={`M${x - 12} 96 Q${x} 76 ${x + 12} 96 Z`} />
          </g>
        ))}
      </g>
      <g className="fort-windows">
        {windows.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="6" height="9" rx="3" fill="#ffcf7a" opacity={(i * 7) % 5 === 0 ? 0.25 : 0.85} style={delay((i % 7) * 0.6)} />
        ))}
        {[820, 1020, 1200, 1320].map((x) => (
          <rect key={x} x={x} y="160" width="5" height="8" rx="2.5" fill="#ffcf7a" opacity="0.7" />
        ))}
      </g>
      <path d="M0,350 C260,330 520,340 800,330 C1100,320 1360,336 1600,326 V400 H0 Z" fill="#240a14" />
    </svg>
  );
}
