# PORTFOLIO.md

Canonical spec for hinedy.vercel.app. This file is the source of truth for
voice, information architecture, and section-level behavior. Code in
`src/lib/content.ts` and `src/routes/*` serves this spec — not the other way
around. When the spec changes, update this file in the same change as the
code.

Section numbers (§N) are stable — they are referenced from code comments and
from prior conversation history. Do not renumber existing sections; append
new ones.

---

## §1 — Purpose & audience

A portfolio for a Product Frontend Engineer aimed at technical readers
(founders, CTOs, senior engineers) evaluating how someone thinks, not what
they've clicked "install" on. The site's job is to answer, in order:

1. How do you think? (Position)
2. Can you prove it? (Evidence)
3. What principles repeat across projects? (How I Decide)
4. Did other people notice? (Signal)
5. Can you articulate your reasoning? (Writing)
6. What are you exploring now? (Lab)
7. Want to solve another hard problem? (Contact)

Not a marketing site. No hero CTA button, no "trusted by" logo strip, no
generic value props. The reader is assumed to be capable of forming their
own conclusions if shown real evidence.

---

## §2 — Voice & tone

- Systems-thinking, not features-thinking. Talk about constraints,
  tradeoffs, boundaries, and lifecycle — not tool names in isolation.
- Plain prose over adjectives. "Reduced main bundle ~49.5%" beats "blazing
  fast." Numbers where they exist, silence where they don't.
- First person, past tense in case studies. Present tense in principles.
- No marketing verbs (empower, unlock, revolutionize, seamless).
- Every claim is either quantified, attributed, or provable from the case
  study text underneath it. Nothing floats.

### Annotation motif

Monospaced `// like this` inline comments appear in specific places only:

**Allowed:**

- Hero portrait caption (`// rendered, not photographed`)
- Tradeoff annotations inside each case study (`// tradeoff: …`)
- Evidence hover callouts from Decisions rows (`// evidence: MedX, Revixir`)
- Footer colophon (`// set in Big Shoulders Display, Inter, Space Mono`)

**Banned:**

- Top nav (would read as decoration)
- Section headings
- Blog post bodies
- Anywhere the annotation would exceed one line

Use the motif to signal _authorial commentary on the work_, not to style
random UI chrome.

---

## §3 — Information architecture

Seven sections on the index route. Nav exposes five; two (Signal, Lab) are
scroll-only.

| #   | Section      | Anchor       | In nav                      |
| --- | ------------ | ------------ | --------------------------- |
| 01  | POSITION     | `#position`  | Yes                         |
| 02  | EVIDENCE     | `#evidence`  | Yes                         |
| 03  | HOW I DECIDE | `#decisions` | Yes (label: "How I Decide") |
| 04  | SIGNAL       | `#signal`    | No                          |
| 05  | WRITING      | `/blog`      | Yes (routes to blog index)  |
| 06  | LAB          | `#lab`       | No                          |
| 07  | CONTACT      | `#contact`   | Yes                         |

The anchor id `#decisions` is intentionally kept even though the visible
label is "How I Decide" — external links and prior conversation reference
`#decisions`. Only the label changed.

Blog lives at `/blog` and `/blog/:slug`, MDX-backed via `src/lib/posts.ts`.

---

## §4 — Annotation motif (detail)

See §2 for the allow/deny list. Additional rules:

- One line only. If it wraps, cut it or move it to prose.
- Rendered in `Space Mono` at the same size as body text, muted color.
- Never used as a heading — always adjacent to the thing it comments on.
- The hover callout in the Decisions table (`// evidence: X, Y`) joins
  multiple evidence refs with `, ` (comma + space).

---

## §6 — Section-by-section content spec

All copy lives in `src/lib/content.ts` under the `CONTENT` const.

### 01 / POSITION

Four lines of body prose (`position.body: string[]`). Framing question:
"How do you think?" No links, no lists, no annotation. If a fifth line is
ever added, cut one first — four is the shape.

### 02 / EVIDENCE

Framing question: "Can you prove it?" Three case studies, each following
the same six-part structure:

1. `context` — what the product is and who it serves.
2. `theProblem` — what the platform needed to do.
3. `whyThisWasDifficult` — the actual constraints (not vague "complex").
4. `whatWeChanged` — the shipped work, with numbers where they exist.
5. `tradeoffs` — a one-line `annotation` (`// tradeoff: …`) plus a
   `detail` paragraph explaining the choice made and what was traded.
6. `whatIdDoDifferently` — one paragraph, honest and specific.

Plus metadata: `title`, `category` ("Production" | "Discontinued" | "MVP"),
`url`, `image`, `owned` (role), `decisionSurface` (tech list), `thesis`
(one-line claim the case study substantiates).

Three case studies, in this order: MedX, Revixir, SupplyTech.

### 03 / HOW I DECIDE

See §12 for the full spec — table layout is load-bearing here.

### 04 / SIGNAL

Framing question: "Did other people notice?" Testimonial quotes with
`name`, `provenance` (project + role, e.g. "MedX — CTO"), and `quote`.
Provenance format is `"{project} — {role}"` with an em dash. Full quote
text is preserved in content; truncation is a UI concern.

### 05 / WRITING

Framing question: "Can you articulate your reasoning?" References blog
posts by `slug`; actual content lives in `content/posts/*.mdx`. Do not
duplicate post content into `content.ts`.

### 06 / LAB

Framing question: "What are you exploring now?" See §13.

### 07 / CONTACT

Framing question: "Want to solve another hard problem?" One line of prose,
email, tel, and social links (GitHub, DEV, LinkedIn, Behance).

---

## §8 — Microcopy lock

Replace conventional resume/portfolio vocabulary with the terms below.
These are locked — do not swap in synonyms.

| Conventional     | Locked replacement  |
| ---------------- | ------------------- |
| Stack / Tools    | `chosen because...` |
| Role             | `owned`             |
| Tech             | `decision surface`  |
| Duration         | `time invested`     |
| Outcome / Impact | `what changed`      |

`chosen because...` is rate-limited to 2–3 uses per page — it's a device,
not a pattern. `owned` is the only role label; do not use "Lead", "Senior",
"Contributor" as role synonyms unless it's the literal external title.

Also locked:

- `meta.role` = `"Product Frontend Engineer"` (not "Frontend Software
  Engineer", not "Senior Frontend Developer"). Feeds `<title>`, meta
  description, `og:title`, and the topbar.

---

## §11 — Hero layout & portrait

- Headline: "Software gets complicated long before it gets big."
- Sub: "I design interfaces around constraints, tradeoffs, and the people
  who have to maintain them."
- Portrait: ASCII, not photographic. Source in `src/lib/ascii-portrait.ts`,
  rendered by `src/components/AsciiPortrait.tsx`.
- Portrait annotation (one of the four permitted uses of the motif):
  `// rendered, not photographed`.
- Motion: subtle only. No parallax, no auto-playing video, no scroll-jacking.
  The portrait may animate on mount; nothing else in the hero should.
- Typography: headline in `Big Shoulders Display`, body in `Inter`,
  annotations in `Space Mono`. This trio is the entire type system.

---

## §12 — Decisions table (03 / HOW I DECIDE)

The most opinionated section on the site. Everything here is load-bearing.

### Epigraph

A single line rendered above the table at `clamp(1.75rem, 4vw, 3.5rem)` in
`Big Shoulders Display`:

> Every technical decision optimizes something — and taxes something else.

This is the thesis every row exists to support. It is the strongest,
quotable line in the whole content set on purpose. Do not weaken it,
soften it, or split it.

### Row schema

Each row has:

- `category` — mono label (e.g. "Performance", "Architecture"). Space Mono.
- `statement` — the headline claim. Inter, weight/size scaled by `weight`.
- `explanation` — 1–2 sentences of reasoning. Secondary weight.
- `note` (optional) — a current-tooling preference secondary to the
  principle. Muted color. Only used where the principle is durable but the
  tool choice is contingent (e.g. State row → Zustand / React Query).
- `evidenceRefs` — array of case study titles this claim is proven by in
  the Evidence section. `[]` means no cross-reference.
- `weight` — 0–5, drives visual weight of the `statement` only.

### Visual weight

`weight` maps continuously to typography, not a binary linked/unlinked
toggle:

- `font-weight: 400 + (weight / 5) * 300`
- `font-size: 1.0625 + (weight / 5) * 0.375rem`

Heavier claims render larger and bolder. This is the ONLY place on the
site where weight variation is applied — do not extend the pattern
elsewhere.

### Row order

Authorial, not weight-derived. Ordering is set explicitly in `content.ts`
by the author. Current order:

`Performance, Architecture, Product, Requirements, Teams, State, Code,
APIs, Components, Forms`

`weight` and order are decoupled on purpose — some low-weight rows
(Requirements) sit high in the list because they set up the rows below.

### Non-technical rows

At most two rows may be non-technical (about how work is scoped or
requirements are gathered). Currently: **Requirements** and **Product**.
This cap is a discipline against the section drifting into generic
consulting-speak.

### Cross-reference behavior

- Rows with `evidenceRefs.length > 0` render as `<button>`, hover with
  `bg-paper`, and reveal an annotation callout
  `// evidence: {evidenceRefs.join(", ")}`.
- Clicking scrolls to and highlights the relevant Evidence case study.
- Rows with `evidenceRefs: []` render as `<div>` — no hover, no callout,
  standard weight. Do NOT add placeholder or fake references to
  "activate" a row visually.
- Never add an `evidenceRef` without checking that the referenced case
  study text actually substantiates the claim.

---

## §13 — Lab (06 / LAB)

Framing question: "What are you exploring now?" Small, honest list of
in-progress or recently published side work.

Row schema per item:

- `title` — artifact name.
- `description` — 1–2 sentences.
- `meta` — array of `{ label, value }` pairs (artifact, category, state).
  `state` is one of "active", "published", "archived".
- `url` — canonical link (usually GitHub).
- Optional `npmUrl`, `demoUrl`, `showcaseUrl` — rendered as separate
  small links, not merged into one.

No screenshots, no cards, no status badges beyond the `state` value.
The layout must support N items but ships with only the ones that
genuinely exist — no placeholders.

Not in the top nav. Reached by scroll only, same treatment as Signal.

---

## §14 — Maintenance rule

Any change to content, section structure, or section-level behavior
updates three things in the same change:

1. `src/lib/content.ts` (or the referenced MDX file, for blog posts).
2. The affected route in `src/routes/`.
3. This file (`PORTFOLIO.md`).

If a change can't be described here without contradicting an existing
section, the direction itself is changing — say so explicitly and revise
the affected §N, don't quietly diverge.

Agents working on this project should read `PORTFOLIO.md` before touching
content or the Decisions/Evidence/Lab sections. `AGENTS.md` points here.
