## Fix SupplyTech title overflow on tablet

### Root cause
In `CaseStudy` (src/routes/index.tsx ~L129-155), at the `md` breakpoint (768px):
- `aside` is `md:col-span-3` — roughly ~170px wide inside the 12-col grid with gaps.
- `cs.title` renders at `md:text-7xl` (~72px display font).

"SupplyTech" (10 chars) at 72px overflows a ~170px column and visually bleeds into the right-hand `col-span-9` case body. "MedX" and "Revixir" happen to fit, so only SupplyTech is visibly broken.

Nothing constrains the title (no `break-words`, no `min-w-0`, no responsive size step between mobile and desktop).

### Fix
Scoped to the case-study left column only:

1. Add a middle size step so the title matches the narrower `md` column:
   `text-6xl md:text-5xl lg:text-6xl xl:text-7xl`.
2. Add `break-words` (and `min-w-0` on the aside) so any future longer title wraps inside the column instead of overflowing.
3. Keep everything else — layout, spacing, font, colors — untouched.

### Out of scope
- No changes to grid ratios, no changes to the right column, no design-system changes.
- No changes to `content.ts`.
