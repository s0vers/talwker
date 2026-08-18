# Design Spec: Multi-Language i18n System with Next.js 16 and next-intl

**Date:** 2026-08-16  
**Status:** Approved  
**Reference Starter:** [S0vers/next-app-i18n-starter](https://github.com/S0vers/next-app-i18n-starter)  
**Reference Feature in Talkwer:** `src/features/home/` & `src/shared/ui/`  

---

## 1. Overview & Goals

This specification defines the architecture for integrating internationalization (i18n) into Talkwer, transforming it into a multilingual Next.js 16 application with static rendering, locale-aware routing, type-safe translations, regional formatting, SEO hreflang alternates, an interactive language switcher, and a dedicated multi-layout Destinations dropdown in the navigation.

### Key Objectives
1. **Target Locales:** English (`en` - default), Spanish (`es`), and Japanese (`ja`).
2. **URL Strategy:** `localePrefix: "as-needed"` (English at `/`, Spanish at `/es`, Japanese at `/ja`).
3. **Type Safety:** Compile-time validation for all translation keys using TypeScript and `global.d.ts`.
4. **App Router Alignment:** Nested locale route structure under `src/app/[locale]/` with static params generation.
5. **UI Enhancements:**
   - Dark-luxury `LanguageSwitcher` in the desktop Navbar and mobile menu drawer.
   - Interactive `Destinations` dropdown in the navigation linking to all three destination designs (`/destinations`, `/destinations-2`, `/destinations-3`).
6. **Talkwer Quality & Governance:** Adhere strictly to `.cursor/rules/talkwer-architecture.mdc`, `talkwer-design.mdc`, and `talkwer-quality.mdc`.

---

## 2. Architecture & File Layout

### 2.1 Dependencies
- `next-intl`: App Router internationalization library.

### 2.2 Core i18n Module (`src/i18n/`)
- `src/i18n/routing.ts`: Defines `locales: ["en", "es", "ja"]`, `defaultLocale: "en"`, and `localePrefix: "as-needed"`.
- `src/i18n/navigation.ts`: Exports `Link`, `useRouter`, `usePathname`, `redirect`, and `getPathname` bound to `routing`.
- `src/i18n/regional.ts`: Configures locale-specific currency (`USD`, `EUR`, `JPY`), time zones (`America/New_York`, `Europe/Madrid`, `Asia/Tokyo`), and number/date formats.
- `src/i18n/request.ts`: Implements `getRequestConfig` to validate locale and load dictionary files.
- `src/proxy.ts` / `src/middleware.ts`: Next.js 16 middleware executing `createMiddleware(routing)`.
- `next.config.ts`: Configured with `createNextIntlPlugin("./src/i18n/request.ts")`.

### 2.3 Route Structure (`src/app/`)
```
src/app/
├── [locale]/
│   ├── layout.tsx              # Root HTML + NextIntlClientProvider + Navbar/Footer
│   ├── page.tsx                # Localized Home page
│   ├── not-found.tsx           # Localized 404
│   ├── [...rest]/page.tsx      # Catch-all triggering notFound()
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── destinations/page.tsx
│   ├── destinations-2/page.tsx
│   ├── destinations-3/page.tsx
│   ├── tours/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── stories/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── experiences/page.tsx
│   ├── careers/page.tsx
│   ├── press/page.tsx
│   ├── partners/page.tsx
│   ├── faq/page.tsx
│   ├── booking-policy/page.tsx
│   ├── cancellation/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── cookies/page.tsx
├── globals.css
├── favicon.ico
├── robots.ts
└── sitemap.ts
```

---

## 3. Translation Dictionaries & Type Contract

### 3.1 Dictionaries (`dictionary/*.json`)
Three dictionary files containing complete key sets:
- `dictionary/en.json` (Source of truth)
- `dictionary/es.json`
- `dictionary/ja.json`

Namespaces:
1. `Navbar`: Navigation links, dropdown items, CTA labels, mobile drawer titles.
2. `Footer`: Column headers, footer links, blurb, copyright.
3. `Common`: Action buttons (`explore`, `viewAll`, `bookNow`, `learnMore`, `back`, `filter`, `readMore`, `cookieAccept`, `cookieDecline`).
4. `Metadata`: SEO title, description, and keywords per route.
5. `Home`: Hero, About, Destinations showcase stage/filmstrip, Featured tours, Testimonials, Newsletter, Bottom CTA.
6. `Destinations`: Filter categories, card labels, empty states.
7. `Tours`: Tour filters, duration, difficulty, itinerary labels.
8. `Stories`: Categories, read time, author labels.
9. `Contact`: Contact form inputs, validation messages, office details.
10. `About`: Mission, values, timeline, statistics.
11. `Legal`: Cookie consent and policy headers.

### 3.2 Global Type Declaration (`global.d.ts`)
```ts
import en from "./dictionary/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

---

## 4. UI Components & Feature Integration

### 4.1 Language Switcher (`src/shared/ui/language-switcher.tsx`)
- Sleek dropdown menu with Talkwer design language (`#0a0a0a/95` background, `border-white/15`, orange hover accents).
- Displays active locale (`EN`, `ES`, `JA`) with globe icon.
- Uses `@/i18n/navigation`'s `useRouter` and `usePathname` for client navigation without hard refresh.
- Integrated into desktop `Navbar` and mobile menu drawer.

### 4.2 Destinations Navigation Dropdown
- Replaces the simple Destinations link in `Navbar` with a multi-layout menu:
  - **Standard Grid**: `/destinations`
  - **Stage Showcase**: `/destinations-2`
  - **Cinematic Explorer**: `/destinations-3`
- Accessible dropdown with keyboard navigation support (Escape, Arrow keys, Tab).
- Mobile navigation expands Destinations into indented child links.

### 4.3 App Link Migration
- Replace `next/link` imports across features and shared UI with `import { Link } from "@/i18n/navigation"`.

---

## 5. SEO & Dynamic Sitemap

### 5.1 Alternate Languages (Hreflang)
In `src/lib/seo/metadata.ts`, generate `alternates`:
```ts
alternates: {
  canonical: canonicalUrl,
  languages: {
    en: resolveCanonicalUrl(path),
    es: resolveCanonicalUrl(`/es${path === "/" ? "" : path}`),
    ja: resolveCanonicalUrl(`/ja${path === "/" ? "" : path}`),
  },
}
```

### 5.2 Dynamic Multi-Locale Sitemap (`src/app/sitemap.ts`)
Generates sitemap entries for all canonical routes across `en`, `es`, and `ja` with `alternates` metadata attached.

---

## 6. Verification & Quality Plan

1. **Filename Standards:** `pnpm check:filenames` (no non-kebab files in `src/features`).
2. **Type Safety:** `pnpm typecheck` (verifies `IntlMessages` coverage and Next.js route params).
3. **Code Quality & Lint:** `pnpm lint`.
4. **Image Discipline:** `pnpm check:image-sizes`.
5. **Production Build:** `pnpm build`.
6. **Visual Smoke Test:** Local production server (`pnpm start`) testing:
   - Language switcher dropdown functionality (EN / ES / JA).
   - Destinations dropdown navigation to `/destinations`, `/destinations-2`, and `/destinations-3`.
   - Localized content display across all key routes.
