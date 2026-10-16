import type { JSX } from "react";
import type { EventMotif as Motif } from "@/config/wedding";

/** Hand-drawn line-art vignettes, one per ceremony. Colours come from CSS (.motif--*). */

function Marigold({ x, y, r = 8, k }: { x: number; y: number; r?: number; k?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} key={k} className="mg">
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={i} cx={0} cy={-r * 0.6} rx={r * 0.38} ry={r * 0.62} transform={`rotate(${36 * i})`} />
      ))}
      <circle r={r * 0.35} className="mg__c" />
    </g>
  );
}

function Haldi() {
  const strands = [34, 78, 242, 286];
  return (
    <g>
      <path className="ln" d="M0 10 C 80 34, 240 34, 320 10" />
      {strands.map((x, si) => (
        <g key={x}>
          <line className="ln ln--thin" x1={x} y1={18} x2={x} y2={18 + (si % 2 ? 92 : 120)} />
          {Array.from({ length: si % 2 ? 5 : 7 }, (_, i) => (
            <Marigold key={i} x={x} y={28 + i * 16} r={7} />
          ))}
          <path className="fill-gold" d={`M${x - 4} ${(si % 2 ? 110 : 138) + 2} l4 10 l4 -10z`} />
        </g>
      ))}
      {/* mango leaves */}
      {[110, 135, 160, 185, 210].map((x, i) => (
        <path key={x} className="leaf" d={`M${x} 26 c -6 10 -6 22 0 30 c 6 -8 6 -20 0 -30z`} transform={`rotate(${(i - 2) * 6} ${x} 26)`} />
      ))}
      {/* brass urli with turmeric */}
      <ellipse className="fill-brass" cx="160" cy="146" rx="64" ry="12" />
      <path className="fill-brass-dark" d="M96 146 C 104 182, 216 182, 224 146 Z" />
      <ellipse className="fill-turmeric" cx="160" cy="146" rx="54" ry="8" />
      <path className="ln" d="M120 182 h80 M140 182 l-4 8 h48 l-4 -8" />
      <Marigold x={142} y={143} r={6} />
      <Marigold x={176} y={145} r={5} />
      {[60, 92, 228, 262, 120, 204].map((x, i) => (
        <ellipse key={x} className="petal-dot" cx={x} cy={170 + (i % 3) * 8} rx="4" ry="2.4" transform={`rotate(${i * 30} ${x} ${170 + (i % 3) * 8})`} />
      ))}
    </g>
  );
}

function Mehendi() {
  return (
    <g>
      <g transform="translate(160 104)">
        <path className="ln" d="M0 -78 C 58 -78 82 -6 44 40 C 18 72 -40 70 -52 30 C -62 -4 -30 -26 -6 -12 C 14 0 6 26 -12 24" />
        <path className="ln ln--thin" d="M0 -64 C 46 -62 64 -6 34 30 C 14 54 -30 52 -40 24 C -46 2 -24 -12 -8 -4" />
        <path className="ln ln--thin" d="M2 -50 C 34 -48 48 -6 26 20 C 12 36 -18 36 -26 18" />
        {Array.from({ length: 14 }, (_, i) => {
          const a = (-90 + i * 18) * (Math.PI / 180);
          return <circle key={i} className="dot" cx={Math.cos(a) * 86 + 6} cy={Math.sin(a) * 70 - 4} r="2.2" />;
        })}
        <circle className="ln" cx="-12" cy="24" r="6" />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} className="ln ln--thin" cx="-12" cy="12" rx="2.6" ry="6" transform={`rotate(${45 * i} -12 24)`} />
        ))}
      </g>
      {/* vines */}
      <path className="ln" d="M14 190 C 40 150, 30 110, 60 80 S 80 30, 70 10" />
      <path className="ln" d="M306 190 C 280 150, 290 110, 260 80 S 240 30, 250 10" />
      {[[48, 120], [62, 70], [272, 120], [258, 70]].map(([x, y], i) => (
        <path key={i} className="leaf" d={`M${x} ${y} c ${i < 2 ? 14 : -14} -4 ${i < 2 ? 22 : -22} 4 ${i < 2 ? 24 : -24} 14 c ${i < 2 ? -12 : 12} 2 ${i < 2 ? -20 : 20} -4 ${i < 2 ? -24 : 24} -14z`} />
      ))}
      {/* mehendi cone */}
      <path className="fill-henna" d="M232 176 L 270 150 L 276 160 Z" />
      <path className="ln ln--thin" d="M270 150 l 8 -6 l 4 8 l -6 8" />
    </g>
  );
}

function Lantern({ x, drop, s = 1 }: { x: number; drop: number; s?: number }) {
  return (
    <g transform={`translate(${x} 0) scale(${s})`} className="lantern">
      <line className="ln ln--thin" x1="0" y1="0" x2="0" y2={drop} />
      <g transform={`translate(0 ${drop})`}>
        <circle className="glow" cx="0" cy="34" r="30" />
        <path className="ln fill-gold-soft" d="M-10 0 h20 l4 8 h-28z" />
        <path className="ln fill-lamp" d="M-16 8 C -24 24, -24 44, -14 58 h28 C 24 44, 24 24, 16 8 Z" />
        <path className="ln ln--thin" d="M-8 8 C -12 26, -12 42, -6 58 M8 8 C 12 26, 12 42, 6 58 M0 8 V58" />
        <path className="ln fill-gold-soft" d="M-14 58 h28 l-6 8 h-16z" />
        <path className="ln" d="M0 66 v8 M-3 78 l3 6 l3 -6z" />
      </g>
    </g>
  );
}

function Sangeet() {
  return (
    <g>
      <path className="ln ln--thin" d="M0 14 C 80 40, 240 40, 320 14" />
      {Array.from({ length: 13 }, (_, i) => {
        const t = i / 12;
        const x = t * 320;
        const y = 14 + Math.sin(t * Math.PI) * 20;
        return <circle key={i} className="bulb" cx={x} cy={y + 3} r="2.6" style={{ animationDelay: `${i * 0.18}s` }} />;
      })}
      <Lantern x={70} drop={30} s={0.9} />
      <Lantern x={160} drop={18} s={1.15} />
      <Lantern x={250} drop={40} s={0.85} />
      {/* dholak */}
      <g transform="translate(160 168)">
        <path className="ln fill-wood" d="M-46 -14 C -50 -4, -50 4, -46 14 H 46 C 50 4, 50 -4, 46 -14 Z" />
        <ellipse className="ln fill-skin" cx="-46" cy="0" rx="5" ry="14" />
        <ellipse className="ln fill-skin" cx="46" cy="0" rx="5" ry="14" />
        <path className="ln ln--thin" d="M-40 -14 L-30 14 L-20 -14 L-10 14 L0 -14 L10 14 L20 -14 L30 14 L40 -14" />
      </g>
    </g>
  );
}

function Baraat() {
  return (
    <g>
      {/* bunting */}
      <path className="ln ln--thin" d="M0 12 C 80 34, 240 34, 320 12" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = (i + 0.5) / 11;
        const x = t * 320;
        const y = 12 + Math.sin(t * Math.PI) * 18;
        return <path key={i} className={i % 2 ? "flag-a" : "flag-b"} d={`M${x - 9} ${y} h18 l-9 16z`} />;
      })}
      {/* royal chhatra */}
      <g transform="translate(160 0)">
        <line className="ln" x1="0" y1="62" x2="0" y2="196" />
        <path className="ln fill-maroon" d="M-66 96 C -50 52, 50 52, 66 96 Z" />
        <path className="ln ln--thin" d="M-40 96 C -30 66, 30 66, 40 96 M0 60 V96" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} className="ln fill-gold-soft" d={`M${-66 + i * 12} 96 a6 6 0 0 0 12 0`} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`t${i}`} className="ln ln--thin" d={`M${-60 + i * 24} 102 v10 m-3 0 l3 6 l3 -6`} />
        ))}
        <path className="fill-gold" d="M0 44 c 5 6 5 12 0 16 c -5 -4 -5 -10 0 -16z" />
      </g>
      {/* dhol and nagada */}
      <g transform="translate(64 160)">
        <path className="ln fill-wood" d="M-30 -16 h60 c4 10 4 22 0 32 h-60 c-4 -10 -4 -22 0 -32z" />
        <path className="ln ln--thin" d="M-24 -16 L-14 16 L-4 -16 L6 16 L16 -16 L26 16" />
        <line className="ln" x1="22" y1="-40" x2="36" y2="-18" />
      </g>
      <g transform="translate(256 168)">
        <path className="ln fill-wood" d="M-26 -10 A 26 22 0 0 0 26 -10 Z" />
        <ellipse className="ln fill-skin" cx="0" cy="-10" rx="26" ry="5" />
        <line className="ln" x1="-30" y1="-44" x2="-8" y2="-14" />
      </g>
    </g>
  );
}

function Wedding() {
  return (
    <g>
      {/* mandap */}
      <path className="ln" d="M40 74 C 80 30, 240 30, 280 74" />
      <path className="ln ln--thin" d="M52 74 C 90 42, 230 42, 268 74" />
      <path className="fill-gold" d="M160 26 c 5 6 5 12 0 16 c -5 -4 -5 -10 0 -16z" />
      {[56, 264].map((x) => (
        <g key={x}>
          <rect className="ln" x={x - 6} y={74} width="12" height="112" />
          <path className="ln" d={`M${x - 12} 74 h24 M${x - 12} 186 h24`} />
          <path className="ln ln--thin" d={`M${x - 6} 100 h12 M${x - 6} 150 h12`} />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} className="ln ln--thin" d={`M${76 + i * 21} 64 q 0 ${18 + (i % 2) * 8} 0 ${30 + (i % 2) * 10}`} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={`f${i}`} className="mg-dot" cx={76 + i * 21} cy={96 + (i % 2) * 10} r="4" />
      ))}
      {/* havan kund with sacred fire */}
      <g transform="translate(160 186)">
        <path className="ln fill-brass-dark" d="M-46 0 h92 l-8 -12 h-76z" />
        <path className="ln fill-brass" d="M-38 -12 h76 l-8 -12 h-60z" />
        <g className="flame">
          <path className="fire fire--outer" d="M0 -84 C 22 -60, 30 -40, 18 -26 C 12 -20, -12 -20, -18 -26 C -30 -40, -20 -58, -8 -64 C -6 -54, 0 -52, 2 -56 C 6 -64, 2 -74, 0 -84z" />
          <path className="fire fire--inner" d="M0 -60 C 12 -46, 14 -34, 8 -28 C 4 -24, -6 -24, -10 -28 C -14 -36, -6 -46, 0 -60z" />
        </g>
      </g>
      {/* kalash on either side */}
      {[110, 210].map((x) => (
        <g key={x} transform={`translate(${x} 186)`}>
          <path className="ln fill-brass" d="M-12 0 C -20 -8, -20 -24, -8 -30 h16 C 20 -24, 20 -8, 12 0z" />
          <path className="leaf" d="M-10 -30 c -4 -8 -2 -14 4 -16 M10 -30 c 4 -8 2 -14 -4 -16 M0 -30 v-12" />
          <circle className="fill-coconut" cx="0" cy="-42" r="7" />
        </g>
      ))}
    </g>
  );
}

function Reception() {
  return (
    <g>
      {/* arcade */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} className="ln ln--thin arcade" d={`M${12 + i * 76} 200 V112 C ${12 + i * 76} 86, ${42 + i * 76} 72, ${50 + i * 76} 66 C ${58 + i * 76} 72, ${88 + i * 76} 86, ${88 + i * 76} 112 V200`} />
      ))}
      {/* chandelier */}
      <g transform="translate(160 0)">
        <line className="ln" x1="0" y1="0" x2="0" y2="38" />
        <circle className="glow" cx="0" cy="84" r="70" />
        <path className="ln fill-gold-soft" d="M-8 38 h16 l6 10 h-28z" />
        <path className="ln" d="M-70 70 C -40 92, 40 92, 70 70" />
        <path className="ln" d="M-48 100 C -24 116, 24 116, 48 100" />
        <path className="ln" d="M0 48 V122" />
        {[-70, -35, 0, 35, 70].map((x, i) => (
          <g key={x}>
            <path className="ln ln--thin" d={`M0 52 Q ${x * 0.5} 58 ${x} ${70 + Math.abs(x) * 0.12}`} />
            <rect className="fill-candle" x={x - 2.5} y={56 + Math.abs(x) * 0.12} width="5" height="12" />
            <path className="fire fire--inner" d={`M${x} ${48 + Math.abs(x) * 0.12} c 3 3 3 6 0 8 c -3 -2 -3 -5 0 -8z`} />
            {[0, 1, 2].map((j) => (
              <path key={j} className="crystal" d={`M${x} ${76 + Math.abs(x) * 0.12 + j * 10} l3 4 l-3 4 l-3 -4z`} style={{ animationDelay: `${(i + j) * 0.3}s` }} />
            ))}
          </g>
        ))}
        {[-48, -16, 16, 48].map((x) => (
          <path key={x} className="crystal" d={`M${x} ${110} l3 5 l-3 5 l-3 -5z`} />
        ))}
        <path className="crystal" d="M0 126 l5 8 l-5 8 l-5 -8z" />
      </g>
    </g>
  );
}

const MAP: Record<Motif, () => JSX.Element> = {
  haldi: Haldi,
  mehendi: Mehendi,
  sangeet: Sangeet,
  baraat: Baraat,
  wedding: Wedding,
  reception: Reception,
};

export function EventMotif({ motif }: { motif: Motif }) {
  const Art = MAP[motif];
  return (
    <svg className={`motif motif--${motif}`} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Art />
    </svg>
  );
}
