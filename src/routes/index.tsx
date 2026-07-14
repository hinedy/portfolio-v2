import { Fragment, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CONTENT } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { AsciiPortrait } from "@/components/AsciiPortrait";
import { Annotation } from "@/components/Annotation";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const { hero, position, evidence, decisions, signal, writing, lab, contact } = CONTENT;

/* Shared page frame — a 12-col grid site with visible outer rules,
   mono-labeled section breaks, no rounded corners, no card chrome. */

function SectionHeader({ label, question }: { label: string; question: string }) {
  return (
    <header className="grid grid-cols-12 gap-x-6 border-t border-rule pt-8 pb-14 md:pt-12 md:pb-20">
      <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
        <div className="section-label">{label}</div>
      </div>
      <h2 className="col-span-12 md:col-span-9 font-display text-[clamp(2.75rem,7vw,6rem)] text-ink">
        {question}
      </h2>
    </header>
  );
}

function Hero() {
  const [portraitDone, setPortraitDone] = useState(false);
  return (
    <section id="top" className="scroll-mt-12">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12 grid grid-cols-12 gap-x-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
          <div className="section-label mb-10">00 / Hero — spec sheet v2</div>
          <h1 className="font-display text-[clamp(3.5rem,11vw,10.5rem)] text-ink">
            Software gets complicated long before it gets big.
          </h1>
          <p className="mt-10 max-w-xl text-lg md:text-xl leading-snug text-ink/85">{hero.sub}</p>
        </div>

        <div className="col-span-12 md:col-span-5 mt-12 md:mt-0 flex flex-col items-end">
          <div className="w-full overflow-hidden border border-rule bg-paper p-2">
            <div className="flex justify-center overflow-hidden">
              <AsciiPortrait onDone={() => setPortraitDone(true)} />
            </div>
          </div>
          <div
            className="mt-3 self-start md:self-end min-h-[1.2em] text-[0.72rem]"
            aria-live="polite"
          >
            {portraitDone && (
              <div className="animate-fade-in">
                <Annotation>{hero.portraitAnnotation}</Annotation>
              </div>
            )}
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-full md:w-auto">
            <dt>character set</dt>
            <dd className="text-ink">. - + #</dd>
            <dt>grid</dt>
            <dd className="text-ink">93 × 175</dd>
            <dt>render</dt>
            <dd className="text-ink">client, on load</dd>
            <dt>duration</dt>
            <dd className="text-ink">1.35s</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Position() {
  return (
    <section id="position" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={position.sectionLabel} question={position.question} />
      <div className="grid grid-cols-12 gap-x-6 pb-24 md:pb-32">
        <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
          <Annotation>manifesto</Annotation>
        </div>
        <div className="col-span-12 md:col-span-9 space-y-6">
          {position.body.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] text-ink"
                  : "text-lg md:text-xl leading-relaxed text-ink/85 max-w-3xl"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({
  cs,
  index,
  pulse,
}: {
  cs: (typeof evidence.caseStudies)[number];
  index: number;
  pulse: { title: string; nonce: number } | null;
}) {
  const num = String(index + 1).padStart(2, "0");
  const whatWeChangedRef = useRef<HTMLDivElement | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!pulse || pulse.title !== cs.title) return;
    const el = whatWeChangedRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1800);
    return () => clearTimeout(t);
  }, [pulse, cs.title]);

  return (
    <article className="grid grid-cols-12 gap-x-6 border-t border-rule py-14 md:py-20">
      <aside className="col-span-12 md:col-span-3 min-w-0 space-y-5 mb-8 md:mb-0">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Case {num} / {cs.category}
        </div>
        <div className="font-display text-6xl md:text-5xl lg:text-6xl xl:text-7xl text-ink break-words hyphens-auto">
          {cs.title}
        </div>
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <dt>owned</dt>
          <dd className="text-ink normal-case tracking-normal break-words min-w-0">{cs.owned}</dd>
          <dt>surface</dt>
          <dd className="text-ink normal-case tracking-normal break-words min-w-0">
            {cs.decisionSurface.join(", ")}
          </dd>
          <dt>link</dt>
          <dd className="min-w-0">
            <a
              href={cs.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline underline-offset-4 normal-case tracking-normal break-all"
            >
              {cs.url.replace(/^https?:\/\//, "")}
            </a>
          </dd>
        </dl>
      </aside>

      <div className="col-span-12 md:col-span-9 min-w-0 space-y-10">
        <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-ink break-words hyphens-auto">
          {cs.thesis}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <Field label="Context" body={cs.context} />
          <Field label="The Problem" body={cs.theProblem} />
          <Field label="Why This Was Difficult" body={cs.whyThisWasDifficult} />
          <div
            ref={whatWeChangedRef}
            className={
              "min-w-0 -m-2 p-2 transition-colors duration-500 " +
              (flash ? "bg-accent/15 outline outline-2 outline-accent" : "")
            }
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              What We Changed
            </div>
            <p className="text-[15px] md:text-base leading-relaxed text-ink/90 break-words hyphens-auto">
              {cs.whatWeChanged}
            </p>
          </div>
        </div>

        <div className="border-l-2 border-accent pl-5 py-1">
          <Annotation>{cs.tradeoffs.annotation}</Annotation>
          <p className="mt-3 text-base md:text-lg text-ink/90 max-w-3xl break-words hyphens-auto">
            {cs.tradeoffs.detail}
          </p>
        </div>

        <Field label="What I'd Do Differently" body={cs.whatIdDoDifferently} />
      </div>
    </article>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </div>
      <p className="text-[15px] md:text-base leading-relaxed text-ink/90 break-words hyphens-auto">
        {body}
      </p>
    </div>
  );
}

function Evidence({ pulse }: { pulse: { title: string; nonce: number } | null }) {
  return (
    <section id="evidence" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={evidence.sectionLabel} question={evidence.question} />
      <div className="pb-20">
        {evidence.caseStudies.map((cs, i) => (
          <CaseStudy key={cs.title} cs={cs} index={i} pulse={pulse} />
        ))}
      </div>
    </section>
  );
}

function Decisions({ onEvidenceRef }: { onEvidenceRef: (title: string) => void }) {
  return (
    <section id="decisions" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={decisions.sectionLabel} question={decisions.question} />
      <div className="grid grid-cols-12 gap-x-6 pb-10 md:pb-14">
        <div className="col-span-12 md:col-span-3 mb-4 md:mb-0">
          <Annotation>epigraph</Annotation>
        </div>
        <p className="col-span-12 md:col-span-9 font-display text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] text-ink max-w-4xl">
          {decisions.epigraph}
        </p>
      </div>
      <div role="table" className="border-t border-rule pb-24 md:pb-32">
        <div role="row" className="hidden md:grid grid-cols-12 gap-x-6 border-b border-rule py-3">
          <div
            role="columnheader"
            className="col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Category
          </div>
          <div
            role="columnheader"
            className="col-span-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Statement
          </div>
          <div role="columnheader" className="col-span-3" />
        </div>
        {decisions.items.map((d) => {
          const hasRef = d.evidenceRefs.length > 0;
          const w = d.weight ?? 3;
          // Continuous weight scaling: 0-5 maps to font-weight 400-700 and a subtle size bump.
          const statementStyle = {
            fontWeight: Math.round(400 + (w / 5) * 300),
            fontSize: `${1.0625 + (w / 5) * 0.375}rem`,
            lineHeight: 1.25,
          } as const;
          const note = (d as { note?: string }).note;
          const commonCells = (
            <>
              <div
                role="cell"
                className="col-span-12 md:col-span-3 font-mono text-[13px] uppercase tracking-wider text-ink mb-2 md:mb-0"
              >
                {d.category}
              </div>
              <div role="cell" className="col-span-12 md:col-span-6 min-w-0">
                <div className="text-ink" style={statementStyle}>
                  {d.statement}
                </div>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-ink/75 max-w-2xl">
                  {d.explanation}
                </p>
                {note && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {note}
                  </p>
                )}
              </div>
              <div
                role="cell"
                className="hidden md:flex col-span-3 items-start justify-end pt-1 min-h-[1.2em]"
              >
                {hasRef && (
                  <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    <Annotation>{`// evidence: ${d.evidenceRefs.join(", ")}`}</Annotation>
                  </span>
                )}
              </div>
            </>
          );
          if (hasRef) {
            return (
              <button
                key={d.category}
                type="button"
                role="row"
                onClick={() => onEvidenceRef(d.evidenceRefs[0]!)}
                className="group grid grid-cols-12 gap-x-6 border-b border-rule py-6 md:py-7 items-baseline md:items-start w-full text-left -mx-6 md:-mx-10 px-6 md:px-10 hover:bg-paper focus-visible:bg-paper focus:outline-none transition-colors cursor-pointer"
              >
                {commonCells}
              </button>
            );
          }
          return (
            <div
              key={d.category}
              role="row"
              className="grid grid-cols-12 gap-x-6 border-b border-rule py-6 md:py-7 items-baseline md:items-start"
            >
              {commonCells}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Signal() {
  return (
    <section id="signal" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={signal.sectionLabel} question={signal.question} />
      <div className="grid grid-cols-12 gap-x-6 pb-24 md:pb-32">
        {signal.quotes.map((q, i) => (
          <figure key={q.name} className="col-span-12 border-t border-rule pt-8 pb-10">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3 md:mb-0">
                Quote {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-12 md:col-span-8">
                <blockquote className="font-sans text-base md:text-lg leading-relaxed text-ink/90">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <div className="text-ink font-medium">{q.name}</div>
                  <div className="mt-1">
                    <Annotation>{q.provenance}</Annotation>
                  </div>
                </figcaption>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={writing.sectionLabel} question={writing.question} />
      <ul className="border-t border-rule pb-24 md:pb-32">
        {writing.posts.map((p) => {
          const date = new Date(p.publishedAt);
          const y = date.getUTCFullYear();
          const m = String(date.getUTCMonth() + 1).padStart(2, "0");
          const d = String(date.getUTCDate()).padStart(2, "0");
          return (
            <li key={p.slug} className="border-b border-rule">
              <a
                href={`/blog/${p.slug}`}
                className="group grid grid-cols-12 gap-x-6 py-8 md:py-10 items-baseline hover:bg-paper transition-colors -mx-6 md:-mx-10 px-6 md:px-10"
              >
                <div className="col-span-3 md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {y}.{m}.{d}
                </div>
                <div className="col-span-9 md:col-span-7">
                  <div className="font-display text-2xl md:text-4xl text-ink group-hover:text-accent transition-colors leading-[1.05]">
                    {p.title}
                  </div>
                  <div className="mt-3 text-sm md:text-base text-ink/75 max-w-2xl">{p.summary}</div>
                </div>
                <div className="hidden md:block col-span-2 text-right font-mono text-[11px] uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                  read →
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Lab() {
  return (
    <section id="lab" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={lab.sectionLabel} question={lab.question} />
      <ul className="border-t border-rule pb-24 md:pb-32">
        {lab.items.map((item) => (
          <li
            key={item.title}
            className="grid grid-cols-12 gap-x-6 border-b border-rule py-8 md:py-10 items-baseline"
          >
            <div className="col-span-12 md:col-span-3 mb-3 md:mb-0">
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {item.meta.map((m) => (
                  <Fragment key={m.label}>
                    <dt>{m.label}</dt>
                    <dd className="text-ink normal-case tracking-normal">{m.value}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
            <div className="col-span-12 md:col-span-9 min-w-0">
              <div className="font-display text-3xl md:text-5xl text-ink leading-[1.05] break-words">
                {item.title}
              </div>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-ink/85 max-w-3xl break-words">
                {item.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-accent transition-colors underline-offset-4 hover:underline"
                >
                  GitHub ↗
                </a>
                {"npmUrl" in item && item.npmUrl && (
                  <a
                    href={item.npmUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-accent transition-colors underline-offset-4 hover:underline"
                  >
                    npm ↗
                  </a>
                )}
                {"demoUrl" in item && item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-accent transition-colors underline-offset-4 hover:underline"
                  >
                    Demo ↗
                  </a>
                )}
                {"showcaseUrl" in item && item.showcaseUrl && (
                  <a
                    href={item.showcaseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-accent transition-colors underline-offset-4 hover:underline"
                  >
                    21st.dev ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-6 md:px-10 scroll-mt-12">
      <SectionHeader label={contact.sectionLabel} question={contact.question} />
      <div className="grid grid-cols-12 gap-x-6 pb-24 md:pb-32">
        <div className="col-span-12 md:col-span-8">
          <p className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] text-ink">
            {contact.line}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-10 inline-block font-mono text-lg md:text-2xl text-ink border-b-2 border-accent hover:text-accent transition-colors"
          >
            {contact.email}
          </a>
        </div>
        <div className="col-span-12 md:col-span-4 mt-12 md:mt-0 space-y-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              Direct
            </div>
            <div className="text-ink font-mono">{contact.tel}</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              Elsewhere
            </div>
            <ul className="space-y-1">
              {Object.entries(contact.social).map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground w-16">
                    {k}
                  </span>
                  <a
                    href={v}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink hover:text-accent transition-colors underline-offset-4 hover:underline"
                  >
                    {v.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [pulse, setPulse] = useState<{ title: string; nonce: number } | null>(null);
  const handleEvidenceRef = (title: string) => {
    setPulse({ title, nonce: Date.now() });
  };
  return (
    <PageShell>
      <Hero />
      <Position />
      <Evidence pulse={pulse} />
      <Decisions onEvidenceRef={handleEvidenceRef} />
      <Signal />
      <Writing />
      <Lab />
      <Contact />
    </PageShell>
  );
}
