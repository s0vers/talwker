# Booking, Checkout & Auth Surfaces — Design

Date: 2026-08-12  
Status: approved  
Scope: agent-consult booking (tour-required), checkout + success, login + register. Front-end only.

## Goal

Ship a Cal.com-style **agent consult** booking flow for a specific tour, then a simple checkout (consult fee, fake payment) and success page, plus simple login/register shells. Visual language stays Talkwer dark editorial + orange. No real auth, payments, or APIs.

## Decisions locked

| Decision | Choice |
|----------|--------|
| Backend | Front-end only (demo / marketing shell) |
| User journey | Book → checkout → success; optional sign-in/register prompts on checkout (not a hard gate) |
| Checkout payload | Fixed **consultation fee** + UI-only card fields (not tour price / deposit) |
| Tour binding | Required: `/booking?tour=<slug>`; missing/invalid → redirect `/tours` |
| Booking UI | **Faithful port** of [shadcn-cal-com](https://github.com/damianricobelli/shadcn-cal-com) (LeftPanel + React Aria Calendar + RightPanel + FormPanel); **theme only** for Talkwer |
| Guest details | Collected on reference **FormPanel**; FormPanel Continue → `/checkout` for payment |
| Entry point | Tour detail **Inquire** → `/booking?tour=<slug>`; tours index CTA stays `/contact` |
| Architecture | Separate features: `booking`, `checkout`, `auth` (Approach 1) |
| Auth pages | Simple themed login/register; no persistence |

## Inspiration (port, don’t reinvent)

- **[shadcn-cal-com demo](https://shadcn-cal-com.vercel.app/?date=2026-08-11)** / [repo](https://github.com/damianricobelli/shadcn-cal-com) — monthly calendar, slot list, form panel after slot pick.
- Talkwer theme: `bg-[#050505]` / `#0a0a0a`, `text-white` opacity steps, `orange-500` accent, `border-white/[0.06]`, Inter, `pad-x` where page chrome needs it.

Do **not** invent a different booking composition. Port reference structure and behavior; restyle tokens/classes to Talkwer. Swap demo copy for Talkwer agent-consult + tour context.

## Architecture

**Feature-first + thin app routes.** Named references: `contact` (form page shell), `tours` (slug / trip context).

| Route | Feature entry | Job |
|-------|---------------|-----|
| `/booking?tour=<slug>` | `src/features/booking/booking-page.tsx` | Ported cal card; FormPanel → checkout handoff |
| `/checkout` | `src/features/checkout/checkout-page.tsx` | Summary + consult fee + fake card + optional auth links |
| `/checkout/success` | `src/features/checkout/checkout-success-page.tsx` | Confirmation shell |
| `/login` | `src/features/auth/login-page.tsx` | Simple sign-in form |
| `/register` | `src/features/auth/register-page.tsx` | Simple register form |

Thin `src/app/.../page.tsx`: metadata (+ JSON-LD where appropriate) + feature import. Each feature owns `sections/`, `content/`, optional `lib/`.

### File map (concrete)

```
src/app/booking/page.tsx
src/app/checkout/page.tsx
src/app/checkout/success/page.tsx
src/app/login/page.tsx
src/app/register/page.tsx

src/features/booking/
  booking-page.tsx
  sections/          # left-panel, calendar shell, right-panel, form-panel, booking-card
  content/           # consult copy, duration, meeting type labels
  lib/               # tour resolve, handoff encode/decode, fake availability

src/features/checkout/
  checkout-page.tsx
  checkout-success-page.tsx
  sections/
  content/
  lib/               # read handoff; fake confirmation id

src/features/auth/
  login-page.tsx
  register-page.tsx
  sections/
  content/

# Wired entry
src/features/tours/content/tour-details-copy.ts  # inquireHref pattern → booking with slug
```

Calendar primitives from the reference may live under `src/features/booking/` (or `sections/calendar/`) — **not** a second top-level product folder. Add only the shadcn/ui primitives the port needs that Talkwer lacks (e.g. tabs, scroll-area, label, tooltip, popover) into `src/components/ui/`. Prefer existing `Button`, `Input`, `Select`, `Textarea` when compatible.

### Dependencies (booking port)

Add as required by the reference calendar stack (pin current compatible versions at implement time):

- `@internationalized/date`
- `@react-aria/calendar`, `@react-aria/button`, `@react-aria/focus`, `@react-aria/i18n`, `@react-aria/visually-hidden`
- `@react-stately/calendar`
- Phone input: port reference `phone-input` + `libphonenumber-js` (keep FormPanel parity).

Do **not** pull `@radix-ui/colors`, `next-themes`, or the demo marketing chrome (GitHub star header, theme switcher).

## Product flow

```
Tour detail Inquire
  → /booking?tour=<slug>
  → pick date + slot (URL may mirror reference date/slot params)
  → FormPanel (name, email, phone, notes, optional guests)
  → Continue
  → /checkout  (handoff: tour, slot ISO, guest fields)
  → Confirm (fake pay)
  → /checkout/success

Checkout may link → /login?next=/checkout or /register?next=/checkout
Login/register remain optional; checkout works as guest.
```

### Handoff

Client-only. Prefer **sessionStorage** keyed blob (tour slug, slot ISO, timezone, form fields) written before navigate to `/checkout`, read on mount; clear on success. Query params alone are brittle for form payload. If checkout opens with empty handoff → redirect `/tours` (or `/booking` only when tour slug is still in query — default hard redirect to `/tours`).

### Fake data

- Fixed consult fee (e.g. copy constant in `checkout/content`).
- Static available times list (reference `available-times` pattern).
- Timezones list ported/trimmed as needed.
- Success shows a generated fake confirmation id (client random / timestamp).

## Booking composition (reference parity)

Single bordered card (Talkwer surfaces), three columns until slot selected:

1. **LeftPanel** — avatar/brand, meeting title (“Agent consult”), duration, video meeting type, timezone select; after slot: show selected date/time; include tour name from slug.
2. **Calendar** — React Aria monthly grid; past/unavailable muted; available as pills; selected + indicator.
3. **RightPanel** — weekday+day header, 12h/24h tabs, scrollable outline time buttons.

When `date` + `slot` present: replace calendar + right with **FormPanel** (name*, email*, phone*, notes, add guests, Back, Continue). Continue validates required fields client-side then handoff → checkout.

Mobile: keep reference responsive behavior as closely as practical; do not invent a separate stacked marketing layout.

## Checkout & success (simple)

- Dark page shell consistent with contact/about (not the cal card).
- Order summary: tour title, date/time, timezone, guest name/email, consult fee line.
- Fake card fields (number, expiry, CVC) — no validation beyond non-empty for demo feel, or light format checks only.
- Primary CTA Confirm → success.
- Secondary: Sign in / Create account (`next` back to checkout).
- Success: confirmation id, summary, links to tour detail and home.

## Auth (simple)

- Centered or `pad-x` constrained forms on dark bg.
- Login: email + password (+ link to register).
- Register: name + email + password (+ link to login).
- Submit: preventDefault; optional toast/inline “Demo only” message; if `next` safe path present, `router.push(next)`.
- No cookies, tokens, or protected-route middleware.

## SEO / sitemap

- Add routes to sitemap where other static pages are listed.
- Metadata via `createPageMetadata`; booking may be `noindex` if preferred for demo tooling — default **index** like contact unless plan decides otherwise. Prefer index with clear titles (“Book a consult”, “Checkout”, “Sign in”, “Register”).

## Out of scope

- Real authentication, session, or account storage
- Real payments / Stripe / webhooks
- Cal.com API or external scheduling
- Purchasing the tour itself
- Wiring tours index “Start a conversation” away from Contact
- Nav/footer primary Booking link
- CMS, email confirmation, agent availability backend

## Verification

- `pnpm verify`
- `pnpm build && pnpm start` for visual QA (dev CSS caveat per `AGENTS.md`)
- Manual: Inquire from a tour → book slot → form → checkout → success; invalid tour slug; empty checkout handoff; login/register `next` round-trip

## Non-goals / anti-patterns

- Fat `page.tsx` with calendar markup
- Dropping reference FormPanel/calendar structure for a custom Talkwer-only wizard
- Light purple/cream marketplace theming from the demo’s default light mode
- Shared mega-component that also owns checkout/auth
