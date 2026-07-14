import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MobileNav } from "@/components/MobileNav";
import { Annotation } from "@/components/Annotation";
import { CONTENT } from "@/lib/content";

const NAV_ITEMS = CONTENT.nav.items;

function DesktopNav() {
  return (
    <nav className="hidden lg:flex lg:col-span-3 justify-end gap-4 font-mono text-[11px] tracking-wider uppercase whitespace-nowrap">
      {NAV_ITEMS.map((item) => {
        const [path, hash] = item.href.split("#");
        return (
          <Link
            key={item.href}
            to={path || "/"}
            hash={hash}
            className="hover:text-accent transition-colors"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-12 lg:gap-x-6 py-4 items-baseline">
        <Link to="/" hash="top" className="min-w-0 truncate lg:col-span-3 font-mono text-xs tracking-widest uppercase text-ink">
          Ahmed Hinedy
        </Link>
        <div className="hidden lg:block lg:col-span-6 font-mono text-[11px] tracking-wider uppercase text-muted-foreground">
          Frontend Software Engineer · Alexandria, EG
        </div>
        <DesktopNav />
        <div className="lg:hidden justify-self-end">
          <MobileNav items={NAV_ITEMS.map((it) => ({ label: it.label, href: it.href }))} />
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
        <div className="col-span-12 md:col-span-6 space-y-2">
          {CONTENT.footer.colophon.map((line) => (
            <Annotation key={line}>{line.replace("[date — fill in at deploy]", `${year}`)}</Annotation>
          ))}
        </div>
        <div className="col-span-12 md:col-span-6 md:text-right font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          © {year} Ahmed Hinedy · Alexandria, EG
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-ink">
      <TopBar />
      {children}
      <Footer />
    </main>
  );
}
