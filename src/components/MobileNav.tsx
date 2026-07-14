import { useEffect } from "react";

export interface MobileNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export function MobileNav({
  items,
  open,
  onClose,
}: {
  items: MobileNavItem[];
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 bg-background text-ink lg:hidden flex flex-col"
    >
      <div className="border-b border-rule">
        <div className="px-6 grid grid-cols-2 py-4 items-baseline">
          <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
            // navigation
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="justify-self-end font-mono text-[11px] uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            [ close ]
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ol>
          {items.map((item, i) => (
            <li key={item.href} className="border-b border-rule">
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={onClose}
                className="grid grid-cols-[auto_1fr] gap-4 items-baseline px-6 py-6 hover:bg-paper transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-5xl text-ink leading-none">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="border-t border-rule px-6 py-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Ahmed Hinedy · Alexandria, EG
      </div>
    </div>
  );
}
