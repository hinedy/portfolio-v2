import type { ReactElement } from "react";
// Engineering abstraction — SupplyTech.
// Convergence by channel merge with a wide clearance around the commit
// point, isolating the signal dot from the field. Four dispersed
// dot-channels on the left collapse into one governed corridor on the
// right. Primitive: dots only.
export function SupplyTechMarkAlt({ className }: { className?: string }) {
  const step = 3;
  const r = 0.9;
  const xs: number[] = [];
  for (let x = 4; x <= 60; x += step) xs.push(x);
  const ys: number[] = [];
  for (let y = 4; y <= 60; y += step) ys.push(y);

  const leftCenters = [12, 26, 38, 52];
  const rightCenter = 32;
  const commitX = 44;
  const half = 2.2;

  const centersAt = (x: number): number[] => {
    const t = Math.min(1, Math.max(0, (x - 6) / (commitX - 6)));
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
      // Wide clearance around the commit point isolates the signal dot
      if (Math.abs(x - commitX) < step) continue;
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
      aria-label="SupplyTech engineering abstraction"
    >
      <g>{dots}</g>
      <circle cx={commitX} cy={rightCenter} r={2.4} className="fill-accent" />
    </svg>
  );
}
