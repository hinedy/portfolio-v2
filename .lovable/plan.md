## Enlarge hero portrait, drop the square feel

**Change 1 — Raise the portrait width clamp** in `src/routes/index.tsx` (hero portrait column, line 54).

From: `lg:w-[clamp(340px,32vw,520px)]`
To: `lg:w-[clamp(420px,42vw,720px)]`

Rationale: 42vw at a 1440px MacBook viewport = ~605px (up from ~460px); at 1920px = ~800px, capped at 720px. Floor raised so it doesn't collapse at the two-column entry point (1024px → 430px).

**Change 2 — Confirm no square constraint is applied.** The frame is `flex justify-center border border-rule bg-paper p-2` with `max-h-[50svh] lg:max-h-none`. Height is driven by the `<pre>` inside via `container-type: inline-size` and `font-size: min(7px, calc(100cqi / 105))`. At 720px container width, char width ≈ 6.86px → portrait width 720px, height 93 rows × line-height ≈ 640px. Natural aspect ~1.12:1 landscape, as designed. No CSS change needed here — verify by inspection after Change 1.

**Change 3 — Nudge portrait vertical offset** so the enlarged plate still hangs off the headline baseline rather than crowding the top. Line 54: `lg:mt-16 xl:mt-20` → `lg:mt-20 xl:mt-28` (keep the `[@media(max-height:900px)]:lg:mt-8` short-screen override).

**Not changing:** headline `12cqi` clamp, metadata block, mobile stacked layout, portrait font-size ladder in `styles.css` (the `100cqi/105` formula already scales cleanly with the larger container — cap is 7px so it won't overshoot on ultra-wide).

**Verification:** view at 1440, 1536, 1920, and the user's ~1536-effective HP ZBook width. Confirm portrait reads as landscape not square, headline still wraps at 2–3 words minimum, hero still fits above fold on ≤900px-tall screens (short-screen override intact).