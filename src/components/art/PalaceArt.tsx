/** Painted dusk view of a Jaipur garden palace — stands in until a real venue photograph is supplied. */
export function PalaceArt({ className, mode = "venue" }: { className?: string; mode?: "venue" | "silhouette" }) {
  const S = mode === "silhouette";
  const wall = S ? "#2a0b12" : "url(#pa-wall)";
  const shade = S ? "#220910" : "#c98f5f";
  const trim = S ? "#3a1420" : "#f0d6a8";
  const win = S ? "#ffcf7a" : "#ffd68f";
  const arches = (x0: number, y: number, n: number, w: number, h: number) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + i * w;
      return (
        <path
          key={`${x0}-${y}-${i}`}
          d={`M${x + 6} ${y + h} V${y + h * 0.45} C${x + 6} ${y + h * 0.18}, ${x + w / 2 - 4} ${y + 6}, ${x + w / 2} ${y} C${x + w / 2 + 4} ${y + 6}, ${x + w - 6} ${y + h * 0.18}, ${x + w - 6} ${y + h * 0.45} V${y + h} Z`}
          fill={S ? (i % 3 === 0 ? win : "#14050a") : i % 4 === 1 ? win : "#6d3a28"}
          opacity={S ? (i % 3 === 0 ? 0.55 : 1) : i % 4 === 1 ? 0.9 : 0.85}
        />
      );
    });
  const dome = (cx: number, base: number, r: number, k: string) => (
    <g key={k}>
      <rect x={cx - r * 0.9} y={base - 4} width={r * 1.8} height={8} fill={trim} />
      <path d={`M${cx - r} ${base - 4} C${cx - r} ${base - r * 1.5}, ${cx - r * 0.2} ${base - r * 1.7}, ${cx} ${base - r * 2.1} C${cx + r * 0.2} ${base - r * 1.7}, ${cx + r} ${base - r * 1.5}, ${cx + r} ${base - 4} Z`} fill={wall} />
      <rect x={cx - 1.5} y={base - r * 2.1 - 12} width={3} height={12} fill={S ? wall : "#d9b56d"} />
    </g>
  );
  const chhatri = (cx: number, base: number, k: string) => (
    <g key={k}>
      <rect x={cx - 14} y={base - 22} width={3} height={22} fill={wall} />
      <rect x={cx + 11} y={base - 22} width={3} height={22} fill={wall} />
      <rect x={cx - 18} y={base - 26} width={36} height={5} fill={trim} />
      <path d={`M${cx - 16} ${base - 26} Q${cx} ${base - 54} ${cx + 16} ${base - 26} Z`} fill={wall} />
      <rect x={cx - 1} y={base - 60} width={2} height={8} fill={S ? wall : "#d9b56d"} />
    </g>
  );

  return (
    <svg className={className} viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice" role={S ? undefined : "img"} aria-hidden={S ? true : undefined} aria-label={S ? undefined : "रामबाग पैलेस, जयपुर का चित्रण"}>
      <defs>
        <linearGradient id="pa-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1030" />
          <stop offset="0.45" stopColor="#7a2a3a" />
          <stop offset="0.78" stopColor="#d9784a" />
          <stop offset="1" stopColor="#f3c27a" />
        </linearGradient>
        <linearGradient id="pa-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2dcc0" />
          <stop offset="1" stopColor="#d8a97c" />
        </linearGradient>
        <linearGradient id="pa-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a3a3a" />
          <stop offset="1" stopColor="#2b1020" />
        </linearGradient>
        <radialGradient id="pa-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff1c8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f3a05a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!S && (
        <>
          <rect width="1600" height="600" fill="url(#pa-sky)" />
          <circle cx="1240" cy="330" r="200" fill="url(#pa-sun)" />
          <circle cx="1240" cy="330" r="34" fill="#fff0c8" opacity="0.9" />
        </>
      )}
      {/* wings */}
      <rect x="180" y="300" width="1240" height="160" fill={wall} />
      <rect x="180" y="296" width="1240" height="8" fill={trim} />
      <rect x="180" y="374" width="1240" height="6" fill={trim} />
      {arches(196, 312, 16, 34, 58)}
      {arches(1004, 312, 12, 34, 58)}
      {arches(196, 392, 16, 34, 62)}
      {arches(1004, 392, 12, 34, 62)}
      {/* corner towers */}
      {[150, 1410].map((x) => (
        <g key={x}>
          <rect x={x} y="250" width="60" height="210" fill={wall} />
          <rect x={x - 4} y="246" width="68" height="8" fill={trim} />
          {arches(x + 6, 270, 1, 48, 64)}
          {arches(x + 6, 370, 1, 48, 70)}
          {dome(x + 30, 246, 30, `t${x}`)}
        </g>
      ))}
      {/* central block */}
      <rect x="720" y="220" width="280" height="240" fill={wall} />
      <rect x="712" y="214" width="296" height="10" fill={trim} />
      {arches(736, 236, 7, 36, 66)}
      {arches(736, 318, 7, 36, 66)}
      <path d="M800 460 V400 C800 372 846 352 860 344 C874 352 920 372 920 400 V460 Z" fill={S ? "#14050a" : "#6d3a28"} />
      {dome(860, 214, 40, "main")}
      {[812, 908].map((x) => chhatri(x, 214, `m${x}`))}
      {[744, 976].map((x) => chhatri(x, 214, `c${x}`))}
      {[260, 380, 500, 1100, 1220, 1340].map((x) => chhatri(x, 296, `w${x}`))}
      {/* jharokha balconies */}
      {[330, 600, 1130, 1300].map((x) => (
        <g key={`j${x}`}>
          <rect x={x - 22} y="378" width="44" height="6" fill={trim} />
          <path d={`M${x - 20} 378 Q${x} 352 ${x + 20} 378 Z`} fill={wall} />
        </g>
      ))}
      {/* garden + water */}
      <rect x="0" y="460" width="1600" height="140" fill={S ? "#1a070c" : "#2f3a22"} />
      {!S && (
        <>
          <rect x="560" y="468" width="600" height="132" fill="url(#pa-water)" opacity="0.95" />
          <g opacity="0.25" transform="translate(0 928) scale(1 -1)">
            <rect x="720" y="320" width="280" height="140" fill="#f2dcc0" />
            <path d="M798 214 C798 120 840 100 860 84 C880 100 922 120 922 214 Z" fill="#f2dcc0" />
          </g>
          {[600, 700, 1020, 1120].map((x) => (
            <path key={`f${x}`} d={`M${x} 480 c -4 -10 4 -10 0 -24 c -4 14 4 14 0 24`} stroke="#fff1d0" strokeWidth="1.5" fill="none" opacity="0.7" />
          ))}
        </>
      )}
      {[60, 110, 1490, 1540, 470, 1130].map((x, i) => (
        <path key={`cy${x}`} d={`M${x} 470 C${x - 14} 430 ${x - 10} 380 ${x} ${330 + (i % 2) * 20} C${x + 10} 380 ${x + 14} 430 ${x} 470 Z`} fill={S ? "#14050a" : "#1f2a18"} />
      ))}
      <rect x="0" y="470" width="1600" height="6" fill={shade} opacity={S ? 1 : 0.6} />
    </svg>
  );
}
