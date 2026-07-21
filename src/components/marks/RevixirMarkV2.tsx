// Engineering abstraction v2 — Revixir.
// Continuous field of horizontal strokes. One vertical fault crossing them.
// The crossing is the invariant: ownership exists inside one architecture.
// Primitive: strokes only. See PORTFOLIO.md §6.
export function RevixirMarkV2({ className }: { className?: string }) {
  const rows = 11;
  const top = 8;
  const bottom = 56;
  const step = (bottom - top) / (rows - 1);
  const left = 6;
  const right = 58;
  const faultX = 40;
  const lines = [];
  for (let i = 0; i < rows; i++) {
    const y = top + i * step;
    lines.push(
      <line
        key={i}
        x1={left}
        y1={y}
        x2={right}
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
      aria-label="Revixir engineering abstraction"
    >
      <g>{lines}</g>
      <line
        x1={faultX}
        y1={top - 2}
        x2={faultX}
        y2={bottom + 2}
        className="stroke-accent"
        strokeWidth={1.5}
      />
    </svg>
  );
}
