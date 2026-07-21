import type { ReactElement } from "react";
// Engineering abstraction v2 (alt B) — SupplyTech.
// Convergence by progressive constraint: a wide halftone field is trimmed
// stepwise into a single-dot corridor. Each step removes possible states
// until only one valid operational path remains. Orange dot: the terminal
// commit — the irreversible checkpoint. Primitive: dots only.
export function SupplyTechMarkV2AltB({ className }: { className?: string }) {
  const step = 3;
  const r = 0.9;
  const cy = 32;

  // Piecewise half-heights across x. Widest on the left, single-row on the right.
  // Steps convey "progressive constraint" more than a smooth taper.
  const bands: Array<{ x0: number; x1: number; half: number }> = [
    { x0: 4, x1: 16, half: 22 },
    { x0: 17, x1: 26, half: 16 },
    { x0: 27, x1: 34, half: 10 },
    { x0: 35, x1: 42, half: 5 },
    { x0: 43, x1: 52, half: 1.5 },
    { x0: 53, x1: 60, half: 1.5 },
  ];

  const commitX = 52; // last x of the committed corridor before terminal dot

  const dots: ReactElement[] = [];
  for (let x = 4; x <= 60; x += step) {
    const band = bands.find((b) => x >= b.x0 && x <= b.x1);
    if (!band) continue;
    for (let y = 4; y <= 60; y += step) {
      if (Math.abs(y - cy) > band.half) continue;
      if (x === commitX && Math.abs(y - cy) <= band.half) continue;
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
      aria-label="SupplyTech engineering abstraction (alt B)"
    >
      <g>{dots}</g>
      <circle cx={commitX} cy={cy} r={2.4} className="fill-accent" />
    </svg>
  );
}
