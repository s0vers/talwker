# Talkwer Clean Code + AI Memory Migration Notes

## What changed

### Architecture and boundaries

- Added active feature entrypoint:
  - `src/features/home/home-page.tsx`
- Route now imports feature entrypoint directly:
  - `src/app/page.tsx`
- Added a cleaner feature-owned section surface:
  - `src/features/home/sections/index.ts`
- Removed unused legacy/Voyager modules entirely to reduce buyer confusion.

### Centralized types and content

- Added shared domain types:
  - `src/shared/types/domain.ts`
- Added feature content modules:
  - `src/features/home/content/destinations.ts`
  - `src/features/home/content/tours.ts`
  - `src/features/home/content/testimonials.ts`
- Removed duplicate global domain interfaces.

### Reusable primitives

- Added shared UI primitives:
  - `src/shared/ui/section-heading.tsx`
  - `src/shared/ui/section-cta.tsx`
  - `src/shared/ui/pill-badge.tsx`
- Added shared UI barrel export:
  - `src/shared/ui/index.ts`
- Migrated repeated patterns into feature sections under:
  - `src/features/home/sections/destinations.tsx`
  - `src/features/home/sections/featured-tours.tsx`
  - `src/features/home/sections/testimonials.tsx`

### Motion and accessibility hardening

- Standardized GSAP hook usage in feature sections:
  - `src/features/home/sections/about.tsx`
  - `src/features/home/sections/cta.tsx`
  - `src/features/home/sections/newsletter.tsx`
  - `src/features/home/sections/hero.tsx`
  - `src/features/home/sections/destinations.tsx`
  - `src/features/home/sections/marquee.tsx`
- Replaced placeholder `href="#"` actions with semantic buttons where no route
  exists.
- Added input labeling/autocomplete for newsletter email field.

### Quality gates

- Added scripts:
  - `typecheck`, `format`, `format:check`
- Intentionally removed test/Playwright setup for a simpler frontend showcase
  handoff.

## Verification completed

- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.

## AI memory and skills rollout

### Memory files

- Added:
  - `.cursor/rules/talkwer-visual-contract.mdc`
  - `.cursor/rules/talkwer-architecture.mdc`
  - `.cursor/rules/talkwer-reusability.mdc`
  - `.cursor/rules/talkwer-motion-contract.mdc`
  - `.cursor/rules/talkwer-quality-gates.mdc`
  - `.cursor/docs/PROJECT_MEMORY.md`

### Project skills

- Added:
  - `.cursor/skills/talkwer-clean-refactor/SKILL.md`
  - `.cursor/skills/talkwer-component-audit/SKILL.md`
  - `.cursor/skills/talkwer-release-check/SKILL.md`

## How to reduce token usage going forward

Use this short context policy for most tasks:

1. Load `.cursor/docs/PROJECT_MEMORY.md`.
2. Load one relevant rule file only.
3. Load target files only.
4. Run matching project skill checklist for the task type.

