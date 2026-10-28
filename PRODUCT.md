# PRODUCT.md

## Platform
web

## Users and Situation
Discerning modern travelers, cultural explorers, and photography enthusiasts seeking bespoke journeys, curated expeditions, and immersive travel essays. Talkwer also functions as a premium, editorial travel website theme/template where multiple parallel layout variations for the same resource (e.g., destinations, destination details) are intentionally demonstrated.

## Product Purpose and Positioning
Talkwer is a static editorial travel magazine and curated expedition platform. It bridges magazine-grade visual storytelling with actionable itineraries, interactive destination mapping, and intuitive booking flows.
Tagline: *Wander. Discover. Share.*

## Modes and Operating Context
- **Persuade**: Landing showcases, homepage hero, featured expedition highlights, and curated tour teasers. High-impact editorial photography, bold typography, and committed accent framing.
- **Read**: Long-form travel stories, cultural narratives, destination philosophy essays, and transparent policy documents. Maximum legibility, thoughtful typographic hierarchy, and distraction-free measure.
- **Operate**: Interactive tour booking flows, guest and date pickers, multi-step checkout modals, and dynamic catalog filters. Dense, predictable controls, clear micro-feedback, and legible states.
- **Experience**: Interactive dotted world map route exploration, cinematic scroll-driven story spreads, and atmospheric visual galleries.

## Capabilities and Constraints
- **Architecture**: Next.js 16 with a static Pages Router homepage and App Router supporting pages, `[locale]` routing, React 19, Tailwind CSS v4, and feature-first modules (`src/features/*`).
- **Internationalization (i18n)**: English (`en`), Spanish (`es`), and Japanese (`ja`) interface dictionaries via `next-intl`, localized navigation, and a localized booking calendar. Some feature copy and catalog content remain English; coverage is partial.
- **Single-Mode Perpetual Dark**: The site operates exclusively in dark mode (`#050505` canvas); no light theme exists or is planned. All components and primitives must be designed and styled specifically for dark surfaces.
- **Static Showcase**: No live backend database or external server dependencies. All destination, tour, and story data is statically driven.
- **Theme Multi-Template Support**: Multiple parallel page variations for identical resources (e.g. `/destinations`, `/destinations-2`, `/destinations-3`, `/destination-details-2`, etc.) are intentional template options and should be preserved.
- **Design Stability**: Global visual identity and GSAP scroll choreography follow strict no-design-drift principles unless explicitly redesigned.

## Brand Commitments
- **Voice**: Evocative, sophisticated, authentic, adventurous, and restrained. Never frantic, aggressive, or generic SaaS-like.
- **Wordmark Identity**: Lowercase wordmark `talkwer` anchored by an electric orange full stop (`<span className="text-orange-500">.</span>`).
- **Surface Tone**: Deep nocturnal elegance with warm orange energy highlights.

## Evidence on Hand
- Curated static destination catalog (`DESTINATIONS` dataset with geographic coordinates, highlights, and tags).
- High-resolution travel photography assets and curated tour package itineraries.
- No live payment processor or real-time user database exists; mock checkout and booking flows simulate the user journey truthfully without inventing fake backend endpoints.

## Accessibility and Motion Principles
- Fully responsive across mobile, tablet, and widescreen viewports with fluid `pad-x` rhythm.
- Target WCAG AA contrast across dark surfaces; validate affected routes and states instead of asserting site-wide certification.
- GSAP animations and ScrollTrigger sequences must honor `prefers-reduced-motion` with instant, clean fallbacks.
