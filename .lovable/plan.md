## Goal

Make the hero portrait plate **taller** (vertically bigger) without widening it and without touching your existing `line-height: 1.1` on `.ascii-portrait`.

## What's actually driving the shape today

- Grid: 93 rows × 175 cols, fixed.
- `.ascii-portrait` font-size = `min(7px, calc(100cqi / 105))` — sized off container **inline** (width) only.
- `line-height: 1.1` (your locked value) — keep as-is.
- `.ascii-frame` uses `container-type: inline-size`, so block-size (height) can't drive font-size.
- Frame width clamp on the wrapper: `lg:w-[clamp(420px,42vw,720px)]`.
- Net effect: because font scales off width and rows=93, height ≈ width × (93 × 1.1 × cell-height-ratio) / 175. To get taller, either widen (rejected) or let font-size scale off block-size and give the frame more block-size.

## Change (single approach, no line-height edits)

Drive font-size off whichever container axis is smaller, and give the frame explicit block room so the "smaller axis" becomes height on wide screens.

1. **`src/styles.css` — `.ascii-frame`**
   - `container-type: size` (was `inline-size`) so `cqb` is available.

2. **`src/styles.css` — `@utility ascii-portrait`**
   - Keep `line-height: 1.1` untouched.
   - Change `font-size` to:
     `min(7px, calc(100cqi / 105), calc(100cqb / (93 * 1.1)))`
   - Now the render fills whichever axis is the binding constraint. On narrow screens width binds (unchanged behavior). Given more height, height stops being slack.

3. **`src/routes/index.tsx` — portrait wrapper**
   - Narrow the width clamp back down so the plate isn't wide: `lg:w-[clamp(360px,30vw,480px)]`.
   - Add explicit block-size on the frame so height becomes the binding axis: on the `.ascii-frame` div, add `lg:h-[clamp(520px,72vh,860px)]` and `[@media(max-height:900px)]:lg:h-[clamp(440px,68vh,640px)]`.
   - Remove `p-2` on `.ascii-frame` (or keep — cosmetic; leaving as-is unless you want it flush).
   - Keep `lg:mt-20 xl:mt-28` offset; keep mobile `max-h-[50svh]` as-is.

Result: plate is narrower than now, noticeably taller than now, aspect shifts from landscape toward portrait/square. Face stays proportional because the ASCII grid and your `1.1` leading are untouched — only the render size is driven off height instead of width.

## Files touched

- `src/styles.css` (2 rules)
- `src/routes/index.tsx` (portrait wrapper classes only)

## What I will not touch

- `line-height: 1.1` on `.ascii-portrait`.
- The ASCII source / grid.
- Any other section.

## Open question (optional)

If "taller than the specimen plate should be" is a concern on short laptop heights (≤900px), I've already capped it with the `max-height:900px` variant above. If you want an even harder ceiling, say a target aspect (e.g. 3:4 portrait), tell me and I'll swap the fixed height clamp for `aspect-ratio: 3 / 4` on `.ascii-frame` at `lg+`.