# Design Spec: Website Flow, Copy Overhaul, Routing & Multi-Language i18n System

**Date:** 2026-08-16  
**Status:** Approved  
**Approach:** Hybrid Platform (Editorial Field Notes + Curated Expeditions)  
**Target Locales:** English (`en` - default), Spanish (`es`), Japanese (`ja`)  
**Core Rule:** Preserve 100% of existing pages, layouts, and components — zero removals.

---

## 1. Executive Summary & Goals

This specification establishes an end-to-end overhaul of Talkwer's website flow, copywriting, routing architecture, and multi-language internationalization (i18n). Talkwer is defined as a hybrid travel studio and storytelling collective that balances longform editorial field notes with handcrafted expedition booking.

### Key Objectives
1. **Zero Component/Page Removal**: All 24 feature domains, 3 destination layouts (`/destinations`, `/destinations-2`, `/destinations-3`), booking/checkout funnels, auth pages, and legal/company pages are preserved and refined.
2. **Fixed Navigation & Routing Flow**: Seamless inter-page transitions from discovery to booking:
   - Preserved back navigation on multi-layout destinations (`/destinations-2/[slug]` &rarr; `/destinations-2`, `/destinations-3/[slug]` &rarr; `/destinations-3`).
   - Cohesive bridge between destinations, tours, experiences, and stories.
   - Fixed broken/mismatched tour slugs in `/experiences` and related content cards.
3. **Refined Copy & Brand Voice**: High-luxury editorial tone, eliminating placeholder text, grammatical awkwardness, and disjointed terminology.
4. **100% i18n Coverage**: Complete translation dictionary across `en.json`, `es.json`, and `ja.json` covering every page, section, form, modal, and badge with strict compile-time TypeScript validation.

---

## 2. Page & Routing Architecture

### 2.1 Navigation & Site Map
```
src/app/[locale]/
├── page.tsx                      # Home (Hero, About, Stage Showcase, Tours, Testimonials, Newsletter, CTA)
├── destinations/                 # Standard Grid Layout
│   ├── page.tsx
│   └── [slug]/page.tsx           # Standard Destination Detail
├── destinations-2/               # Stage Spotlight Showcase
│   ├── page.tsx
│   └── [slug]/page.tsx           # Stage Destination Detail (Preserves /destinations-2 back link)
├── destinations-3/               # Cinematic Explorer
│   ├── page.tsx
│   └── [slug]/page.tsx           # Cinematic Destination Detail (Preserves /destinations-3 back link)
├── tours/                        # Expedition Catalog
│   ├── page.tsx
│   └── [slug]/page.tsx           # Tour Details & Itinerary Sheet (Links to /booking?tour=[slug])
├── experiences/page.tsx          # Curated Travel Experiences & Categories (Links to tours & custom inquiry)
├── stories/                      # Field Notes Magazine
│   ├── page.tsx
│   └── [slug]/page.tsx           # Editorial Article (Cross-links to featured tour)
├── booking/page.tsx              # Booking Customizer (Pre-filled tour state & dates)
├── checkout/                     # Checkout & Payment Selection
│   ├── page.tsx
│   └── success/page.tsx          # Order Confirmation & Summary
├── auth/
│   ├── login/page.tsx            # Sign In (with demo account support)
│   └── register/page.tsx         # Account Creation
├── about/page.tsx                # Origin, Philosophy, Interactive Map, Milestones, Team
├── contact/page.tsx              # Bespoke Inquiry Form & Global Studio Offices
├── faq/page.tsx                  # Frequently Asked Questions Accordion
├── careers/page.tsx              # Open Positions & Collective Culture
├── press/page.tsx                # Media Kit, Press Releases, Brand Assets
├── partners/page.tsx             # Local Guide & Boutique Hotelier Partnerships
├── booking-policy/page.tsx       # Reservation & Deposit Terms
├── cancellation/page.tsx         # Refunds & Alterations Policy
├── privacy/page.tsx              # Privacy & Data Governance
├── terms/page.tsx                # Terms of Service
├── cookies/page.tsx              # Cookie & Tracking Policy
├── not-found.tsx                 # Localized 404
└── layout.tsx                    # Root Locale Layout with NextIntlClientProvider, Navbar, Footer
```

### 2.2 Preserved Layout & Breadcrumb Rules
- `/destinations/[slug]` &rarr; Back button: `/destinations` (Standard Grid)
- `/destinations-2/[slug]` &rarr; Back button: `/destinations-2` (Stage Showcase)
- `/destinations-3/[slug]` &rarr; Back button: `/destinations-3` (Cinematic Explorer)
- `experiences` items link accurately to corresponding active tours:
  - Ubud &rarr; `bali-cultural-immersion`
  - Aegean &rarr; `greek-island-odyssey`
  - Patagonia &rarr; `patagonia-expedition`
  - Kyoto &rarr; `japan-heritage-trail`
  - Amalfi &rarr; `greek-island-odyssey` or dedicated custom trip
  - Iceland &rarr; `patagonia-expedition` or dedicated custom trip

---

## 3. Translation Dictionaries & Type Contract

### 3.1 Namespaces in `dictionary/{en,es,ja}.json`

1. **`Navbar`**: Brand name, menu items (`destinations`, `destinationsStandard`, `destinationsStage`, `destinationsCinematic`, `tours`, `about`, `contact`, `stories`), CTA button (`letsTalk`), mobile menu controls.
2. **`Footer`**: Column titles (`explore`, `company`, `support`, `legal`), column link labels, blurb narrative, copyright notice.
3. **`Common`**: Reusable actions and labels (`explore`, `viewAll`, `bookNow`, `startPlanning`, `browseTours`, `readMore`, `learnMore`, `back`, `filter`, `from`, `perPerson`, `days`, `save`, `startingAt`).
4. **`Metadata`**: SEO titles and descriptions for all routes.
5. **`Home`**:
   - `hero`: Tagline, title lines, subtitle, explore button.
   - `about`: Section label, headline, narrative, statistics labels.
   - `destinations`: Showcase heading, category tabs (`All`, `Popular`, `Trending`, `Luxury`, `New`), controls.
   - `tours`: Featured tours heading, badges.
   - `testimonials`: Traveler stories heading, reviewer metadata.
   - `newsletter`: Stay in loop heading, input placeholder, button, disclaimer.
   - `cta`: Bottom editorial callout with primary and secondary actions.
6. **`Destinations`**, **`Destinations2`**, **`Destinations3`**, **`DestinationDetails`**: Headings, filter labels, spotlight badges, itinerary overviews, related tours.
7. **`Tours`**, **`TourDetails`**: Catalog filters, difficulty labels, inclusions, day-by-day itineraries, booking sheet labels, inquiry buttons.
8. **`Stories`**, **`StoryDetails`**: Magazine hero, issue grid categories, read time indicators, photo credits, related journeys.
9. **`Experiences`**: Catalog hero, category tabs, curator spotlight quote, custom trip CTA.
10. **`About`**: Story narrative, map markers, philosophy callout, core values cards, timeline milestones, team bios.
11. **`Contact`**: Form labels, inquiry topic selector, validation messages, office locations.
12. **`Booking`**, **`Checkout`**: Step titles, passenger counter, date selector, add-on options, payment methods, confirmation receipt.
13. **`Auth`**: Sign in / Sign up form fields, toggle links, demo account badge.
14. **`FAQ`**, **`Careers`**, **`Press`**, **`Partners`**: Section headers, accordion questions, role listings, press releases, partner benefits.
15. **`Legal`**: Cookie banner actions, legal policy headers, section content.

### 3.2 Global Type Safety (`global.d.ts`)
```ts
import type en from "./dictionary/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

---

## 4. Component Refactoring & Link Discipline

1. **Locale-Aware Navigation**:
   - All internal links use `import { Link } from "@/i18n/navigation"`.
   - All programmatic navigation uses `useRouter` and `usePathname` from `@/i18n/navigation`.
2. **Translation Consumption**:
   - Client components consume `useTranslations("<Namespace>")`.
   - Server pages utilize `getTranslations("<Namespace>")` or pass localized messages to presentational sections.
3. **No Unused Content Hardcoding**:
   - Clean up disconnected hardcoded strings in favor of the structured dictionary system.

---

## 5. Verification & Quality Gates

1. **Filename Discipline**: `pnpm check:filenames` (ensure all files follow kebab-case).
2. **Image Discipline**: `pnpm check:image-sizes` (ensure proper sizes and fill attributes on Next.js images).
3. **TypeScript Compilation**: `pnpm typecheck` (verifies 100% `IntlMessages` key completeness and routing parameters).
4. **Code Quality**: `pnpm lint` (zero warnings or errors).
5. **Full Production Build**: `pnpm build` (ensures all 60+ static pages render cleanly across `en`, `es`, and `ja`).
6. **Visual & Flow Verification**: Production server (`pnpm start`) audit:
   - Language switcher toggling between `EN`, `ES`, `JA` on both desktop and mobile.
   - Navigation flow from Home &rarr; Destinations (1, 2, 3) &rarr; Tours &rarr; Booking &rarr; Checkout &rarr; Success.
   - Stories &rarr; Tour details &rarr; Experiences &rarr; Custom inquiry.
