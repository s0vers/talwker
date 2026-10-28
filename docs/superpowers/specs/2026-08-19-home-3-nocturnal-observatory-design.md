# Home-3 (Nocturnal Observatory) and Multi-Dropdown Specification

## Overview
This specification details the creation of a brand-new parallel homepage variation (**The Nocturnal Observatory** at `/home-3`) and updating the global navigation **Home** multi-dropdown (desktop and mobile) to support three distinct homepage iterations:
1. **Editorial Journal** (`/`)
2. **Expedition Atelier** (`/home-2`)
3. **Nocturnal Observatory** (`/home-3`)

The new homepage variation presents an astronomical and cartographic expedition guide dedicated to exploring the world's most remote nocturnal sanctuaries, dark-sky reserves, astronomical waypoints, and twilight frontiers. It strictly adheres to Talkwer's *"The Nocturnal Expedition"* brand philosophy (`#050505` dark canvas, disciplined Inter typography with dramatic clamps, warm orange `orange-500` accents, hairline borders, and fluid `.pad-x` margins).

---

## 1. Navigation & Route Architecture

### 1.1 Desktop & Mobile Navigation (`src/features/home/sections/navbar.tsx`)
- Update the `Home` dropdown in the global navigation bar (desktop and mobile portal):
  - **Option 1: Editorial Journal (`/`)**
    - Icon: `LuSparkles`
    - Title: Localized string `t("homeJournal")` ("Editorial Journal")
    - Description: Localized string `t("homeJournalDesc")` ("Classic editorial layout & spotlight stage")
  - **Option 2: Expedition Atelier (`/home-2`)**
    - Icon: `LuLayers`
    - Title: Localized string `t("homeAtelier")` ("Expedition Atelier")
    - Description: Localized string `t("homeAtelierDesc")` ("Curated visual folio & archival dossiers")
  - **Option 3: Nocturnal Observatory (`/home-3`)**
    - Icon: `LuCompass` (or `LuOrbit` / `LuEye`)
    - Title: Localized string `t("homeObservatory")` ("Nocturnal Observatory")
    - Description: Localized string `t("homeObservatoryDesc")` ("Celestial cartography & dark-sky sanctuaries")
- Accessibility: ARIA attributes (`aria-haspopup="true"`, `aria-expanded`), mouse enter/leave with debounce, Escape key listener, outside click dismissal, and keyboard navigation.

### 1.2 Route & Sitemap Specification
- **Route Entry**: `src/app/[locale]/home-3/page.tsx`
  - Thin route importing and rendering `Home3Page` from `@/features/home-3/home-3-page`.
  - Implements `generateMetadata` reading localized metadata from `dictionary/[locale].json` (`Metadata.home3`).
- **Sitemap**: Add `{ path: "/home-3", freq: "daily", prio: 0.95 }` to `src/app/sitemap.ts`.

---

## 2. Feature Architecture (`src/features/home-3/`)

### 2.1 Directory Layout
```
src/features/home-3/
├── home-3-page.tsx
├── content/
│   ├── observatory-copy.ts
│   └── celestial-data.ts
└── sections/
    ├── index.ts
    ├── observatory-hero.tsx
    ├── observatory-telemetry.tsx
    ├── nocturnal-waypoints.tsx
    ├── twilight-chronometer.tsx
    ├── field-cartography.tsx
    ├── nocturnal-ledger.tsx
    ├── astral-voices.tsx
    └── observatory-invitation.tsx
```

### 2.2 Bespoke Section Details

1. **`ObservatoryHero` (`observatory-hero.tsx`)**:
   - **HUD / Badge**: `OBSERVATORY PROTOCOL // LAT 23° 51' S — LONG 67° 42' W // BORTLE CLASS 1`.
   - **Masked Headline Reveal**: Staggered per-row `overflow-hidden` masked lines animated with GSAP:
     *"VOYAGES THROUGH THE UNLIGHTED EARTH"* with italicized `orange-500` accent emphasis.
   - **Celestial Aperture Visual Stage**: Layered circular astro-compass graphic with rotating degree markings and atmospheric background plate.
   - **Interactive Waypoint Jump**: Quick celestial jump pills (*Atacama*, *Tromsø*, *Namib*, *Aoraki*) smoothly scrolling to focal dossiers.

2. **`ObservatoryTelemetry` (`observatory-telemetry.tsx`)**:
   - Continuous astronomical telemetry ticker featuring:
     - `BORTLE SCALE CLASS 1 — 21.9 MAG/ARCSEC²`
     - `SOLAR ZENITH -18° // ASTRONOMICAL TWILIGHT`
     - `AURORAL OVAL INDEX: KP 5.2 ACTIVE`
     - `LUNAR ILLUMINATION: 3.4% WAXING CRESCENT`
   - Pulsing orange beacon status indicators.

3. **`NocturnalWaypoints` (`nocturnal-waypoints.tsx`)**:
   - "Sanctuaries of the Dark Sky" — 4-card interactive planetary expedition showcase.
   - Each card features high-resolution dark-sky photography, elevation tags (`ELEV 4,500M`), celestial highlights (e.g. *Carina Nebula*, *Southern Cross*, *Borealis Arc*), light pollution index, and direct links to destination dossiers.
   - Interactive optic specs (focal length, optimal observation window) revealed on active card / hover.

4. **`TwilightChronometer` (`twilight-chronometer.tsx`)**:
   - Interactive light-spectrum scrubber with 4 distinct nocturnal phases:
     - **Phase 01: Golden Hour** (Warm amber atmospheric dispersion)
     - **Phase 02: Civil Twilight** (Cobalt blue shadow transition)
     - **Phase 03: Nautical Twilight** (First visible navigational stars)
     - **Phase 04: Astronomical Midnight** (Pure cosmic dark-sky clarity & Galactic core)
   - Dynamic photographic and atmospheric stage updating in real-time with smooth crossfade and GSAP-driven transitions.

5. **`FieldCartography` (`field-cartography.tsx`)**:
   - Topographic route mapper featuring an interactive elevation profile visualizer, trail waypoints, bivouac camps, and nocturnal navigation guidelines for remote wilderness traverses.

6. **`NocturnalLedger` (`nocturnal-ledger.tsx`)**:
   - Curated celestial departures synchronized with astronomical events:
     - *Perseid Meteor Cascade Trek* (August New Moon)
     - *Equinox Aurora Arctic Traverse* (September Equinox)
     - *Atacama Galactic Core Immersion* (June Dry Season)
   - Includes departure window, guide lead, remaining berths indicator, and direct booking triggers.

7. **`AstralVoices` (`astral-voices.tsx`)**:
   - Field dispatches and philosophical reflections from nocturnal astronomers, expedition navigators, and indigenous stargazers.
   - Audio waveform visual motifs and coordinate stamps for field authenticity.

8. **`ObservatoryInvitation` (`observatory-invitation.tsx`)**:
   - The Midnight Portal: Ambient deep cosmic radial glow with subtle star shimmer, bespoke expedition consultation trigger, and concierge dispatch button.

---

## 3. Internationalization (i18n)

Update all dictionary files (`dictionary/en.json`, `dictionary/es.json`, `dictionary/ja.json`):
- `Navbar.homeObservatory`: "Nocturnal Observatory" / "Observatorio Nocturno" / "ノクターナル天文台"
- `Navbar.homeObservatoryDesc`: "Celestial cartography & dark-sky sanctuaries" / "Cartografía celeste y santuarios de cielo oscuro" / "星空の地図作成と星空保護区"
- Full `Home3` section translations for EN, ES, and JA.
- Full `Metadata.home3` SEO translations for EN, ES, and JA.

---

## 4. Verification Plan

1. **Gate Verification**:
   - `pnpm lint`: Zero ESLint warnings or errors.
   - `pnpm check:filenames`: Filename conventions check passes (`scripts/check-kebab-case.mjs`).
   - `pnpm check:image-sizes`: Image fill/sizes lint check passes.
   - `pnpm build`: Next.js 16 static compilation builds cleanly across all locales (`en`, `es`, `ja`).
2. **Interactive Testing**:
   - Test Desktop Home dropdown behavior (hover, focus, Escape key, click navigation across `/`, `/home-2`, `/home-3`).
   - Test Mobile navigation Home accordion behavior.
   - Test all 8 Observatory sections for responsiveness, reduced-motion bypass, and visual elegance.
   - Test navigation flow between `/home-3`, `/destinations/*`, `/tours/*`, `/booking`, and `/contact`.
