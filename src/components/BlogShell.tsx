import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MobileNav } from "@/components/MobileNav";

/* Shared blog page frame — matches the spec-sheet system from the home page:
   12-col grid, visible outer rules, mono labels, no rounded corners, no cards. */

const NAV_ITEMS = [
  { label: "Position", href: "/#position" },
  { label: "Evidence", href: "/#evidence" },
  { label: "How I Decide", href: "/#decisions" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

function TopBar() {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-12 lg:gap-x-6 py-4 items-baseline">
        <Link to="/" className="min-w-0 truncate lg:col-span-3 font-mono text-xs tracking-widest uppercase text-ink">
          Ahmed Hinedy
        </Link>
        <div className="hidden lg:block lg:col-span-6 font-mono text-[11px] tracking-wider uppercase text-muted-foreground">
          Frontend Software Engineer · Alexandria, EG
        </div>
        <nav className="hidden lg:flex lg:col-span-3 justify-end gap-4 font-mono text-[11px] tracking-wider uppercase whitespace-nowrap">
          <Link to="/" hash="position" className="hover:text-accent transition-colors">Position</Link>
          <Link to="/" hash="evidence" className="hover:text-accent transition-colors">Evidence</Link>
          <Link to="/" hash="decisions" className="hover:text-accent transition-colors">How I Decide</Link>
          <Link to="/blog" className="hover:text-accent transition-colors">Writing</Link>
          <Link to="/" hash="contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
        <div className="lg:hidden justify-self-end">
          <MobileNav items={NAV_ITEMS} />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-10 grid grid-cols-12 gap-x-6 gap-y-6 items-end">
        <div className="col-span-12 md:col-span-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          // set in Big Shoulders Display, Inter, Space Mono
        </div>
        <div className="col-span-12 md:col-span-6 md:text-right font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          © {year} Ahmed Hinedy · Alexandria, EG
        </div>
      </div>
    </footer>
  );
}

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-ink">
      <TopBar />
      {children}
      <Footer />
    </main>
  );
}
