# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16 static blog/magazine site** ("Talkwer") with no backend, database, or external service dependencies.

### Where truth lives

- Commands / runtime: this file.
- Structure and checklists: `docs/INDEX.md`, `docs/README.md`.
- Enforceable contracts: `.cursor/rules/talkwer-architecture.mdc`, `talkwer-design.mdc`, `talkwer-quality.mdc`, `talkwer-superpowers.mdc` (always on — specs/plans/execution must mirror existing feature layout, not invent raw pages).
- Process specs/plans: `docs/superpowers/`. Local Superpowers runtime: `.superpowers/` (gitignored).

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3000) |
| Lint | `pnpm lint` |
| Filename check | `pnpm check:filenames` |
| Image fill/sizes check | `pnpm check:image-sizes` |
| Dependency audit | `pnpm deps:audit` |
| Dependency outdated report | `pnpm deps:outdated` |
| Verify all gates | `pnpm verify` |
| Build | `pnpm build` |
| Prod serve | `pnpm start` (port 3000, requires build first) |

CI runs `pnpm verify` via `.github/workflows/verify.yml`.

See `docs/README.md` and `docs/INDEX.md` for structure, content split, and the new-route checklist.

### Notes

- There are **no automated tests** configured in this repo (no test runner, no `test` script).
- pnpm 10 may warn about ignored build scripts (`unrs-resolver`). This is safe to ignore — the app builds and runs fine without approving those scripts.
- The lockfile was generated with an older pnpm version. `pnpm install` regenerates it automatically; this is expected and harmless.
- No environment variables or secrets are required.
- **Styling:** Tailwind CSS **v4** with `@tailwindcss/postcss`. Design tokens, `@plugin "tailwindcss-animate"`, class-based `dark` variant, and shadcn-style colors live in `src/app/globals.css` (`@import`, `@theme`, `@layer`). There is no `tailwind.config.ts`.
- **Features:** Page modules live under `src/features/<name>/` (entry `*-page.tsx`, `sections/`, optional `content/` and `lib/`). App routes under `src/app/<segment>/page.tsx` should stay thin and import feature entries.

### Dev server CSS caveat

The Next.js dev server (`pnpm dev`) may still show a known issue where the CSS file URL (`/_next/static/css/app/layout.css?v=...`) returns 404, causing **all Tailwind CSS to be absent in the browser**. This makes the site look completely unstyled despite the HTML being correct.

**Workaround:** Use `pnpm build && pnpm start` to run the production build locally for visual testing. The production server serves CSS correctly via hashed filenames. You can still use `pnpm dev` for build/lint/type checking, but visual testing must be done via the production build.
