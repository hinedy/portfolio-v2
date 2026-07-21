// Engineering abstraction v2 — SupplyTech.
// Field of strokes compressed to a single aperture. Orange stroke = throat.
// Constraint decides what continues. Primitive: strokes only.
// See PORTFOLIO.md §6.
export function SupplyTechMarkV2({ className }: { className?: string }) {
  // Symmetric aperture: full-width strokes taper to one stroke at the middle.
  const rows = 13;
  const top = 6;
  const bottom = 58;
  const step = (bottom - top) / (rows - 1);
  const cx = 32;
  const maxHalf = 26;
  const throatIndex = (rows - 1) / 2;
  const lines: JSX.Element[] = [];
  for (let i = 0; i < rows; i++) {
    if (i === throatIndex) continue;
    const t = Math.abs(i - throatIndex) / throatIndex; // 0 at throat, 1 at edge
    // Ease so it stays wide most of the way, then collapses sharply near throat.
    const eased = Math.pow(t, 0.55);
    const half = Math.max(1.5, eased * maxHalf);
    const y = top + i * step;
    lines.push(
      <line
        key={i}
        x1={cx - half}
        y1={y}
        x2={cx + half}
        y2={y}
        stroke="currentColor"
        strokeWidth={1}
      />,
    );
  }
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="SupplyTech engineering abstraction"
    >
      <g>{lines}</g>
      <line
        x1={cx - 3}
        y1={top + throatIndex * step}
        x2={cx + 3}
        y2={top + throatIndex * step}
        className="stroke-accent"
        strokeWidth={1.75}
      />
    </svg>
  );
}
