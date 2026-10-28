# Home-2 (Expedition Atelier) & Navbar Multi-Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a brand-new parallel homepage variation (**Expedition Atelier** at `/home-2`) with 8 bespoke artistic sections, and introduce an interactive **Home** multi-template dropdown in the global navigation bar (desktop & mobile) matching the existing **Destinations** dropdown pattern.

**Architecture:** Implement the new home page under `src/features/home-2/` as a dedicated feature module with distinct visual components, shared domain data hooks, and full i18n support. Upgrade `Navbar` and `MobileNavPortal` to support the multi-template Home dropdown with mouse/keyboard accessibility and GSAP exit animations.

**Tech Stack:** Next.js 16 (App Router with `[locale]`), React 19, Tailwind CSS v4, GSAP / ScrollTrigger, `next-intl` localization, Lucide / React Icons.

**Spec:** `docs/superpowers/specs/2026-08-19-home-2-atelier-and-navbar-dropdown-design.md`

## Global Constraints
- Single-mode dark luxury canvas (`#050505`, `#0a0a0a`, `#121212`) with `orange-500` accents.
- Inter font family across all routes with tight clamp headings and uppercase small-caps eyebrows (`tracking-[0.2em]`).
- Consistent horizontal margins using `.pad-x` (`px-5 md:px-10 lg:px-16 xl:px-24`).
- Strict `prefers-reduced-motion` honoring for all animations.
- All App Router pages under `src/app/[locale]/` must remain thin and delegate to feature entries.
- Must pass `pnpm verify` (`pnpm lint`, `pnpm check:filenames`, `pnpm check:image-sizes`, `pnpm build`).

---

### Task 1: Navigation Multi-Dropdown (Desktop & Mobile) & Navbar Translations

**Files:**
- Modify: `src/features/home/sections/navbar.tsx`
- Modify: `dictionary/en.json`
- Modify: `dictionary/es.json`
- Modify: `dictionary/ja.json`

**Interfaces:**
- Consumes: `useTranslations("Navbar")`, `Link` from `@/i18n/navigation`, `LuChevronDown`, `LuSparkles`, `LuLayers`, `LuCompass`, `LuLayoutGrid`, `LuLayoutTemplate`
- Produces: Interactive `Home` and `Destinations` dropdowns in desktop and mobile navigation

- [ ] **Step 1: Update localization dictionaries with Navbar Home keys**
Add `home`, `homeJournal`, `homeJournalDesc`, `homeAtelier`, `homeAtelierDesc` to `dictionary/en.json`, `dictionary/es.json`, `dictionary/ja.json`.

- [ ] **Step 2: Update `src/features/home/sections/navbar.tsx` to add the Home dropdown**
Implement desktop dropdown with hover delay (180ms), outside click listener, escape key listener, and mobile accordion toggle for Home items (`/` and `/home-2`).

- [ ] **Step 3: Verify navigation bar behavior and run lint**
Run `pnpm lint` to verify clean compilation.

- [ ] **Step 4: Commit**
```bash
git add src/features/home/sections/navbar.tsx dictionary/en.json dictionary/es.json dictionary/ja.json
git commit -m "feat(nav): add home multi-template dropdown for desktop and mobile navigation"
```

---

### Task 2: Home-2 Content Models & Internationalization Dictionaries

**Files:**
- Create: `src/features/home-2/content/archetypes.ts`
- Create: `src/features/home-2/content/atelier-copy.ts`
- Modify: `dictionary/en.json`
- Modify: `dictionary/es.json`
- Modify: `dictionary/ja.json`

**Interfaces:**
- Produces: `ARCHETYPES` dataset and copy helper types for `Home2`
- Produces: Localized dictionary entries for `Home2` and `Metadata.home2` in EN, ES, JA

- [ ] **Step 1: Create `src/features/home-2/content/archetypes.ts`**
Define the 4 expedition archetypes (*The Solitary Alpine*, *The Midnight Archipelago*, *The Silk Oasis*, *The Arctic Aurora*) with itinerary metadata, duration, difficulty, gear tags, coordinates, and image assets.

- [ ] **Step 2: Create `src/features/home-2/content/atelier-copy.ts`**
Define curatorial plate data (`FIG. 01` to `FIG. 04`), telemetry ticker feeds, manifesto quotes, and seasonal departure records.

- [ ] **Step 3: Populate translations in `dictionary/en.json`, `dictionary/es.json`, `dictionary/ja.json`**
Add comprehensive strings for `Home2` (hero, telemetry, dossiers, archetypes, dispatch, departures, manifesto, cta) and `Metadata.home2`.

- [ ] **Step 4: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 5: Commit**
```bash
git add src/features/home-2/content/ dictionary/en.json dictionary/es.json dictionary/ja.json
git commit -m "feat(home-2): add content models, archetypes data, and i18n dictionaries"
```

---

### Task 3: Atelier Hero & Telemetry Sections

**Files:**
- Create: `src/features/home-2/sections/atelier-hero.tsx`
- Create: `src/features/home-2/sections/atelier-telemetry.tsx`

**Interfaces:**
- Consumes: `useTranslations("Home2.hero")`, `useTranslations("Home2.telemetry")`, `useGsapContext`, `prefersReducedMotion`, `@/shared/ui` (`ButtonWithIcon`)
- Produces: `AtelierHero` and `AtelierTelemetry` components

- [ ] **Step 1: Implement `atelier-hero.tsx`**
Build asymmetric magazine masthead with live telemetry badge (`ISSUE Nº 04 // FIELD ATELIER`), fluid per-line masked typography reveal, dual-plate photographic perspective stack with micro-parallax, and region jump chips.

- [ ] **Step 2: Implement `atelier-telemetry.tsx`**
Build the continuous ambient expedition telemetry ticker with live coordinate counters, elevation badges, and pulsing orange status indicators.

- [ ] **Step 3: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 4: Commit**
```bash
git add src/features/home-2/sections/atelier-hero.tsx src/features/home-2/sections/atelier-telemetry.tsx
git commit -m "feat(home-2): implement atelier hero and telemetry ticker sections"
```

---

### Task 4: Curators' Dossier & Expedition Archetypes Sections

**Files:**
- Create: `src/features/home-2/sections/atelier-dossiers.tsx`
- Create: `src/features/home-2/sections/atelier-archetypes.tsx`

**Interfaces:**
- Consumes: `useTranslations("Home2.dossiers")`, `useTranslations("Home2.archetypes")`, `ARCHETYPES`, `DESTINATIONS`, `@/shared/ui` (`SectionHeading`, `SectionCta`)
- Produces: `AtelierDossiers` and `AtelierArchetypes` components

- [ ] **Step 1: Implement `atelier-dossiers.tsx`**
Build the archival visual plate gallery (`[FIG. 01]` to `[FIG. 04]`) with photography metadata chips (focal length, elevation, optimal season), dual-tone hover framing, and direct links to destination pages.

- [ ] **Step 2: Implement `atelier-archetypes.tsx`**
Build the interactive 4-tab journey ethos selector with dynamic visual dossier swapping, physical difficulty indicators, gear essentials, and route specs.

- [ ] **Step 3: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 4: Commit**
```bash
git add src/features/home-2/sections/atelier-dossiers.tsx src/features/home-2/sections/atelier-archetypes.tsx
git commit -m "feat(home-2): implement curators dossier and expedition archetypes matrix"
```

---

### Task 5: Visual Essay Dispatch & Curated Departures Sections

**Files:**
- Create: `src/features/home-2/sections/atelier-dispatch.tsx`
- Create: `src/features/home-2/sections/atelier-departures.tsx`

**Interfaces:**
- Consumes: `useTranslations("Home2.dispatch")`, `useTranslations("Home2.departures")`, `TOURS`, `@/shared/ui` (`SectionHeading`, `ButtonWithIcon`)
- Produces: `AtelierDispatch` and `AtelierDepartures` components

- [ ] **Step 1: Implement `atelier-dispatch.tsx`**
Build the split-screen two-column visual essay with sticky archival photographic plate, pull quotes, rough-notation style orange highlights, and photographer field essay.

- [ ] **Step 2: Implement `atelier-departures.tsx`**
Build the limited seasonal departures showcase with departure dates, remaining seats badges, pricing, and direct booking trigger links (`/booking?tour=...`).

- [ ] **Step 3: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 4: Commit**
```bash
git add src/features/home-2/sections/atelier-dispatch.tsx src/features/home-2/sections/atelier-departures.tsx
git commit -m "feat(home-2): implement visual essay dispatch and curated departures sections"
```

---

### Task 6: Founders' Manifesto & Nocturnal Chamber CTA Sections

**Files:**
- Create: `src/features/home-2/sections/atelier-manifesto.tsx`
- Create: `src/features/home-2/sections/atelier-cta.tsx`
- Create: `src/features/home-2/sections/index.ts`
- Create: `src/features/home-2/home-2-page.tsx`

**Interfaces:**
- Consumes: All `home-2/sections`, `InitialLoader` from `@/features/home/sections`, `useInitialPageLoader`
- Produces: `Home2Page` entry component exporting full page layout

- [ ] **Step 1: Implement `atelier-manifesto.tsx`**
Build Founders' Nocturnal Letter with tactile typography, branded seal (`talkwer.`), and interactive quote selector from global expedition leaders.

- [ ] **Step 2: Implement `atelier-cta.tsx`**
Build the Nocturnal Chamber CTA with ambient warm orange illumination, bespoke expedition inquiry trigger, and direct concierge contact.

- [ ] **Step 3: Create `sections/index.ts` and `home-2-page.tsx`**
Export all sections cleanly and compose `Home2Page` with `InitialLoader`.

- [ ] **Step 4: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 5: Commit**
```bash
git add src/features/home-2/sections/ src/features/home-2/home-2-page.tsx
git commit -m "feat(home-2): implement manifesto, cta, and assemble home-2 page entry"
```

---

### Task 7: Route Integration & Sitemap

**Files:**
- Create: `src/app/[locale]/home-2/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `Home2Page` from `@/features/home-2/home-2-page`, `getTranslations` from `next-intl/server`
- Produces: Route `/home-2` across all locales (`en`, `es`, `ja`) with SEO metadata and sitemap entry

- [ ] **Step 1: Create `src/app/[locale]/home-2/page.tsx`**
Thin page route importing `Home2Page` with `generateMetadata` reading `Metadata.home2`.

- [ ] **Step 2: Update `src/app/sitemap.ts`**
Add `{ path: "/home-2", freq: "daily", prio: 0.95 }`.

- [ ] **Step 3: Run lint and verify**
Run `pnpm lint`.

- [ ] **Step 4: Commit**
```bash
git add src/app/[locale]/home-2/page.tsx src/app/sitemap.ts
git commit -m "feat(route): wire /home-2 app route and update sitemap"
```

---

### Task 8: Full Verification & Quality Gates

**Files:**
- None (verification across all files)

- [ ] **Step 1: Run filename checks**
Run `pnpm check:filenames`.

- [ ] **Step 2: Run image fill/sizes check**
Run `pnpm check:image-sizes`.

- [ ] **Step 3: Run full linter**
Run `pnpm lint`.

- [ ] **Step 4: Run Next.js production build**
Run `pnpm build`.

- [ ] **Step 5: Final review and commit if needed**
Verify all gates pass with 0 errors.
