// Partitioned-rectangle mark: 4 unequal regions divided by hairline rules.
// Monochrome, currentColor. See PORTFOLIO.md §6.
export function RevixirMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Revixir mark"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      {/* outer frame */}
      <rect x="8" y="12" width="48" height="40" />
      {/* vertical partition */}
      <line x1="34" y1="12" x2="34" y2="52" />
      {/* upper-left horizontal partition */}
      <line x1="8" y1="30" x2="34" y2="30" />
      {/* right-side horizontal partition, offset */}
      <line x1="34" y1="38" x2="56" y2="38" />
    </svg>
  );
}
