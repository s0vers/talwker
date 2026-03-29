# Docs Index

## Project docs

- `docs/README.md` — project overview and getting started.
- `docs/REFACTOR_NOTES.md` — migration and architecture evolution notes.
- `docs/ACCESSIBILITY_CHECKLIST.md` — section-level a11y baseline and release usage.
- `docs/SEO_PLAYBOOK.md` — metadata architecture and route implementation pattern.
- `docs/PERFORMANCE_BUDGETS.md` — performance budgets and image discipline.
- `docs/DEPENDENCY_GOVERNANCE.md` — dependency update and security audit policy.
- `docs/RELEASE_CHECKLIST.md` — release gate checklist.

## AI/project memory docs

- `.cursor/docs/PROJECT_MEMORY.md` — compact memory entrypoint.
- `.cursor/docs/DESIGN_MEMORY.md` — design/system reference.
- `.cursor/docs/motion-lifecycle.md` — GSAP lifecycle usage guide.

## New page/module checklist

1. Create page feature folder: `src/features/<page>/`.
2. Add feature entry file in kebab-case (e.g. `about-page.tsx`).
3. Add section files under `src/features/<page>/sections/` in kebab-case.
4. Keep page-specific UI in feature sections, not in shared/component UI folders.
5. Put reusable app-level compositions in `src/shared/ui/`.
6. Keep shadcn primitives in `src/components/ui/`.
7. Run `pnpm verify`.

## Maintenance checklist

1. If paths move, update `docs/` and `.cursor/docs/` references together.
2. If standards change, update matching `.cursor/rules/*.mdc` files in the same PR.
3. Keep `AGENTS.md` command table aligned with `package.json` scripts.
4. Confirm CI workflow (`.github/workflows/verify.yml`) uses the same `pnpm verify` gate.

## Naming exception policy

- `scripts/check-kebab-case.mjs` enforces kebab-case in `src/features`.
- Framework-reserved basenames (`page`, `layout`, `loading`, `error`, `not-found`, `route`) are allowed.
- Any new exception must be justified in PR notes before updating the script allowlist.

