# Stories, Tours Pages, and Light Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/stories` and `/tours` stubs with unique index + `[slug]` pages, extend tour content, add story fixtures, wire dead CTAs/footer links, and fix Contact channel CTA hover wash — without changing the home hero or destination theme families.

**Architecture:** Feature-first pages under `src/features/{stories,tours}/` with thin `src/app` routes. Tours extend the shared `TOURS` catalog; Stories are a new `Story` domain type with page-owned fixtures. Light polish only on shipped pages. Destination v1/v2/v3 stay parallel theme layouts.

**Tech Stack:** Next.js 16 App Router, React client sections, Tailwind v4 tokens, GSAP via `@/lib/useGsap`, `pnpm verify` (no unit test runner in this repo).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-07-stories-tours-pages-and-polish-design.md`
- Home hero (`src/features/home/sections/hero.tsx`) must not change.
- Destination list/detail v1–v3: bug/hover/CTA fixes only — no layout rewrites.
- No `/stories-2`, `/tours-2`, or third theme matrix for Stories/Tours.
- Shell: dark canvas, `orange-500` accent, Inter, `pad-x`, `max-w-[1600px]`.
- Motion: `@/lib/useGsap` + `gsap.context` + early `prefersReducedMotion()`.
- Prefer `pnpm` for all scripts; end each major task with `pnpm typecheck` (or `pnpm verify` before handoff).
- Visual QA of UI: `pnpm build && pnpm start` (dev CSS caveat in `AGENTS.md`).
- Kebab-case under `src/features`; thin app routes; content split per `docs/README.md`.

---

## File map

| Path | Responsibility |
|------|----------------|
| `src/shared/types/domain.ts` | Extend `Tour`; add `Story` + body block types |
| `src/lib/content-guards.ts` | Extend `defineTours`; add `defineStories` |
| `src/features/home/content/tours.ts` | Add slug/summary/itinerary/includes/destinationSlug |
| `src/features/home/sections/featured-tours.tsx` | `SectionCta href="/tours"`; optional TourCard links |
| `src/features/home/sections/footer.tsx` | Route-aware footer links |
| `src/features/home/content/section-copy.ts` | Footer link href map (or structured entries) |
| `src/features/contact/sections/contact-channels.tsx` | Quiet channel CTA hover |
| `src/shared/ui/tour-card.tsx` | Optional `href` → link wrapper when present |
| `src/features/tours/**` | Index + detail UI, copy, slug helpers, `?destination=` |
| `src/features/stories/**` | Index + detail UI, essay fixtures, slug helpers |
| `src/app/tours/page.tsx` | Server: searchParams → props + metadata |
| `src/app/tours/[slug]/page.tsx` | Static params + tour detail |
| `src/app/stories/page.tsx` | Stories index metadata |
| `src/app/stories/[slug]/page.tsx` | Static params + story detail |
| `src/app/sitemap.ts` | Add tour/story slug URLs |
| `docs/INDEX.md` | Link new spec/plan if needed |

---

### Task 1: Contact channel CTA hover + home tour CTA href

**Files:**
- Modify: `src/features/contact/sections/contact-channels.tsx`
- Modify: `src/features/home/sections/featured-tours.tsx`

**Interfaces:**
- Consumes: existing `Button`, `SectionCta`
- Produces: quiet channel hover; home “View All Tours” navigates to `/tours`

- [ ] **Step 1: Fix contact channel button classes**

In `contact-channels.tsx`, replace the channel `Button` `className` so it no longer uses orange/teal wash on group hover:

```tsx
className="mt-6 w-full border-white/15 bg-white/[0.02] text-white/90 transition-[border-color,background-color,color] duration-300 hover:border-white/35 hover:bg-white/[0.05] hover:text-white group-hover:border-white/30 md:w-auto"
```

Remove any `group-hover:border-orange-500/50`, `group-hover:bg-orange-500/10`, `group-hover:text-orange-400`. Keep card-level hover if it only softens border/shadow (optional: leave card `hover:border-orange-500/25` or tone it to `hover:border-white/15` for quieter cards — prefer white/opacity for the **button** specifically).

- [ ] **Step 2: Wire home Featured Tours CTA**

In `featured-tours.tsx`, pass `href="/tours"` on `SectionCta`:

```tsx
<SectionCta
  href="/tours"
  icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
>
  {FEATURED_TOURS_SECTION.viewAllCta}
</SectionCta>
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/contact/sections/contact-channels.tsx src/features/home/sections/featured-tours.tsx
git commit -m "fix: quiet contact channel hover and link view-all tours"
```

---

### Task 2: Footer links for existing routes

**Files:**
- Modify: `src/features/home/content/section-copy.ts`
- Modify: `src/features/home/sections/footer.tsx`

**Interfaces:**
- Consumes: `FOOTER_COLUMNS` labels
- Produces: `FOOTER_LINK_HREF` map from label → path | null

- [ ] **Step 1: Add href map in section-copy**

```ts
/** Labels with real routes. Unmapped labels stay non-navigating (no fake pages). */
export const FOOTER_LINK_HREF: Record<string, string | undefined> = {
	Destinations: "/destinations",
	Tours: "/tours",
	About: "/about",
	Contact: "/contact",
	// Stories is under Explore only if we add the label; nav already has Stories.
};
```

If Explore should expose Stories, add `"Stories"` to `FOOTER_COLUMNS.Explore` (replace `Blog` or `Experiences`) **and** map `Stories: "/stories"`. Preferred: replace `Blog` with `Stories` so the footer matches product reality.

```ts
Explore: ["Destinations", "Tours", "Stories", "Experiences"],
```

Keep Careers/Press/FAQ/etc. as non-links.

- [ ] **Step 2: Update Footer to use the map**

```tsx
{links.map((l) => {
  const href = FOOTER_LINK_HREF[l];
  return (
    <li key={l}>
      {href ? (
        <Link
          href={href}
          className="text-sm text-white/55 transition-colors hover:text-white/80"
        >
          {l}
        </Link>
      ) : (
        <span className="text-sm text-white/35">{l}</span>
      )}
    </li>
  );
})}
```

Use `<span>` (not dead `<button>`) for unmapped labels so they are not fake controls. Keep legal buttons as-is (no pages yet).

- [ ] **Step 3: Typecheck + commit**

Run: `pnpm typecheck`  
Expected: PASS

```bash
git add src/features/home/content/section-copy.ts src/features/home/sections/footer.tsx
git commit -m "fix: wire footer links to existing Talkwer routes"
```

---

### Task 3: Extend Tour domain, guards, and catalog

**Files:**
- Modify: `src/shared/types/domain.ts`
- Modify: `src/lib/content-guards.ts`
- Modify: `src/features/home/content/tours.ts`
- Modify: `src/shared/ui/tour-card.tsx` (optional href)

**Interfaces:**
- Consumes: existing `Tour` fields
- Produces:

```ts
export type TourItineraryDay = {
  day: number;
  title: string;
  body: string;
};

export type Tour = {
  id: number;
  slug: string;
  title: string;
  destination: string;
  destinationSlug?: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviews?: number;
  highlights: string[];
  summary: string;
  itinerary: TourItineraryDay[];
  includes: string[];
};
```

- [ ] **Step 1: Update `Tour` type** as above in `domain.ts`.

- [ ] **Step 2: Extend `defineTours`**

Assert `slug`, `summary`, `itinerary` (non-empty array with day/title/body), `includes` (non-empty string array). Optional `destinationSlug` if present must be non-empty string.

- [ ] **Step 3: Fill catalog fields for all 4 tours**

Example for Bali (repeat pattern for the other three with distinct copy):

```ts
{
  id: 1,
  slug: "bali-cultural-immersion",
  title: "Bali Cultural Immersion",
  destination: "Bali, Indonesia",
  destinationSlug: "bali-indonesia", // must match destinationToSlug for Bali if used
  image: "/image.jpg",
  price: 1299,
  originalPrice: 1599,
  duration: "7 Days / 6 Nights",
  groupSize: "Max 12",
  rating: 4.9,
  reviews: 234,
  highlights: ["Temple Tours", "Rice Terraces", "Cooking Class"],
  summary:
    "Seven days paced for temple mornings, terrace walks, and a kitchen you actually cook in — not a checklist sprint across the island.",
  itinerary: [
    { day: 1, title: "Arrival & Ubud hush", body: "Land, transfer, and a slow first evening in the hills." },
    { day: 2, title: "Temple circuit", body: "Guided visits with room for quiet courtyards between the crowds." },
    { day: 3, title: "Rice terrace morning", body: "Walk the edges at cooler hours; afternoon free." },
    { day: 4, title: "Cooking class", body: "Market first, then a home kitchen — recipes you can remake." },
    { day: 5, title: "Coast day", body: "South shore light and a sunset without a forced itinerary." },
    { day: 6, title: "Open day", body: "Optional spa, bike, or village walk — your call." },
    { day: 7, title: "Departure", body: "Transfer out with a packed breakfast and buffer time." },
  ],
  includes: ["Airport transfers", "6 nights lodging", "Daily breakfast", "Cooking class", "Local guide days 2–4"],
},
```

Verify `destinationSlug` values against `destinationToSlug` in `src/features/destinations/lib/destination-slug.ts` for destinations that exist; omit or leave undefined when no match (e.g. Iceland tour not in catalog).

- [ ] **Step 4: Optional TourCard link**

Add optional `href?: string` to `TourCardProps`. When set, wrap card root in `Link` (or make the whole card a link with `className` preserved). Home featured tours: `href={`/tours/${tour.slug}`}`.

- [ ] **Step 5: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS (home featured tours still compile)

- [ ] **Step 6: Commit**

```bash
git add src/shared/types/domain.ts src/lib/content-guards.ts src/features/home/content/tours.ts src/shared/ui/tour-card.tsx src/features/home/sections/featured-tours.tsx
git commit -m "feat: extend Tour model with slug, summary, and itinerary"
```

---

### Task 4: Tours lib helpers + index page UI

**Files:**
- Create: `src/features/tours/lib/tour-slug.ts`
- Create: `src/features/tours/lib/tours-list-params.ts`
- Create: `src/features/tours/content/tours-page-copy.ts` (replace stub copy)
- Create: `src/features/tours/sections/tours-hero.tsx`
- Create: `src/features/tours/sections/tours-dossier-list.tsx`
- Create: `src/features/tours/sections/tours-cta.tsx`
- Create: `src/features/tours/sections/index.ts`
- Modify: `src/features/tours/tours-page.tsx`
- Modify: `src/app/tours/page.tsx`

**Interfaces:**
- Consumes: `TOURS`, `Tour`
- Produces:

```ts
// tour-slug.ts
export function findTourBySlug(tours: Tour[], slug: string): Tour | undefined;
export function getTourSlug(tour: Tour): string; // returns tour.slug

// tours-list-params.ts
export type ToursListParams = { destination?: string };
export function parseToursListParams(sp: Record<string, string | string[] | undefined>): ToursListParams;
export function filterToursByDestinationSlug(tours: Tour[], destinationSlug?: string): Tour[];
```

- [ ] **Step 1: Implement slug + list param helpers**

`filterToursByDestinationSlug`: if `destinationSlug` is set, return tours where `tour.destinationSlug === destinationSlug`; if empty result, return all tours but the page should still show a muted “no exact match” note (copy-driven).

- [ ] **Step 2: Rewrite page copy** for dossier tone (kicker, title, description, emptyFilterNote, cta).

- [ ] **Step 3: Build sections**

**Hero:** editorial dossier opener — kicker, large title, short dek; if filter active, mono stamp showing destination slug. Dark bg, `pad-x`, no home-hero clone.

**Dossier list:** not a 4-up TourCard grid clone of home. Prefer full-width rows:

```
[01] TITLE ........................ duration | group | from $price
     destination · rating
     one-line summary
     → View itinerary
```

Each row links to `/tours/[slug]`. Motion: stagger rows on enter via `useGsap` + `data-tour-row`.

**CTA:** `EditorialCtaBand` → `/contact` and `/stories`.

- [ ] **Step 4: Client page shell**

`tours-page.tsx` accepts `tours: Tour[]` and `destinationFilter?: string`, keeps InitialLoader pattern from existing stubs (or match destinations page loader pattern), composes sections.

- [ ] **Step 5: Server route**

```tsx
// src/app/tours/page.tsx
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { destination } = parseToursListParams(sp);
  const tours = filterToursByDestinationSlug(TOURS, destination);
  // breadcrumb JSON-LD + <ToursPage tours={tours} destinationFilter={destination} />
}
```

Keep existing metadata; adjust description only if needed.

- [ ] **Step 6: Typecheck + commit**

Run: `pnpm typecheck`  
Expected: PASS

```bash
git add src/features/tours src/app/tours/page.tsx
git commit -m "feat: build tours dossier index with destination filter"
```

---

### Task 5: Tour detail route + UI

**Files:**
- Create: `src/features/tours/tour-details-page.tsx`
- Create: `src/features/tours/sections/tour-details-hero.tsx`
- Create: `src/features/tours/sections/tour-details-summary.tsx`
- Create: `src/features/tours/sections/tour-details-itinerary.tsx`
- Create: `src/features/tours/sections/tour-details-includes.tsx`
- Create: `src/features/tours/content/tour-details-copy.ts`
- Create: `src/app/tours/[slug]/page.tsx`
- Modify: `src/features/tours/sections/index.ts`

**Interfaces:**
- Consumes: `Tour`, `findTourBySlug`
- Produces: static tour detail page

- [ ] **Step 1: Sections**

- Hero: full-bleed image, title, destination, duration/price meta, orange accent sparingly.
- Summary: measure-limited prose from `tour.summary` + highlights as text list (not pill spam).
- Itinerary: numbered day stack (`tour.itinerary`), `data-tour-day` stagger.
- Includes: simple list + inquire `Link` to `/contact` (and optional mailto).

- [ ] **Step 2: `tour-details-page.tsx`**

```tsx
export default function TourDetailsPage({ tour }: { tour: Tour }) { /* compose */ }
```

- [ ] **Step 3: App route**

Mirror `destinations/[slug]/page.tsx`: `generateStaticParams` from `TOURS.map(t => ({ slug: t.slug }))`, `generateMetadata`, `notFound()` if missing, breadcrumb JSON-LD Home → Tours → Tour title.

- [ ] **Step 4: Typecheck + commit**

Run: `pnpm typecheck`  
Expected: PASS

```bash
git add src/features/tours src/app/tours
git commit -m "feat: add tour detail pages with itinerary dossier"
```

---

### Task 6: Story domain, guards, and fixtures

**Files:**
- Modify: `src/shared/types/domain.ts`
- Modify: `src/lib/content-guards.ts`
- Create: `src/features/stories/content/stories.ts`
- Create: `src/features/stories/lib/story-slug.ts`
- Modify: `src/features/stories/content/stories-page-copy.ts`

**Interfaces:**
- Produces:

```ts
export type StoryBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; src: string; alt: string };

export type Story = {
  id: number;
  slug: string;
  title: string;
  dek: string;
  heroImage: string;
  author: string;
  location: string;
  readMinutes: number;
  body: StoryBodyBlock[];
  relatedDestinationSlug?: string;
  relatedTourId?: number;
};
```

```ts
export function defineStories(value: Story[]): Story[];
export function findStoryBySlug(stories: Story[], slug: string): Story | undefined;
export const STORIES: Story[]; // 4–6 essays
```

- [ ] **Step 1: Add types + `defineStories`** (assert required fields; body non-empty; each block discriminated).

- [ ] **Step 2: Author 4–6 fixtures** under `stories/content/stories.ts` using existing public images (`/image.jpg`, `/writer.avif`, destination-ish assets already in `/public`). Each essay: distinct voice, 3–6 body blocks, optional related destination/tour when it fits.

- [ ] **Step 3: Typecheck + commit**

Run: `pnpm typecheck`  
Expected: PASS

```bash
git add src/shared/types/domain.ts src/lib/content-guards.ts src/features/stories
git commit -m "feat: add Story domain type and editorial fixtures"
```

---

### Task 7: Stories index + detail UI and routes

**Files:**
- Create: `src/features/stories/sections/stories-hero.tsx`
- Create: `src/features/stories/sections/stories-issue-grid.tsx`
- Create: `src/features/stories/sections/stories-cta.tsx`
- Create: `src/features/stories/story-details-page.tsx`
- Create: `src/features/stories/sections/story-details-hero.tsx`
- Create: `src/features/stories/sections/story-details-body.tsx`
- Create: `src/features/stories/sections/story-details-related.tsx`
- Create: `src/features/stories/sections/index.ts`
- Modify: `src/features/stories/stories-page.tsx`
- Modify: `src/app/stories/page.tsx`
- Create: `src/app/stories/[slug]/page.tsx`

**Interfaces:**
- Consumes: `STORIES`, `findStoryBySlug`, `DESTINATIONS` / `TOURS` for related links
- Produces: issue-style index + article detail

- [ ] **Step 1: Index composition (Here & Away–inspired, Talkwer shell)**

- Featured lead: large image + title/dek linking to first story.
- Secondary rail/list: remaining stories as horizontal scroll-snap **or** stacked editorial rows (prefer scroll-snap on `md+`, stack on mobile).
- Do **not** reuse `DestinationCard` / home testimonial carousel.

- [ ] **Step 2: Detail composition**

- Full-bleed opener with title, author, location, read time.
- Body renderer for `StoryBodyBlock` union.
- Related strip: if `relatedDestinationSlug`, link `/destinations/[slug]`; if `relatedTourId`, resolve tour and link `/tours/[slug]`.

- [ ] **Step 3: Routes**

Index metadata already exists — refresh description. Detail: `generateStaticParams`, `generateMetadata` with `type: "article"` if `createPageMetadata` supports it (see `docs/SEO_PLAYBOOK.md`), breadcrumbs, `notFound()`.

- [ ] **Step 4: Motion**

Feature-owned hooks (`data-st-*`): restrained stagger on index; line reveals on detail. Skip heavy motion when `prefersReducedMotion()`.

- [ ] **Step 5: Typecheck + commit**

Run: `pnpm typecheck`  
Expected: PASS

```bash
git add src/features/stories src/app/stories
git commit -m "feat: ship stories index and article detail pages"
```

---

### Task 8: Sitemap, cross-links, verify

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: home/destinations CTAs if any still lack hrefs (audit `EditorialCtaBand` / `SectionCta` usages for tours/stories)
- Modify: `docs/INDEX.md` (optional: list new spec/plan under Superpowers)

**Interfaces:**
- Consumes: `TOURS`, `STORIES`, slug helpers

- [ ] **Step 1: Extend sitemap**

```ts
...TOURS.map((tour) => ({
  url: resolveCanonicalUrl(`/tours/${tour.slug}`),
  changeFrequency: "monthly" as const,
  priority: 0.7,
})),
...STORIES.map((story) => ({
  url: resolveCanonicalUrl(`/stories/${story.slug}`),
  changeFrequency: "monthly" as const,
  priority: 0.65,
})),
```

- [ ] **Step 2: Cross-link audit**

Confirm: destinations CTA → `/tours` + `/stories`; home view-all tours; tour cards → detail; story related links; destination detail tour CTA query still works with Task 4 filter.

- [ ] **Step 3: Full verify + production smoke**

Run: `pnpm verify`  
Expected: PASS (lint, typecheck, filenames, image-sizes, build)

Then: `pnpm start` and manually check `/tours`, `/tours/[slug]`, `/stories`, `/stories/[slug]`, `/contact` channel hover, home hero unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/features docs/INDEX.md
git commit -m "chore: sitemap story/tour slugs and finalize cross-links"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Contact channel hover fix | 1 |
| Home non-hero CTA wiring | 1, 8 |
| Footer existing-route links | 2 |
| Extend Tour + catalog | 3 |
| `/tours` dossier + `?destination=` | 4 |
| `/tours/[slug]` | 5 |
| Story type + fixtures | 6 |
| `/stories` + `/stories/[slug]` | 7 |
| Sitemap + verify | 8 |
| Home hero frozen | Global constraint |
| No stories/tours `-2`/`-3` | Global constraint |
| Destination themes untouched structurally | Global constraint |

## Self-review notes

- No unit-test runner in repo — verification uses `pnpm typecheck` / `pnpm verify` + manual production smoke.
- Essay fixture prose in Task 6 must be written fully in implementation (4–6 complete stories), not left as “TBD”.
- `destinationSlug` values must be validated against real destination slugs at implementation time.
