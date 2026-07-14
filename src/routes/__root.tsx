import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PageShell } from "@/components/PageShell";
import { Annotation } from "@/components/Annotation";

function NotFoundComponent() {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-14">
            {/* 404 */}
            <div className="space-y-5">
              <h1 className="font-display text-[clamp(5rem,15vw,12rem)] text-ink leading-[0.85]">
                404
              </h1>
              <p className="font-mono text-[13px] md:text-sm uppercase tracking-widest text-muted-foreground">
                Requested resource not found.
              </p>
              <p className="text-base md:text-lg text-ink/75 max-w-2xl leading-relaxed">
                The reference points to a route that no longer exists, or never existed. The rest of
                the document is still available.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink hover:text-accent transition-colors underline underline-offset-4"
              >
                → Return to the index
              </Link>
            </div>

            <hr className="border-rule" />

            {/* Dependency graph */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 180 200"
                className="w-full max-w-[160px] text-ink/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="25" y1="40" x2="85" y2="40" />
                <line x1="85" y1="40" x2="145" y2="40" />
                <line x1="85" y1="46" x2="85" y2="80" />
                <line x1="85" y1="92" x2="85" y2="125" />
                <line x1="85" y1="131" x2="85" y2="160" strokeDasharray="2 3" strokeOpacity="0.4" />

                <circle cx="25" cy="40" r="5" />
                <circle cx="85" cy="40" r="5" />
                <circle cx="145" cy="40" r="5" />
                <circle
                  cx="85"
                  cy="86"
                  r="6"
                  className="fill-accent stroke-accent animate-node-pulse-once"
                />
                <circle cx="85" cy="125" r="5" />

                <text
                  x="85"
                  y="178"
                  textAnchor="middle"
                  className="fill-ink/50 font-mono"
                  stroke="none"
                  fontSize="12"
                >
                  ✕
                </text>
              </svg>
            </div>

            <div className="flex justify-center">
              <Annotation>// unresolved reference</Annotation>
            </div>

            <div className="border-t border-rule pt-8">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <dt>status</dt>
                <dd className="text-ink normal-case tracking-normal">404</dd>
                <dt>resource</dt>
                <dd className="text-ink normal-case tracking-normal break-all">{pathname}</dd>
                <dt>expected</dt>
                <dd className="text-ink normal-case tracking-normal">valid route</dd>
                <dt>resolution</dt>
                <dd className="text-ink">
                  <Link
                    to="/"
                    className="hover:text-accent transition-colors normal-case tracking-normal underline underline-offset-4"
                  >
                    Return to the index
                  </Link>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-ink grid place-items-center px-6">
      <div className="text-center">
        <div className="section-label mb-6">Error</div>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-ink">
          This page didn't load
        </h1>
        <p className="mt-6 text-base text-ink/75 max-w-md mx-auto">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            try again →
          </button>
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            ← back to index
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ahmed Hinedy — Product Frontend Engineer" },
      {
        name: "description",
        content:
          "Spec sheet portfolio of Ahmed Hinedy — product frontend engineer designing interfaces around constraints, tradeoffs, and the people who maintain them.",
      },
      { name: "author", content: "Ahmed Hinedy" },
      { property: "og:title", content: "Ahmed Hinedy — Product Frontend Engineer" },
      {
        property: "og:description",
        content:
          "Software gets complicated long before it gets big. Case studies, decisions, and writing from a product frontend engineer.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://hinedy.vercel.app/og-default.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://hinedy.vercel.app/og-default.png" },
      { name: "twitter:title", content: "Ahmed Hinedy — Product Frontend Engineer" },
      {
        name: "twitter:description",
        content:
          "Software gets complicated long before it gets big. Case studies, decisions, and writing from a product frontend engineer.",
      },
      { property: "og:site_name", content: "Ahmed Hinedy" },
      { property: "og:url", content: "https://hinedy.vercel.app" },
    ],
    links: [
      { rel: "canonical", href: "https://hinedy.vercel.app" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      {
        rel: "preload",
        href: "/fonts/big-shoulders-display-900.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ahmed Hinedy",
          jobTitle: "Product Frontend Engineer",
          url: "https://hinedy.vercel.app",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ahmed Hinedy",
          url: "https://hinedy.vercel.app",
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
