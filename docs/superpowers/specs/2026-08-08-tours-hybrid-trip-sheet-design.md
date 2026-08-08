# Tours Catalog + Hybrid Trip Sheet — Design

Date: 2026-08-08  
Status: approved (build)  
Scope: `/tours` catalog + `/tours/[slug]` hybrid detail. Branch: `feat/stories-tours-pages-and-polish`.

## Product split

| Surface | Job |
|---------|-----|
| Destinations | Why / where to visit |
| Tours | Where we take you, the itinerary, **why that sequence** |

## Chosen pattern

**Index catalog rows + hybrid detail** (not chapters-only, not accordion-only, not one-glance teaser).

Research mix: MBA/Intrepid expand days + Explora facts calm + sticky inquire sheet. Destination link is the off-ramp to place editorial.

## `/tours`

- Hero: “Where we take you”
- Compact catalog rows: thumb · title · destination · meta · summary · Open trip
- Honor `?destination=`

## `/tours/[slug]`

1. Compact opener (title, duration/group, small media)
2. **Why this route** (`tour.routeWhy`)
3. Thin facts: Days · From · Group · Rated
4. Accordion itinerary: day # · title · chips; expand → body + inset image
5. Sticky sheet: price, includes, inquire, Explore destination
6. Mobile bottom inquire bar

## Data

- `Tour.routeWhy: string` (required)
- `TourItineraryDay.chips?: string[]` (ops labels)

## Kill

- Decorative timeline spine / floating dots
- Repeated equal image+text day cards
- Highlight pill clusters on tour detail hero

## Success

- Scan all days collapsed; open one for detail
- Route logic readable without reading destination pages
- `pnpm verify` passes
