# Editorial and performance follow-up

Measured October 28, 2026: Next.js 16.4.3, Node.js 24.19.0, pnpm 12.6.0. Build:
`pnpm build` (`next build --webpack`). Serve: `pnpm exec next start -p 45671`.
Direct HTTP/1.1 to Next.js; no hosting changes or precompression.

## Mobile result

Five sequential fresh-Chrome Lighthouse 13.5.0 runs of the default English
homepage, unchanged simulated mobile profile: 412 x 823, scale 1.75, 4x CPU
slowdown, 150ms RTT, 1,638.4Kbps. No concurrent checks.

| Run | LCP    | Performance | Accessibility |
| --- | ------ | ----------- | ------------- |
| 1   | 2.483s | 97          | 100           |
| 2   | 2.482s | 97          | 100           |
| 3   | 2.481s | 98          | 100           |
| 4   | 2.483s | 98          | 100           |
| 5   | 2.482s | 97          | 100           |

**All five passed LCP < 2.5s.** Transfer: 237,199 bytes, including 148,777 bytes
of JavaScript; CLS zero. Worst LCP 2.483s leaves about 17ms of lab margin. These
local measurements do not guarantee field Core Web Vitals or performance on
every route, locale, device or network.

With Chrome installed and production running, reproduce with
`pnpm audit:mobile http://localhost:45671`. Any of five runs at or above 2.5s
fails. Full traces go to ignored `.reports/mobile-lcp/`; run without competing
checks.

The previous App Router implementation measured 2.110s, 2.785s and 2.861s. An
isolated pass was insufficient.

## Implementation

The default homepage uses static Pages Router generation with build-time
translations and compact props; other routes retain the App Router. Crossing
routers loads a new document. The supported Webpack compiler reduced this
project's homepage bundle; no custom chunk configuration remains.

The 41,408-byte Inter core includes Spanish dictionary characters and preserves
original axes and glyph metrics. Other retained changes include smaller home
CSS, deferred offscreen GSAP/carousel/menu code and visibility-gated images with
no-JavaScript fallbacks. Prices use an explicit interface locale to avoid
hydration mismatches.

Specific travel copy, four headline rows and article typography remain. Four
screenshot comparisons preserve the body below the header pixel-for-pixel;
differences are confined to the top 80px. Inline-CSS, bespoke chunking,
containment and font-axis reduction experiments were discarded. A Suspense
boundary hiding below-fold content without JavaScript was removed.

## Verification

- `pnpm verify`, frozen-lockfile install and production dependency audit passed;
  no known production vulnerabilities.
- 108 localized routes and five navigation/menu/carousel/no-JavaScript checks
  passed, with zero browser errors.
- Booking, checkout, confirmation cleanup, time-zone persistence and Spanish
  calendar/navigation passed.
- Configurator contact handoff, manual pause, mobile badges/search, reading time
  and reduced motion passed.
- Axe on five sampled routes: zero violations. Link crawl: 43 destinations, zero
  failures.
- Three locales at 320, 390, 768 and 1440px: no overflow or heading/header
  collision.
- Language switching and es-ES/ja-JP browser hydration passed.
- Font axes and horizontal metrics unchanged for all 134 codepoints.

[Compact evidence](verification.json). Temporary browser scripts remain outside
the repository. No persistent application test suite was added. Physical devices
and other browser engines were not exhaustively tested.

Screenshots: [mobile home](editorial-home-mobile.png),
[desktop home](editorial-home-desktop.png),
[mobile article](editorial-story-mobile.png),
[desktop article](editorial-story-desktop.png).

## Code cleanup recheck

After removing unused count-up code, copy lookup wrappers, a forwarding page
component and narrated layout comments, `pnpm verify` and the
108-route/five-interaction production checks passed again, with zero browser
errors. Spanish and Japanese browser-language hydration checks also passed. Five
fresh mobile LCP runs were **2.483s, 2.482s, 2.481s, 2.484s and 2.481s**; every
run stayed under 2.5s. Detailed results are included in
`codeCleanupVerification` in the compact evidence.

## Final cleanup audit

Applied emil-unslop-code, Vercel React best practices and Emil UI review to the
final code. Removed unused storage, tour-filter and parallax helpers; inlined
the clear-filter URL wrapper; narrowed booking values and time-format keys;
removed unnecessary locale/event casts. Shared inputs now use 16px mobile text
while retaining 14px desktop text. Testimonial transitions target only border
and shadow properties.

`pnpm verify`, the production dependency audit, 108 route checks, five
interaction regressions, booking/checkout, design interactions and language
switching passed. Axe found zero violations on five sampled routes; the 43-route
link crawl had no failures. Targeted browser checks verified all three
clear-filter links, both time formats and mobile/desktop input sizes. Malformed
booking and confirmation payload checks passed. Five fresh mobile LCP runs were
**2.483s, 2.482s, 2.482s, 2.485s and 2.485s**. The worst run leaves about 15ms
of local lab margin. See `finalCleanupVerification` for the latest compact
evidence.
