# Talkwer Docs

Talkwer is a Next.js 16 travel showcase frontend template with a feature-first architecture. It uses static prerendering plus dynamic list routes, locale proxy routing, and image optimization, so deployment requires a Next.js-capable host.

The root [README](../README.md) covers setup, project scope, licensing, and deployment. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for the contribution workflow.

## Local development

- Install: `pnpm install`
- Dev server: `pnpm dev` (port 3560)
- Build: `pnpm build`
- Start production build: `pnpm start`
- Full gate: `pnpm verify`
- Offline customization guide: `documentation/index.html`
- Optional legacy placeholder package: `pnpm package:theme` (output under `release/`)
- Historical marketplace evidence: `pnpm check:marketplace` (not an open-source release gate)
- Preview link crawl: `pnpm audit:preview-links http://localhost:<port>` against a local production server; writes `docs/marketplace/preview-links.json`

## Quality gates

`pnpm verify` runs:

- lint (`pnpm lint`)
- typecheck (`pnpm typecheck`)
- kebab-case check (`pnpm check:filenames`)
- image sizes discipline (`pnpm check:image-sizes`)
- source-image byte budget (`pnpm check:public-image-bytes`)
- production build (`pnpm build`)

## Project conventions

- Keep design and animation behavior unchanged unless explicitly requested.
- Keep feature files in kebab-case under `src/features/*`.
- Keep reusable app-level UI primitives in `src/shared/ui`.
- **Content split:** shared catalog-style data the whole app uses (e.g. destination records) may live under `src/features/home/content/`. Page-specific copy and constants live under `src/features/<feature>/content/` (see `about/content`, `destinations/content`).
- **Routes:** `src/app/<segment>/page.tsx` stays thin — import the feature entry from `src/features/<feature>/` and pass data only. The default home uses `src/pages/[locale]/index.tsx` with `getStaticProps`; the feature structure is the same.

## Delivery architecture

- **Rendering:** the default home is a statically generated Pages Router page in each locale, avoiding App Router RSC startup overhead. Other routes retain the App Router. Completed Suspense boundaries prioritize hydration of the visible hero/navigation over below-fold content. Cross-router navigation performs a full document load; navigation within a router keeps its normal Next.js behavior. Use `pnpm build`, which selects Next.js's supported Webpack compiler for the measured production bundle.
- **Translations:** `get-static-home-props.ts` formats the homepage's typed copy during the build and selects compact catalog/card data. Pure views receive strings; its client provider supplies locale without dictionaries. App Router layouts supply `Common`, with server-resolved navbar/footer copy; other features use server-side `RouteMessages` (`src/i18n/route-messages.tsx`) with chosen namespaces. Complex destination detail routes retain the full-message fallback. `next-intl` is transpiled for compatible Pages SSR imports. See the [new-route checklist](INDEX.md#new-pagemodule-checklist).
- **Styles:** `src/app/globals.css` owns shared theme, font faces, and base rules. Both router shells import `shell.css`, scanning home and the explicitly listed shared primitives it renders. Update that list when adding a primitive to home. Every other page imports `full-site.css`, scanning all of `src/`, including shared and home utilities. Keep each sheet's base and responsive utilities together: omitting shared responsive rules from the full sheet can break the cascade during client navigation. Inner routes deliberately include the common utilities again.
- **Motion:** the default hero uses CSS image/overlay and masked-row entrances plus `HeroFrame` scroll updates. The marquee uses CSS. Below-fold sections defer GSAP through `useDeferredGsapContext`; pinned sections retain `useGsapContext`. Follow the [motion lifecycle contract](../.cursor/rules/talkwer-quality.mdc).
- **Carousel:** the engine loads lazily while retaining server-rendered slide markup. Testimonials enhance near the viewport; Autoplay is imported asynchronously and respects reduced motion.
- **Fonts:** the core Inter subset is preloaded; extended Latin loads on demand. Coverage, retained originals, licensing, and regeneration tooling are documented in [third-party licenses](THIRD_PARTY_LICENSES.md#inter-font-sil-ofl-11).

## Extended docs

- `docs/INDEX.md` - master index and maintenance checklist
- `docs/ACCESSIBILITY_CHECKLIST.md` - a11y validation baseline
- `docs/SEO_PLAYBOOK.md` - reusable metadata and route conventions
- `docs/PERFORMANCE_BUDGETS.md` - budget guardrails and asset discipline
- `docs/DEPENDENCY_GOVERNANCE.md` - dependency update and audit policy
- `docs/RELEASE_CHECKLIST.md` - release-ready validation flow
