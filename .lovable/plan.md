## Goal
Fix the hero across all viewports by decoupling the portrait from the grid track and letting the text column be the only flexible one. Root cause: the portrait currently sits in a `md:col-span-5` grid track sized as a fraction of the container — it keeps claiming ~40% of width down to the stack breakpoint, which starves the headline column at MacBook-Pro widths and produces one-word headline wraps.

Scope: `src/routes/index.tsx` (Hero only) and `src/styles.css` (portrait sizing utility). No changes to type trio, annotation motif, motion, ASCII pipeline, or other sections.

---

## Fix 1 — Portrait becomes a fixed-width intrinsic box, not a grid track

Replace the 12-col `grid-cols-12` split inside Hero with a two-track layout where only the text column flexes:

- Change the hero row from `grid grid-cols-12 gap-x-6` to `grid grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12` (stack breakpoint raised to `lg` — see Fix 3).
- Remove `col-span-*` from the two children. The text block is the flex track; the portrait block is `auto`-sized.
- On the portrait's outer wrapper, drop `w-full` and add `w-[clamp(420px,32vw,540px)]`. That cap is the whole point: portrait width is a property of the portrait, not of the viewport share.
- Remove `max-h-[70svh] [@media(max-height:900px)]:max-h-[62svh]` from the portrait frame — height was a workaround for the fr-track behavior; once width is capped it isn't needed on desktop. Keep a mobile-only height cap (Fix 5).

Acceptance: at 1440 and 1280 CSS px, portrait rendered width is identical (both hit the clamp middle value); text column width visibly differs.

## Fix 2 — Headline sized off its column, not the viewport

Current `text-[clamp(4rem,9.5vw,10.5rem)]` is viewport-driven, so once the portrait is fixed the headline doesn't gain from the recovered space and still wraps badly.

- Add `@container` to the text column wrapper (`class="... @container"`).
- Change headline to `text-[clamp(3.5rem,11cqi,9rem)]` (container-query-inline units — sizes off the text column's own width). Drop the `[@media(max-height:900px)]` override; the container-driven size makes it unnecessary because the column can't get large enough on a short laptop to overflow.
- Give the text column `min-w-0` so it can shrink cleanly inside the new grid.

Acceptance: at 1440, 1280, 1100 CSS px in single-column (post-Fix-3) and at ≥`lg` in two-column, headline wraps to ≥2 words per line using the real string from `content.ts`.

## Fix 3 — Raise the two-column breakpoint from `md` to `lg`

Two-column at `md` (768px) is where the MacBook-Pro-class widths land in a state that can't hit a comfortable measure. Move the split up:

- Everywhere in `Hero()` where the current classes say `md:` for layout (grid split, portrait margin, portrait alignment), change to `lg:`.
- Specifically: `md:col-span-7`/`md:col-span-5` are removed by Fix 1; `mt-12 md:mt-0` → `mt-12 lg:mt-0`; `md:self-end` → `lg:self-end`; portrait section padding `md:pt-24 md:pb-28` and the `[@media(max-height:900px)]:md:*` variants → `lg:` prefix.
- Result: stacked layout is used through iPad-landscape and small laptops; two-column engages only when the text column can sit next to a 420–540px portrait with room for a proper measure.

Reuse the existing stacked markup path — no third layout variant.

## Fix 4 — iPad/stacked: portrait aligns to the same edges as the text above it

In stacked mode the portrait must share left/right bounds with the headline block.

- Remove `items-end` from the portrait column wrapper (that was a two-column concern).
- On the portrait outer wrapper, use `w-full lg:w-[clamp(420px,32vw,540px)]` so stacked mode goes edge-to-edge with the grid column, and two-column mode uses the capped intrinsic width.
- Keep the existing `border border-rule bg-paper p-2` frame; it now runs to the same left/right rules as the headline because the outer wrapper spans the shared column.
- Confirm the `// rendered, not photographed` annotation and the CHARACTER SET / GRID / RENDER / DURATION `<dl>` remain directly below the portrait (they already do — just verify after class changes).

## Fix 5 — Mobile: cap portrait height, keep source order, don't crop

- On the portrait frame add `max-h-[50svh] lg:max-h-none` and `flex justify-center`.
- Inside, the `AsciiPortrait` `<pre>` needs to scale down uniformly to fit the height cap without cropping. Add a new CSS rule in `src/styles.css`:
  ```css
  @media (max-width: 640px) {
    .ascii-portrait { font-size: 3.5px; line-height: 1.1; }
  }
  ```
  `line-height: 1.1` stays consistent with the existing utility so each character cell keeps the same aspect ratio as at desktop sizes (aspect ratio is a function of `font-size × line-height` for a monospaced glyph — proportional scaling only, no crop, no `object-fit`).
- Source order is already `section-label → h1 → sub → portrait block → annotation → dl` in `Hero()`. Verify after the grid change that this order is preserved — no `order-*` utilities should be introduced.

Acceptance: at 390×844, the entire hero (eyebrow → dl metadata) is closer to one viewport-height; portrait is not cut off; character cells remain square-ish (same ratio as desktop).

---

## Files touched
- `src/routes/index.tsx` — `Hero()` only (lines ~31–69).
- `src/styles.css` — add mobile `.ascii-portrait` size rule; the `max-height:900px` rules can stay (harmless) or be removed since Fix 1 removes the height-driven pressure. Recommend removing the wide-but-short rule (`max-height:900px and min-width:1400px`) to keep the ladder simple: base 6px, ≥1280px 7px, ≤640px 3.5px.

## Verification (Playwright, headless, screenshots to `/tmp/browser/hero/`)
- 1920×1080 — two-column, portrait capped at 540px, headline unchanged feel.
- 1536×864 (user's device CSS px) — two-column, headline reads across ≥2 lines with sensible wrap, no dead gap.
- 1440×900 (MacBook Pro) — **stacked** now (per Fix 3); headline full-column, portrait below aligned to same rules.
- 1280×800 — stacked.
- 768×1024 (iPad portrait) — stacked, portrait edges match text edges.
- 390×844 (iPhone) — stacked, portrait height-capped, order preserved, no crop.

## Out of scope
Position, Evidence, How I Decide, Signal, Writing, Current Work, Contact sections. Type trio, annotation motif, motion rules, ASCII rendering pipeline.
