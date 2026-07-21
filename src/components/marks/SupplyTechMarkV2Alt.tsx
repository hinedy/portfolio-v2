import type { ReactElement } from "react";
// Engineering abstraction v2 (alt A) — SupplyTech.
// Convergence by channel merge: four dispersed dot-channels on the left
// progressively collapse into one governed corridor on the right.
// One orange dot marks the commit point — where many possible operational
// paths become one committed system state. Primitive: dots only.
export function SupplyTechMarkV2Alt({ className }: { className?: string }) {
  const step = 3;
  const r = 0.9;
  const xs: number[] = [];
  for (let x = 4; x <= 60; x += step) xs.push(x);
  const ys: number[] = [];
  for (let y = 4; y <= 60; y += step) ys.push(y);

  // Four channel centers on the left, collapsing to one on the right.
  const leftCenters = [12, 26, 38, 52];
  const rightCenter = 32;
  const commitX = 44;
  const half = 2.2; // channel half-width in units (~ dot spacing)

  // For a given x, return the set of channel centers active there.
  const centersAt = (x: number): number[] => {
    const t = Math.min(1, Math.max(0, (x - 6) / (commitX - 6)));
    // ease: hold dispersion, then compress hard toward commitX
    const e = Math.pow(t, 1.8);
    if (x >= commitX) return [rightCenter];
    return leftCenters.map((c) => c + (rightCenter - c) * e);
  };

  const dots: ReactElement[] = [];
  for (const x of xs) {
    const centers = centersAt(x);
    for (const y of ys) {
      const inside = centers.some((c) => Math.abs(y - c) <= half);
      if (!inside) continue;
      if (x === commitX && Math.abs(y - rightCenter) <= half) continue;
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
      aria-label="SupplyTech engineering abstraction (alt A)"
    >
      <g>{dots}</g>
      <circle cx={commitX} cy={rightCenter} r={2.4} className="fill-accent" />
    </svg>
  );
}
