export function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <span className="annotation">
      <span className="annotation-tick" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
