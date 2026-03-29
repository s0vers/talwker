# Performance Budgets

Guardrails for the static marketing surface. No visual redesign required.

## Budget targets

- Home route JS (first load): target <= 220 KB gzipped.
- Largest image candidate for LCP: target <= 250 KB compressed source.
- Route image payload above the fold: target <= 500 KB total.
- LCP target (lab): <= 2.5s on a mid-tier mobile profile.

## Enforced checks

- `pnpm check:image-sizes` fails when a `next/image` tag uses `fill` without `sizes`.
- `pnpm verify` includes image discipline checks before build.

## Authoring policy

- Always set `sizes` for `next/image` with `fill`.
- Use `priority` only for true above-the-fold imagery.
- Reuse existing assets when possible; avoid duplicate large images.
- Prefer responsive width/height or clear `sizes` hints over default full-viewport assumptions.

## Release checklist

- Run `pnpm verify`.
- Confirm no newly introduced unoptimized hero/background assets.
- Confirm home LCP candidate remains the intended hero image/text block.

## Reference material

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [web.dev LCP Guide](https://web.dev/articles/lcp)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
