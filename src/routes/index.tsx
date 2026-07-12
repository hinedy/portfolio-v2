import { createFileRoute } from "@tanstack/react-router";
import { CONTENT } from "@/lib/content";
import { AsciiPortrait } from "@/components/AsciiPortrait";
import { Annotation } from "@/components/Annotation";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const { hero, position, evidence, decisions, signal, writing, contact, footer } = CONTENT;

/* Shared page frame — a 12-col grid site with visible outer rules,
   mono-labeled section breaks, no rounded corners, no card chrome. */

function SectionHeader({
  label,
  question,
}: {
  label: string;
  question: string;
}) {
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

function TopBar() {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-12 gap-x-6 py-4 items-baseline">
        <a href="#top" className="col-span-6 md:col-span-3 font-mono text-xs tracking-widest uppercase text-ink">
          Ahmed Hinedy
        </a>
        <div className="hidden md:block col-span-6 font-mono text-[11px] tracking-wider uppercase text-muted-foreground">
          Frontend Software Engineer · Alexandria, EG
        </div>
        <nav className="col-span-6 md:col-span-3 flex justify-end gap-4 font-mono text-[11px] tracking-wider uppercase">
          <a href="#position" className="hover:text-accent transition-colors">Position</a>
          <a href="#evidence" className="hover:text-accent transition-colors">Evidence</a>
          <a href="#decisions" className="hover:text-accent transition-colors">Decisions</a>
          <a href="#writing" className="hover:text-accent transition-colors">Writing</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid grid-cols-12 gap-x-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
          <div className="section-label mb-10">00 / Hero — spec sheet v2</div>
          <h1 className="font-display text-[clamp(3.5rem,11vw,10.5rem)] text-ink">
            Software gets complicated long before it gets big.
          </h1>
          <p className="mt-10 max-w-xl text-lg md:text-xl leading-snug text-ink/85">
            {hero.sub}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 mt-12 md:mt-0 flex flex-col items-end">
          <div className="w-full overflow-hidden border border-rule bg-paper p-2">
            <div className="overflow-hidden">
              <AsciiPortrait />
            </div>
          </div>
          <div className="mt-3 self-start md:self-end">
            <Annotation>{hero.portraitAnnotation}</Annotation>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-full md:w-auto">
            <dt>character set</dt><dd className="text-ink">. - + #</dd>
            <dt>grid</dt><dd className="text-ink">93 × 175</dd>
            <dt>render</dt><dd className="text-ink">client, on load</dd>
            <dt>duration</dt><dd className="text-ink">1.35s</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Position() {
  return (
    <section id="position" className="mx-auto max-w-[1440px] px-6 md:px-10">
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
}: {
  cs: (typeof evidence.caseStudies)[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className="grid grid-cols-12 gap-x-6 border-t border-rule py-14 md:py-20">
      <aside className="col-span-12 md:col-span-3 space-y-5 mb-8 md:mb-0">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Case {num} / {cs.category}
        </div>
        <div className="font-display text-6xl md:text-7xl text-ink">{cs.title}</div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <dt>owned</dt>
          <dd className="text-ink normal-case tracking-normal">Frontend architecture, delivery</dd>
          <dt>surface</dt>
          <dd className="text-ink normal-case tracking-normal">React, Next.js, TypeScript</dd>
          <dt>link</dt>
          <dd>
            <a
              href={cs.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline underline-offset-4 normal-case tracking-normal"
            >
              {cs.url.replace(/^https?:\/\//, "")}
            </a>
          </dd>
        </dl>
      </aside>

      <div className="col-span-12 md:col-span-9 space-y-10">
        <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-ink">
          {cs.thesis}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <Field label="Context" body={cs.context} />
          <Field label="The Problem" body={cs.theProblem} />
          <Field label="Why This Was Difficult" body={cs.whyThisWasDifficult} />
          <Field label="What We Changed" body={cs.whatWeChanged} />
        </div>

        <div className="border-l-2 border-accent pl-5 py-1">
          <Annotation>{cs.tradeoffs.annotation}</Annotation>
          <p className="mt-3 text-base md:text-lg text-ink/90 max-w-3xl">
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
    <div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </div>
      <p className="text-[15px] md:text-base leading-relaxed text-ink/90">{body}</p>
    </div>
  );
}

function Evidence() {
  return (
    <section id="evidence" className="mx-auto max-w-[1440px] px-6 md:px-10">
      <SectionHeader label={evidence.sectionLabel} question={evidence.question} />
      <div className="pb-20">
        {evidence.caseStudies.map((cs, i) => (
          <CaseStudy key={cs.title} cs={cs} index={i} />
        ))}
      </div>
    </section>
  );
}

function Decisions() {
  return (
    <section id="decisions" className="mx-auto max-w-[1440px] px-6 md:px-10">
      <SectionHeader label={decisions.sectionLabel} question={decisions.question} />
      <ol className="border-t border-rule pb-24 md:pb-32">
        {decisions.items.map((d, i) => (
          <li
            key={d.category}
            className="grid grid-cols-12 gap-x-6 border-b border-rule py-8 md:py-10 items-baseline"
          >
            <div className="col-span-2 md:col-span-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="col-span-10 md:col-span-9">
              <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] text-ink">
                {d.statement}
              </p>
              <div className="mt-3">
                <Annotation>{d.category.toLowerCase()}</Annotation>
              </div>
            </div>
            <div className="hidden md:block col-span-2 text-right font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              decision
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Signal() {
  return (
    <section id="signal" className="mx-auto max-w-[1440px] px-6 md:px-10">
      <SectionHeader label={signal.sectionLabel} question={signal.question} />
      <div className="grid grid-cols-12 gap-x-6 gap-y-14 pb-24 md:pb-32">
        {signal.quotes.map((q, i) => (
          <figure
            key={q.name}
            className="col-span-12 md:col-span-6 border-t border-rule pt-6"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
              Quote {String(i + 1).padStart(2, "0")}
            </div>
            <blockquote className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.15] text-ink">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5">
              <div className="text-ink font-medium">{q.name}</div>
              <div className="mt-1">
                <Annotation>{q.provenance}</Annotation>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-[1440px] px-6 md:px-10">
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
                <div className="col-span-3 md:col-span-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {y}.{m}.{d}
                </div>
                <div className="col-span-9 md:col-span-8">
                  <div className="font-display text-2xl md:text-4xl text-ink group-hover:text-accent transition-colors leading-[1.05]">
                    {p.title}
                  </div>
                  <div className="mt-3 text-sm md:text-base text-ink/75 max-w-2xl">
                    {p.summary}
                  </div>
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

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-6 md:px-10">
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

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-10 grid grid-cols-12 gap-x-6 gap-y-6 items-end">
        <div className="col-span-12 md:col-span-6 space-y-2">
          {footer.colophon.map((line) => (
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

function HomePage() {
  return (
    <main className="min-h-screen bg-background text-ink">
      <TopBar />
      <Hero />
      <Position />
      <Evidence />
      <Decisions />
      <Signal />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
