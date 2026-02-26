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
