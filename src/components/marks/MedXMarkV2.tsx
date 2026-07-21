// Engineering abstraction v2 — MedX.
// Field of dots. One orange dot: the invariant every operation depends on.
// Primitive: dots only. See PORTFOLIO.md §6.
export function MedXMarkV2({ className }: { className?: string }) {
  const cols = 8;
  const rows = 8;
  const step = 7;
  const originX = 4.5;
  const originY = 4.5;
  const signalCol = 4;
  const signalRow = 4;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === signalRow && c === signalCol) continue;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={originX + c * step}
          cy={originY + r * step}
          r={1.15}
          fill="currentColor"
        />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="MedX engineering abstraction"
    >
      <g>{dots}</g>
      <circle
        cx={originX + signalCol * step}
        cy={originY + signalRow * step}
        r={2.6}
        className="fill-accent"
      />
    </svg>
  );
}
