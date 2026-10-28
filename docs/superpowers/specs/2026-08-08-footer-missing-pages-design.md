# Footer Missing Pages + Cookie Consent — Design

Date: 2026-08-08  
Status: approved  
Scope: ship every footer label that still has no route, plus Privacy / Terms / Cookies as real pages, plus sitewide shadcn cookie consent. Contact already exists — do not rebuild it.

## Goal

Complete the footer IA so every Explore / Company / Support / legal label navigates to a Talkwer-native page. Experiences is a hybrid gateway into existing Tours / Destinations / Stories (not a second inventory). Company pages stay lean. FAQ + policies are full static content. Cookie banner matches [shadcn cookie consent](https://shadcn-cookie-consent.vercel.app/) and links to `/cookies`.

## Decisions locked

| Decision | Choice |
|----------|--------|
| Scope | B: circled missing pages + legal (Privacy, Terms, Cookies) |
| Contact | Already shipped — out of rebuild scope; keep footer href |
| Content depth | Hybrid (C): full Experiences + FAQ + policies; lean Careers / Press / Partners |
| Experiences IA | Blend (D): Intrepid-style **styles strip** + **themes grid** → deep-links into existing catalogs |
| Experiences inventory | No new entities, no `/experiences/[slug]` |
| Architecture | Feature-per-route (Approach 1) — thin App Router pages + `src/features/<name>/` |
| Cookie UI | Install shadcn cookie-consent registry component; mount in root layout; prefer **small** variant; Learn more → `/cookies` |
| Legal row | Footer buttons → real `Link`s to `/privacy`, `/terms`, `/cookies` |

## Inspiration (patterns, not clones)

- **[Intrepid Trip Styles](https://www.intrepidtravel.com/us/trip-styles)** — few named travel modes; short pitch; CTA into inventory.
- **[Intrepid Trip Themes](https://www.intrepidtravel.com/us/theme)** — dense interest grid (Food, Wildlife, Family…) as browse entry points.
- **Airbnb Experiences (browse grammar only)** — photo-first cards; chrome stays quiet; category strip does not fight imagery.
- **[shadcn cookie consent](https://shadcn-cookie-consent.vercel.app/)** — Accept / Decline / Learn more; local preference persistence.

Uniqueness = Talkwer dark editorial + orange accent + existing section/motion contracts. Do not import Intrepid/Airbnb visual systems, type, or purple marketplace chrome.

## Architecture

**Feature-first + thin app routes.** Each new page owns `src/features/<name>/` (entry `*-page.tsx`, `sections/`, `content/`, optional `lib/`). `src/app/<segment>/page.tsx` stays thin: `createPageMetadata` / JSON-LD + data load + feature entry import.

**Named reference features:**

| New surface | Clone shape from |
|-------------|------------------|
| Experiences | `destinations` (hero + grid sections + CTA; InitialLoader shell) |
| Careers / Press / Partners | `about` (hero + body sections + CTA), truncated to lean stubs |
| FAQ | `contact` (hero + interactive body; accordion instead of form) |
| Policies (booking, cancellation, privacy, terms, cookies) | About prose rhythm / thin editorial sections; extract shared policy chrome to `shared/ui` only if the same shell appears in 3+ features |

## Product map

| Route | Job | Depth |
|-------|-----|-------|
| `/experiences` | Style + theme gateway into Tours / Destinations / Stories | Full |
| `/careers` | Hiring posture + CTA to Contact | Lean |
| `/press` | Media / brand note + CTA | Lean |
| `/partners` | Partnership pitch + CTA | Lean |
| `/faq` | Accordion answers; links to policies / Contact | Full |
| `/booking-policy` | Booking rules prose | Full |
| `/cancellation` | Cancellation / refund prose | Full |
| `/privacy` | Privacy policy | Full |
| `/terms` | Terms of use | Full |
| `/cookies` | Cookie policy (banner Learn more target) | Full |
| `/contact` | Unchanged | Exists |

### Out of scope

- Contact page rebuild
- CMS, ATS, press asset CDN, partner application forms
- Experience detail `[slug]` routes or a parallel experiences catalog
- Home hero redesign; Destinations/Tours/Stories catalog rewrites
- Changing Talkwer design tokens / introducing a second type system

## Experiences composition

Order:

1. **Hero** — brand-forward, one headline, one supporting line, CTA group (Contact and/or Tours). Full-bleed Destinations-class hero; no card collage in the first viewport.
2. **Styles strip** — 4–6 Talkwer-named modes (pace/depth voice; not Intrepid copy). Each: title, one sentence, primary deep-link (`/tours`, `/destinations`, `/stories`, with existing query params where filters already exist).
3. **Themes grid** — denser interest cards (e.g. Food, Trekking, Wildlife, Culture, Coast, Family). Photo-led; reuse Destinations-like media treatment. Deep-link into existing catalogs; if no matching filter exists, link to the relevant index (no fake filter params).
4. **CTA** — plan with us → `/contact` (About/Destinations CTA pattern).

Data lives in feature `content/` (page copy + styles + themes arrays). Motion via `useGsap` only (hero entrance + staggered section reveals).

## Company / Support / Legal

**Company lean pages:** Hero · short body · CTA → `/contact`. No job listings API, no downloadable press kit beyond static copy.

**FAQ:** Hero · accordion groups (e.g. Booking, Travel, Planning). Bottom-out links to `/booking-policy`, `/cancellation`, `/contact`.

**Policy pages:** Shared presentational rhythm — eyebrow, H1, short dated intro, numbered or headed sections. Per-route content modules with complete static Talkwer-appropriate prose (not lorem; may be fictional but coherent for a travel brand). Promote a shared policy shell to `src/shared/ui/` only after 3+ identical layouts.

**Cookie consent:** Add component from shadcn registry (`npx shadcn@latest add http://shadcn-cookies.vercel.app/r/cookie-consent.json` or current documented URL). Mount once from root layout as a client island. Variant **small**. Restyle to dark canvas + orange accent. Accept/Decline use component persistence. Learn more → `/cookies`.

## Footer wiring

Update `FOOTER_LINK_HREF` in `src/features/home/content/section-copy.ts` for:

- Experiences → `/experiences`
- Careers → `/careers`
- Press → `/press`
- Partners → `/partners`
- FAQ → `/faq`
- Booking Policy → `/booking-policy`
- Cancellation → `/cancellation`

Keep existing Destinations / Tours / Stories / About / Contact mappings.

Replace `LEGAL_LINKS` button row with `Link`s to `/privacy`, `/terms`, `/cookies` (or map labels → hrefs the same way as footer columns).

## Feature file map

```
src/features/experiences/
  experiences-page.tsx
  sections/ (hero, styles, themes, cta, index.ts)
  content/ (page copy, styles, themes)

src/features/careers/          # lean — mirror about truncated
src/features/press/
src/features/partners/

src/features/faq/
  faq-page.tsx
  sections/ (hero, accordion, …)
  content/

src/features/booking-policy/
src/features/cancellation/
src/features/privacy/
src/features/terms/
src/features/cookies/

src/app/experiences/page.tsx
src/app/careers/page.tsx
src/app/press/page.tsx
src/app/partners/page.tsx
src/app/faq/page.tsx
src/app/booking-policy/page.tsx
src/app/cancellation/page.tsx
src/app/privacy/page.tsx
src/app/terms/page.tsx
src/app/cookies/page.tsx

# cookie consent component (shadcn path as installed)
src/components/ui/cookie-consent.tsx   # or shared/ui if project convention prefers
# wired from
src/app/layout.tsx
```

Thin routes: metadata via `createPageMetadata` (`docs/SEO_PLAYBOOK.md`); optional WebPage JSON-LD where siblings use it. Sitemap: add all new static paths.

## SEO & a11y

- Every new route: `title`, `description`, `path`.
- Accordion FAQ: keyboard operable, proper button/expanded semantics.
- Cookie banner: focusable controls; do not trap focus permanently; honor existing a11y checklist patterns.
- Images on Experiences themes: `fill` + `sizes` per image-size gate.

## Verification

- `pnpm verify`
- `pnpm build && pnpm start` visual QA: footer every link, Experiences styles+themes, FAQ, one company stub, one policy, cookie banner Accept/Decline + Learn more → `/cookies`

No unit-test theater (repo has no test runner).

## Risks / notes

- Deep-link query params must only use filters Destinations/Tours already understand; otherwise use bare indexes.
- Policy copy is marketing-static, not legal advice — keep tone professional and clearly brand-owned.
- Cookie component may ship light-theme defaults — restyle in the same PR as install; do not leave stock light banner on dark Talkwer.
