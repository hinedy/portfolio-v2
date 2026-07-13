## Add syntax highlighting to blog code blocks

Yes — we can add it without breaking the spec-sheet look. The trick is picking a highlighter and theme that respect the current `pre`/`code` styling (paper background, 1px rule border, Space Mono, no rounded corners) instead of injecting a stock IDE theme.

### Approach

Use **Shiki** at build/render time via `marked-shiki` (or a small custom marked extension). Shiki tokenizes with TextMate grammars and outputs plain `<span style="color:…">`, so:
- No client-side JS bundle for highlighting (runs in the loader, already SSR-friendly).
- No injected background/font/border — our existing `.prose-post pre` rules keep the paper background, mono font, and hairline border intact.
- Only token colors are added inline.

Alternative considered: `highlight.js` / `prism` — both ship opinionated themes with backgrounds, paddings, and rounded chrome that would fight the design system. Rejected.

### Theme

Custom minimal palette derived from the site tokens, not a stock theme:
- comments → `--muted-foreground`
- keywords / tags → `--ink` bold
- strings → `--accent` (signal orange)
- numbers / constants → `--ink`
- functions / types → `--ink` with subtle weight shift
- everything else → `--ink`

Implemented as a Shiki `ThemeRegistration` object (light + dark variants using `--shiki-light` / `--shiki-dark` CSS vars so it follows the `.dark` class).

### Scope of changes

1. `bun add shiki` (pure JS, works in the Worker/SSR runtime).
2. `src/lib/highlight.ts` — new: singleton Shiki highlighter with the two custom themes and the languages already used in the three posts (`javascript`, `typescript`, `bash`, `sql`, plus `text` fallback).
3. `src/routes/blog.$slug.tsx` — swap the current `marked.parse` call for a marked instance with a `code` renderer that calls the Shiki highlighter; keep the loader synchronous by pre-loading the highlighter once at module scope.
4. `src/styles.css` — small additions inside `.prose-post pre`: ensure inline `color` from Shiki wins, add `.dark .prose-post pre span[style]` override hook for the dark theme via CSS variables. No changes to padding, border, background, or font.

### Ambiguity resolved

The brief doesn't mention code styling explicitly. Choosing the option most consistent with the spec-sheet system: monochrome tokens + one accent color for strings, no separate code-block chrome. Rejecting typical portfolio patterns (colorful VSCode themes, traffic-light window headers, copy buttons).

### Out of scope

- Line numbers, copy-to-clipboard, filename headers — all read as "IDE/dashboard" per the brief.
- Client-side highlighting or language auto-detection.
