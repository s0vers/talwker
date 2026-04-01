# Talkwer Docs

Talkwer is a static Next.js 16 travel showcase with a feature-first architecture.

## Local development

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start production build: `pnpm start`
- Full gate: `pnpm verify`

## Quality gates

`pnpm verify` runs:

- lint (`pnpm lint`)
- typecheck (`pnpm typecheck`)
- kebab-case check (`pnpm check:filenames`)
- image sizes discipline (`pnpm check:image-sizes`)
- production build (`pnpm build`)

## Project conventions

- Keep design and animation behavior unchanged unless explicitly requested.
- Keep feature files in kebab-case under `src/features/*`.
- Keep reusable app-level UI primitives in `src/shared/ui`.
- **Content split:** shared catalog-style data the whole app uses (e.g. destination records) may live under `src/features/home/content/`. Page-specific copy and constants live under `src/features/<feature>/content/` (see `about/content`, `destinations/content`).
- **Routes:** `src/app/<segment>/page.tsx` stays thin — import the feature entry from `src/features/<feature>/` and pass data only.

## Extended docs

- `docs/INDEX.md` - master index and maintenance checklist
- `docs/ACCESSIBILITY_CHECKLIST.md` - a11y validation baseline
- `docs/SEO_PLAYBOOK.md` - reusable metadata and route conventions
- `docs/PERFORMANCE_BUDGETS.md` - budget guardrails and asset discipline
- `docs/DEPENDENCY_GOVERNANCE.md` - dependency update and audit policy
- `docs/RELEASE_CHECKLIST.md` - release-ready validation flow
