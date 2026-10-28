# Performance Budgets

Guardrails for the static marketing surface. No visual redesign required.

## Budget targets

- Home route JS (first load): target <= 220 KB gzipped.
- Largest image candidate for LCP: target <= 250 KB compressed source.
- Route image payload above the fold: target <= 500 KB total.
- LCP target (lab): <= 2.5s on a mid-tier mobile profile.

## Enforced checks

- `pnpm check:image-sizes` fails when a `next/image` tag uses `fill` without
  `sizes`.
- `pnpm verify` includes image discipline checks before build.

## Authoring policy

- Always set `sizes` for `next/image` with `fill`.
- Use `priority` only for true above-the-fold imagery.
- Reuse existing assets when possible; avoid duplicate large images.
- Prefer responsive width/height or clear `sizes` hints over default
  full-viewport assumptions.
- Keep `public/` rasters under 400 KB (`pnpm check:public-image-bytes`). Run
  `pnpm compress:public-images` before committing oversized sources.

## Release checklist

- Run `pnpm verify`.
- Confirm no newly introduced unoptimized hero/background assets.
- Confirm home LCP candidate remains the intended hero image/text block.

## Latest local measurement

October 28, 2026: direct `next start`, supported Webpack build, unchanged
default simulated mobile Lighthouse, five fresh Chrome runs of the default
English homepage: **2.483s, 2.482s, 2.482s, 2.485s, 2.485s LCP**. Every run
passed the strict < 2.5s budget. Initial script transfer is 148,777 bytes, below
the 220KB target. Worst-case lab margin is about 15ms; field performance still
depends on the deployment and device.

Run `pnpm audit:mobile http://localhost:<port>` with Chrome installed against a
production server, without concurrent checks. It fails if any of five runs
reaches 2.5s. See
[profile, implementation and verification](reviews/2026-10-28/README.md).

## Reference material

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [web.dev LCP Guide](https://web.dev/articles/lcp)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
