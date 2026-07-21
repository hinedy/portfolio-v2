import type { ReactElement } from "react";
// Engineering abstraction v2 (alt) — MedX.
// One dense disc, one radial interruption. Alternative candidate.
// Primitive: dots only (rings of dots forming a filled field).
export function MedXMarkV2Alt({ className }: { className?: string }) {
  const cx = 32;
  const cy = 32;
  const rings = [4, 9, 14, 19, 24];
  const dots: ReactElement[] = [];
  rings.forEach((radius, i) => {
    const count = 6 + i * 6;
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2;
      dots.push(
        <circle
          key={`${i}-${k}`}
          cx={cx + Math.cos(a) * radius}
          cy={cy + Math.sin(a) * radius}
          r={1.1}
          fill="currentColor"
        />,
      );
    }
  });
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="MedX engineering abstraction (alt)"
    >
      <circle cx={cx} cy={cy} r={1.6} fill="currentColor" />
      <g>{dots}</g>
      {/* radial interruption: a wedge cleared and one signal dot */}
      <circle cx={cx + 24} cy={cy} r={2.4} className="fill-accent" />
    </svg>
  );
}
