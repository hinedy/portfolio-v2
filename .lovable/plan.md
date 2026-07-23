## Goal
Make the ~1536×864 (Windows 125% / short-laptop) hero render like the 1440×900 MacBook composition: tighter label→headline→sub stack, headline in the 126–135px range, portrait height matched to the left column, no dead vertical space.

## Diagnosis (confirmed against `src/routes/index.tsx` and `src/styles.css`)
1. **`14svh` cap dominates on short viewports.** At 1536×864 the headline resolves to `min(11vw=169, 14svh=121, 10.5rem=168) = 121px` — smaller than the MacBook (126px) despite more width.
2. **`flex justify-between` on the left column stretches gaps.** The right column height is driven by the portrait (fixed 3:5-ish aspect × column width). On a wide-but-short viewport the portrait is tall, the headline is capped small, and the leftover space becomes dead air between the section label and the headline.
3. **Portrait `font-size: 5px` under `max-height:900px` is applied regardless of width.** It shrinks the portrait but the left column still stretches to match, so it doesn't recover the gap.

## Changes

### 1. `src/routes/index.tsx` — Hero
- Replace headline sizing with a width-first clamp that only invokes `svh` as a hard ceiling, not the driver:  
  `text-[clamp(4rem,9.5vw,10.5rem)] [@media(max-height:900px)]:text-[clamp(3.75rem,8.4vw,8.4rem)]`  
  Result at 1536×864 ≈ 129px (matches MacBook); at 1440×900 ≈ 137px (unchanged feel); at 1920×1080 ≈ 182px capped by 10.5rem = 168px (unchanged).
- Remove `flex justify-between` from the left column; use top-aligned stack with explicit gaps so the label sits directly above the headline:  
  `flex flex-col gap-8 [@media(max-height:900px)]:gap-6`, drop `justify-between` and the per-child `mb-*` / `mt-*` overrides that existed to compensate.
- Add `self-start` to the sub paragraph so it doesn't get pushed by parent stretch.

### 2. `src/routes/index.tsx` — portrait column
- Constrain portrait height on short viewports so it matches the left column instead of forcing it taller:  
  wrap the portrait border in `max-h-[70svh] [@media(max-height:900px)]:max-h-[62svh]` with `overflow-hidden` (already present) and `flex justify-center`.
- Keep the annotation + spec dl below it as-is.

### 3. `src/styles.css` — portrait font-size ladder
- Split the short-viewport rule so wide-but-short screens don't get punished the same as narrow-and-short:  
  `@media (max-height: 900px) and (min-width: 1400px) { .ascii-portrait { font-size: 6px; } }`  
  keep `font-size: 5px` for `max-height:900px` and narrower.
- Leaves `@media (min-width:1280px) { font-size: 7px }` untouched for tall screens.

## Verification
- Playwright screenshots at three viewports:
  - 1920×1080 (should match the "large screen" upload)
  - 1440×900 (should match the "MacBook Pro" upload)
  - 1536×864 (target — should now visually match MacBook composition: tight label/headline gap, headline ≈130px, portrait bottom aligned to sub paragraph baseline area)
- Confirm no regression at 1280×720 (short but narrow) and mobile (<`md`).

## Out of scope
- Any content, IA, or PORTFOLIO.md changes.
- Any change to Position/Evidence/etc. sections.
