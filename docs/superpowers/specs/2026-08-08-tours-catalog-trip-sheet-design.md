# Tours Catalog + Trip Sheet Rebuild — Design

Date: 2026-08-08  
Status: approved  
Scope: Replace failed immersion (full-bleed panels / day chapters) on `/tours` and `/tours/[slug]` with Approach A — editorial catalog + sticky trip sheet. Branch: `feat/stories-tours-pages-and-polish`.

## Problem

Immersion became stacked image+title pages — weak scan, weak function, worse than the prior dossier.

## Goal

Creative but **functional** Tours: compare departures quickly; read an itinerary like a trip document with price/inquire always available.

## Locked decisions

| Item | Choice |
|------|--------|
| Approach | A — Editorial catalog + trip sheet |
| Kill | Full-bleed departure panels; full-viewport day chapters; primary left day-rail UX |
| Keep | Talkwer shell, `TOURS` data (incl. day images), `?destination=`, inquire → `/contact` |
| Differentiate | Commercial trip product — not destinations magazine, not image slideshow |

## Research anchors

- Sticky booking / trip sheet beside itinerary (luxury tour pages)
- Compact day timeline with inset media (not full-bleed stacks)
- Mobile sticky bottom inquire bar
- Scannable catalog rows for comparison

## `/tours`

- Compact hero (stamp, title, filter note)
- Catalog rows: thumb + title + destination + mono meta + summary + CTA
- Alternating row wash; hover border/opacity only
- Honor `?destination=`

## `/tours/[slug]`

- Medium opener (≤50svh) + highlights
- Desktop: main day timeline (~65%) + sticky trip sheet (~35%) — price, meta, includes, inquire, optional destination link
- Days: numeral + title + body + **inset** image (not min-h-screen)
- Mobile: stack + sticky bottom bar (from $ + Inquire)
- No `overflow-hidden` on sticky ancestors

## Motion

Light stagger only; `prefersReducedMotion` early exit; `data-tour-*` only.

## Success

- Can compare 4 tours in one screenful of scrolling
- Detail answers: price, duration, group, days, includes, inquire — without a hero marathon
- `pnpm verify` passes
