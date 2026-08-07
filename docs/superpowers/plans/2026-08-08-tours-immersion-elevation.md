# Tours Immersion Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate `/tours` and `/tours/[slug]` into a vertical cinematic departure experience (image panels + sticky day rail + day chapters) that does not read as a destinations magazine clone.

**Architecture:** Extend the shared `TOURS` catalog with day/panel images; replace tours feature sections (index panels + detail journey) while keeping thin app routes, Talkwer shell tokens, and `data-tour-*` motion hooks only.

**Tech Stack:** Next.js 16 App Router, React client sections, Tailwind v4, GSAP via `@/lib/useGsap`, `pnpm verify` (no unit test runner).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-08-tours-immersion-elevation-design.md`
- Branch: `feat/stories-tours-pages-and-polish` (continue here; do not open a new branch)
- Surfaces only: `/tours` + `/tours/[slug]`
- Differentiation: departure/time product — not destinations story chapters; no `data-story-*` / `data-d2-*` / `data-d3-*`; no motif watermark; no people/culture/sensory spine
- Shell: dark canvas, `orange-500`, Inter, `pad-x`, `max-w-[1600px]`
- Motion: `@/lib/useGsap` + `gsap.context` + early `prefersReducedMotion()`
- Keep `?destination=` filter behavior
- No home hero / Stories / Destinations v1–v3 / About / Contact changes
- Prefer `pnpm`; gate with `pnpm typecheck` per task; `pnpm verify` before handoff
- Visual QA: `pnpm build && pnpm start`

---

## File map

| Path | Action |
|------|--------|
| `src/shared/types/domain.ts` | Add `TourItineraryDay.image`; optional `Tour.panelImage` |
| `src/lib/content-guards.ts` | Guard new fields |
| `src/features/home/content/tours.ts` | Fill images for all tours/days |
| `src/features/tours/content/tours-page-copy.ts` | Panel/index copy tweaks |
| `src/features/tours/content/tour-details-copy.ts` | Rail / day / includes labels |
| `src/features/tours/sections/tours-hero.tsx` | Slim departures stamp (not boarding-pass) |
| `src/features/tours/sections/tours-dossier-list.tsx` | Replace with full-bleed panels (or rename to `tours-departure-panels.tsx` and update barrel) |
| `src/features/tours/sections/tour-details-hero.tsx` | Opener: meta + optional one-line summary |
| `src/features/tours/sections/tour-details-rail.tsx` | **Create** sticky day rail |
| `src/features/tours/sections/tour-details-itinerary.tsx` | Rebuild as day chapters |
| `src/features/tours/sections/tour-details-summary.tsx` | Slim or fold into hero; avoid destinations essay block |
| `src/features/tours/sections/tour-details-includes.tsx` | Ledger + inquire |
| `src/features/tours/lib/tour-details-scroll.ts` | **Create** rail sync / chapter ScrollTrigger binder |
| `src/features/tours/tour-details-page.tsx` | Compose rail + chapters |
| `src/features/tours/sections/index.ts` | Export updates |
| App routes | Unchanged structure |

**Preferred rename:** replace `tours-dossier-list.tsx` with `tours-departure-panels.tsx` so the filename matches the immersion model. Update imports/barrel; delete old file.

---

### Task 1: Extend Tour types, guards, and catalog images

**Files:**
- Modify: `src/shared/types/domain.ts`
- Modify: `src/lib/content-guards.ts`
- Modify: `src/features/home/content/tours.ts`

**Interfaces:**
- Produces:

```ts
export type TourItineraryDay = {
  day: number;
  title: string;
  body: string;
  image: string;
};

export type Tour = {
  // existing fields…
  panelImage?: string;
  itinerary: TourItineraryDay[];
};
```

- [ ] **Step 1: Update types** — add required `image` on `TourItineraryDay`; optional `panelImage` on `Tour`.

- [ ] **Step 2: Update `defineTours`** — assert each itinerary day has non-empty `image`; if `panelImage` present, non-empty string.

- [ ] **Step 3: Fill catalog images** for all 4 tours. Use public assets (examples — redistribute so days aren’t all identical):

| Asset | Typical use |
|-------|-------------|
| `/image.jpg` | Fallback / opener |
| `/sun-idyllic-beautiful-relax-sky.jpg` | Coast / arrival |
| `/unsplash-market-culture.jpg` | Market / cooking |
| `/unsplash-culture-ritual.jpg` | Temple / ritual |
| `/vertical-high-angle-shot-white-buildings-santorini-greece.jpg` | Greek panel/days |
| `/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg` | Patagonia |
| `/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg` | Japan |
| `/set-cottages-ocean-blue-sky.jpg` | Coastal lodging |
| `/travel-europe-tourism-bougainvillea-village.jpg` | Village walks |
| `/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg` | Dramatic landscape |

Set `panelImage` when a stronger index still differs from card `image`; otherwise omit (panels fall back to `image`).

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/shared/types/domain.ts src/lib/content-guards.ts src/features/home/content/tours.ts
git commit -m "feat: add tour day and panel images for immersion"
```

---

### Task 2: Rebuild `/tours` index as departure panels

**Files:**
- Create: `src/features/tours/sections/tours-departure-panels.tsx`
- Delete or stop exporting: `src/features/tours/sections/tours-dossier-list.tsx`
- Modify: `src/features/tours/sections/tours-hero.tsx`
- Modify: `src/features/tours/sections/index.ts`
- Modify: `src/features/tours/tours-page.tsx`
- Modify: `src/features/tours/content/tours-page-copy.ts`

**Interfaces:**
- Consumes: `Tour[]`, `destinationFilter?`, `getTourSlug`, `toursMatchDestinationFilter`
- Panel image: `tour.panelImage ?? tour.image`

- [ ] **Step 1: Slim hero copy** — kicker “Departures”; short title/dek. Avoid destinations boarding-pass / coordinate chrome.

- [ ] **Step 2: Implement `ToursDeparturePanels`**

Structure per panel (inside `Link` to `/tours/[slug]`):

```tsx
<article
  data-tour-panel
  className="relative min-h-[70svh] overflow-hidden border-b border-white/10 md:min-h-[85svh]"
>
  <Image src={panelSrc} alt="" fill priority={index === 0} sizes="100vw" className="object-cover" />
  {/* dark gradient overlay */}
  <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end pad-x pb-12 md:min-h-[85svh] md:pb-16">
    <span className="font-mono text-xs tracking-[0.2em] text-orange-500">[{paddedIndex}]</span>
    <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight text-white">
      {tour.title}
    </h2>
    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
      {duration} · {groupSize} · From ${price}
    </p>
    <p className="mt-2 text-sm text-white/45">{tour.destination}</p>
  </div>
</article>
```

Keep empty-filter note above the stack when `destinationFilter` misses.

Motion: `useGsapContext` + ScrollTrigger scrub on image `yPercent` (subtle) or enter stagger; skip when `prefersReducedMotion()`. Hover: opacity/scale on overlay or image — **no orange fill wash**.

- [ ] **Step 3: Wire page** — `ToursPage` renders Hero → DeparturePanels → CTA. Remove dossier list import.

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/tours
git commit -m "feat: rebuild tours index as full-bleed departure panels"
```

---

### Task 3: Detail opener + sticky day rail + day chapters

**Files:**
- Create: `src/features/tours/lib/tour-details-scroll.ts`
- Create: `src/features/tours/sections/tour-details-rail.tsx`
- Modify: `src/features/tours/sections/tour-details-hero.tsx`
- Modify: `src/features/tours/sections/tour-details-itinerary.tsx`
- Modify: `src/features/tours/sections/tour-details-summary.tsx` (slim or remove from page)
- Modify: `src/features/tours/tour-details-page.tsx`
- Modify: `src/features/tours/content/tour-details-copy.ts`
- Modify: `src/features/tours/sections/index.ts`

**Interfaces:**
- Produces:

```ts
// tour-details-scroll.ts
export function bindTourDetailsScroll(root: HTMLElement): void;
// Uses [data-tour-rail] buttons [data-tour-rail-target], chapters [data-tour-day][id]
```

- [ ] **Step 1: Hero opener** — full-bleed `tour.image`; title; destination; meta strip; **at most one** summary line (`tour.summary` truncated or full if short). Do not add destination-style pull quotes.

- [ ] **Step 2: Sticky rail**

Desktop: `sticky top-*` left or top bar with Day 01…N + “Includes” link.  
Mobile: horizontal scroll chips.  
Each control: `data-tour-rail-target="#tour-day-{n}"` or `#tour-includes`.  
Active state via ScrollTrigger callbacks in `bindTourDetailsScroll`.

- [ ] **Step 3: Day chapters**

Replace list itinerary with stacked chapters:

```tsx
<section
  id={`tour-day-${day.day}`}
  data-tour-day
  className="relative min-h-[100svh] …"
>
  <Image src={day.image} alt="" fill sizes="100vw" className="object-cover" />
  {/* overlay */}
  <div className="relative … pad-x">
    <span className="font-mono">Day {padded}</span>
    <h2>{day.title}</h2>
    <p className="max-w-xl text-white/70">{day.body}</p>
  </div>
</section>
```

Motion: light scrub on media; pin optional but keep mobile usable — prefer scrub over hard long pins if conflict. Reduced motion: static chapters, rail still scrolls via `scrollIntoView`.

- [ ] **Step 4: Summary section** — Prefer removing standalone summary section from page (hero carries one line). If kept, one short measure block only — no essay layout.

- [ ] **Step 5: Compose page**

Order: Hero → Rail (sticky wrapper) → Day chapters → Includes (Task 4 can refine includes; keep current includes temporarily if needed).

```tsx
<div ref={rootRef} className="…">
  <TourDetailsHero />
  <div className="relative lg:grid lg:grid-cols-[12rem_minmax(0,1fr)]">
    <TourDetailsRail tour={tour} />
    <div>
      <TourDetailsItinerary tour={tour} />
      <TourDetailsIncludes tour={tour} />
    </div>
  </div>
</div>
```

Call `bindTourDetailsScroll` inside `useGsapContext` on the page or a thin `TourDetailsMotionRoot` wrapper.

- [ ] **Step 6: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/features/tours
git commit -m "feat: add tour detail day rail and cinematic chapters"
```

---

### Task 4: Includes ledger polish + destination link + verify

**Files:**
- Modify: `src/features/tours/sections/tour-details-includes.tsx`
- Modify: `src/features/tours/content/tour-details-copy.ts` (as needed)
- Modify: `src/features/tours/tour-details-page.tsx` if destination link lives here
- Optional: tiny related destination text link when `tour.destinationSlug` set → `/destinations/${destinationSlug}`

- [ ] **Step 1: Includes ledger** — `id="tour-includes"`; two-column quiet list; inquire `Link` to `/contact`; rail target works.

- [ ] **Step 2: Optional destination text link** under includes or after last day — single line, not a chapter.

- [ ] **Step 3: Full verify**

Run: `pnpm verify`  
Expected: PASS

- [ ] **Step 4: Visual smoke** (recommended)

Run: `pnpm build && pnpm start`  
Check `/tours`, `/tours/bali-cultural-immersion`, `/tours?destination=bali-indonesia`, reduced-motion if feasible.

- [ ] **Step 5: Commit**

```bash
git add src/features/tours
git commit -m "feat: polish tour includes ledger and finish immersion verify"
```

- [ ] **Step 6: Push branch**

```bash
git push
```

---

## Spec coverage

| Spec item | Task |
|-----------|------|
| Day `image` + optional `panelImage` | 1 |
| Full-bleed index panels | 2 |
| Slim departures hero | 2 |
| `?destination=` preserved | 2 |
| Detail opener + meta | 3 |
| Sticky day rail | 3 |
| Day chapters ≠ destinations spine | 3 |
| Includes ledger + inquire | 4 |
| No destination theme / story hooks | Global |
| `pnpm verify` | 4 |

## Self-review notes

- No unit-test runner — use `pnpm typecheck` / `pnpm verify`
- Image paths must exist under `public/`
- Do not restyle home `TourCard` beyond consuming existing `image`
- Differentiation checklist in Task 3/4 reviews: fail if people/culture chapters or `data-story-*` appear
