import type { ReactElement } from "react";
// Engineering abstraction v2 (alt C) — Revixir.
// Circular halftone field split by a single meandering negative-space
// fracture. One architecture, two identities. Orange dot marks the sole
// negotiated crossing of the boundary.
export function RevixirMarkV2AltC({ className }: { className?: string }) {
  const cx = 32;
  const cy = 32;
  const R = 26;
  const step = 3;
  const r = 0.9;

  // Fracture: y = f(x), meanders across the disc.
  const f = (x: number) => 32 + Math.sin((x - 6) * 0.22) * 6;
  const voidHalf = 1.6;

  // Chosen crossing point on the fracture, inside the disc.
  const sxp = 30;
  const syp = f(sxp);

  const dots: ReactElement[] = [];
  let row = 0;
  for (let y0 = cy - R; y0 <= cy + R; y0 += step * 0.87) {
    const offset = row % 2 === 0 ? 0 : step / 2;
    for (let x0 = cx - R; x0 <= cx + R; x0 += step) {
      const px = x0 + offset;
      const py = y0;
      if (Math.hypot(px - cx, py - cy) > R) continue;
      if (Math.abs(py - f(px)) < voidHalf) continue;
      if (Math.hypot(px - sxp, py - syp) < 1.8) continue;
      dots.push(
        <circle key={`${row}-${x0}`} cx={px} cy={py} r={r} fill="currentColor" />,
      );
    }
    row++;
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Revixir engineering abstraction (alt C) — negotiated crossing"
    >
      <g>{dots}</g>
      <circle cx={sxp} cy={syp} r={2.4} className="fill-accent" />
    </svg>
  );
}
