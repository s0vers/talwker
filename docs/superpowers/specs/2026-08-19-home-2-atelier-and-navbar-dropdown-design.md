# Home-2 (Expedition Atelier) and Navbar Multi-Dropdown Design Specification

## Overview
This specification details the creation of a brand-new parallel homepage variation (**Expedition Atelier** at `/home-2`) and an interactive **Home** multi-template dropdown in the global navigation bar (desktop and mobile) mirroring the existing **Destinations** dropdown pattern.

The new homepage variation presents an avant-garde curatorial travel journal / visual folio aesthetic while strictly adhering to Talkwer's *"The Nocturnal Expedition"* brand philosophy (`#050505` dark canvas, disciplined Inter typography with dramatic clamps, warm orange `orange-500` accents, hairline borders, and fluid `.pad-x` margins).

---

## 1. Navigation Architecture (Home Multi-Dropdown)

### 1.1 Desktop Navigation (`src/features/home/sections/navbar.tsx`)
- Add an interactive `Home` dropdown trigger before `Destinations` in the primary navigation list.
- Dropdown menu panel (`bg-[#0c0c0c]/98 backdrop-blur-xl border border-white/12 rounded-2xl shadow-2xl p-2 w-72 origin-top`):
  - **Option 1: Editorial Journal (`/`)**
    - Icon: `LuSparkles`
    - Title: Localized string `t("homeJournal")` ("Editorial Journal")
    - Description: Localized string `t("homeJournalDesc")` ("Classic editorial layout & spotlight stage")
  - **Option 2: Expedition Atelier (`/home-2`)**
    - Icon: `LuLayers`
    - Title: Localized string `t("homeAtelier")` ("Expedition Atelier")
    - Description: Localized string `t("homeAtelierDesc")` ("Curated visual folio & archival dossiers")
- Accessibility: ARIA attributes (`aria-haspopup="true"`, `aria-expanded`), mouse enter/leave with 180ms debounce, Escape key listener, outside click dismissal, and keyboard focus traversal.
- The `talkwer.` wordmark logo remains a direct link to `/`.

### 1.2 Mobile Navigation (`MobileNavPortal`)
- Add an expandable accordion for **Home** matching the existing **Destinations** accordion.
- Smooth GSAP reveal/exit choreography and instant dismissal when reduced motion is preferred.

---

## 2. Route & Sitemap Specification

- **Route Entry**: `src/app/[locale]/home-2/page.tsx`
  - Imports and renders `Home2Page` from `@/features/home-2/home-2-page`.
  - Implements `generateMetadata` reading localized metadata from `dictionary/[locale].json` (`Metadata.home2`).
- **Sitemap**: Add `{ path: "/home-2", freq: "daily", prio: 0.95 }` to `src/app/sitemap.ts`.

---

## 3. Feature Architecture (`src/features/home-2/`)

### 3.1 Directory Layout
```
src/features/home-2/
├── home-2-page.tsx
├── content/
│   ├── atelier-copy.ts
│   └── archetypes.ts
└── sections/
    ├── index.ts
    ├── atelier-hero.tsx
    ├── atelier-telemetry.tsx
    ├── atelier-dossiers.tsx
    ├── atelier-archetypes.tsx
    ├── atelier-dispatch.tsx
    ├── atelier-departures.tsx
    ├── atelier-manifesto.tsx
    └── atelier-cta.tsx
```

### 3.2 Section Details

1. **`AtelierHero` (`atelier-hero.tsx`)**:
   - Issue badge: `ISSUE Nº 04 // FIELD ATELIER` with live coordinates indicator.
   - Dynamic headline: Split across per-line masked `overflow-hidden` containers: *"CURATED EXPEDITIONS FOR THE CONTEMPLATIVE NOMAD"*.
   - Visual stage: Asymmetric dual-card photographic composition with a wide background visual plate and an offset floating portrait card with micro-parallax.
   - Interactive region jump chips (*Patagonia*, *Kyoto*, *Dolomites*, *Sahara*) scrolling smoothly to target dossiers.

2. **`AtelierTelemetry` (`atelier-telemetry.tsx`)**:
   - Refined horizontal ticker displaying live dispatch notes, elevation tags (`ELEV 3,840M`), climate conditions, and pulsing orange status beacons.

3. **`AtelierDossiers` (`atelier-dossiers.tsx`)**:
   - "The Curators' Dossier" — An archival visual plate gallery (`[FIG. 01 — PATAGONIA]`, `[FIG. 02 — KYOTO]`, etc.).
   - Photographic metadata chips (aperture, elevation, season, coordinates) and direct links to destination pages.

4. **`AtelierArchetypes` (`atelier-archetypes.tsx`)**:
   - Interactive 4-tab travel ethos selector (*The Solitary Alpine*, *The Midnight Archipelago*, *The Silk Oasis*, *The Arctic Aurora*).
   - Dynamic visual showcase with itinerary route breakdown, physical rating, gear guide, and highlights.

5. **`AtelierDispatch` (`atelier-dispatch.tsx`)**:
   - Two-column split-screen editorial visual essay: High-resolution sticky photograph plate on the left; rich narrative with pull quotes, orange accent lines, and author field notes on the right.

6. **`AtelierDepartures` (`atelier-departures.tsx`)**:
   - Curated limited-capacity departures (e.g. *Patagonia Solar Eclipse*, *Kyoto Solstice*) with departure dates, remaining spots badges, pricing, and direct booking triggers.

7. **`AtelierManifesto` (`atelier-manifesto.tsx`)**:
   - Founders' Nocturnal Letter with tactile typography, branded seal (`talkwer.`), and an interactive quote selector from global expedition leaders.

8. **`AtelierCTA` (`atelier-cta.tsx`)**:
   - The Nocturnal Chamber: Ambient warm orange radial glow, bespoke expedition planner consultation trigger, and concierge contact button.

---

## 4. Internationalization (i18n)

Update all dictionary files (`dictionary/en.json`, `dictionary/es.json`, `dictionary/ja.json`):
- `Navbar.home`: "Home" / "Inicio" / "ホーム"
- `Navbar.homeJournal`: "Editorial Journal" / "Diario Editorial" / "エディトリアル ジャーナル"
- `Navbar.homeJournalDesc`: "Classic editorial layout & spotlight stage" / "Diseño editorial clásico y escenario destacado" / "クラシックなエディトリアルレイアウトとスポットライトステージ"
- `Navbar.homeAtelier`: "Expedition Atelier" / "Atelier de Expedición" / "エクスペディション アトリエ"
- `Navbar.homeAtelierDesc`: "Curated visual folio & archival dossiers" / "Folio visual curado y expedientes de archivo" / "キュレーションされたビジュアルフォリオとアーカイブ資料"
- Full `Home2` section translations for EN, ES, and JA.
- Full `Metadata.home2` SEO translations for EN, ES, and JA.

---

## 5. Verification Plan

1. **Gate Verification**:
   - `pnpm lint`: Zero ESLint warnings or errors.
   - `pnpm check:filenames`: Filename conventions check passes.
   - `pnpm check:image-sizes`: Image fill/sizes lint check passes.
   - `pnpm build`: Next.js 16 static compilation builds cleanly across all locales (`en`, `es`, `ja`).
2. **Interactive Testing**:
   - Test Desktop Home dropdown behavior (hover, focus, Escape key, click navigation).
   - Test Mobile navigation Home accordion behavior.
   - Test all 8 Atelier sections for responsiveness, reduced-motion bypass, and visual elegance.
   - Test navigation flow between `/`, `/home-2`, `/destinations/*`, `/tours/*`, `/booking`, and `/contact`.
