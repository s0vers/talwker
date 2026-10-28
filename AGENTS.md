# AGENTS.md

## Project instructions

This is an **MIT-licensed Next.js 16 travel editorial/showcase frontend** ("Talkwer") with no application backend or database. The default homepage uses static Pages Router rendering; other pages use the App Router. Locale proxy routing, dynamic list routes, and image optimization require a Next.js-capable host. Use Node.js 22.19+ and the pnpm version declared in `package.json`.

### Where truth lives

- Commands / runtime: this file.
- Structure and checklists: `docs/INDEX.md`, `docs/README.md`.
- Enforceable contracts: `.cursor/rules/talkwer-architecture.mdc`, `talkwer-design.mdc`, `talkwer-quality.mdc`, `talkwer-superpowers.mdc` (always on — specs/plans/execution must mirror existing feature layout, not invent raw pages).
- Process specs/plans: `docs/superpowers/`. Local Superpowers runtime: `.superpowers/` (gitignored).

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3560) |
| Lint | `pnpm lint` |
| Filename check | `pnpm check:filenames` |
| Image fill/sizes check | `pnpm check:image-sizes` |
| Dependency audit | `pnpm deps:audit` |
| Dependency outdated report | `pnpm deps:outdated` |
| Verify all gates | `pnpm verify` |
| Build | `pnpm build` |
| Prod serve | `pnpm start` (port 3000, requires build first) |
| Legacy placeholder ZIP (optional) | `pnpm package:theme` |
| Historical submission evidence (optional) | `pnpm check:marketplace` |
| Preview link crawl | `pnpm audit:preview-links http://localhost:<port>` (local prod server) |
| Mobile LCP budget | `pnpm audit:mobile http://localhost:<port>` (five fresh mobile Chrome runs; each must be under 2.5s) |

CI runs `pnpm verify` via `.github/workflows/verify.yml`.

See `docs/README.md` and `docs/INDEX.md` for structure, content split, and the new-route checklist.

### Notes

- There is no dedicated application test runner or `test` script. The optional mobile performance audit requires installed Chrome and is separate from `pnpm verify`; run it against a production server without concurrent checks.
- Use `pnpm install --frozen-lockfile` for reproducible installs. Keep `package.json`, `pnpm-lock.yaml`, and CI runtime versions aligned when updating dependencies.
- The demo needs no secrets. Set `NEXT_PUBLIC_SITE_URL` before a production build to use your deployment domain for SEO.
- Open-source release requirements live in `docs/RELEASE_CHECKLIST.md`. `docs/marketplace/` preserves historical submission records and image provenance; its checks are optional legacy tooling. Original code and author-generated images are MIT-licensed; retain third-party notices and the font OFL.
- **Styling:** Tailwind CSS **v4** with `@tailwindcss/postcss`. Design tokens, `@plugin "tailwindcss-animate"`, class-based `dark` variant, and shadcn-style colors live in `src/app/globals.css` (`@import`, `@theme`, `@layer`). There is no `tailwind.config.ts`.
- **Features:** Page modules live under `src/features/<name>/` (entry `*-page.tsx`, `sections/`, optional `content/` and `lib/`). App routes under `src/app/<segment>/page.tsx` stay thin. The static homepage route is `src/pages/[locale]/index.tsx`, with build-time copy/data in `src/features/home/lib/get-static-home-props.ts`; keep its views synchronous and free of App-only server APIs. Navigation across router boundaries performs a full document load.

### Dev server CSS caveat

The Next.js dev server (`pnpm dev`) may still show a known issue where the CSS file URL (`/_next/static/css/app/layout.css?v=...`) returns 404, causing **all Tailwind CSS to be absent in the browser**. This makes the site look completely unstyled despite the HTML being correct.

**Workaround:** Use `pnpm build && pnpm start` to run the production build locally for visual testing. The production server serves CSS correctly via hashed filenames. You can still use `pnpm dev` for build/lint/type checking, but visual testing must be done via the production build.
