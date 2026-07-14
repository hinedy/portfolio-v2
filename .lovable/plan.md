# Add PORTFOLIO.md to the repo

## What's going on

PORTFOLIO.md has never lived in the codebase — you've been pasting it into chat as an external spec (referenced as §4, §6, §8, §11, §12, §13, plus ASSETS.md). Nothing on disk tracks it, so it can drift silently from what's actually shipped and there's no single source of truth to hand to future-you or an agent.

## Plan

Create a single file at the repo root: `PORTFOLIO.md`.

It gets reconstructed from two inputs, in this order of authority:

1. **Original direction** — the locked spec language you've referenced throughout (voice, IA, annotation motif rules, spec-sheet system, weight/order semantics, epigraph rule, cross-reference behavior, portrait treatment). This stays load-bearing and doesn't get rewritten to match code — code serves the spec, not the other way around.
2. **Current state** — reconciled against `src/lib/content.ts`, `src/routes/index.tsx`, and `src/routes/__root.tsx` as they stand now, so section numbers, row lists, nav labels ("How I Decide", not "Decisions"), meta.role ("Product Frontend Engineer"), the 06 / LAB section, and the epigraph all match what's shipped.

### Structure

Numbered sections mirroring the ones you've cited, so existing "§N" references keep resolving:

- §1 Purpose & audience
- §2 Voice & tone (systems-thinking, no marketing polish, annotation motif rules)
- §3 Information architecture (the seven sections, nav vs scroll-only, anchor ids)
- §4 Annotation motif — where it's allowed (hero portrait, tradeoffs, footer colophon, evidence hover callouts) and where it's banned (nav)
- §6 Section-by-section content spec (Position 4 lines, Evidence six-part case study shape, Signal quote provenance, Writing, Lab, Contact)
- §8 Microcopy lock ("owned", "decision surface", "time invested", "what changed", "chosen because…" cap)
- §11 Hero layout, motion, ASCII portrait spec
- §12 Decisions section — table layout, three-part rows, epigraph, authorial order, continuous weight styling (0–5 → font-weight + size), evidenceRefs hover/click-to-scroll behavior, why weight is decoupled from order
- §13 Lab section spec (was called "Current Work" in an earlier turn — reconciled to Lab as shipped)
- §14 Maintenance rule (new): any content or IA change updates content.ts, the affected route, AND PORTFOLIO.md in the same change. Add a short note in `AGENTS.md` pointing at PORTFOLIO.md as the canonical spec so future agent sessions read it.

Also add a one-line pointer at the top of `src/lib/content.ts` (comment only) noting that PORTFOLIO.md is the spec — no code change.

## Non-goals

- No visual/UI changes.
- No content rewrites in `content.ts` — this is documentation of what already exists plus the locked direction behind it.
- Not creating ASSETS.md (you've referenced it, but it's about specific asset decisions; can be a follow-up if you want it tracked too — say the word).

## Deliverables

- `PORTFOLIO.md` (new, repo root)
- `AGENTS.md` — append a short "Canonical spec" pointer
- `src/lib/content.ts` — add one-line header comment pointing at PORTFOLIO.md
