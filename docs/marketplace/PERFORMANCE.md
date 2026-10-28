# Production mobile lab evidence

Measured October 6, 2026 against the local production server at http://localhost:3561 using Lighthouse 13.5.0 and installed headless Chrome. Navigation audit, default mobile viewport, simulated throttling: 150 ms RTT, 1638.4 Kbps throughput, 4× CPU slowdown. These are two individual lab runs, not field Core Web Vitals or a cross-browser certification.

| Metric | Before | After hero-description fix |
|---|---:|---:|
| Performance | 71 | 77 |
| Accessibility automated score | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 85 | 92 |
| LCP | 6.6 s | 6.1 s |
| FCP | 2.1 s | 1.2 s |
| Speed index | 5.4 s | 3.5 s |
| After TBT | — | 80 ms |
| After CLS | — | 0 |

Raw reports `lighthouse-*.json` are kept locally (gitignored); the figures here are the record. The measured late hero-description reveal was removed; description and CTA no longer wait for that timeline. The cookie-policy link now has descriptive text. The remaining canonical warning arises from testing localhost while canonical and language URLs target the configured public domain; verify those on the deployed preview.

**Performance remains incomplete.** LCP exceeds the repository's 2.5-second mobile budget. The after-run LCP candidate is the animated third headline line. Profile the headline entrance and initial loader next, then repeat under the same profile. Check all three sold home layouts and representative detail/form pages before setting `performanceReviewedAt`. A score of 100 for automated accessibility does not prove keyboard, screen-reader, contrast throughout scrolled content, or complete route coverage.

## Follow-up: headline, loader, and font

The headline entrance was removed while retaining the background and scroll motion. The initial full-screen loader was removed from the layout. Neither change alone resolved simulated LCP (both follow-up runs measured 6.6 s). See `lighthouse-home-mobile-headline.json` and `lighthouse-home-mobile-no-loader.json`; do not attribute a measured improvement to loader removal.

The Inter preload was the largest early resource at 352,240 bytes. A Latin/extended-Latin, punctuation, currency and mathematical-symbol subset was generated with fontTools 4.66.1 and Brotli 1.2.0. All dictionary glyphs that the original font supports are preserved. Japanese continues to use system fallback, as it did with the original Inter file. The original font and OFL license remain available for buyers needing broader Inter coverage.

The resulting run (`lighthouse-home-mobile-font.json`) scored **82 performance**, 100 automated accessibility, 100 best practices and 92 SEO. LCP **5.0 s**, FCP **1.2 s**, speed index **2.2 s**, TBT **30 ms**, CLS **0**. LCP still exceeds the release budget. Investigate simulated critical resource contention and route payload next, and gather repeat measurements rather than treating one score as certification. Full repository verification and the final font build passed.

## Follow-up: early image requests

Same profile and Lighthouse 13.5.0, fresh production build on port 3562. The font-subset run showed simulated LCP (4,961 ms) tracking simulated TTI (5,066 ms) while observed LCP was 321 ms. Lighthouse's simulation charged the headline paint for every byte requested before it, about 977 KB. Three of those requests were avoidable:

- The first destination stage and filmstrip images were marked `priority`, so they were preloaded alongside the hero even though they sit below the fold. Removed.
- All five stacked destination-stage layers rendered an `<Image>`, and they all fell inside Chrome's lazy-load distance. The stage now mounts only the active slide, the next slide (so autoplay fades into a loaded image), and the outgoing slide.
- Testimonial avatars used Radix `AvatarImage`, which preloads with a JavaScript `new Image()` at hydration, ignoring position. A 44 KB AVIF loaded for a 44 px circle. They now use `next/image` (`sizes="44px"`, lazy).

Three consecutive runs: **84 / 84 / 84 performance**, LCP **4.44 s**, FCP 1.2 s, TBT ~48 ms, CLS 0, transfer 719 KB (from 977 KB). Observed LCP 171–185 ms. Raw report: `lighthouse-home-mobile-images.json`.

**Still over the 2.5 s budget.** What remains before the paint is the 143 KB Inter preload and about 263 KB of JavaScript. The home page is a single client component (`src/features/home/home-page.tsx`) and ships GSAP plus both `framer-motion` and `motion`. The next measurable lever is moving static sections to server components and settling on one animation library. home-2 and home-3 were not re-measured after this pass.

## Follow-up: hero entrance restored

The headline entrance removed earlier gave no measurable LCP gain (6.6 s with and without it), so it was restored. It now runs as a CSS animation (`hero-line-in` / `hero-fade-up` in `globals.css`), so it starts on first paint without waiting for hydration, respects reduced motion, and needs no loader to hide a flash. Line masks gained bottom padding so descenders are no longer clipped. Three runs with the entrance restored: **84 / 84 / 84**, LCP 4.43–4.52 s, CLS 0 — unchanged from before. The full-screen intro loader stays removed.

## Follow-up: generated demo images

After the 16 stock photos were replaced with ChatGPT-generated images (October 6, 2026), two runs on the same profile scored **85 / 85**, LCP 4.28 s, CLS 0, transfer 699 KB. No regression.
