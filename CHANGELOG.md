# Changelog

All notable changes to Talkwer are recorded here. Versions follow
[semantic versioning](https://semver.org/).

## Unreleased

### Code cleanup

- Remove unused storage readers, tour filtering and parallax helpers, and the
  no-op clear-filter URL wrapper.
- Narrow booking values and time formats without repeated type assertions.
- Keep shared inputs at 16px on mobile to avoid focus zoom, retaining 14px
  desktop text.
- Restrict testimonial transitions to border and shadow, and remove unnecessary
  locale/event-target casts.

- Remove unused deferred count-up code, redundant copy lookup wrappers and
  narrated layout comments.
- Export the static homepage directly and document the invariants behind
  dictionary key assertions.

### Open-source preparation

- Adopt MIT for original code and author-generated demo imagery; retain
  third-party and font notices.
- Replace purchase/support instructions with public setup, contribution, and
  security reporting documentation.
- Upgrade Next.js and its ESLint config from 16.3.8 to 16.4.3 to address
  production dependency advisories.
- Align dependency CI with Node.js 22 and the pnpm version declared by the
  project.
- Validate booking slots before rendering, retain the selected time zone across
  refreshes, and prevent doubled locale prefixes during booking navigation.
- Format booking calendar labels in the active locale and selected time zone,
  avoiding previous-day labels for visitors in another zone.
- Harden demo login return paths and preserve fragments when appending demo
  feedback parameters.
- Subscribe carousel controls to Embla state with cleanup for both selection and
  reinitialization events.
- Initialize testimonial autoplay once without reading mutable refs during
  render.
- Remove unused animation hooks and the unused direct `framer-motion`
  dependency.
- Expand environment-file ignores and exclude local restore artifacts.

### Design and implementation review

- Fix overlapping mobile observatory badges and bring destination search into
  the initial mobile viewport.
- Preserve observatory configurator choices in a prefilled contact draft,
  including its topic and form anchor.
- Expose selected state, expand small controls, correct orange-action and
  informational-text contrast, and honor reduced-motion preferences.
- Label the observatory signal as a visualization and remove nonexistent audio
  and absolute light-pollution guarantees.
- Omit the unnecessary consent overlay from the default demo while retaining the
  reusable component.
- Use explicit tour styles instead of inferring categories from highlights or
  discounts.
- Derive localized article reading times from body text.
- Use the active interface locale for card price formatting, avoiding
  server/browser hydration mismatches.
- Defer next-slide image loading and autoplay until the destination stage is
  visible, and retain manual pause independently from temporary hover/focus
  pauses.
- Record the independent design/code review, verified fixes, accessibility
  checks, and repeatable mobile performance measurements.

### Performance and editorial refinement

- Preload a smaller Inter subset while retaining variable axes, on-demand
  extended Latin coverage and the font OFL.
- Statically generate the default homepage with the Pages Router and build-time
  translations; retain App Router routes elsewhere. Pass typed labels and
  compact card data to interactive sections.
- Render the hero content on the server; use CSS for its entrances and the
  continuous marquee.
- Load below-fold GSAP, destination imagery, mobile navigation and the
  testimonial carousel engine when needed, retaining server-rendered content and
  navigation cleanup.
- Deliver a smaller home utility sheet and a complete utility sheet on other
  routes, retaining responsive styles across client navigation.
- Replace the generic homepage quotation with specific travel copy in all three
  interface locales; refine the article measure, opening paragraph and quote
  spacing.

- Use the supported Next.js Webpack build to reduce the homepage bundle;
  preserve below-fold content and image fallbacks without JavaScript.
- Add `pnpm audit:mobile` to enforce the 2.5-second LCP budget across five fresh
  mobile Chrome runs against a production preview.

## 1.0.0 — 2026-10-06

Initial release.

### Included

- Three home designs: editorial travel, triptych showcase, and nocturnal
  observatory.
- Three destination listing/detail layout families, tour listings and
  itineraries, story listings and long-form story pages.
- About, contact, experiences, FAQ, careers, press, partners, and sample policy
  pages.
- Three login/register designs and sample admin/customer dashboards.
- Date/time selection with a browser-session booking and checkout demonstration
  (no payment processing).
- English, Spanish, and Japanese interface dictionaries with locale routing,
  metadata, and sitemap.
- Built on Next.js 16.3.8, React 19, TypeScript, and Tailwind CSS v4.
- Self-hosted Inter variable font (SIL Open Font License); builds make no font
  network requests.
- Offline HTML documentation, third-party notices, and dimension-matched
  placeholder images.

### Release preparation fixes

- Newsletter validates email addresses and shows translated demo feedback.
- Sample card fields are read-only; booking handoff data is validated and
  storage failures are reported.
- Demo account, booking, and checkout routes are excluded from search indexing
  and the sitemap.
- Improved text and button contrast, keyboard focus styles, and reduced-motion
  handling.
- Below-the-fold images no longer load with the hero; the home hero entrance
  runs in CSS without waiting for JavaScript.

## Version history

| Version | Date       | Notes            |
| ------- | ---------- | ---------------- |
| 1.0.0   | 2026-10-06 | Initial release. |
