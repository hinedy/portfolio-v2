import type { ReactElement } from "react";
// Engineering abstraction v2 (alt C) — SupplyTech.
// Convergence by radial collapse: an arc of dispersed dot-paths bends inward
// to a single terminal point. Many possible states become one. The orange
// dot is the deterministic commit at the focus. Primitive: dots only.
export function SupplyTechMarkV2AltC({ className }: { className?: string }) {
  const focusX = 50;
  const focusY = 32;
  const dots: ReactElement[] = [];
  const paths = 7; // number of converging paths
  const pointsPerPath = 14;
  const spread = 26; // vertical dispersion at the far end

  for (let p = 0; p < paths; p++) {
    const t0 = p / (paths - 1); // 0..1
    const startY = focusY + (t0 - 0.5) * 2 * spread;
    const startX = 6;
    for (let i = 0; i < pointsPerPath; i++) {
      const u = i / (pointsPerPath - 1); // 0 start -> 1 focus
      // ease: linger dispersed, then bend sharply to the focus
      const e = Math.pow(u, 1.6);
      const x = startX + (focusX - startX) * u;
      const y = startY + (focusY - startY) * e;
      // skip the terminal so the orange dot sits clean at the focus
      if (u > 0.985) continue;
      dots.push(
        <circle key={`${p}-${i}`} cx={x} cy={y} r={0.9} fill="currentColor" />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="SupplyTech engineering abstraction (alt C)"
    >
      <g>{dots}</g>
      <circle cx={focusX} cy={focusY} r={2.4} className="fill-accent" />
    </svg>
  );
}
