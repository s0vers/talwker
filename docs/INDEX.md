# Docs Index

## Project docs

- `docs/README.md` — project overview and getting started.
- `docs/ACCESSIBILITY_CHECKLIST.md` — section-level a11y baseline and release usage.
- `docs/SEO_PLAYBOOK.md` — metadata architecture and route implementation pattern.
- `docs/PERFORMANCE_BUDGETS.md` — performance budgets and image discipline.
- `docs/DEPENDENCY_GOVERNANCE.md` — dependency update and security audit policy.
- `docs/RELEASE_CHECKLIST.md` — release gate checklist.
- `docs/DESTINATION_DETAILS_PHILOSOPHY.md` — destination story page editorial philosophy, data model, motion hooks, and parallel layouts.
- `docs/THIRD_PARTY_LICENSES.md` — third-party license notes.

## Agent contracts

- `AGENTS.md` — commands, runtime notes, and entry pointer.
- `.cursor/rules/talkwer-architecture.mdc` — feature/shared boundaries and reuse thresholds.
- `.cursor/rules/talkwer-design.mdc` — visual language and no-design-change contract.
- `.cursor/rules/talkwer-quality.mdc` — verify gates and GSAP lifecycle.
- `.cursor/rules/talkwer-superpowers.mdc` — always-on: Superpowers specs/plans/execution must clone an existing feature (thin app route + `features/<name>/` entry, `sections/`, `content/`, optional `lib/`); no raw invented page structure.

## Superpowers

- `docs/superpowers/specs/` — committed design specs (process history).
- `docs/superpowers/plans/` — committed implementation plans.
- `.superpowers/` — local runtime only (gitignored).
- Before writing or executing a spec/plan: follow `talkwer-superpowers.mdc` and the new-route checklist below; name a reference feature in the Architecture line.
- Spec/plan: `docs/superpowers/specs/2026-08-07-stories-tours-pages-and-polish-design.md`, `docs/superpowers/plans/2026-08-07-stories-tours-pages-and-polish.md`.
- Spec/plan: `docs/superpowers/specs/2026-08-09-home-destinations-stage-filmstrip-design.md`, `docs/superpowers/plans/2026-08-09-home-destinations-stage-filmstrip.md`.
- Spec/plan: `docs/superpowers/specs/2026-08-08-footer-missing-pages-design.md`, `docs/superpowers/plans/2026-08-08-footer-missing-pages.md`.
- Spec/plan: `docs/superpowers/specs/2026-08-12-booking-checkout-auth-design.md`, `docs/superpowers/plans/2026-08-12-booking-checkout-auth.md`.

## New page/module checklist

1. Create page feature folder: `src/features/<page>/`.
2. Add feature entry file in kebab-case (e.g. `about-page.tsx`, `destinations-page.tsx`).
3. Add section files under `src/features/<page>/sections/` in kebab-case; export public sections from `sections/index.ts` when the page imports multiple.
4. Optional: add `src/features/<page>/content/` for page-only copy; optional `lib/` for URL helpers, hooks, or pure logic (no UI).
5. Add `src/app/<route>/page.tsx` that loads data and renders the feature entry (metadata + JSON-LD live here or in `lib/seo` helpers).
6. Keep page-specific UI in feature sections, not in `src/shared/ui` or `src/components/ui` except primitives.
7. Put reusable app-level compositions in `src/shared/ui/`.
8. Keep shadcn-style primitives in `src/components/ui/`.
9. Run `pnpm verify`.

### Example: `/destinations`

- Feature: `src/features/destinations/` (`destinations-page.tsx`, `sections/*`, `content/destinations-page-copy.ts`, `lib/destinations-list-params.ts`).
- Route: `src/app/destinations/page.tsx` — reads `searchParams`, uses `DESTINATIONS` from `home/content/destinations`, passes parsed list + grid into the client page shell.

## Maintenance checklist

1. If paths move, update `docs/` and `.cursor/rules/` references together.
2. If standards change, update the matching `.cursor/rules/*.mdc` file in the same PR (include `talkwer-superpowers.mdc` when process/org expectations change).
3. Keep `AGENTS.md` command table aligned with `package.json` scripts.
4. Confirm CI workflow (`.github/workflows/verify.yml`) uses the same `pnpm verify` gate.
5. Specs and plans for process work go under `docs/superpowers/`; do not commit `.superpowers/`.

## Naming exception policy

- `scripts/check-kebab-case.mjs` enforces kebab-case in `src/features`.
- Framework-reserved basenames (`page`, `layout`, `loading`, `error`, `not-found`, `route`) are allowed.
- Any new exception must be justified in PR notes before updating the script allowlist.
