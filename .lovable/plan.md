# Per-case-study marks in Evidence

Branch: `case-studies-visuals`

## Scope

Add a small monochrome SVG mark to each Evidence case study, placed at the top of the left aside (Option A). No other layout changes.

## Changes

### 1. `src/components/marks/` (new)

Three inline SVG components, each a 64×64 viewBox, `currentColor` strokes, no fills from accent orange. `role="img"` with `aria-label`. No animation.

- `MedXMark.tsx` — one larger node + 3–4 smaller nodes joined by thin lines (abstract graph).
- `RevixirMark.tsx` — a rectangle divided into 3–4 unequal regions by hairline rules.
- `SupplyTechMark.tsx` — row of 4–5 shapes joined by arrows, one node visibly constricted (bottleneck).
- `index.ts` — exports a `MARKS` map: `{ medx: MedXMark, revixir: RevixirMark, supplytech: SupplyTechMark }`.

### 2. `src/lib/content.ts`

Add an optional `mark?: "medx" | "revixir" | "supplytech"` field to the case study type and set it on each of the three entries. No other content changes.

### 3. `src/routes/index.tsx`

In `CaseStudy`, insert the mark as the first child of the `<aside>` (above the `Case NN / Category` label):

```text
aside (space-y-5)
  ├─ [new] Mark: 48×48 mobile, 64×64 lg, text-ink/70
  ├─ mono "Case NN / Category" label
  ├─ display title
  └─ dl (owned / surface / link)
```

Resolved via `MARKS[study.mark]`; if `mark` is absent, render nothing (no placeholder box).

### 4. `PORTFOLIO.md`

Per §14, append a note under §6 EVIDENCE documenting the optional `mark` field, the three allowed values, the visual direction per mark, and the size/color rules (monochrome, `text-ink/70`, 48/64px, no animation, ink only — no accent orange).

## Non-goals

- No changes to Option B/C placements, no watermarks.
- No changes to the right column, thesis line, tradeoffs block, or aside metadata.
- No new dependencies, no asset files.
- No animation.
