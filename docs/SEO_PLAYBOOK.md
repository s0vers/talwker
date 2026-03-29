# SEO Playbook

Standard contract for every current and future route.

## Core architecture

- `src/lib/seo.ts` is the single source for:
  - site defaults (`SEO_DEFAULTS`),
  - canonical resolution (`resolveCanonicalUrl`),
  - route metadata factory (`createPageMetadata`),
  - global metadata (`createBaseMetadata`),
  - JSON-LD baseline helpers.
- `src/shared/types/seo.ts` defines `SeoConfig` for typed per-page metadata.
- `src/app/layout.tsx` owns global defaults and baseline JSON-LD.
- `src/app/robots.ts` and `src/app/sitemap.ts` provide crawl/index baselines.

## Required route metadata fields

Every route should set:

- `title`
- `description`
- `path` (canonical route path)

Optional overrides:

- `imagePath`
- `keywords`
- `index` / `follow`
- `type` (`website` or `article`)
- `absoluteTitle` (use for home/root or pages that should bypass the title template)

## Route pattern

Use this in route files:

```ts
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Title",
  description: "Page description",
  path: "/page-path",
});
```

Home/root pattern (prevent duplicate brand suffix):

```ts
export const metadata: Metadata = createPageMetadata({
  title: "Talkwer — Wander. Discover. Share.",
  description: "Homepage description",
  path: "/",
  absoluteTitle: true,
});
```

## Conventions

- Title format: route title + brand via template (`%s | Talkwer`) from layout defaults.
- Canonical URLs must be absolute via `resolveCanonicalUrl`.
- Open Graph/Twitter fall back to defaults and allow per-route overrides.
- Index/follow defaults to `true` and should only be disabled deliberately.
- Canonical, Open Graph URL, and Twitter image should all derive from the same canonical/source path.

## JSON-LD baseline

Layout includes:

- `Organization`
- `WebSite`

Add page-specific JSON-LD only when content justifies it (e.g., article, FAQ, breadcrumb).

Reusable helpers in `src/lib/seo.ts`:

- `getBreadcrumbJsonLd(items)`
- `getArticleJsonLd(article)`

These are the preferred defaults for future content/detail routes.

## Reference material

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Central: Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Open Graph Protocol](https://ogp.me/)
