# Stories, Tours Pages, and Light Polish — Design

Date: 2026-08-07  
Status: approved  
Scope: fill Stories/Tours stubs + detail routes; light polish on shipped pages; contact channel CTA hover fix. No home hero change. No Stories/Tours parallel theme matrix (`-2`/`-3`).

## Goal

Ship award-quality `/stories` and `/tours` (indexes + `[slug]` details) that feel unique within Talkwer’s dark editorial shell, while lightly polishing existing pages and fixing the Contact “How to reach us” channel button hover. Destination v1/v2/v3 remain intentional parallel theme layouts over one catalog.

## Decisions locked

| Decision | Choice |
|----------|--------|
| Scope | B+C: stubs + detail routes + revise shipped pages lightly |
| Revision depth | Light polish only (structure stays) |
| Home hero | Frozen — no changes |
| Content model | Hybrid: tours from extended `TOURS`; stories as new essay fixtures |
| Theme approach | Approach 1: one signature Stories stack + one signature Tours stack; destination parallel layouts stay the multi-layout theme showcase |
| Destination families | v1 / v2 / v3 are product theme layouts (same catalog, different composition/IA) — do not collapse or “pick one” |
| Contact hover | Remove muddy orange/teal wash on channel CTAs; quiet border/opacity hover only |

## Inspiration (patterns, not clones)

- **Here & Away** — photo as primary UI; magazine pagination; image-led browse.
- **Travelshift** — immersive departure browse; metadata as editorial signal.
- **Editorial Horizon / dark-travel case studies** — full-bleed cinematic frames, restrained accent, magazine hierarchy before booking chrome.

Uniqueness = composition and interaction per page, not a second brand system (Inter, orange accent, dark canvas stay).

## Product map

| Surface | Job | Unique grammar |
|---------|-----|----------------|
| Home | Brand arrival | Hero frozen. Light polish elsewhere (dead CTAs / hrefs). |
| Destinations v1–v3 | Theme showcase: same catalog, different list + story compositions | Structure unchanged; light polish only if broken. |
| About / Contact | Brand & reach | Light polish. Contact channel CTAs: no accent fill on hover. |
| Stories index | Editorial essays | Issue/spread index — featured lead + secondary rail; not a destination card grid. |
| Story detail | Long-form piece | Article measure: opener → body beats → related destination/tour. Not a six-chapter destination clone. |
| Tours index | Curated departures | Itinerary dossier: duration/price/group as metadata; denser and more commercial than Stories. Honors `?destination=`. |
| Tour detail | Single departure | Hero + summary + day list + includes + inquire CTA. |

### Out of scope

- `/stories-2`, `/tours-2`, `/stories-3`, `/tours-3`
- Home hero redesign
- Collapsing or reauthoring destination theme families
- New footer product pages (Careers, Press, FAQ, Blog) — only wire labels that already have routes
- Second type family / serif stack (design contract: Inter site-wide)

## Content & data

### Tours (extend existing catalog)

- Source of truth: `src/features/home/content/tours.ts` via `Tour` in `shared/types/domain.ts`.
- Add: `slug`, `summary`, `itinerary[]` (`day`, `title`, `body`), `includes[]`, optional `destinationSlug`.
- Update `defineTours` / content-guards for new required fields.
- Home `#tours` continues to consume the same `TOURS` array (no duplicate catalog).

### Stories (new fixtures)

- Add `Story` to `shared/types/domain.ts` + `defineStories` guard (same pattern as `Tour` / `Testimonial`).
- Fields: `slug`, `title`, `dek`, `heroImage`, `author`, `location`, `readMinutes`, `body[]` (paragraph / pullquote / image blocks), optional `relatedDestinationSlug` / `relatedTourId`.
- 4–6 essays under `src/features/stories/content/` (page-owned catalog; not under `home/content`).
- Home testimonials remain social proof only; they are not story detail sources.

## Information architecture & routes

```
/stories              → stories-page.tsx
/stories/[slug]       → story details entry
/tours                → tours-page.tsx (?destination= filter/highlight)
/tours/[slug]         → tour details entry
```

- Thin App Router pages: metadata, JSON-LD (SEO playbook), load data, render feature entry.
- Sitemap: include indexes and slugs.
- Cross-links: destinations CTA → `/tours` / `/stories`; story related strip → destination or tour; destination story tour CTAs already use `/tours?destination=` — Tours index must honor it.

## Feature file layout

```
src/features/stories/
  stories-page.tsx
  story-details-page.tsx
  content/
  sections/
  lib/

src/features/tours/
  tours-page.tsx
  tour-details-page.tsx
  content/
  sections/
  lib/

src/app/stories/page.tsx
src/app/stories/[slug]/page.tsx
src/app/tours/page.tsx
src/app/tours/[slug]/page.tsx
```

Reuse threshold: do not extract a new shared card until a third consumer needs it.

## Motion & accessibility

- Motion via `@/lib/useGsap`, `gsap.context`, early `prefersReducedMotion()`.
- Stories: restrained stagger; horizontal browse only if mobile remains usable (else scroll-snap without trapping).
- Story detail: reveal entrances with feature-owned data attributes (not a copy of destination chapter motion unless hooks truly match).
- Tours: shorter, sharper dossier entrances; day-row stagger.
- A11y: one `<h1>` per page; focus-visible; meaningful image `alt` + `sizes`; clear inquire/mailto names.
- Visual QA: prefer `pnpm build && pnpm start` (dev CSS caveat in `AGENTS.md`).

## Light polish checklist

| Area | Change |
|------|--------|
| Contact channels CTA | Drop `group-hover` orange/teal fill/text wash; hover = border/opacity only |
| Home (non-hero) | Wire “View all tours” and other dead tour/story CTAs to real routes |
| Footer | Link Explore/Company labels that already have routes; leave fictional pages unlinked or remove misleading affordance |
| Destinations v1–v3 | Bug/hover/CTA fixes only — no layout rewrites |
| About | No structural change unless broken link/hover |

## Delivery phases

1. Contact hover fix + dead CTA/href wiring  
2. Extend `Tour` + `/tours` + `/tours/[slug]`  
3. Story fixtures + `/stories` + `/stories/[slug]`  
4. Cross-links, metadata, sitemap  
5. `pnpm verify` + production visual pass  

## Success criteria

- Nav stubs replaced by real Stories/Tours experiences with working detail routes  
- Stories, Tours, and Destinations read as distinct compositions under one shell  
- Home hero unchanged; destination theme families intact  
- Contact channel buttons no longer shift to muddy accent on hover  
- `pnpm verify` passes  

## Non-goals reminder

This is not a site-wide redesign. Destination parallel layouts already prove the theme system; Stories/Tours prove two more unique product surfaces, not a fourth destinations clone.
