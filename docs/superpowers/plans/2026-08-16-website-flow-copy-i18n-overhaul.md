# Website Flow, Copy Overhaul, Routing & Multi-Language i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul Talkwer's website flow, copywriting, routing, and multi-language internationalization across English (`en`), Spanish (`es`), and Japanese (`ja`), strictly preserving 100% of existing components, layouts, and pages.

**Architecture:** Centralized type-safe translation dictionaries (`dictionary/{en,es,ja}.json`) with Next.js 16 App Router locale routing (`src/app/[locale]/`). All components consume `useTranslations` or `getTranslations` and use `@/i18n/navigation` (`Link`, `useRouter`, `usePathname`).

**Tech Stack:** Next.js 16 (App Router, Static Generation), `next-intl`, TypeScript, Tailwind CSS v4, GSAP.

**Spec:** [docs/superpowers/specs/2026-08-16-website-flow-copy-i18n-overhaul-design.md](file:///home/typetechit/Documents/talwker/docs/superpowers/specs/2026-08-16-website-flow-copy-i18n-overhaul-design.md)

## Global Constraints

- Preserve 100% of existing pages, layouts, and components — zero component/route deletions.
- All internal navigation must use `import { Link } from "@/i18n/navigation"` (no `next/link` or raw `<a>`).
- All translation keys in `dictionary/en.json` must be mirrored identically in `dictionary/es.json` and `dictionary/ja.json`.
- Strict kebab-case filenames under `src/features/` (`pnpm check:filenames`).
- All `next/image` components must satisfy `pnpm check:image-sizes`.
- `pnpm lint` and `pnpm build` must pass cleanly with zero errors.

---

### Task 1: Comprehensive i18n Translation Dictionaries & Type Safety

**Files:**
- Modify: `dictionary/en.json`
- Modify: `dictionary/es.json`
- Modify: `dictionary/ja.json`
- Modify: `global.d.ts`

**Interfaces:**
- Produces: Complete type-safe namespaces for `Navbar`, `Footer`, `Common`, `Metadata`, `Home`, `Destinations`, `Destinations2`, `Destinations3`, `DestinationDetails`, `Tours`, `TourDetails`, `Stories`, `StoryDetails`, `Experiences`, `About`, `Contact`, `Booking`, `Checkout`, `Auth`, `FAQ`, `Careers`, `Press`, `Partners`, and `Legal`.

- [ ] **Step 1: Write exhaustive `dictionary/en.json` with polished editorial copy across all namespaces**
- [ ] **Step 2: Mirror exact key structure in `dictionary/es.json` with natural Spanish translations**
- [ ] **Step 3: Mirror exact key structure in `dictionary/ja.json` with natural Japanese translations**
- [ ] **Step 4: Verify type safety and schema validation**
Run: `pnpm typecheck`
Expected: PASS with no `IntlMessages` or typing errors
- [ ] **Step 5: Commit Task 1**
```bash
git add dictionary/en.json dictionary/es.json dictionary/ja.json global.d.ts
git commit -m "feat(i18n): expand complete translation dictionaries across en, es, and ja"
```

---

### Task 2: Cross-Page Links, Slugs & Routing Flow Corrections

**Files:**
- Modify: `src/features/experiences/content/experiences-page-copy.ts`
- Modify: `src/features/destination-details-2/sections/` and `src/features/destination-details-3/sections/`
- Modify: `src/features/tours/content/tours-page-copy.ts` and `src/features/stories/content/stories-page-copy.ts`

**Interfaces:**
- Consumes: Domain models (`Tour`, `Destination`, `ExperienceItem`, `Story`)
- Produces: Corrected cross-links ensuring `/destinations-2/[slug]` backs to `/destinations-2`, `/destinations-3/[slug]` backs to `/destinations-3`, and experience cards link to valid tours (`bali-cultural-immersion`, `greek-island-odyssey`, `patagonia-expedition`, `japan-heritage-trail`).

- [ ] **Step 1: Fix mismatched tour slugs in `experiences-page-copy.ts`**
- [ ] **Step 2: Ensure destination details 2 and 3 retain their dedicated layout back routes**
- [ ] **Step 3: Verify all links use `@/i18n/navigation`**
- [ ] **Step 4: Run typecheck**
Run: `pnpm typecheck`
- [ ] **Step 5: Commit Task 2**
```bash
git add src/features/
git commit -m "fix(routing): correct experience tour slugs and preserve layout back routes"
```

---

### Task 3: Localize & Wire Up Home Page & Global Navigation

**Files:**
- Modify: `src/features/home/sections/hero.tsx`
- Modify: `src/features/home/sections/about.tsx`
- Modify: `src/features/home/sections/destinations.tsx`
- Modify: `src/features/home/sections/featured-tours.tsx`
- Modify: `src/features/home/sections/testimonials.tsx`
- Modify: `src/features/home/sections/newsletter.tsx`
- Modify: `src/shared/ui/editorial-cta-band.tsx`
- Modify: `src/features/home/sections/navbar.tsx`
- Modify: `src/features/home/sections/footer.tsx`

**Interfaces:**
- Consumes: `useTranslations("Home")`, `useTranslations("Navbar")`, `useTranslations("Footer")`, `useTranslations("Common")`
- Produces: Fully translated, dynamic home sections and navigation components.

- [ ] **Step 1: Refactor `hero.tsx` and `about.tsx` to consume `useTranslations("Home.hero")` and `useTranslations("Home.about")`**
- [ ] **Step 2: Refactor `destinations.tsx`, `featured-tours.tsx`, `testimonials.tsx`, and `newsletter.tsx` to consume `useTranslations("Home.*")`**
- [ ] **Step 3: Update `editorial-cta-band.tsx` to support localized props and `@/i18n/navigation` Link navigation**
- [ ] **Step 4: Run typecheck and lint**
Run: `pnpm typecheck && pnpm lint`
- [ ] **Step 5: Commit Task 3**
```bash
git add src/features/home/ src/shared/ui/
git commit -m "feat(home): wire up full i18n translations across all home sections"
```

---

### Task 4: Localize & Refine Destinations (Standard Grid, Stage Showcase, Cinematic Explorer)

**Files:**
- Modify: `src/features/destinations/destinations-page.tsx` & `src/features/destinations/sections/*`
- Modify: `src/features/destinations-2/destinations-2-page.tsx` & `src/features/destinations-2/sections/*`
- Modify: `src/features/destinations-3/destinations-3-page.tsx` & `src/features/destinations-3/sections/*`
- Modify: `src/features/destination-details/`, `src/features/destination-details-2/`, `src/features/destination-details-3/`

**Interfaces:**
- Consumes: `useTranslations("Destinations")`, `useTranslations("Destinations2")`, `useTranslations("Destinations3")`, `useTranslations("DestinationDetails")`

- [ ] **Step 1: Connect `destinations` grid layout and detail page to i18n translations**
- [ ] **Step 2: Connect `destinations-2` stage layout and detail page to i18n translations**
- [ ] **Step 3: Connect `destinations-3` cinematic explorer layout and detail page to i18n translations**
- [ ] **Step 4: Verify layout preservation and filter interactions**
- [ ] **Step 5: Commit Task 4**
```bash
git add src/features/destinations/ src/features/destinations-2/ src/features/destinations-3/ src/features/destination-details/ src/features/destination-details-2/ src/features/destination-details-3/
git commit -m "feat(destinations): wire up i18n across standard, stage, and cinematic destination layouts"
```

---

### Task 5: Localize & Refine Tours & Stories Features

**Files:**
- Modify: `src/features/tours/tours-page.tsx` & `src/features/tours/tour-details-page.tsx` & `src/features/tours/sections/*`
- Modify: `src/features/stories/stories-page.tsx` & `src/features/stories/story-details-page.tsx` & `src/features/stories/sections/*`

**Interfaces:**
- Consumes: `useTranslations("Tours")`, `useTranslations("TourDetails")`, `useTranslations("Stories")`, `useTranslations("StoryDetails")`

- [ ] **Step 1: Wire up i18n translations in `tours` catalog, itinerary accordion, day panels, and sticky booking sheet**
- [ ] **Step 2: Wire up i18n translations in `stories` magazine hero, issue grid, and article reading view**
- [ ] **Step 3: Ensure tour booking buttons pass query params seamlessly to `/booking?tour=[slug]`**
- [ ] **Step 4: Run typecheck and lint**
Run: `pnpm typecheck && pnpm lint`
- [ ] **Step 5: Commit Task 5**
```bash
git add src/features/tours/ src/features/stories/
git commit -m "feat(tours,stories): wire up i18n translations for expedition catalogs and field notes"
```

---

### Task 6: Localize Experiences, About, Contact, FAQ, Careers, Press, Partners & Legal Pages

**Files:**
- Modify: `src/features/experiences/`
- Modify: `src/features/about/`
- Modify: `src/features/contact/`
- Modify: `src/features/faq/`
- Modify: `src/features/careers/`
- Modify: `src/features/press/`
- Modify: `src/features/partners/`
- Modify: `src/features/booking-policy/`, `cancellation/`, `privacy/`, `terms/`, `cookies/`

**Interfaces:**
- Consumes: `useTranslations("Experiences")`, `useTranslations("About")`, `useTranslations("Contact")`, `useTranslations("FAQ")`, `useTranslations("Careers")`, `useTranslations("Press")`, `useTranslations("Partners")`, `useTranslations("Legal")`

- [ ] **Step 1: Wire up i18n in `experiences`, `about`, and `contact` pages**
- [ ] **Step 2: Wire up i18n in `faq`, `careers`, `press`, and `partners` pages**
- [ ] **Step 3: Wire up i18n in all legal and policy pages**
- [ ] **Step 4: Run typecheck and filename check**
Run: `pnpm typecheck && pnpm check:filenames`
- [ ] **Step 5: Commit Task 6**
```bash
git add src/features/experiences/ src/features/about/ src/features/contact/ src/features/faq/ src/features/careers/ src/features/press/ src/features/partners/ src/features/booking-policy/ src/features/cancellation/ src/features/privacy/ src/features/terms/ src/features/cookies/
git commit -m "feat(pages): localize experiences, company, support, and legal policy pages"
```

---

### Task 7: Localize & Refine Booking, Checkout & Auth Funnels

**Files:**
- Modify: `src/features/booking/`
- Modify: `src/features/checkout/`
- Modify: `src/features/auth/`

**Interfaces:**
- Consumes: `useTranslations("Booking")`, `useTranslations("Checkout")`, `useTranslations("Auth")`

- [ ] **Step 1: Wire up i18n translations in booking customizer and date/guest controls**
- [ ] **Step 2: Wire up i18n translations in checkout overview, payment selection, and success confirmation**
- [ ] **Step 3: Wire up i18n translations in login and register pages**
- [ ] **Step 4: Run typecheck and lint**
Run: `pnpm typecheck && pnpm lint`
- [ ] **Step 5: Commit Task 7**
```bash
git add src/features/booking/ src/features/checkout/ src/features/auth/
git commit -m "feat(booking,auth): localize booking customizer, checkout flow, and authentication"
```

---

### Task 8: Full Verification, Static Build & Smoke Test

**Files:**
- Verify: All files in `src/`

- [ ] **Step 1: Run all automated verification gates**
Run: `pnpm verify` (or `pnpm check:filenames && pnpm check:image-sizes && pnpm lint && pnpm typecheck && pnpm build`)
- [ ] **Step 2: Run production server visual smoke test**
Run: `pnpm start` (port 3000)
Verify:
1. Language switcher works across `EN`, `ES`, `JA` on desktop and mobile.
2. Home &rarr; Destinations (1, 2, 3) &rarr; Tours &rarr; Booking &rarr; Checkout &rarr; Success flow is completely seamless.
3. Zero missing translation keys or broken links.
- [ ] **Step 3: Final Commit & Summary**
```bash
git status
```
