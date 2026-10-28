# Booking, Checkout & Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship tour-required agent-consult booking (faithful shadcn-cal-com port, Talkwer theme), checkout + success with fake consult fee, and simple login/register shells — front-end only.

**Architecture:** Feature-first + thin App Router pages. Reference features: `contact` (form page shell), `tours` (slug/context). Port calendar stack from [damianricobelli/shadcn-cal-com](https://github.com/damianricobelli/shadcn-cal-com) into `src/features/booking/` (structure/behavior intact; Talkwer dark + orange classes only). Checkout and auth are separate features. Handoff booking → checkout via `sessionStorage`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, existing shadcn primitives + new tabs/scroll-area/label/tooltip/popover as needed, `@internationalized/date` + React Aria calendar packages, `libphonenumber-js` for phone input, `pnpm` / `pnpm verify` (no unit test runner).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-12-booking-checkout-auth-design.md`
- Front-end only: no real auth, payments, Cal.com API, or tour purchase.
- Tour required: `/booking?tour=<slug>`; invalid/missing → `redirect("/tours")` or client `router.replace("/tours")`.
- Faithful port of LeftPanel + Calendar + RightPanel + FormPanel; do not invent a different booking layout.
- Theme: `bg-[#050505]` / `#0a0a0a`, `text-white` opacity steps, `orange-500`, `border-white/[0.06]` (or `/10`–`/15` for controls), Inter, `pad-x` on page chrome (not necessarily inside the cal card).
- Do not add `@radix-ui/colors`, `next-themes`, demo GitHub header, or theme switcher.
- Kebab-case under `src/features`; thin `src/app/**/page.tsx`; copy in feature `content/`; helpers in feature `lib/` (no UI in `lib/`).
- Prefer `pnpm`; end each task with `pnpm typecheck`; final `pnpm verify` + `pnpm build && pnpm start` visual QA.
- No automated unit tests (repo has none) — verify with typecheck / verify / manual flow.

---

## File map

| Path | Responsibility |
|------|----------------|
| `src/features/booking/**` | Ported cal UI, handoff write, tour resolve, booking page |
| `src/features/checkout/**` | Checkout + success pages, handoff read/clear, fee copy |
| `src/features/auth/**` | Login + register shells |
| `src/app/booking/page.tsx` | Thin route + metadata |
| `src/app/checkout/page.tsx` | Thin route + metadata |
| `src/app/checkout/success/page.tsx` | Thin route + metadata |
| `src/app/login/page.tsx` | Thin route + metadata |
| `src/app/register/page.tsx` | Thin route + metadata |
| `src/components/ui/{tabs,scroll-area,label,tooltip,popover}.tsx` | Primitives required by port (only if missing) |
| `src/features/tours/sections/tour-details-sheet.tsx` | Inquire → `/booking?tour=` |
| `src/features/tours/sections/tour-details-mobile-bar.tsx` | Same Inquire href |
| `src/features/tours/content/tour-details-copy.ts` | Drop static `inquireHref` or keep label only |
| `src/app/sitemap.ts` | New static paths |
| `docs/INDEX.md` | Link plan |

**Reference sources to port (raw GitHub `master`):**

- `components/calendar/*` → `src/features/booking/sections/calendar/`
- `components/demo/{index,left-panel,right-panel,form-panel,available-times,time-zones}` → `src/features/booking/sections/` (+ content for times/zones if preferred)
- `components/phone-input/*` → `src/features/booking/sections/phone-input/`

---

### Task 1: Dependencies + missing UI primitives

**Files:**
- Modify: `package.json` / lockfile via `pnpm add`
- Create (if absent): `src/components/ui/tabs.tsx`, `scroll-area.tsx`, `label.tsx`, `tooltip.tsx`, `popover.tsx`

**Interfaces:**
- Consumes: existing `Button`, `Input`, `Select`, `Textarea`, `Avatar` where usable
- Produces: installed Aria/date/phone deps + UI primitives importable as `@/components/ui/*`

- [ ] **Step 1: Install booking deps**

```bash
pnpm add @internationalized/date @react-aria/calendar @react-aria/button @react-aria/focus @react-aria/i18n @react-aria/visually-hidden @react-stately/calendar libphonenumber-js
```

Also add any Radix packages required by new shadcn primitives (e.g. `@radix-ui/react-tabs`, `@radix-ui/react-scroll-area`, `@radix-ui/react-label`, `@radix-ui/react-tooltip`, `@radix-ui/react-popover`) if not already present — match versions to siblings in `package.json`.

- [ ] **Step 2: Add missing shadcn primitives**

Use project `components.json` / shadcn MCP or manual copy aligned with existing `button.tsx` / `input.tsx` patterns (Tailwind v4, `cn` from `@/lib/utils`). Do not install light-theme-only demos.

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS (or only pre-existing unrelated errors).

- [ ] **Step 4: Commit** (only if user asked for commits during execution)

```bash
git add package.json pnpm-lock.yaml src/components/ui
git commit -m "chore: add calendar and form primitives for booking port"
```

---

### Task 2: Booking lib — tour resolve, handoff, safe next paths

**Files:**
- Create: `src/features/booking/lib/booking-tour.ts`
- Create: `src/features/booking/lib/booking-handoff.ts`
- Create: `src/features/booking/lib/booking-href.ts`
- Create: `src/features/auth/lib/safe-next-path.ts`
- Create: `src/features/booking/content/booking-copy.ts`

**Interfaces:**
- Consumes: `TOURS` from `@/features/home/content/tours`, `findTourBySlug` / `getTourSlug` from `@/features/tours/lib/tour-slug`
- Produces:
  - `resolveBookingTour(slug: string | null): Tour | undefined`
  - `BOOKING_HANDOFF_KEY` + `BookingHandoff` type + `writeBookingHandoff` / `readBookingHandoff` / `clearBookingHandoff`
  - `getBookingHref(tourSlug: string): string` → `/booking?tour=<slug>`
  - `safeNextPath(raw: string | null): string | null` — only same-origin relative paths starting with `/` and not `//`

- [ ] **Step 1: Handoff types + sessionStorage helpers**

```ts
// src/features/booking/lib/booking-handoff.ts
export const BOOKING_HANDOFF_KEY = "talkwer.booking.handoff.v1";

export type BookingHandoff = {
	tourSlug: string;
	tourTitle: string;
	slotIso: string;
	timeZone: string;
	guestName: string;
	guestEmail: string;
	guestPhone: string;
	notes: string;
	guestEmails: string[];
};

export function writeBookingHandoff(payload: BookingHandoff): void {
	sessionStorage.setItem(BOOKING_HANDOFF_KEY, JSON.stringify(payload));
}

export function readBookingHandoff(): BookingHandoff | null {
	if (typeof window === "undefined") return null;
	const raw = sessionStorage.getItem(BOOKING_HANDOFF_KEY);
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw) as BookingHandoff;
		if (!parsed.tourSlug || !parsed.slotIso || !parsed.guestEmail) return null;
		return parsed;
	} catch {
		return null;
	}
}

export function clearBookingHandoff(): void {
	sessionStorage.removeItem(BOOKING_HANDOFF_KEY);
}
```

- [ ] **Step 2: Tour resolve + booking href + copy constants**

```ts
// src/features/booking/lib/booking-tour.ts
import { TOURS } from "@/features/home/content/tours";
import { findTourBySlug } from "@/features/tours/lib/tour-slug";
import type { Tour } from "@/shared/types/domain";

export function resolveBookingTour(slug: string | null | undefined): Tour | undefined {
	if (!slug) return undefined;
	return findTourBySlug(TOURS, slug);
}
```

```ts
// src/features/booking/lib/booking-href.ts
export function getBookingHref(tourSlug: string): string {
	return `/booking?tour=${encodeURIComponent(tourSlug)}`;
}
```

```ts
// src/features/booking/content/booking-copy.ts
export const BOOKING_COPY = {
	brand: "talkwer",
	meetingTitle: "Agent consult",
	duration: "30 mins",
	meetingType: "Video call",
	meetingTypeTooltip: "Meet a Talkwer agent on video to walk through this tour.",
	continueLabel: "Continue",
} as const;
```

```ts
// src/features/auth/lib/safe-next-path.ts
export function safeNextPath(raw: string | null | undefined): string | null {
	if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
	return raw;
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 3: Port calendar + demo panels (Talkwer theme)

**Files:**
- Create: `src/features/booking/sections/calendar/calendar-button.tsx`
- Create: `src/features/booking/sections/calendar/calendar-cell.tsx`
- Create: `src/features/booking/sections/calendar/calendar-grid.tsx`
- Create: `src/features/booking/sections/calendar/calendar-header.tsx`
- Create: `src/features/booking/sections/calendar/index.tsx`
- Create: `src/features/booking/sections/available-times.ts`
- Create: `src/features/booking/sections/time-zones.ts`
- Create: `src/features/booking/sections/left-panel.tsx`
- Create: `src/features/booking/sections/right-panel.tsx`
- Create: `src/features/booking/sections/form-panel.tsx`
- Create: `src/features/booking/sections/phone-input/*` (port reference)
- Create: `src/features/booking/sections/booking-scheduler.tsx` (adapted from reference `components/demo/index.tsx`)
- Create: `src/features/booking/sections/index.ts`

**Interfaces:**
- Consumes: Task 1 primitives + Task 2 handoff/copy/tour types
- Produces: `BookingScheduler` props:

```ts
type BookingSchedulerProps = {
	tour: Tour;
};
```

Behavior mirrors reference `Demo`:
- URL search params `date` + `slot` (keep `tour` param intact when updating URL)
- Left + Calendar + Right until both `date` and `slot` set
- Then FormPanel; Back clears `slot` (and optionally `date` per reference `router.back()` — prefer clearing `slot` via `router.push` while preserving `tour`)
- FormPanel Continue: validate name/email/phone → `writeBookingHandoff(...)` → `router.push("/checkout")`

- [ ] **Step 1: Copy calendar + demo + phone-input from reference**

Pull raw files from `https://raw.githubusercontent.com/damianricobelli/shadcn-cal-com/master/...` into the paths above. Fix imports to `@/components/ui/*`, `@/lib/utils`, and local relative paths under `features/booking`.

- [ ] **Step 2: Restyle to Talkwer**

Replace light demo surfaces with dark Talkwer classes. Map selected day / primary accents to `orange-500` (or `orange-400` text where needed). Keep structure, spacing rhythm, and interaction of the reference. Remove Radix Colors token usage if any — use Tailwind utilities only.

Left panel copy: brand `BOOKING_COPY.brand` + orange full stop; title `BOOKING_COPY.meetingTitle`; show `tour.title` as context line; duration/meeting type from copy.

- [ ] **Step 3: Wire FormPanel Continue to handoff**

```ts
// inside FormPanel onContinue (illustrative)
writeBookingHandoff({
	tourSlug: tour.slug,
	tourTitle: tour.title,
	slotIso: slotParam,
	timeZone,
	guestName,
	guestEmail,
	guestPhone,
	notes,
	guestEmails: guests.map((g) => g.email).filter(Boolean),
});
router.push("/checkout");
```

Pass `tour` and `timeZone` into FormPanel from `BookingScheduler`.

- [ ] **Step 4: Preserve `tour` query when mutating date/slot**

When building `URL` from `window.location`, never drop `tour`. If reference only sets `date`/`slot`, assert `tour` remains.

- [ ] **Step 5: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 4: Booking page + app route

**Files:**
- Create: `src/features/booking/booking-page.tsx`
- Create: `src/app/booking/page.tsx`

**Interfaces:**
- Consumes: `BookingScheduler`, `resolveBookingTour`
- Produces: `/booking` route

- [ ] **Step 1: Client booking page**

```tsx
// src/features/booking/booking-page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { resolveBookingTour } from "@/features/booking/lib/booking-tour";
import { BookingScheduler } from "@/features/booking/sections";

export default function BookingPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tour = resolveBookingTour(searchParams.get("tour"));

	useEffect(() => {
		if (!tour) router.replace("/tours");
	}, [tour, router]);

	if (!tour) {
		return (
			<main className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
				Redirecting…
			</main>
		);
	}

	return (
		<main className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto flex max-w-[1600px] justify-center py-16 md:py-24">
				<BookingScheduler tour={tour} />
			</div>
		</main>
	);
}
```

Wrap with `Suspense` in the app route if required by `useSearchParams`.

- [ ] **Step 2: Thin app route**

```tsx
// src/app/booking/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import BookingPage from "@/features/booking/booking-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Book a consult",
	description: "Schedule a Talkwer agent consult about a specific tour.",
	path: "/booking",
	keywords: ["talkwer booking", "tour consult", "agent call"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Book a consult", path: "/booking" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Suspense fallback={<main className="min-h-[100svh] bg-[#050505]" />}>
				<BookingPage />
			</Suspense>
		</>
	);
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 5: Wire tour detail Inquire → booking

**Files:**
- Modify: `src/features/tours/content/tour-details-copy.ts` — remove `inquireHref: "/contact"` (keep label)
- Modify: `src/features/tours/sections/tour-details-sheet.tsx`
- Modify: `src/features/tours/sections/tour-details-mobile-bar.tsx`

**Interfaces:**
- Consumes: `getBookingHref(tour.slug)` / `getTourSlug(tour)`
- Produces: Inquire links to `/booking?tour=<slug>`

- [ ] **Step 1: Update sheet + mobile bar hrefs**

```tsx
import { getBookingHref } from "@/features/booking/lib/booking-href";
import { getTourSlug } from "@/features/tours/lib/tour-slug";

// ...
href={getBookingHref(getTourSlug(tour))}
```

Remove unused `inquireHref` from copy object if nothing else references it.

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 6: Checkout + success

**Files:**
- Create: `src/features/checkout/content/checkout-copy.ts`
- Create: `src/features/checkout/lib/confirmation-id.ts`
- Create: `src/features/checkout/sections/checkout-form.tsx`
- Create: `src/features/checkout/sections/checkout-summary.tsx`
- Create: `src/features/checkout/sections/checkout-success-body.tsx`
- Create: `src/features/checkout/sections/index.ts`
- Create: `src/features/checkout/checkout-page.tsx`
- Create: `src/features/checkout/checkout-success-page.tsx`
- Create: `src/app/checkout/page.tsx`
- Create: `src/app/checkout/success/page.tsx`

**Interfaces:**
- Consumes: `readBookingHandoff`, `clearBookingHandoff`, `safeNextPath`
- Produces: `/checkout`, `/checkout/success`
- Success may keep a short-lived `sessionStorage` confirmation snapshot or read handoff once then clear after displaying — pattern:

```ts
// On Confirm:
const handoff = readBookingHandoff();
if (!handoff) { router.replace("/tours"); return; }
const id = createConfirmationId();
sessionStorage.setItem("talkwer.booking.confirmation.v1", JSON.stringify({ id, ...handoff }));
clearBookingHandoff();
router.push("/checkout/success");
```

- [ ] **Step 1: Copy + confirmation helper**

```ts
// src/features/checkout/content/checkout-copy.ts
export const CHECKOUT_COPY = {
	title: "Checkout",
	feeLabel: "Agent consult",
	feeAmount: "$25",
	feeNote: "Demo fee — no charge is processed.",
	confirmLabel: "Confirm booking",
	signInLabel: "Sign in",
	registerLabel: "Create account",
	demoAuthHint: "Optional — checkout works as a guest.",
} as const;

export const CHECKOUT_SUCCESS_COPY = {
	title: "Consult reserved",
	body: "This is a demo confirmation. No payment was taken and no calendar invite was sent.",
	homeLabel: "Back home",
	tourLabel: "View tour",
} as const;
```

```ts
// src/features/checkout/lib/confirmation-id.ts
export function createConfirmationId(): string {
	return `TW-${Date.now().toString(36).toUpperCase()}`;
}
```

- [ ] **Step 2: Checkout page UI**

Dark shell (`bg-[#050505]`), `pad-x`, max width ~720–960px:
- Summary: tour title, formatted slot, timezone, guest name/email
- Fee line from `CHECKOUT_COPY`
- Fake card fields: number, expiry, CVC (non-empty check on submit)
- Links: `/login?next=/checkout`, `/register?next=/checkout`
- Empty handoff on mount → `router.replace("/tours")`

- [ ] **Step 3: Success page**

Read confirmation snapshot; if missing → `/tours`. Show id + summary + links to `/` and `/tours/${slug}`. Clear confirmation key on unmount optional.

- [ ] **Step 4: Thin app routes + metadata** (“Checkout”, “Booking confirmed”)

- [ ] **Step 5: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 7: Login + register

**Files:**
- Create: `src/features/auth/content/auth-copy.ts`
- Create: `src/features/auth/sections/login-form.tsx`
- Create: `src/features/auth/sections/register-form.tsx`
- Create: `src/features/auth/sections/index.ts`
- Create: `src/features/auth/login-page.tsx`
- Create: `src/features/auth/register-page.tsx`
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`

**Interfaces:**
- Consumes: `safeNextPath`, existing `Input` / `Button`
- Produces: `/login`, `/register`

- [ ] **Step 1: Forms**

Login: email + password. Register: name + email + password. On submit `preventDefault`, set inline message “Demo only — no account is created.”, then if `safeNextPath(searchParams.get("next"))` → `router.push(next)`.

Cross-links: login ↔ register preserving `next` query when present.

Style like contact fields (`border-white/15`, `bg-white/[0.04]`, orange primary button).

- [ ] **Step 2: Thin routes + metadata** (“Sign in”, “Register”)

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

---

### Task 8: Sitemap + docs index + verify

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `docs/INDEX.md`

- [ ] **Step 1: Add sitemap entries**

```ts
{ url: resolveCanonicalUrl("/booking"), changeFrequency: "monthly", priority: 0.55 },
{ url: resolveCanonicalUrl("/checkout"), changeFrequency: "yearly", priority: 0.3 },
{ url: resolveCanonicalUrl("/checkout/success"), changeFrequency: "yearly", priority: 0.2 },
{ url: resolveCanonicalUrl("/login"), changeFrequency: "yearly", priority: 0.4 },
{ url: resolveCanonicalUrl("/register"), changeFrequency: "yearly", priority: 0.4 },
```

- [ ] **Step 2: Point INDEX at plan**

Replace “plan TBD” with `docs/superpowers/plans/2026-08-12-booking-checkout-auth.md`.

- [ ] **Step 3: Full verify + visual QA**

```bash
pnpm verify
pnpm build && pnpm start
```

Manual:
1. Open a tour → Inquire → `/booking?tour=…`
2. Pick date + slot → FormPanel → Continue → checkout
3. Confirm → success
4. `/booking` without tour → `/tours`
5. `/checkout` with empty storage → `/tours`
6. Checkout → login/register with `next=/checkout` round-trip

Expected: `pnpm verify` PASS; flow works on production server.

---

## Spec coverage check

| Spec requirement | Task |
|------------------|------|
| Faithful cal port + Talkwer theme | 1, 3, 4 |
| Tour required + Inquire wiring | 2, 4, 5 |
| FormPanel → checkout handoff | 2, 3, 6 |
| Consult fee + fake card + optional auth links | 6 |
| Success confirmation | 6 |
| Login/register demo shells + `next` | 2, 7 |
| Sitemap / metadata | 4, 6, 7, 8 |
| `pnpm verify` + build visual QA | 8 |
| Out of scope (real auth/pay, index CTA, nav Booking) | Not implemented |

## Placeholder / consistency notes

- Handoff key: `talkwer.booking.handoff.v1`; confirmation key: `talkwer.booking.confirmation.v1`
- Always preserve `tour` search param on booking URL updates
- `inquireHref` removed in favor of `getBookingHref(slug)`
