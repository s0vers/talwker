# Home-3 (Nocturnal Observatory) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a brand-new, unique parallel homepage variation (**The Nocturnal Observatory** at `/home-3`) with 8 bespoke sections, integrate it into the global Navbar Home multi-dropdown and sitemap, and provide full multi-language i18n support.

**Architecture:** Feature-first architecture with a thin Next.js route (`src/app/[locale]/home-3/page.tsx`) rendering a modular feature entry (`src/features/home-3/home-3-page.tsx`), referencing the established layout and folder contract of `src/features/home-2` and `src/features/home`. All UI components are bespoke to Home 3 under `src/features/home-3/sections/`, with dedicated static data under `src/features/home-3/content/`.

**Tech Stack:** Next.js 16 (App Router, static site generation), React 19, TypeScript, Tailwind CSS v4, GSAP (`@/lib/useGsap`), `next-intl` (i18n), `react-icons/lu` (Lucide icons).

**Spec:** `docs/superpowers/specs/2026-08-19-home-3-nocturnal-observatory-design.md`

## Global Constraints

- Must strictly adhere to Talkwer's *"The Nocturnal Expedition"* visual language: `#050505` dark canvas, `orange-500` accents, hairline `border-white/[0.06]`, Inter typography with fluid clamps, and standard `.pad-x` horizontal gutters.
- Must not reuse existing feature section components from Home 1 or Home 2; all 8 sections must be 100% bespoke with distinct interactive features and identity.
- Filenames must follow kebab-case (`scripts/check-kebab-case.mjs`).
- Next.js route `src/app/[locale]/home-3/page.tsx` must remain thin (metadata + locale setter + feature import).
- All animations must use `@/lib/useGsap` or `gsap.context` and check `prefersReducedMotion()`.
- Repository has no test runner; verification is performed via `pnpm verify` (lint, filenames, image-sizes, build).

---

## File Structure

```
dictionary/
├── en.json                              # English i18n strings for Navbar, Metadata.home3, and Home3 sections
├── es.json                              # Spanish i18n strings
└── ja.json                              # Japanese i18n strings

src/app/
├── sitemap.ts                           # Add /home-3 entry
└── [locale]/
    └── home-3/
        └── page.tsx                     # Thin route entry with generateMetadata & setRequestLocale

src/features/
├── home/
│   └── sections/
│       └── navbar.tsx                   # Update desktop & mobile Home dropdown with Nocturnal Observatory
└── home-3/
    ├── home-3-page.tsx                  # Feature client page composing InitialLoader and all 8 sections
    ├── content/
    │   ├── celestial-data.ts            # Type definitions and dataset for waypoints, chronometer, ledger, etc.
    │   └── observatory-copy.ts          # Feature-local copy and constant definitions
    └── sections/
        ├── index.ts                     # Barrel export for sections
        ├── observatory-hero.tsx         # Bespoke celestial aperture hero with masked headline reveals
        ├── observatory-telemetry.tsx    # Live astronomical metric ticker
        ├── nocturnal-waypoints.tsx      # Dark-sky sanctuary dossier cards with optical parameters
        ├── twilight-chronometer.tsx     # Interactive 4-phase nocturnal spectrum scrubber
        ├── field-cartography.tsx        # Topographical elevation route profile & waypoints mapper
        ├── nocturnal-ledger.tsx         # Lunar-synced departures with live berth availability badges
        ├── astral-voices.tsx            # Navigator field quotes with audio waveform motifs
        └── observatory-invitation.tsx   # Midnight Portal CTA with concierge trigger
```

---

## Tasks

### Task 1: Internationalization (i18n) & Navigation Integration

**Files:**
- Modify: `dictionary/en.json`
- Modify: `dictionary/es.json`
- Modify: `dictionary/ja.json`
- Modify: `src/features/home/sections/navbar.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `useTranslations("Navbar")`, `useTranslations("Home3")`, `useTranslations("Metadata")`
- Produces: `Navbar.homeObservatory`, `Navbar.homeObservatoryDesc`, `Metadata.home3`, and complete `Home3` dictionary entries across EN, ES, and JA; adds `/home-3` to desktop `homeOptions`, mobile accordion, and sitemap.

- [ ] **Step 1: Add i18n dictionary entries to `dictionary/en.json`, `dictionary/es.json`, and `dictionary/ja.json`**
  Add keys `homeObservatory` and `homeObservatoryDesc` under `Navbar`, create `Metadata.home3` with localized title, description, and keywords, and add the full `Home3` section dictionary structure (hero, telemetry, waypoints, chronometer, cartography, ledger, voices, cta).

- [ ] **Step 2: Update `navbar.tsx` desktop and mobile dropdowns**
  Add `{ href: "/home-3", label: t("homeObservatory"), desc: t("homeObservatoryDesc"), icon: LuCompass }` to desktop `Home` dropdown and mobile navigation portal list.

- [ ] **Step 3: Update `src/app/sitemap.ts`**
  Add `{ path: "/home-3", freq: "daily", prio: 0.95 }` to the sitemap route registry.

- [ ] **Step 4: Run typecheck to verify dictionaries and navbar changes**
  Run: `pnpm check:filenames && pnpm lint`
  Expected: PASS

- [ ] **Step 5: Commit changes**
  ```bash
  git add dictionary/en.json dictionary/es.json dictionary/ja.json src/features/home/sections/navbar.tsx src/app/sitemap.ts
  git commit -m "feat(i18n,nav): register home-3 nocturnal observatory in navbar, dictionaries, and sitemap"
  ```

---

### Task 2: Static Data & Types Layer for Home 3

**Files:**
- Create: `src/features/home-3/content/celestial-data.ts`
- Create: `src/features/home-3/content/observatory-copy.ts`

**Interfaces:**
- Produces:
  - `CelestialWaypoint`: type and array `CELESTIAL_WAYPOINTS` (Atacama, Tromsø, Namib, Aoraki) with coordinates, elevation, Bortle class, optic specs, image URLs, and highlights.
  - `TwilightPhase`: type and array `TWILIGHT_PHASES` (Golden Hour, Civil Twilight, Nautical Twilight, Astronomical Midnight) with spectrum gradient, color temperature, and landscape photography.
  - `CartographyRoute`: type and dataset `CARTOGRAPHY_ROUTES` with elevation points, distances, bivouac camps.
  - `NocturnalDeparture`: type and dataset `NOCTURNAL_DEPARTURES` with lunar alignment, dates, guide, spots remaining, and pricing.
  - `AstralVoice`: type and dataset `ASTRAL_VOICES` with quote, author, role, coordinates, and observatory.

- [ ] **Step 1: Create `celestial-data.ts` with comprehensive typed mock datasets**
  Define rich, realistic astronomical data using existing optimized Unsplash travel assets already used across Talkwer destinations.

- [ ] **Step 2: Create `observatory-copy.ts` with feature constants and telemetry entries**
  Define `TELEMETRY_ITEMS`, HUD label constants, and telemetry metrics.

- [ ] **Step 3: Verify TypeScript compilation**
  Run: `pnpm check:filenames`
  Expected: PASS

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/features/home-3/content/celestial-data.ts src/features/home-3/content/observatory-copy.ts
  git commit -m "feat(home-3): add celestial data structures and copy constants"
  ```

---

### Task 3: Bespoke Above-The-Fold Sections (`ObservatoryHero` & `ObservatoryTelemetry`)

**Files:**
- Create: `src/features/home-3/sections/observatory-hero.tsx`
- Create: `src/features/home-3/sections/observatory-telemetry.tsx`

**Interfaces:**
- Consumes: `CELESTIAL_WAYPOINTS`, `TELEMETRY_ITEMS`, `useTranslations("Home3")`, `@/lib/useGsap`, `cn`
- Produces: `ObservatoryHero` and `ObservatoryTelemetry` client components.

- [ ] **Step 1: Build `observatory-hero.tsx`**
  - Atmospheric dark celestial background with circular astronomical compass HUD overlay.
  - Issue tag & Bortle Class 1 live coordinate badge.
  - Staggered per-line masked headline reveal (`<div className="overflow-hidden">` with GSAP timeline): *"VOYAGES THROUGH THE UNLIGHTED EARTH"* with orange italic emphasis.
  - Quick-jump coordinate pills scrolling to target dossiers.
  - Subtitle with responsive clamp typography and Primary CTA trigger to `#waypoints`.

- [ ] **Step 2: Build `observatory-telemetry.tsx`**
  - Full-bleed ticker featuring real-time astronomical telemetry data (Bortle index, solar zenith, auroral oval activity, lunar phase).
  - Glowing amber beacon indicators and clean tabular layout.
  - Accessible reduced-motion fallback.

- [ ] **Step 3: Verify lint and filename rules**
  Run: `pnpm check:filenames && pnpm check:image-sizes`
  Expected: PASS

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/features/home-3/sections/observatory-hero.tsx src/features/home-3/sections/observatory-telemetry.tsx
  git commit -m "feat(home-3): create observatory hero and telemetry ticker sections"
  ```

---

### Task 4: Interactive Visual Dossiers & Twilight Chronometer (`NocturnalWaypoints` & `TwilightChronometer`)

**Files:**
- Create: `src/features/home-3/sections/nocturnal-waypoints.tsx`
- Create: `src/features/home-3/sections/twilight-chronometer.tsx`

**Interfaces:**
- Consumes: `CELESTIAL_WAYPOINTS`, `TWILIGHT_PHASES`, `useTranslations("Home3")`, `Image`, `Link`, `useGsap`
- Produces: `NocturnalWaypoints` and `TwilightChronometer` client components.

- [ ] **Step 1: Build `nocturnal-waypoints.tsx`**
  - Section header: "SANCTUARIES OF THE DARK SKY // BORTLE CLASS 1 RESERVES".
  - 4-card interactive grid with high-resolution photographic plates, elevation badges, coordinate stamps, and focal specs (focal length, optimal observation window).
  - Direct exploration link to corresponding destination detail pages.

- [ ] **Step 2: Build `twilight-chronometer.tsx`**
  - Interactive light-spectrum scrubber with 4 selectable twilight phases (Golden Hour, Civil Twilight, Nautical Twilight, Astronomical Midnight).
  - Dynamic image crossfade and telemetry feedback showing color temperature, star visibility count, and nocturnal photography advice.
  - GSAP-powered smooth transitions between phase states.

- [ ] **Step 3: Verify lint and image sizes**
  Run: `pnpm check:filenames && pnpm check:image-sizes`
  Expected: PASS

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/features/home-3/sections/nocturnal-waypoints.tsx src/features/home-3/sections/twilight-chronometer.tsx
  git commit -m "feat(home-3): create nocturnal waypoints and twilight chronometer sections"
  ```

---

### Task 5: Interactive Cartography, Ledger, Voices & Invitation Sections

**Files:**
- Create: `src/features/home-3/sections/field-cartography.tsx`
- Create: `src/features/home-3/sections/nocturnal-ledger.tsx`
- Create: `src/features/home-3/sections/astral-voices.tsx`
- Create: `src/features/home-3/sections/observatory-invitation.tsx`
- Create: `src/features/home-3/sections/index.ts`

**Interfaces:**
- Consumes: `CARTOGRAPHY_ROUTES`, `NOCTURNAL_DEPARTURES`, `ASTRAL_VOICES`, `useTranslations("Home3")`
- Produces: Barrel export `sections/index.ts` providing all 8 bespoke section components.

- [ ] **Step 1: Build `field-cartography.tsx`**
  - Topographic trail profile visualizer with interactive waypoint nodes, elevation gain charts, and bivouac checkpoints.
  - Route selection tabs (Atacama High Plateau, Tromsø Aurora Ridge, Namib Dune Traverse).

- [ ] **Step 2: Build `nocturnal-ledger.tsx`**
  - Celestial departures ledger table featuring lunar event dates, guide leads, remaining berth badges, and direct links to `/booking`.

- [ ] **Step 3: Build `astral-voices.tsx`**
  - Field quotes from astronomers and nocturnal navigators with interactive tab switcher, coordinate watermarks, and audio waveform aesthetics.

- [ ] **Step 4: Build `observatory-invitation.tsx`**
  - The Midnight Portal CTA: Deep cosmic radial glow, starry shimmer particles, consultation modal trigger, and concierge button.

- [ ] **Step 5: Create `src/features/home-3/sections/index.ts`**
  Export all 8 section components cleanly.

- [ ] **Step 6: Verify lint and filenames**
  Run: `pnpm check:filenames && pnpm lint`
  Expected: PASS

- [ ] **Step 7: Commit changes**
  ```bash
  git add src/features/home-3/sections/field-cartography.tsx src/features/home-3/sections/nocturnal-ledger.tsx src/features/home-3/sections/astral-voices.tsx src/features/home-3/sections/observatory-invitation.tsx src/features/home-3/sections/index.ts
  git commit -m "feat(home-3): create cartography, ledger, voices, invitation sections, and barrel export"
  ```

---

### Task 6: Feature Entry, App Route, and End-to-End Gate Verification

**Files:**
- Create: `src/features/home-3/home-3-page.tsx`
- Create: `src/app/[locale]/home-3/page.tsx`

**Interfaces:**
- Consumes: All 8 sections from `@/features/home-3/sections`, `InitialLoader` from `@/features/home/sections`, `useInitialPageLoader`, `createPageMetadata`, `setRequestLocale`
- Produces: Complete working `/home-3` page route across all locales.

- [ ] **Step 1: Create `src/features/home-3/home-3-page.tsx`**
  Client component composing `InitialLoader` and all 8 bespoke sections in sequential order.

- [ ] **Step 2: Create `src/app/[locale]/home-3/page.tsx`**
  Thin route implementing `generateMetadata` (using `Metadata.home3`), `setRequestLocale(locale)`, and rendering `<Home3Page />`.

- [ ] **Step 3: Run comprehensive verification gate**
  Run: `pnpm verify`
  Expected: All checks (eslint, filenames, image-sizes, next build) pass with 0 errors.

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/features/home-3/home-3-page.tsx src/app/[locale]/home-3/page.tsx
  git commit -m "feat(home-3): assemble page entry and route with full verification passing"
  ```

---

## Execution Choice

Two execution options are available:
1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task with reviews between tasks.
2. **Inline Execution** - Execute tasks directly in this session using `executing-plans` with checkpoints.
