<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Canonical spec

`PORTFOLIO.md` at the repo root is the source of truth for voice,
information architecture, and section-level behavior of the site. Read it
before changing anything in `src/lib/content.ts`, the Decisions/Evidence/Lab
sections, or the annotation motif. Any content or IA change updates
`content.ts`, the affected route, AND `PORTFOLIO.md` in the same change
(see §14).
