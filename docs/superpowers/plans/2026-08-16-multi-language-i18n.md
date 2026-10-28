# Multi-Language i18n System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full multilingual internationalization (`en`, `es`, `ja`) for Talkwer using Next.js 16 and `next-intl`, with type-safe dictionaries, App Router `[locale]` structure, a luxury Language Switcher, a multi-design Destinations navigation dropdown, and multi-locale SEO.

**Architecture:** Feature-first with thin App Router routes matching Talkwer conventions (`src/features/home/`, `src/features/destinations/`, `src/shared/ui/`). App pages stay thin and live under `src/app/[locale]/`, delegating all presentation and motion to feature entries and sections. Core i18n logic lives in `src/i18n/`, dictionaries in `dictionary/`, and global type safety in `global.d.ts`.

**Tech Stack:** Next.js 16 (App Router, Server Components), `next-intl` (4.x), React 19, Tailwind CSS 4, Lucide / React Icons, GSAP (`useGsapContext`).

**Spec:** [`docs/superpowers/specs/2026-08-16-multi-language-i18n-design.md`](file:///home/typetechit/Documents/talwker/docs/superpowers/specs/2026-08-16-multi-language-i18n-design.md)

## Global Constraints

- Target locales: `en` (default), `es`, `ja` with `localePrefix: "as-needed"`.
- Reference feature: `src/features/home/` and `src/shared/ui/`.
- No fat route files — `src/app/[locale]/**/page.tsx` must stay thin (metadata + feature import).
- All filenames under `src/features` must remain strict kebab-case.
- TypeScript validation: 100% type-safe keys via `global.d.ts` `IntlMessages`.
- Motion contract: GSAP animations must use `useGsapContext` and preserve timing/curves.
- Quality gates: All tasks must pass `pnpm check:filenames`, `pnpm typecheck`, `pnpm lint`, `pnpm check:image-sizes`, and `pnpm build`.

---

### Task 1: Install `next-intl` and configure core i18n & Next.js plugin

**Files:**
- Modify: `package.json`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/regional.ts`
- Create: `src/i18n/request.ts`
- Create: `src/proxy.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: Next.js 16 config, `next-intl`
- Produces: `routing` from `@/i18n/routing`, `{ Link, useRouter, usePathname, redirect }` from `@/i18n/navigation`, `getRequestConfig` in `src/i18n/request.ts`, middleware in `src/proxy.ts`

- [ ] **Step 1: Install `next-intl`**
```bash
pnpm add next-intl
```

- [ ] **Step 2: Create `src/i18n/routing.ts`**
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "es", "ja"],
	defaultLocale: "en",
	localeDetection: true,
	localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 3: Create `src/i18n/navigation.ts`**
```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
```

- [ ] **Step 4: Create `src/i18n/regional.ts`**
```ts
import type { Locale } from "./routing";

export const REGIONAL_CONFIG: Record<
	Locale,
	{ currency: string; timeZone: string }
> = {
	en: {
		currency: "USD",
		timeZone: "America/New_York",
	},
	es: {
		currency: "EUR",
		timeZone: "Europe/Madrid",
	},
	ja: {
		currency: "JPY",
		timeZone: "Asia/Tokyo",
	},
};

export function resolveCurrency(locale: string): string {
	return REGIONAL_CONFIG[locale as Locale]?.currency ?? "USD";
}

export function resolveTimeZone(locale: string): string {
	return REGIONAL_CONFIG[locale as Locale]?.timeZone ?? "America/New_York";
}
```

- [ ] **Step 5: Create `src/i18n/request.ts`**
```ts
import { getRequestConfig } from "next-intl/server";
import { resolveCurrency, resolveTimeZone } from "./regional";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		timeZone: resolveTimeZone(locale),
		now: new Date(),
		messages: (await import(`../../dictionary/${locale}.json`)).default,
	};
});
```

- [ ] **Step 6: Create `src/proxy.ts` (Next.js middleware)**
```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 7: Update `next.config.ts`**
```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 8: Commit**
```bash
git add package.json pnpm-lock.yaml src/i18n src/proxy.ts next.config.ts
git commit -m "feat(i18n): install next-intl and configure core routing, navigation, and request"
```

---

### Task 2: Create complete typed dictionaries & `global.d.ts`

**Files:**
- Create: `dictionary/en.json`
- Create: `dictionary/es.json`
- Create: `dictionary/ja.json`
- Create: `global.d.ts`

**Interfaces:**
- Consumes: Talkwer section copy & metadata strings
- Produces: `IntlMessages` type definition in `global.d.ts` for compile-time key checking

- [ ] **Step 1: Create `dictionary/en.json` (Source of truth)**
Include complete namespace keys for `Navbar`, `Footer`, `Common`, `Metadata`, `Home`, `Destinations`, `Tours`, `Stories`, `Contact`, `About`, and `Legal`.

- [ ] **Step 2: Create `dictionary/es.json` and `dictionary/ja.json`**
Provide high-quality Spanish and Japanese translations matching all keys defined in `en.json`.

- [ ] **Step 3: Create `global.d.ts`**
```ts
import en from "./dictionary/en.json";

type Messages = typeof en;

declare global {
	interface IntlMessages extends Messages {}
}
```

- [ ] **Step 4: Verify type coverage**
Run: `pnpm typecheck`
Expected: PASS (or missing route parameters before Task 4)

- [ ] **Step 5: Commit**
```bash
git add dictionary/ global.d.ts
git commit -m "feat(i18n): add English, Spanish, and Japanese dictionaries and typed IntlMessages"
```

---

### Task 3: Create `LanguageSwitcher` and Destinations Dropdown in Navigation

**Files:**
- Create: `src/shared/ui/language-switcher.tsx`
- Modify: `src/features/home/sections/navbar.tsx`
- Modify: `src/features/home/sections/footer.tsx`
- Modify: `src/shared/ui/index.ts`

**Interfaces:**
- Consumes: `@/i18n/navigation`, `useTranslations("Navbar")`, `useTranslations("Footer")`
- Produces: `<LanguageSwitcher />` component, multi-layout Destinations dropdown in desktop header and mobile menu

- [ ] **Step 1: Create `src/shared/ui/language-switcher.tsx`**
Create a luxury dropdown component supporting `EN`, `ES`, `JA` with smooth animations, active state indicator, and keyboard navigation.

- [ ] **Step 2: Export `LanguageSwitcher` in `src/shared/ui/index.ts`**
```ts
export * from "./language-switcher";
```

- [ ] **Step 3: Update `src/features/home/sections/navbar.tsx`**
- Replace `next/link` with `import { Link } from "@/i18n/navigation"`.
- Replace hardcoded strings with `useTranslations("Navbar")`.
- Add the interactive `Destinations` dropdown (with links to `/destinations`, `/destinations-2`, and `/destinations-3`).
- Add `<LanguageSwitcher />` on desktop next to the "Let's Talk" CTA.
- Add `<LanguageSwitcher />` and expanded Destinations sub-links in the mobile menu portal.

- [ ] **Step 4: Update `src/features/home/sections/footer.tsx`**
- Replace `next/link` with `import { Link } from "@/i18n/navigation"`.
- Use `useTranslations("Footer")` for column headers, blurb, and copyright.

- [ ] **Step 5: Verify filenames and types**
Run: `pnpm check:filenames && pnpm typecheck`

- [ ] **Step 6: Commit**
```bash
git add src/shared/ui/language-switcher.tsx src/shared/ui/index.ts src/features/home/sections/navbar.tsx src/features/home/sections/footer.tsx
git commit -m "feat(nav): add language switcher and destinations multi-layout dropdown"
```

---

### Task 4: App Router Migration to `src/app/[locale]/...`

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/not-found.tsx`
- Create: `src/app/[locale]/[...rest]/page.tsx`
- Move & update routes:
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/destinations/page.tsx`
  - `src/app/[locale]/destinations-2/page.tsx`
  - `src/app/[locale]/destinations-3/page.tsx`
  - `src/app/[locale]/tours/page.tsx`
  - `src/app/[locale]/tours/[slug]/page.tsx`
  - `src/app/[locale]/stories/page.tsx`
  - `src/app/[locale]/stories/[slug]/page.tsx`
  - `src/app/[locale]/experiences/page.tsx`
  - `src/app/[locale]/careers/page.tsx`
  - `src/app/[locale]/press/page.tsx`
  - `src/app/[locale]/partners/page.tsx`
  - `src/app/[locale]/faq/page.tsx`
  - `src/app/[locale]/booking-policy/page.tsx`
  - `src/app/[locale]/cancellation/page.tsx`
  - `src/app/[locale]/privacy/page.tsx`
  - `src/app/[locale]/terms/page.tsx`
  - `src/app/[locale]/cookies/page.tsx`
- Delete old non-localized route folders in `src/app/`

**Interfaces:**
- Consumes: `NextIntlClientProvider`, `setRequestLocale`, `getMessages`
- Produces: Localized App Router hierarchy under `src/app/[locale]/` with static params generation

- [ ] **Step 1: Create `src/app/[locale]/layout.tsx`**
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer, Navbar } from "@/features/home/sections";
import { SiteCookieConsent } from "@/shared/ui";
import { createBaseMetadata, getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = createBaseMetadata();

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}
	setRequestLocale(locale);
	const messages = await getMessages({ locale });

	return (
		<html lang={locale} dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(getOrganizationJsonLd()),
						}}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(getWebsiteJsonLd()),
						}}
					/>
					<Navbar />
					<main id="main-content" className="relative bg-[#050505] text-white">
						{children}
					</main>
					<Footer />
					<SiteCookieConsent />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
```

- [ ] **Step 2: Create localized 404 handler (`not-found.tsx` and `[...rest]/page.tsx`)**
Provide localized 404 messaging with a return home button.

- [ ] **Step 3: Move and update all route page entries into `src/app/[locale]/`**
Ensure each `page.tsx` accepts `params: Promise<{ locale: string }>` and calls `setRequestLocale(locale)`.

- [ ] **Step 4: Remove old non-localized route folders from `src/app/`**
Remove unneeded route folders directly under `src/app/` (keeping `globals.css`, `favicon.ico`, `robots.ts`, `sitemap.ts`).

- [ ] **Step 5: Verify build & typecheck**
Run: `pnpm typecheck`

- [ ] **Step 6: Commit**
```bash
git add src/app/
git commit -m "feat(router): migrate app routes to [locale] dynamic segment with static params"
```

---

### Task 5: Update SEO helpers, Sitemap, and Shared UI

**Files:**
- Modify: `src/lib/seo/metadata.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/shared/ui/site-cookie-consent.tsx`
- Modify: Feature section link imports across `src/features/`

**Interfaces:**
- Consumes: `@/i18n/routing`, `@/i18n/navigation`
- Produces: Hreflang alternates in metadata, multi-locale dynamic sitemap

- [ ] **Step 1: Update `src/lib/seo/metadata.ts`**
Add `alternates.languages` mapping for `en`, `es`, `ja` to `createPageMetadata()`.

- [ ] **Step 2: Update `src/app/sitemap.ts`**
Generate sitemap entries for all canonical routes and tour/story detail pages across all 3 locales with language alternates.

- [ ] **Step 3: Update `src/shared/ui/site-cookie-consent.tsx`**
Use `useTranslations("Legal")` and `@/i18n/navigation`'s `Link`.

- [ ] **Step 4: Update feature links across `src/features/`**
Replace any remaining `next/link` with `@/i18n/navigation`'s `Link`.

- [ ] **Step 5: Commit**
```bash
git add src/lib/seo/ src/app/sitemap.ts src/shared/ui/ src/features/
git commit -m "feat(seo): add multi-locale hreflang alternates, localized sitemap, and link migration"
```

---

### Task 6: Full Verification & Quality Gates

**Files:**
- Validation across entire codebase

**Interfaces:**
- Runs: `pnpm verify` (`lint`, `typecheck`, `check:filenames`, `check:image-sizes`, `build`)

- [ ] **Step 1: Run filename check**
Run: `pnpm check:filenames`
Expected: PASS

- [ ] **Step 2: Run image sizes check**
Run: `pnpm check:image-sizes`
Expected: PASS

- [ ] **Step 3: Run linter**
Run: `pnpm lint`
Expected: PASS

- [ ] **Step 4: Run type check**
Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Run full production build**
Run: `pnpm build`
Expected: PASS with all `/[locale]` static routes prerendered.

- [ ] **Step 6: Visual verification**
Launch `pnpm start` and verify:
1. Language switcher changes language smoothly between `EN`, `ES`, `JA`.
2. Navbar Destinations dropdown navigates correctly to `/destinations`, `/destinations-2`, `/destinations-3`.
3. Localized routes `/es/destinations`, `/ja/about` render correctly.
