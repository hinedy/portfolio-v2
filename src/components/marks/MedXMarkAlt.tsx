// MedX mark variant: one satellite highlighted in accent.
// Monochrome base, single accent node. See PORTFOLIO.md §6.
export function MedXMarkAlt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="MedX mark (alt)"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      {/* connectors */}
      <line x1="28" y1="32" x2="12" y2="14" />
      <line x1="28" y1="32" x2="52" y2="18" />
      <line x1="28" y1="32" x2="18" y2="52" />
      <line x1="28" y1="32" x2="50" y2="48" />
      {/* primary node */}
      <circle cx="28" cy="32" r="7" fill="currentColor" stroke="none" />
      {/* satellite nodes — one highlighted */}
      <circle cx="12" cy="14" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="52" cy="18" r="3" className="fill-accent" stroke="none" />
      <circle cx="18" cy="52" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="48" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
