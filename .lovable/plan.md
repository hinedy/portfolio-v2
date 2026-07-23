## Diagnosis

Your laptop resolves to ~**1536 × 864 CSS px** (1920×1080 at 125% Windows scaling). Two things collide there:

1. **Tailwind's `2xl` breakpoint is exactly 1536px.** Every `lg:max-2xl:` override we tried explicitly *excludes* 1536, so on your real browser the rule silently doesn't apply. DevTools simulator at 1440 or 1512 sat inside `lg:max-2xl:` and looked fine — that's the "works in simulator, not in reality" gap.
2. **Hero sizing only reacts to width, never height.** `clamp(3.5rem, 11vw, 10.5rem)` at 1536px width hits its 10.5rem cap (~168px). The hero stack (label + headline + subhead + portrait column) then needs well over 864px of vertical space, so it drops below the fold. Big monitors (≥1080 CSS px tall) never hit the problem.

The previous fix attempts all played with `sm/md/lg/2xl` breakpoints, which is why results were binary ("too big" vs "too small") and edge-case fragile.

## Fix: height-aware sizing, one rule for all viewports

Replace width-only `clamp()`s in the hero with expressions that also collapse when the viewport is short. No new breakpoints, no `max-2xl` edge cases, works identically in simulator and real browser.

**Scope: `Hero()` in `src/routes/index.tsx` only.** Everything else stays.

### Changes

1. **Headline** (`src/routes/index.tsx`, current: `text-[clamp(3.5rem,11vw,10.5rem)]`)
   → `text-[min(11vw,17svh,10.5rem)]`
   - On tall screens (≥1000 CSS px height) the 11vw / 10.5rem cap still governs — your big-screen look is preserved.
   - On your 864px-tall laptop, 17svh ≈ 147px wins, pulling the headline down ~12% so the whole hero fits.
   - `svh` (small viewport height) is stable across mobile browser chrome too.

2. **Sub-headline** (`text-lg md:text-xl`, `mt-10`)
   → keep font size, tighten top gap on short viewports: change `mt-10` to `mt-6 md:mt-10` and add `[@media(max-height:900px)]:mt-6` to the headline+sub cluster. Small, targeted; no cascade risk.

3. **Hero vertical padding** (`pt-16 pb-20 md:pt-24 md:pb-28`)
   → add height-conditional trim: `[@media(max-height:900px)]:md:pt-14 [@media(max-height:900px)]:md:pb-16`.
   - Preserves current padding on ≥900px-tall viewports (your big screen, and DevTools defaults).
   - Trims ~80px total on your laptop, which is exactly the deficit.

4. **Portrait column** — no cap change. The prior "cap cut the image" issue came from clamping the image itself. Instead, let the right column shrink naturally by adding `min-h-0` to the portrait wrapper so it participates in the flex height budget rather than forcing overflow.

5. **Annotation spacing** — the "too much space between `//` annotation and title" was a side-effect of `md:mt-0` on the right column combined with the label sitting above the headline. Not touching it in this pass; the height-aware rules above shorten the whole stack, which naturally tightens the perceived gap. If it still reads loose after the fix, we tune `mb-10` on the section-label separately.

### Why this resolves the contradiction

- No `2xl` boundary involved — the rule keys off *pixel height*, which is where your device is actually different.
- `min()` and `[@media(max-height:...)]` are supported everywhere modern Chrome/Edge run, including your ZBook.
- DevTools simulator will now behave the same as your real browser because it also has a real height when you set device dimensions.

### Verification

After the edit, I'll:
- Screenshot the hero at **1536×864** (your device) via headless Chromium — expect the portrait column bottom + subhead visible without scroll.
- Screenshot at **1920×1200** and **2560×1440** to confirm the big-screen composition is unchanged.
- Screenshot at **768×1024** and **375×812** to confirm mobile is untouched.

No content, IA, or motif changes. No breakpoint refactor elsewhere. `PORTFOLIO.md` doesn't need an update — this is a rendering fix, not a spec change.
