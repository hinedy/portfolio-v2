import type { ReactElement } from "react";
// Engineering abstraction v2 (alt B) — MedX.
// Continuous circular halftone field. One orange dot slightly off-center is
// the invariant actively holding the system in equilibrium. Primitive: dots.
export function MedXMarkV2AltB({ className }: { className?: string }) {
  const cx = 32;
  const cy = 32;
  const R = 26;
  const step = 3;
  const r = 0.9;
  // Signal sits slightly off geometric center — the point where correctness
  // is actively maintained against continuous drift.
  const sx = 34;
  const sy = 30;

  const dots: ReactElement[] = [];
  // hex-ish grid: offset every other row
  let row = 0;
  for (let y = cy - R; y <= cy + R; y += step * 0.87) {
    const offset = row % 2 === 0 ? 0 : step / 2;
    for (let x = cx - R; x <= cx + R; x += step) {
      const px = x + offset;
      const py = y;
      const d = Math.hypot(px - cx, py - cy);
      if (d > R) continue;
      // omit the dot closest to the signal position
      if (Math.hypot(px - sx, py - sy) < 1.6) continue;
      dots.push(
        <circle key={`${row}-${x}`} cx={px} cy={py} r={r} fill="currentColor" />,
      );
    }
    row++;
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="MedX engineering abstraction (alt B) — equilibrium"
    >
      <g>{dots}</g>
      <circle cx={sx} cy={sy} r={2.4} className="fill-accent" />
    </svg>
  );
}
