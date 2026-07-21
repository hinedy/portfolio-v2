import type { ReactElement } from "react";
// Engineering abstraction v2 (alt C) — MedX.
// Circular halftone field under subtle internal tension: dots are gently
// displaced along a soft dipolar strain, yet the whole remains one surface.
// The orange dot is the condition preventing drift into inconsistency.
export function MedXMarkV2AltC({ className }: { className?: string }) {
  const cx = 32;
  const cy = 32;
  const R = 26;
  const step = 3;
  const r = 0.9;
  // Two attractors create gentle counter-strain; the signal sits between them.
  const a1 = { x: 22, y: 24 };
  const a2 = { x: 44, y: 42 };
  const sx = 33;
  const sy = 33;

  const dots: ReactElement[] = [];
  let row = 0;
  for (let y0 = cy - R; y0 <= cy + R; y0 += step * 0.87) {
    const offset = row % 2 === 0 ? 0 : step / 2;
    for (let x0 = cx - R; x0 <= cx + R; x0 += step) {
      const gx = x0 + offset;
      const gy = y0;
      const d0 = Math.hypot(gx - cx, gy - cy);
      if (d0 > R) continue;

      // small displacement: pulled by a1, pushed by a2, magnitudes matched
      const pull = strain(gx, gy, a1.x, a1.y, +0.35);
      const push = strain(gx, gy, a2.x, a2.y, -0.35);
      const px = gx + pull.x + push.x;
      const py = gy + pull.y + push.y;

      if (Math.hypot(px - sx, py - sy) < 1.8) continue;
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
      aria-label="MedX engineering abstraction (alt C) — strained equilibrium"
    >
      <g>{dots}</g>
      <circle cx={sx} cy={sy} r={2.4} className="fill-accent" />
    </svg>
  );
}

function strain(x: number, y: number, ax: number, ay: number, k: number) {
  const dx = x - ax;
  const dy = y - ay;
  const d = Math.hypot(dx, dy) + 4;
  // radial displacement toward/away from attractor, falls off with distance
  const m = (k * 6) / d;
  return { x: -dx * m * 0.15, y: -dy * m * 0.15 };
}
