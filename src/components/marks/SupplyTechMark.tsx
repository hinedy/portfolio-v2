// Bottleneck mark: row of shapes joined by arrows, one node constricted.
// Monochrome, currentColor. See PORTFOLIO.md §6.
export function SupplyTechMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="SupplyTech mark"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      {/* nodes: full, full, constricted (bottleneck), full */}
      <rect x="4" y="26" width="10" height="12" />
      <rect x="20" y="26" width="10" height="12" />
      <rect x="37" y="30" width="6" height="4" />
      <rect x="50" y="26" width="10" height="12" />
      {/* connectors with arrowheads */}
      <line x1="14" y1="32" x2="20" y2="32" />
      <line x1="30" y1="32" x2="37" y2="32" />
      <line x1="43" y1="32" x2="50" y2="32" />
      {/* arrowhead marks */}
      <polyline points="18,30 20,32 18,34" />
      <polyline points="35,30 37,32 35,34" />
      <polyline points="48,30 50,32 48,34" />
    </svg>
  );
}
