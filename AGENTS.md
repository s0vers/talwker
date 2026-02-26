# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 14 static blog/magazine site** ("Talkwer") with no backend, database, or external service dependencies.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3000) |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Prod serve | `pnpm start` (port 3000, requires build first) |

See `README.md` for more details.

### Notes

- There are **no automated tests** configured in this repo (no test runner, no `test` script).
- pnpm 10 may warn about ignored build scripts (`unrs-resolver`). This is safe to ignore — the app builds and runs fine without approving those scripts.
- The lockfile was generated with an older pnpm version. `pnpm install` regenerates it automatically; this is expected and harmless.
- No environment variables or secrets are required.

### Dev server CSS caveat

The Next.js 14 dev server (`pnpm dev`) has a known issue where the CSS file URL (`/_next/static/css/app/layout.css?v=...`) returns 404, causing **all Tailwind CSS to be absent in the browser**. This makes the site look completely unstyled despite the HTML being correct.

**Workaround:** Use `pnpm build && pnpm start` to run the production build locally for visual testing. The production server serves CSS correctly via hashed filenames. You can still use `pnpm dev` for build/lint/type checking, but visual testing must be done via the production build.
