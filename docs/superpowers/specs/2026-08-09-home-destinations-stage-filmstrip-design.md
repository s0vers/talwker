# Home Destinations Stage + Filmstrip — Design

Date: 2026-08-09  
Status: approved  
Scope: replace the home-page Destinations pin-scrub carousel with a short, playful Featured Stage + Filmstrip tease (4 destinations → `/destinations`).

## Goal

The current home Destinations section pins the viewport and scrub-scrolls through all 10 large cards. That long forced scroll is boring and exit-prone. Replace it with a compact tease: one immersive featured destination, four curated picks the user can cycle through, then a hard CTA to the full catalog.

## Decisions locked

| Decision | Choice |
|----------|--------|
| Section job | Tease **4** standouts; push to `/destinations` (not show the full list) |
| Visual direction | Hybrid **C**: immersive bleed stage with overlay filmstrip on desktop; filmstrip **below** the stage on mobile |
| Interaction | Playful: ~5s auto-cycle, pause on hover/focus/touch, thumb jump, swipe/drag on stage; no pin scrub |
| Featured count | **4** curated destinations from the existing catalog |
| Architecture | Feature-first home section rewrite; thin app routes unchanged |
| Shared card | Keep `DestinationCard` for `/destinations` grid; do **not** reuse it as the home stage |

## Architecture

**Feature-first + thin app routes.** No new route. Work lives under `src/features/home/` only. `src/app/page.tsx` / `home-page.tsx` keep importing `<Destinations />`.

**Named reference feature:** `src/features/home/sections/featured-tours.tsx` — section shell + `SectionHeading` / `SectionCta` + content module + `useGsap` entrance (not pin scrub). Layout uniqueness is the stage/filmstrip composition; folder and motion contracts stay Talkwer-native.

## Composition

1. **Heading** — existing `SectionHeading` pattern; update copy so it no longer says “scroll to glide.”
2. **Stage** — one large media plane (desktop: filmstrip overlaid on the image; mobile: filmstrip stacked below). Shows active destination name, country, duration, price, and primary CTA to `/destinations/[slug]`.
3. **Filmstrip** — four thumbs; active state + orange progress hairline while auto-cycling.
4. **Section CTA** — `SectionCta` → `/destinations` (“View All Destinations”).

### Behavior

- Auto-advance every ~5s with a short (~0.5s) image/copy crossfade.
- Pause on hover, focus, or touch; resume after idle.
- `prefers-reduced-motion`: no autoplay; instant (or minimal) swaps on manual change only.
- Swipe/drag on the stage changes the active index; thumb click/tap jumps.
- Keyboard: when the stage region is focused, arrow keys change index.
- Entrance motion only (heading + stage), via `useGsap` — **no** ScrollTrigger pin / horizontal scrub.

### Data

- `DESTINATIONS` in `src/features/home/content/destinations.ts` remains the catalog source of truth (also used by `/destinations`).
- New `src/features/home/content/featured-destinations.ts` selects **four** destination ids (editorial curation; prefer tagged Popular / Trending / New where useful).
- Resolve featured rows from `DESTINATIONS` by id; link with existing `destinationToSlug`.

### Out of scope

- Redesigning `/destinations` index or `[slug]` detail pages
- Changing `DestinationCard` API for this work
- Promoting stage/filmstrip into `shared/ui` (one consumer only)
- Changing home section order or other home sections
- New design tokens / second type system

## File map

| Path | Change |
|------|--------|
| `src/features/home/sections/destinations.tsx` | Rewrite: compose heading + stage + filmstrip + CTA; remove pin scrub |
| `src/features/home/sections/destinations-stage.tsx` | **Add** — featured stage, swipe, active destination chrome |
| `src/features/home/sections/destinations-filmstrip.tsx` | **Add** — thumbs + active/progress |
| `src/features/home/content/featured-destinations.ts` | **Add** — four curated ids + resolver helper if needed |
| `src/features/home/content/section-copy.ts` | Update `DESTINATIONS_SECTION` description (and any labels needed for stage a11y) |
| `src/features/home/content/destinations.ts` | Unchanged catalog |
| `src/shared/ui/destination-card.tsx` | Unchanged (catalog pages) |

Optional: if stage + filmstrip stay tiny, they may live as private modules colocated under `sections/` without exporting from `sections/index.ts` (only `Destinations` stays public).

## Accessibility

- Section keeps `id="destinations"` and labelled heading ids.
- Stage region: appropriate role / `aria-roledescription` or labelled live region for the active destination name on change (polite).
- Thumbs: buttons with accessible names (`Bali, Indonesia`, etc.); `aria-current` on active.
- Autoplay: pausable; disabled under reduced motion.
- Focus styles remain visible on thumbs and CTAs.

## Verification

No unit-test theater. After implementation:

1. `pnpm verify`
2. `pnpm build && pnpm start` for visual QA (dev CSS caveat in `AGENTS.md`)
3. Manual: desktop overlay strip, mobile strip-below, autoplay pause, swipe, reduced-motion, CTA targets

## Success criteria

- Home Destinations no longer pins or requires scrolling through the full list.
- User can see one strong destination quickly, skim four, and exit to `/destinations` or a detail page.
- Motion feels playful but short; reduced-motion users get a static/manual experience.
- Talkwer dark + orange language preserved; no new card-grid clone of Featured Tours.
