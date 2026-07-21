import type { ReactElement } from "react";
// Engineering abstraction v2 (alt B) — Revixir.
// One continuous halftone field. Two smooth negative-space fractures carve
// three regions without breaking the whole. An orange dot sits on one
// fracture at a single, deliberate crossing — authorized, not free.
export function RevixirMarkV2AltB({ className }: { className?: string }) {
  const step = 3;
  const r = 0.9;
  const dots: ReactElement[] = [];

  // Rectangular field, tight crop.
  const x0 = 4;
  const x1 = 60;
  const y0 = 6;
  const y1 = 58;

  // Fracture 1: y = f1(x), a soft sinusoid across the width.
  const f1 = (x: number) => 24 + Math.sin((x - x0) * 0.18) * 4;
  // Fracture 2: nearly vertical fracture around x = g2(y), also soft.
  const g2 = (y: number) => 40 + Math.sin((y - y0) * 0.2) * 3;

  const voidHalf = 1.6; // width of the negative-space fracture (in units)

  // Deliberate crossing point on fracture 1
  const cx = 28;
  const cy = f1(cx);

  for (let y = y0; y <= y1; y += step * 0.87) {
    for (let x = x0; x <= x1; x += step) {
      // fracture 1 (horizontal-ish): skip dots near the curve
      if (Math.abs(y - f1(x)) < voidHalf) continue;
      // fracture 2 (vertical-ish): only in the lower region
      if (y > f1(x) && Math.abs(x - g2(y)) < voidHalf) continue;
      // omit the dot nearest the crossing so the orange sits clean
      if (Math.hypot(x - cx, y - cy) < 1.8) continue;
      dots.push(
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="currentColor" />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Revixir engineering abstraction (alt B) — separation"
    >
      <g>{dots}</g>
      <circle cx={cx} cy={cy} r={2.4} className="fill-accent" />
    </svg>
  );
}
