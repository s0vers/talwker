# Tours Immersion Elevation — Design

Date: 2026-08-08  
Status: approved  
Scope: Elevate `/tours` index and `/tours/[slug]` detail only (Approach C → vertical cinematic journey). Same branch as stories/tours ship (`feat/stories-tours-pages-and-polish`).

## Goal

Replace the thin text-list / basic-hero Tours surfaces with an award-inspired **departure product** experience (Travelshift / Black Tomato patterns) that stays clearly distinct from Destination place-magazine layouts.

## Decisions locked

| Decision | Choice |
|----------|--------|
| Ambition | C — full product immersion |
| Composition approach | Vertical cinematic journey (Approach 1) |
| Surfaces | `/tours` + `/tours/[slug]` only |
| Differentiation | Departure/time product — not destinations story chapters |
| Branch | Continue on `feat/stories-tours-pages-and-polish` |
| Home / Stories / Destinations v1–v3 / About / Contact | Out of scope |

## Differentiation contract (non-negotiable)

| | Destinations | Tours (this work) |
|---|---|---|
| Job | Place story | Time-bound departure |
| Spine | Atmosphere → people → culture… | Opener → Day 01…N → Includes → Inquire |
| Type | Narrative chapters | Itinerary chapters + commercial meta |
| Image role | Documentary / mood | Product stills of what you do that day |
| Motion | Scene handoff / motif scrub | Sticky day rail + chapter pin/scrub |
| Ending | Reflective close | Includes ledger + inquire CTA |

**Hard avoid**

- No six-chapter place philosophy (people / culture / sensory)
- No motif watermark / coastal–mountain layout fork
- No reuse of `data-story-*`, `data-d2-*`, or `data-d3-*` — Tours owns `data-tour-*` only
- No long pull-quote essay blocks as the hero of a day
- Index must not read as destinations card grid or boarding-pass clone

**Hard keep**

- Dark canvas, `orange-500` accent, Inter, `pad-x`, `max-w-[1600px]`
- GSAP via `@/lib/useGsap` + early `prefersReducedMotion()`
- Existing `TOURS` catalog as source of truth (extend fields; no duplicate list)
- `?destination=` filter behavior on index

## Inspiration (patterns, not clones)

- **Travelshift (Awwwards SOTD)** — image-led browse; itinerary as immersive reveal
- **Black Tomato** — cinematic stills, sparse type, trip pages as chapters not bullet dumps
- **Here & Away** — photo as primary UI (meta rides the image)

## Composition

### `/tours` index

- Short dossier hero stamp (“Departures” + one line) — not destinations boarding-pass UI
- Stacked **full-bleed panels** (~70–90svh): tour image + left/bottom type (index, title, duration · group · from $); hover/scrub lift; click → detail
- Honor `?destination=`: filter panels; muted note if no match, then show all
- Closing `EditorialCtaBand` → `/contact` and `/stories`
- Mobile: same panels, shorter height; no forced horizontal scroll

### `/tours/[slug]` detail

1. **Opener** — full-bleed product still; title; destination; meta strip (duration / group / price / rating); at most one short summary line in hero
2. **Sticky day rail** (desktop) — Day 01…N + Includes; click scrolls to chapter; mobile = compact horizontal chip rail
3. **Day chapters** — each day ≈ one viewport: large still + day numeral + title + body; light pin/scrub — not destination scene handoffs
4. **Includes ledger** — quiet two-column list + inquire → `/contact`
5. Optional text link to related destination when `destinationSlug` is set — not a story chapter

## Data

Extend existing types in `shared/types/domain.ts` and guards in `content-guards.ts`:

```ts
export type TourItineraryDay = {
  day: number;
  title: string;
  body: string;
  image: string; // required for day chapters
};

export type Tour = {
  // …existing fields…
  panelImage?: string; // index panel; falls back to image
  itinerary: TourItineraryDay[];
};
```

- Fill day/panel images from existing `/public` assets (reuse stock paths; product framing, not “people chapter”)
- Home `TourCard` / featured tours continue to use `image` — no home redesign
- Update all four tours in `home/content/tours.ts`

## Motion

| Surface | Behavior |
|---------|----------|
| Index panels | Enter + light image parallax/scrub; hover = opacity/scale only (no orange wash) |
| Detail rail | Syncs active day via ScrollTrigger; click smooth-scrolls |
| Day chapters | Light pin or scrub on media; reduced-motion → static stack, rail still links |
| Hooks | `data-tour-panel`, `data-tour-day`, `data-tour-rail` only |

## File touch map (expected)

| Path | Role |
|------|------|
| `src/shared/types/domain.ts` | Day `image`; optional `panelImage` |
| `src/lib/content-guards.ts` | Guard new fields |
| `src/features/home/content/tours.ts` | Fill images |
| `src/features/tours/sections/*` | Replace dossier list / detail sections for immersion |
| `src/features/tours/lib/*` | Rail/scroll helpers if needed |
| `src/features/tours/content/*` | Copy updates for rail/panel labels |
| App routes | Keep thin; no route renames |

## Success criteria

- Tours index reads as image-led departures, not a text spreadsheet
- Tour detail reads as a scrubbed journey product, not a destinations magazine clone
- `pnpm verify` passes; visual QA via `pnpm build && pnpm start`
- Home hero and destination theme families unchanged

## Non-goals

- Stories elevation, destinations rewrites, WebGL/3D, horizontal-only atlas index, map/pace dashboard chrome
