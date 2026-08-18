# DESIGN.md

## Overview
Creative North Star: *"The Nocturnal Expedition"*

Talkwer embodies the visual gravity of a high-end coffee-table travel journal translated into a responsive, motion-rich web medium. The website operates exclusively on a single-mode dark canvas (`#050505` / `#0a0a0a`); no light mode is planned or supported. High-definition travel photography is framed with generous spatial air, disciplined monochrome typographic hierarchy, and sharp pulses of warm orange (`orange-500`).

## Colors
- **System Policy**: Single-mode dark system. All tokens and components evaluate against dark surfaces.
- **Canvas & Surfaces**:
  - Main Page Shell: `#050505` (`bg-[#050505]`)
  - Elevated Section Panel: `#0a0a0a` (`bg-[#0a0a0a]`)
  - Card & Container Surface: `#121212` / `hsl(215 25% 8%)`
  - Popover / Sheet Surface: `#161616` / `hsl(215 25% 8%)`
- **Brand Accents**:
  - Primary Action / Signature Accent: `rgb(249, 115, 22)` (`#f97316` / `orange-500` / `hsl(24 95% 53%)`)
  - Warm Amber Secondary: `hsl(43 96% 56%)`
  - Story Highlight (rough-notation): `hsl(24 95% 53%)`
- **Typography & Opacity Steps**:
  - Crisp Primary: `#ffffff` (`text-white`)
  - Secondary / Supporting Body: `rgba(255, 255, 255, 0.75)` (`text-white/75`)
  - Muted Editorial: `rgba(255, 255, 255, 0.60)` (`text-white/60`)
  - Subtle Label / Timestamp: `rgba(255, 255, 255, 0.40)` (`text-white/40`)
  - Faint Accent / Watermark: `rgba(255, 255, 255, 0.15)` (`text-white/15`)
- **Borders & Dividers**:
  - Hairline Border: `rgba(255, 255, 255, 0.06)` (`border-white/[0.06]`)
  - Interactive Hover Border: `rgba(255, 255, 255, 0.18)` (`border-white/[0.18]`)
  - Accent Border: `border-orange-500`

## Typography
- **Font Family**: Inter (`sans-serif`) across all routes and editorial layouts.
- **Display Headlines**: Large fluid scale using `clamp(...)`, tight line height (`leading-[1.05]` to `leading-tight`), and aggressive tracking reduction (`tracking-tighter` / `tracking-tight`).
- **Editorial Subheaders & Eyebrows**: Small caps styling (`uppercase`, `tracking-[0.15em]` to `tracking-[0.2em]`, `text-[11px]` to `text-[13px]`, `font-medium` or `font-semibold`).
- **Body & Long-Form**: High-legibility measure (`max-w-prose` or `max-w-3xl`), `text-white/80`, `leading-relaxed` (`1.65`–`1.75`), clear paragraph spacing.

## Elevation
- **Philosophy**: Flat, optical layering rooted in contrast and hairlines rather than heavy drop shadows.
- **Depth Layers**:
  - `Level 0 (Base)`: Deep flat black `#050505`.
  - `Level 1 (Sections)`: Subtle shift to `#0a0a0a` with top/bottom `border-white/[0.06]`.
  - `Level 2 (Cards & Modules)`: `#121212` with `border-white/[0.08]` and optional low-intensity ambient glow on hover.
  - `Level 3 (Overlays & Dialogs)`: `bg-[#050505]/90` or `bg-black/80` with `backdrop-blur-md` and `border-white/[0.12]`.

## Components
- **Buttons**:
  - *Primary*: `bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-colors`.
  - *Secondary / Outline*: `border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-full`.
  - *Ghost / Link*: `text-white/70 hover:text-orange-500 transition-colors inline-flex items-center gap-2`.
- **Cards (Destination & Tour)**:
  - High-resolution photographic cards with `aspect-[4/3]` or `aspect-[16/10]`.
  - Gradient overlays (`bg-gradient-to-t from-black/90 via-black/30 to-transparent`).
  - Subtle hover zoom (`group-hover:scale-105 duration-500`).
- **Badges & Pill Tags**:
  - Rounded capsule format (`rounded-full px-3 py-1 text-xs border border-white/[0.08] bg-white/[0.04] text-white/70`).
- **Forms & Inputs**:
  - Dark inputs (`bg-white/[0.04] border-white/[0.10] focus:border-orange-500 text-white placeholder:text-white/30 rounded-xl`).
- **Motion & Interactive Elements**:
  - Dotted SVG world maps with glowing destination hubs and pulsed connection arcs.
  - Smooth GSAP ScrollTrigger transitions with strict `prefers-reduced-motion` bypass.

## Do's and Don'ts
- **DO**:
  - Preserve the `#050505` dark luxury shell across all pages and sections.
  - Use the utility `.pad-x` (`px-5 md:px-10 lg:px-16 xl:px-24`) for consistent horizontal margins.
  - Use `text-orange-500` for the brand full stop (`talkwer.`), primary CTA accents, and active indicators.
  - Keep typography clean in Inter, relying on weight and letter-spacing for editorial texture.
  - Honor `prefers-reduced-motion` in every GSAP or CSS animation.
- **DON'T**:
  - DON'T create light-theme full-page backgrounds or harsh white cards.
  - DON'T use generic AI design tropes: purple gradients on dark backgrounds, glowing rainbow borders, or icon-stuffed bento boxes.
  - DON'T introduce uncoordinated font families (serif/mono) without an intentional design spec.
  - DON'T use arbitrary red, green, or blue accent buttons when orange is the established brand accent.
