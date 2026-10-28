# Destination details: philosophy, architecture, and building a second layout

This document describes how the current destination story page works—**editorial intent**, **data model**, **visual language**, and **motion contract**—so you can add a **`destination-details-2`** (or parallel route) that keeps the **same narrative philosophy** and **design inspiration** while changing **surface styling**, **grid alignments**, and **spatial rhythm**.

---

## 1. Editorial philosophy (what stays the same)

The page is not a “card grid of facts.” It is a **long-form magazine narrative** with a fixed emotional arc:

1. **Arrival / atmosphere** — First contact: light, scale, mood (not a bullet list of sights).
2. **Living geography** — How terrain, weather, and distance **edit daily life** (routes, routines, constraints).
3. **People** — **Residents and continuity**, not generic “locals.” Work, family, institutions, small politics.
4. **Culture** — **Rehearsed identity**: rituals, food, music, arguments—membership, not decoration.
5. **Sensory immersion** — Texture, sound, light—what photos cannot fully carry.
6. **Reflective close** — Quiet landing: understanding over highlights.

Copy is authored to be **specific and grounded** (names of roles, institutions, rhythms). The fallback seed in `content/destination-details-narrative-copy.ts` encodes this voice; per-destination entries override tone while keeping structure.

**Design inspiration (intangible, portable):**

- **Editorial travel journalism** (National Geographic Traveler–style depth, not listicles).
- **Dark canvas + warm orange accent** as the Talkwer shell thread (navbar, selection, kicker lines).
- **Full-bleed hero**, **asymmetric grids**, **pull quotes**, **motif layer** that whispers “this is one continuous story,” not six disconnected sections.

When you build *details-2*, preserve **the six-chapter spine** and **people-first, place-second** emphasis even if you change type scale, column widths, or motion intensity.

---

## 2. Information flow (how data becomes UI)

```
Destination (domain)
    → getDestinationDetailsViewModel(destination)
        → DestinationNarrativeViewModel
            → DestinationDetailsCoastalLayout | DestinationDetailsMountainLayout
                → six chapter sections (atmosphere … reflective close)
```

| Layer | Responsibility |
|--------|----------------|
| `shared/types/domain` `Destination` | Source of truth: name, country, images, gallery, etc. |
| `content/destination-details-narrative-copy.ts` | Per-destination **narrative seed** (`DestinationNarrativeSeed`): copy + optional image overrides. |
| `lib/destination-details-view-model.ts` | Merges seed + inferred images + variant; produces **`DestinationNarrativeViewModel`**. |
| `sections/destination-details-layout-*.tsx` | Chooses **chapter order** and **vertical rhythm** (coastal vs mountain). |
| `sections/destination-details-*.tsx` (chapter files) | Renders one narrative chapter; owns layout and `data-story-*` hooks for motion. |
| `sections/destination-details-sections-motion.tsx` | Client wrapper: runs GSAP once per page instance. |
| `destination-details-page.tsx` | Composes story + `EditorialCtaBand` (tours CTA). |

**Slug → seed key:** `getSeed()` uses the **first segment** of the slug (`bali` from `bali-indonesia`). New destinations need either a matching key in `DESTINATION_STORY_COPY` or they fall back to `FALLBACK_STORY_SEED`.

---

## 3. Types and content contract

Defined in `lib/destination-details-types.ts`.

### Narrative variant

- **`NarrativeVariant`:** `"coastal"` \| `"mountain"`.
- Set explicitly in seed (`variant`) or **inferred** in `inferVariant()` from destination name/country/tag (e.g. Patagonia, Iceland → `mountain`; default → `coastal`).

### Image roles

| Role | Typical use |
|------|----------------|
| `hero` | Full-bleed atmosphere opener. |
| `documentary` | People / street-level; often portrait orientation in the model. |
| `texture` | Detail, material, close surface. |
| `context` | Street, landscape, situational wide shots. |

`DestinationNarrativeViewModel` **assigns concrete images to each chapter** (hero, context strips, portrait grid, culture collage, sensory pair, closing image). Authors can supply `images` on the seed by role; otherwise the view model **picks from** `destination.image`, `gallery`, and a small set of shared stock paths.

### Chapter copy shape

Each chapter uses `NarrativeChapterCopy`: `kicker?`, `title`, `body`, optional `pullQuote` (people section).

For *details-2*, you can **reuse the same types** and view model so content stays one source of truth; only the **presentation components** change.

---

## 4. Coastal vs mountain compositions (spatial philosophy)

Both layouts render the **same six chapter components** but differ in **order** and **vertical stacking tension**.

**Coastal** (`destination-details-layout-coastal.tsx` → `DestinationDetailsCoastalLayout`):

- Order: Atmosphere → Living geography → People → Culture → Sensory → Close.
- Spacing: `space-y-6 md:space-y-10` — **breathing room**, chapter-like separation.
- Motif: `DestinationDetailsMotifLayer` default density (`dense={false}`).

**Mountain** (`destination-details-layout-mountain.tsx` → `DestinationDetailsMountainLayout`):

- Order: Atmosphere → **People** → Living geography → … (people promoted earlier).
- Spacing: `-space-y-2 md:-space-y-4` — **tighter overlap**, cliff-face stacking.
- Motif: `DestinationDetailsMotifLayer` **`dense`** — stronger stroke, higher opacity.

**Takeaway for details-2:** Variant is not “theme skin only”—it is **pacing and priority**. Your second layout could introduce a third “rhythm preset” (e.g. `editorial` / `minimal`) that only changes **composition wrapper** + **CSS**, still fed by the same `model`.

---

## 5. Visual language (tokens you can fork)

### Shared classes

`lib/destination-details-ui-classes.ts` centralizes **accent alignment** with the rest of Talkwer:

- Kickers: `destinationDetailsKickerClass`, `destinationDetailsKickerOnImageClass`
- Frames: `destinationDetailsFrameRingClass`, `destinationDetailsMediaBorderClass`
- Quote: `destinationDetailsQuoteBorderClass`
- Micro labels: `destinationDetailsMicroRailClass`, `destinationDetailsStatBorderClass`, `destinationDetailsStatLabelClass`

Orange is intentionally **rim light / accent** (`orange-500` at low alpha), not full fills.

### Motif layer

`destination-details-motif-layer.tsx` (`DestinationDetailsMotifLayer`) draws an SVG path + **uppercase destination name** as large watermark text. The text node uses **`data-story-motif-label`** so `destination-details-scroll-motion.ts` can scrub `y` and opacity on scroll.

### Section shell

Chapter sections use:

- `data-story-scene="<name>"` — scene identity (e.g. `atmosphere`, `people`); used for **section-level clip/scrub** and to **skip parallax on atmosphere hero media**.
- `data-story-line` — title/body lines for staggered reveal.
- `data-story-reveal` — opacity/scale entrance.
- `data-story-media` — parallax scrub targets (not applied inside `data-story-scene="atmosphere"` for the hero treatment).

Max content width is typically **`max-w-[1600px]`** with horizontal padding via **`pad-x`** or explicit `px-*` where noted.

---

## 6. Motion contract (`lib/destination-details-scroll-motion.ts`)

`DestinationDetailsSectionsMotion` mounts **`bindDestinationDetailsScroll(root)`** inside `useGsapContext` (see `.cursor/rules/talkwer-quality.mdc`).

Behaviors (abbreviated):

| Selector | Behavior |
|----------|-----------|
| `[data-story-line]` | Fade/slide up on enter. |
| `[data-story-reveal]` | Fade + slight scale. |
| `[data-story-card], [data-story-item]` | Staggered card entrance. |
| `[data-story-media]` | **Scrubbed parallax** (alternating yPercent), **disabled** for media inside atmosphere scene. |
| `[data-story-motif-label]` | Vertical drift + opacity tied to **root** scroll (full page scrub). |
| `[data-story-scene]` | Clip-path + opacity + y scrub; **handoff** between consecutive scenes (next fades/scales in while previous dims slightly). |

**Reduced motion:** If `prefersReducedMotion()` is true, **media parallax** is skipped; other entrances may still run (verify in `useGsap` / `prefersReducedMotion` helper).

**Implications for details-2:**

- If you change DOM structure, **preserve the same `data-story-*` attributes** on analogous elements, or **fork** `bindDestinationDetailsScroll` into e.g. `bindDestinationDetails2Scroll` with a new selector map.
- New layouts that **remove** scene wrappers lose the clip/scene handoff unless you replace it with CSS or a different timeline.

---

## 7. Page entry and shell

- Route: `src/app/destinations/[slug]/page.tsx` resolves `Destination`, injects breadcrumb JSON-LD, renders `DestinationDetailsPage`.
- `destination-details-page.tsx` builds the view model, picks `DestinationDetailsCoastalLayout` or `DestinationDetailsMountainLayout` by `model.variant`, wraps content in `DestinationDetailsSectionsMotion`, and appends **`EditorialCtaBand`** from `shared/ui` using `getDestinationDetailsTourCta(destination)`.

Global **Navbar / Footer / `<main>`** live in `src/app/layout.tsx`; the feature page only supplies **inner** content.

---

## 8. Checklist: building `destination-details-2`

Use this when you want **same philosophy, different look and alignments**.

### Keep stable

1. **Six-chapter narrative arc** and copy types (`DestinationNarrativeSeed` / `DestinationNarrativeViewModel`).
2. **Single view model builder** (`getDestinationDetailsViewModel`) unless details-2 needs different image rules (then extend with a flag or parallel mapper).
3. **Image roles** semantics—so CMS/authors do not relearn a new taxonomy per layout.
4. **Accessibility:** one logical `<h1>` in the hero; subsequent sections use `<h2>`; images have meaningful `alt` from the model.

### Swap or fork deliberately

1. **Layout file** — e.g. `destination-details-2-*-layout.tsx` that imports either the same shared chapter components with new wrappers, or **`DestinationDetails2*`** section siblings.
2. **Layout-only tokens** — parallel `destination-details-2-ui-classes.ts` for typography, gutters, border radius, and alignment (left rail vs centered vs split asymmetric grid).
3. **Motion** — either reuse `bindDestinationDetailsScroll` with the same hooks, or duplicate and tune scrub ranges / clip-path for a flatter or more aggressive feel.
4. **Motif** — replace `DestinationDetailsMotifLayer` with a different background system (grain, grid, typographic index numbers) while keeping **one focal brand accent** so it still feels like Talkwer.

### Suggested file layout (parallel feature)

```
src/features/destination-details-2/
  destination-details-2-page.tsx
  sections/
    destination-details-2-sections-motion.tsx        # optional: parallel to v1 motion
    destination-details-2-*-layout.tsx
    destination-details-2-*.tsx    # section chapters or shared primitives
  lib/
    destination-details-2-ui-classes.ts
    destination-details-2-scroll-motion.ts
```

Route option A: **`/destinations/[slug]/v2`** with a dedicated `page.tsx` under `src/app/destinations/[slug]/v2/page.tsx`.  
Option B: **query or header flag** to pick layout (harder to cache and test; prefer separate route during design iteration).

### Verification

Run `pnpm verify` after wiring. For visual QA, prefer **`pnpm build && pnpm start`** (per `AGENTS.md` dev CSS caveat).

---

## 9. Destination details v3 (`/destinations-3/[slug]`)

**Intent:** Same Talkwer shell principles (dark canvas, orange accent, long-form, `InitialLoader`, soft `EditorialCtaBand` at the end) with a **different information architecture**: people-first framing, culture “threads,” and **named place dossiers** (coordinates with index numerals).

**Data:** `getDestinationDetails3ViewModel` in `src/features/destination-details-3/lib/details-3-view-model.ts` merges:

- Seeds in `content/details-3-seeds.ts` (keyed by slug first segment, same rule as v1 story copy).
- When set on `Destination`: `cultureHighlights[]`, `signaturePlaces[]`.

**UI:** `lib/destination-details-3-ui-classes.ts` (Inter throughout; tabular index numerals for coordinates), sections `DestinationDetails3Hero`, `DestinationDetails3People`, `DestinationDetails3Culture`, **`DestinationDetails3Cadence`** (day rhythm, v3-only), `DestinationDetails3Places`, **`DestinationDetails3Counterpoint`** (two coexisting “readings,” v3-only), **`DestinationDetails3Ledger`** (margin notes / social read, v3-only), `DestinationDetails3Close`. Motion: `lib/destination-details-3-scroll-motion.ts` + `DestinationDetails3MotionRoot` using **`data-d3-*`** only.

**v3 content fields** (in `details-3-seeds.ts`): `cadence[]`, `counterpoint`, `ledger[]` — inherited from `FALLBACK_DETAILS_3_SEED` wherever a seed uses `...FALLBACK`; override per destination for bespoke rhythm.

**List index:** `src/features/destinations-3/` → `/destinations-3` links into this story route.

**CTA:** `content/destination-details-3-cta-copy.ts` — slightly softer closing copy than the default tour CTA.

---

## 10. Quick reference map

| Topic | Primary files |
|--------|----------------|
| Copy + seeds | `content/destination-details-narrative-copy.ts` |
| View model | `lib/destination-details-view-model.ts` |
| Types | `lib/destination-details-types.ts` |
| UI tokens | `lib/destination-details-ui-classes.ts` |
| Motion | `lib/destination-details-scroll-motion.ts`, `sections/destination-details-sections-motion.tsx` |
| Variants | `sections/destination-details-layout-coastal.tsx`, `destination-details-layout-mountain.tsx` |
| Motif | `sections/destination-details-motif-layer.tsx` |
| Chapters | `sections/destination-details-atmosphere.tsx`, `…-living-geography.tsx`, `…-people-portrait.tsx`, `…-culture-pulse.tsx`, `…-sensory-immersion.tsx`, `…-reflective-close.tsx` |
| Page entry | `destination-details-page.tsx` |
| CTA copy | `content/destination-details-cta-copy.ts` |
| Route | `src/app/destinations/[slug]/page.tsx` |
| Details v3 | `src/features/destination-details-3/`, `src/app/destinations-3/[slug]/page.tsx` |

---

## 11. Further reading

- [MDN: `<main>` landmark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) — one primary content landmark per document; aligns with moving chrome to `layout.tsx`.
- [WCAG 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) — skip link targets `#main-content`.
- Project motion notes: `.cursor/rules/talkwer-quality.mdc`.
- New route/module checklist: `docs/INDEX.md`.
