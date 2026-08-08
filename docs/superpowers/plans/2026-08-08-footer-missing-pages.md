# Footer Missing Pages + Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship every missing footer route (Experiences, Careers, Press, Partners, FAQ, Booking Policy, Cancellation) plus Privacy / Terms / Cookies pages, wire footer + legal links, and add a Talkwer-styled shadcn cookie consent banner.

**Architecture:** Feature-first pages under `src/features/<name>/` with thin `src/app/<segment>/page.tsx` routes (`createPageMetadata` + breadcrumb JSON-LD + feature entry). Experiences clones Destinations composition (styles strip + themes grid deep-linking into existing catalogs). Company pages clone truncated About. FAQ clones Contact with accordion. Five policy routes share one `PolicyDocument` shell in `shared/ui` (5 identical layouts). Cookie consent installs via shadcn registry into `components/ui` and mounts from root layout.

**Tech Stack:** Next.js 16 App Router, React client sections, Tailwind v4, GSAP via `@/lib/useGsap`, shadcn accordion + cookie-consent, `pnpm` / `pnpm verify` (no unit test runner).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-08-footer-missing-pages-design.md`
- Do not rebuild `/contact` or change home hero.
- No `/experiences/[slug]`; no second experiences catalog entities.
- Deep-links: only use Destinations/Tours query filters that already exist; otherwise bare `/tours`, `/destinations`, `/stories`.
- Shell: dark canvas (`bg-[#050505]` / `bg-[#0a0a0a]`), `orange-500` accent, Inter, `pad-x`, `max-w-[1600px]`.
- Motion: `@/lib/useGsap` + `gsap.context` + early `prefersReducedMotion()`.
- Kebab-case under `src/features`; thin app routes; page copy in feature `content/`.
- Prefer `pnpm`; end each task with `pnpm typecheck`; final handoff `pnpm verify` + `pnpm build && pnpm start` visual QA.
- Cookie banner must be restyled dark in the same task as install — no stock light banner.

---

## File map

| Path | Responsibility |
|------|----------------|
| `src/shared/ui/policy-document.tsx` | Shared policy page chrome (eyebrow, H1, intro, sections) |
| `src/shared/ui/index.ts` | Export `PolicyDocument` |
| `src/features/experiences/**` | Full Experiences page |
| `src/features/careers/**` | Lean company page |
| `src/features/press/**` | Lean company page |
| `src/features/partners/**` | Lean company page |
| `src/features/faq/**` | FAQ accordion page |
| `src/features/booking-policy/**` | Policy content + thin feature entry |
| `src/features/cancellation/**` | Policy content + thin feature entry |
| `src/features/privacy/**` | Policy content + thin feature entry |
| `src/features/terms/**` | Policy content + thin feature entry |
| `src/features/cookies/**` | Policy content + thin feature entry |
| `src/app/{experiences,careers,press,partners,faq,booking-policy,cancellation,privacy,terms,cookies}/page.tsx` | Thin routes + metadata |
| `src/components/ui/accordion.tsx` | shadcn accordion (FAQ) |
| `src/components/ui/cookie-consent.tsx` | shadcn cookie consent (restyled) |
| `src/app/layout.tsx` | Mount cookie consent client island |
| `src/features/home/content/section-copy.ts` | `FOOTER_LINK_HREF` + legal href map |
| `src/features/home/sections/footer.tsx` | Legal `Link`s |
| `src/app/sitemap.ts` | All new static paths |
| `docs/INDEX.md` | Link new spec/plan |

---

### Task 1: Shared PolicyDocument + five policy routes

**Files:**
- Create: `src/shared/ui/policy-document.tsx`
- Modify: `src/shared/ui/index.ts`
- Create: `src/features/booking-policy/content/booking-policy-copy.ts`
- Create: `src/features/booking-policy/booking-policy-page.tsx`
- Create: `src/features/cancellation/content/cancellation-copy.ts`
- Create: `src/features/cancellation/cancellation-page.tsx`
- Create: `src/features/privacy/content/privacy-copy.ts`
- Create: `src/features/privacy/privacy-page.tsx`
- Create: `src/features/terms/content/terms-copy.ts`
- Create: `src/features/terms/terms-page.tsx`
- Create: `src/features/cookies/content/cookies-copy.ts`
- Create: `src/features/cookies/cookies-page.tsx`
- Create: `src/app/booking-policy/page.tsx`
- Create: `src/app/cancellation/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/cookies/page.tsx`

**Interfaces:**
- Consumes: `EditorialCtaBand` optional (skip CTA on policies unless copy needs Contact — default: no CTA band)
- Produces: `PolicyDocumentProps` + five `/…` routes rendering policy feature entries

- [ ] **Step 1: Add PolicyDocument shell**

```tsx
// src/shared/ui/policy-document.tsx
import type { ReactNode } from "react";

export type PolicySection = {
	id: string;
	heading: string;
	body: ReactNode;
};

export type PolicyDocumentProps = {
	eyebrow: string;
	title: string;
	effectiveDate: string;
	intro: string;
	sections: PolicySection[];
};

export function PolicyDocument({
	eyebrow,
	title,
	effectiveDate,
	intro,
	sections,
}: PolicyDocumentProps) {
	return (
		<article className="bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[800px] py-28 md:py-36">
				<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
					{eyebrow}
				</p>
				<h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
				<p className="mt-3 text-sm text-white/40">Effective {effectiveDate}</p>
				<p className="mt-8 text-base leading-relaxed text-white/65">{intro}</p>
				<div className="mt-14 space-y-12">
					{sections.map((section) => (
						<section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
							<h2
								id={`${section.id}-heading`}
								className="text-xl font-semibold tracking-tight text-white"
							>
								{section.heading}
							</h2>
							<div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60 [&_a]:text-orange-500 [&_a]:underline-offset-2 hover:[&_a]:underline">
								{section.body}
							</div>
						</section>
					))}
				</div>
			</div>
		</article>
	);
}
```

Export from `src/shared/ui/index.ts`:

```ts
export { PolicyDocument } from "./policy-document";
export type { PolicyDocumentProps, PolicySection } from "./policy-document";
```

- [ ] **Step 2: Write policy copy modules (complete prose, not lorem)**

Each `*-copy.ts` exports a const matching `PolicyDocumentProps` fields (string bodies as `string` or JSX paragraphs). Example shape for booking policy:

```ts
// src/features/booking-policy/content/booking-policy-copy.ts
export const BOOKING_POLICY_COPY = {
	eyebrow: "Support",
	title: "Booking Policy",
	effectiveDate: "August 8, 2026",
	intro:
		"This policy explains how Talkwer reservations work — deposits, confirmations, traveler responsibilities, and what happens when plans change. It is brand guidance for our static site, not formal legal advice.",
	sections: [
		{
			id: "confirmation",
			heading: "Confirmations",
			body: "A booking is confirmed once you receive written confirmation from Talkwer with dates, travelers, and inclusions. Hold requests are not guarantees.",
		},
		{
			id: "deposits",
			heading: "Deposits and balance",
			body: "Most journeys require a deposit to secure space. Balance due dates appear on your confirmation. Late balances may release inventory.",
		},
		{
			id: "changes",
			heading: "Date and traveler changes",
			body: "Change requests are reviewed case by case and may incur supplier fees. See Cancellation for refunds and credits.",
		},
		{
			id: "contact",
			heading: "Questions",
			body: "Email hello@talkwer.example or use the Contact page before you book if anything is unclear.",
		},
	],
} as const;
```

Repeat with distinct titles/intros/sections for:
- `cancellation-copy.ts` — refund windows, credits, force majeure tone
- `privacy-copy.ts` — what we collect (contact form fields), cookies pointer to `/cookies`, no sale of data claim
- `terms-copy.ts` — site use, IP, disclaimer that itineraries are editorial
- `cookies-copy.ts` — essential vs preference cookies, consent banner, how to withdraw via re-clearing preference

Use real multi-paragraph strings (2–4 sentences per section). Include a React fragment of `<p>` tags in the feature page if `body` needs multiple paragraphs — or map string → `<p>{section.body}</p>` in the feature entry.

- [ ] **Step 3: Feature entries**

```tsx
// src/features/booking-policy/booking-policy-page.tsx
import { PolicyDocument } from "@/shared/ui";
import { BOOKING_POLICY_COPY } from "./content/booking-policy-copy";

export default function BookingPolicyPage() {
	return (
		<PolicyDocument
			eyebrow={BOOKING_POLICY_COPY.eyebrow}
			title={BOOKING_POLICY_COPY.title}
			effectiveDate={BOOKING_POLICY_COPY.effectiveDate}
			intro={BOOKING_POLICY_COPY.intro}
			sections={BOOKING_POLICY_COPY.sections.map((s) => ({
				id: s.id,
				heading: s.heading,
				body: <p>{s.body}</p>,
			}))}
		/>
	);
}
```

Mirror for `cancellation-page.tsx`, `privacy-page.tsx`, `terms-page.tsx`, `cookies-page.tsx` with their copy imports.

- [ ] **Step 4: Thin app routes**

Pattern (booking-policy example):

```tsx
// src/app/booking-policy/page.tsx
import type { Metadata } from "next";
import BookingPolicyPage from "@/features/booking-policy/booking-policy-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Booking Policy",
	description: "How Talkwer bookings, deposits, and confirmations work.",
	path: "/booking-policy",
	keywords: ["booking policy", "talkwer reservations"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Booking Policy", path: "/booking-policy" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<BookingPolicyPage />
		</>
	);
}
```

Create the same for `/cancellation`, `/privacy`, `/terms`, `/cookies` with matching titles/descriptions/paths.

- [ ] **Step 5: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/shared/ui/policy-document.tsx src/shared/ui/index.ts src/features/booking-policy src/features/cancellation src/features/privacy src/features/terms src/features/cookies src/app/booking-policy src/app/cancellation src/app/privacy src/app/terms src/app/cookies
git commit -m "feat: add shared policy document and five legal/support policy pages"
```

---

### Task 2: Lean company pages (Careers, Press, Partners)

**Files:**
- Create: `src/features/careers/content/careers-copy.ts`
- Create: `src/features/careers/sections/careers-hero.tsx`
- Create: `src/features/careers/sections/careers-body.tsx`
- Create: `src/features/careers/sections/careers-cta.tsx`
- Create: `src/features/careers/sections/index.ts`
- Create: `src/features/careers/careers-page.tsx`
- Create: `src/app/careers/page.tsx`
- Create: `src/features/press/content/press-copy.ts`
- Create: `src/features/press/sections/press-hero.tsx`
- Create: `src/features/press/sections/press-body.tsx`
- Create: `src/features/press/sections/press-cta.tsx`
- Create: `src/features/press/sections/index.ts`
- Create: `src/features/press/press-page.tsx`
- Create: `src/app/press/page.tsx`
- Create: `src/features/partners/content/partners-copy.ts`
- Create: `src/features/partners/sections/partners-hero.tsx`
- Create: `src/features/partners/sections/partners-body.tsx`
- Create: `src/features/partners/sections/partners-cta.tsx`
- Create: `src/features/partners/sections/index.ts`
- Create: `src/features/partners/partners-page.tsx`
- Create: `src/app/partners/page.tsx`

**Interfaces:**
- Consumes: `EditorialCtaBand`, About-style compact hero (not full About GSAP suite — simple fade via `useGsap` optional; lean pages may skip heavy hero GSAP if Contact-level entrance is enough)
- Produces: `/careers`, `/press`, `/partners`

- [ ] **Step 1: Careers content + sections**

`careers-copy.ts`:

```ts
export const CAREERS_HERO = {
	eyebrow: "Company",
	title: "Build journeys worth telling",
	description:
		"Talkwer is a small editorial travel studio. We hire rarely — and only when the work needs another careful pair of hands.",
} as const;

export const CAREERS_BODY = {
	heading: "How we work",
	paragraphs: [
		"Most roles blend research, storytelling, and traveler care. You will ship pages, itineraries, and field notes — not slide decks.",
		"We are not hiring on an open board today. If your craft fits Talkwer, introduce yourself through Contact with a short note and portfolio link.",
	],
} as const;

export const CAREERS_CTA = {
	label: "Open roles",
	titleLead: "Have something",
	titleAccent: "to share?",
	description: "Tell us who you are and what you want to build with Talkwer.",
	primaryAction: "Contact us",
	primaryHref: "/contact",
	secondaryAction: "About Talkwer",
	secondaryHref: "/about",
} as const;
```

Hero: compact section (`min-h` not required full svh) — eyebrow orange, H1, description, `pad-x`, `bg-[#050505]`.  
Body: heading + paragraphs.  
CTA: `EditorialCtaBand` with primary/secondary hrefs from copy (check `EditorialCtaBand` props — pass `href` on actions if supported; otherwise wrap with Links matching About CTA usage).

Page shell:

```tsx
"use client";
import { CareersHero, CareersBody, CareersCTA } from "./sections";

export default function CareersPage() {
	return (
		<>
			<CareersHero />
			<CareersBody />
			<CareersCTA />
		</>
	);
}
```

Thin `src/app/careers/page.tsx` with metadata title `"Careers"`, path `/careers`, breadcrumb JSON-LD.

- [ ] **Step 2: Press content + sections + route**

Copy voice: media inquiries, brand name `talkwer.`, high-level positioning, CTA to Contact with subject “Press”. Same three-section structure as Careers. Route `/press`.

- [ ] **Step 3: Partners content + sections + route**

Copy voice: local guides, lodges, operators; partnership criteria; CTA Contact. Same structure. Route `/partners`.

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/careers src/features/press src/features/partners src/app/careers src/app/press src/app/partners
git commit -m "feat: add lean careers, press, and partners pages"
```

---

### Task 3: FAQ page + accordion

**Files:**
- Create: `src/components/ui/accordion.tsx` (via shadcn CLI)
- Create: `src/features/faq/content/faq-copy.ts`
- Create: `src/features/faq/sections/faq-hero.tsx`
- Create: `src/features/faq/sections/faq-accordion.tsx`
- Create: `src/features/faq/sections/index.ts`
- Create: `src/features/faq/faq-page.tsx`
- Create: `src/app/faq/page.tsx`

**Interfaces:**
- Consumes: `@/components/ui/accordion`, Link to policies/contact
- Produces: `/faq`

- [ ] **Step 1: Install shadcn accordion**

Run:

```bash
pnpm dlx shadcn@latest add accordion
```

Expected: `src/components/ui/accordion.tsx` created (or project alias path). Do not invent a parallel accordion if CLI succeeds.

- [ ] **Step 2: FAQ copy**

```ts
export const FAQ_HERO = {
	eyebrow: "Support",
	title: "Questions before you go",
	description: "Straight answers about booking, travel days, and how Talkwer works.",
} as const;

export type FaqItem = { id: string; question: string; answer: string };

export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
	{
		id: "booking",
		title: "Booking",
		items: [
			{
				id: "how-book",
				question: "How do I book a journey?",
				answer:
					"Start on Tours or Contact. We confirm availability, send a written confirmation, and collect deposits per our Booking Policy.",
			},
			{
				id: "deposit",
				question: "Is a deposit required?",
				answer:
					"Usually yes. Amounts and due dates are listed on your confirmation. See Booking Policy for details.",
			},
		],
	},
	{
		id: "travel",
		title: "Travel",
		items: [
			{
				id: "group-size",
				question: "How large are groups?",
				answer:
					"Most Talkwer departures stay small so the editorial pace holds. Exact caps appear on each tour page.",
			},
			{
				id: "fitness",
				question: "What fitness level do I need?",
				answer:
					"Each tour lists pacing and difficulty. Ask via Contact if you need an honest read for your situation.",
			},
		],
	},
	{
		id: "planning",
		title: "Planning",
		items: [
			{
				id: "cancel",
				question: "What if I need to cancel?",
				answer:
					"Review Cancellation for windows, credits, and supplier rules. Reach Contact as early as you can.",
			},
			{
				id: "custom",
				question: "Can you build a custom trip?",
				answer:
					"Yes. Use Contact with dates, party size, and the feeling you want — we reply with a sketched approach.",
			},
		],
	},
];
```

Expand each group to 3–4 items if copy stays tight. In accordion answers, where policies are mentioned, render `Link` components in the section component (not only plain strings) for `/booking-policy`, `/cancellation`, `/contact`.

- [ ] **Step 3: FAQ accordion section**

Use `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` from shadcn. One accordion per group (or one accordion with all items — prefer per-group with group `h2`). Style triggers for dark bg: `text-white`, borders `border-white/10`, content `text-white/60`.

- [ ] **Step 4: Page + route**

`faq-page.tsx` composes Hero + Accordion. Thin `src/app/faq/page.tsx` metadata title `"FAQ"`, path `/faq`.

- [ ] **Step 5: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/accordion.tsx src/features/faq src/app/faq
git commit -m "feat: add FAQ page with accordion"
```

---

### Task 4: Experiences page (styles + themes)

**Files:**
- Create: `src/features/experiences/content/experiences-page-copy.ts`
- Create: `src/features/experiences/content/experience-styles.ts`
- Create: `src/features/experiences/content/experience-themes.ts`
- Create: `src/features/experiences/sections/experiences-hero.tsx`
- Create: `src/features/experiences/sections/experiences-styles.tsx`
- Create: `src/features/experiences/sections/experiences-themes.tsx`
- Create: `src/features/experiences/sections/experiences-cta.tsx`
- Create: `src/features/experiences/sections/index.ts`
- Create: `src/features/experiences/experiences-page.tsx`
- Create: `src/app/experiences/page.tsx`

**Interfaces:**
- Consumes: existing destination images (`/image.jpg` or catalog images), `EditorialCtaBand`, Destinations list href helpers if linking tagged filters
- Produces: `/experiences`

- [ ] **Step 1: Content — styles + themes**

Talkwer-named styles (4–6), e.g.:

```ts
// experience-styles.ts
export const EXPERIENCE_STYLES = [
	{
		id: "field-notes",
		title: "Field Notes",
		description: "Slow days, strong places, room to notice.",
		href: "/stories",
	},
	{
		id: "signature",
		title: "Signature",
		description: "Hand-built itineraries with a clear narrative arc.",
		href: "/tours",
	},
	{
		id: "coastal",
		title: "Coastal",
		description: "Shorelines, islands, and salt-air pacing.",
		href: "/destinations?tag=popular", // ONLY if tag slug is valid in destinations-list-params; else "/destinations"
	},
	{
		id: "elevated",
		title: "Elevated",
		description: "Fewer transfers, finer stays, deeper access.",
		href: "/destinations?tag=luxury",
	},
] as const;
```

Before shipping query hrefs, open `src/features/destinations/lib/destinations-list-params.ts` and confirm slug → filter mapping (`popular`, `luxury`, etc.). If unsure, use bare `/destinations` or `/tours`.

Themes grid (6+), photo + title + short line + href:

```ts
export const EXPERIENCE_THEMES = [
	{
		id: "food",
		title: "Food",
		description: "Markets, kitchens, and the long table.",
		image: "/image.jpg",
		imageAlt: "Shared table at dusk",
		href: "/stories",
	},
	// trekking, wildlife, culture, coast, family — same shape
] as const;
```

Hero + CTA copy in `experiences-page-copy.ts` (Destinations CTA pattern: primary Tours, secondary Contact or Stories).

- [ ] **Step 2: Hero section**

Full-bleed Destinations-class hero: brand signal, one headline, one line, CTA group. Use `useGsap` for entrance (mirror destinations/about hero lifecycle — cleanup in return). No card collage in first viewport.

- [ ] **Step 3: Styles strip**

Horizontal on md+ (grid of 2–3 cols on mobile): title, sentence, `Link` “Explore →”. Borders `border-white/6`, accent on hover. Stagger with `useGsap` ScrollTrigger or simple entrance.

- [ ] **Step 4: Themes grid**

Photo-led grid (`next/image` `fill` + explicit `sizes` e.g. `(max-width: 768px) 100vw, 33vw`). No heavy card chrome. Entire card is a `Link`.

- [ ] **Step 5: CTA + page shell + route**

`experiences-page.tsx`: optional `InitialLoader` matching Destinations/About if siblings use it; compose Hero → Styles → Themes → CTA.  
`src/app/experiences/page.tsx`: metadata title `"Experiences"`, path `/experiences`, breadcrumb JSON-LD.

- [ ] **Step 6: Typecheck + image-sizes gate**

Run: `pnpm typecheck`  
Run: `pnpm check:image-sizes`  
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/features/experiences src/app/experiences
git commit -m "feat: add experiences gateway with styles and themes"
```

---

### Task 5: Cookie consent (shadcn) + layout mount

**Files:**
- Create: `src/components/ui/cookie-consent.tsx` (via registry)
- Modify: `src/app/layout.tsx`
- Possibly create: `src/shared/ui/site-cookie-consent.tsx` wrapper if registry API needs Talkwer defaults

**Interfaces:**
- Consumes: cookie-consent registry component
- Produces: sitewide banner; Learn more → `/cookies`

- [ ] **Step 1: Install cookie consent**

Run:

```bash
pnpm dlx shadcn@latest add https://shadcn-cookies.vercel.app/r/cookie-consent.json
```

If URL fails, use the install command documented on https://shadcn-cookie-consent.vercel.app/ (CLI tab). Expected file under `src/components/ui/`.

- [ ] **Step 2: Restyle for Talkwer dark**

Edit the installed component (or a thin wrapper) so default surface is dark (`bg-[#0a0a0a]`, `text-white`, borders `border-white/10`). Primary Accept uses `orange-500` / white text. Decline quiet outline. Do not leave white marketplace defaults.

Wire Learn more:

```tsx
<Link href="/cookies" className="…">Learn more</Link>
```

Use `variant="small"` at the call site.

- [ ] **Step 3: Mount in root layout**

In `src/app/layout.tsx`, import a client wrapper (if layout is server) and render after `{children}` / beside Footer:

```tsx
import { SiteCookieConsent } from "@/shared/ui/site-cookie-consent";
// …
<SiteCookieConsent />
```

Wrapper example:

```tsx
"use client";
import { CookieConsent } from "@/components/ui/cookie-consent";

export function SiteCookieConsent() {
	return (
		<CookieConsent
			variant="small"
			onAcceptCallback={() => {}}
			onDeclineCallback={() => {}}
		/>
	);
}
```

(Adjust prop names to match installed component API exactly.)

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/cookie-consent.tsx src/shared/ui/site-cookie-consent.tsx src/shared/ui/index.ts src/app/layout.tsx
git commit -m "feat: add dark-styled cookie consent banner"
```

---

### Task 6: Footer wiring + sitemap + docs index

**Files:**
- Modify: `src/features/home/content/section-copy.ts`
- Modify: `src/features/home/sections/footer.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `docs/INDEX.md`

**Interfaces:**
- Consumes: all new routes from Tasks 1–4
- Produces: every footer label navigates; legal links are real routes; sitemap lists new URLs

- [ ] **Step 1: Extend FOOTER_LINK_HREF**

```ts
export const FOOTER_LINK_HREF: Record<string, string | undefined> = {
	Destinations: "/destinations",
	Tours: "/tours",
	Stories: "/stories",
	Experiences: "/experiences",
	About: "/about",
	Careers: "/careers",
	Press: "/press",
	Partners: "/partners",
	FAQ: "/faq",
	"Booking Policy": "/booking-policy",
	Cancellation: "/cancellation",
	Contact: "/contact",
};
```

Add legal map:

```ts
export const LEGAL_LINK_HREF = {
	Privacy: "/privacy",
	Terms: "/terms",
	Cookies: "/cookies",
} as const;
```

Keep `LEGAL_LINKS` labels in sync with keys.

- [ ] **Step 2: Footer legal Links**

Replace legal `<button>`s with:

```tsx
{LEGAL_LINKS.map((linkLabel) => (
	<Link
		key={linkLabel}
		href={LEGAL_LINK_HREF[linkLabel]}
		className="hover:text-white/80"
	>
		{linkLabel}
	</Link>
))}
```

Import `LEGAL_LINK_HREF` from section-copy.

- [ ] **Step 3: Sitemap entries**

Add to `src/app/sitemap.ts` array (after contact or with other static pages):

```ts
{ url: resolveCanonicalUrl("/experiences"), changeFrequency: "weekly", priority: 0.78 },
{ url: resolveCanonicalUrl("/careers"), changeFrequency: "monthly", priority: 0.5 },
{ url: resolveCanonicalUrl("/press"), changeFrequency: "monthly", priority: 0.5 },
{ url: resolveCanonicalUrl("/partners"), changeFrequency: "monthly", priority: 0.5 },
{ url: resolveCanonicalUrl("/faq"), changeFrequency: "monthly", priority: 0.55 },
{ url: resolveCanonicalUrl("/booking-policy"), changeFrequency: "yearly", priority: 0.4 },
{ url: resolveCanonicalUrl("/cancellation"), changeFrequency: "yearly", priority: 0.4 },
{ url: resolveCanonicalUrl("/privacy"), changeFrequency: "yearly", priority: 0.4 },
{ url: resolveCanonicalUrl("/terms"), changeFrequency: "yearly", priority: 0.4 },
{ url: resolveCanonicalUrl("/cookies"), changeFrequency: "yearly", priority: 0.4 },
```

- [ ] **Step 4: docs/INDEX.md**

Under Superpowers, add links to:
- `docs/superpowers/specs/2026-08-08-footer-missing-pages-design.md`
- `docs/superpowers/plans/2026-08-08-footer-missing-pages.md`

- [ ] **Step 5: Verify**

Run: `pnpm verify`  
Expected: PASS (lint, filenames, image-sizes, typecheck, deps as configured)

- [ ] **Step 6: Commit**

```bash
git add src/features/home/content/section-copy.ts src/features/home/sections/footer.tsx src/app/sitemap.ts docs/INDEX.md
git commit -m "feat: wire footer and sitemap for new support pages"
```

---

### Task 7: Production visual QA

**Files:** none (verification only)

- [ ] **Step 1: Build and start**

```bash
pnpm build
pnpm start
```

Expected: build succeeds; server on port 3000.

- [ ] **Step 2: Manual checklist**

Open `http://localhost:3000` and confirm:

1. Footer Explore/Company/Support — every label is a working link (no `text-white/35` dead spans for former missing items).
2. Legal Privacy / Terms / Cookies navigate.
3. `/experiences` — hero, styles, themes, CTA; images sized correctly.
4. `/faq` — accordion keyboard operable.
5. One company page (`/careers`) and one policy (`/privacy`) render.
6. Cookie banner (small) appears; Accept/Decline dismiss; Learn more → `/cookies`.
7. `/contact` unchanged.

- [ ] **Step 3: Final commit only if QA fixes were needed**

If fixes: commit with a focused message. If clean: no empty commit.

---

## Spec coverage self-check

| Spec requirement | Task |
|------------------|------|
| Experiences styles + themes deep-links | Task 4 |
| Careers / Press / Partners lean | Task 2 |
| FAQ full | Task 3 |
| Booking / Cancellation / Privacy / Terms / Cookies | Task 1 |
| Cookie consent small + `/cookies` | Task 5 |
| Footer hrefs + legal Links | Task 6 |
| Sitemap + SEO metadata | Tasks 1–4 routes + Task 6 |
| `pnpm verify` + build visual QA | Tasks 6–7 |
| Contact untouched | Global constraint |
| No experiences `[slug]` | Global constraint |

## Placeholder scan

No TBD / “implement later” / “similar to Task N” left unresolved. Policy bodies are specified as real prose with example module; company Press/Partners require unique copy in Steps 2–3 (not Careers paste). Cookie install URL has fallback to the demo site docs.
