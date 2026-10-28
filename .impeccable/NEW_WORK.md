# Direction for New Surfaces

When creating new surfaces, pages, or feature modules in the Talkwer design system, follow this canonical flow.

---

## 1. Surface Architecture Pattern

1. **Route entry**: Thin page wrapper under `src/app/[locale]/<route>/page.tsx`.
2. **Feature entry**: `src/features/<feature>/<feature>-page.tsx`.
3. **Feature sections**: `src/features/<feature>/sections/*`.
4. **Shared UI**: Import shared components from `@/shared/ui` (never duplicate card or button markup).

---

## 2. Visual Rules for New Surfaces

- **Canvas Shell**: Always set `bg-[#050505]` on the root section or main shell.
- **Section Panels**: Use `bg-[#0a0a0a]` for elevated content blocks and feature dividers.
- **Horizontal Rhythm**: Always apply `.pad-x` (`px-5 md:px-10 lg:px-16 xl:px-24`) to full-width sections.
- **Accent Hierarchy**: Primary action buttons and focus rings must use `orange-500` (`#f97316`).
- **Typography**: Inter only. Use fluid display scales `clamp(...)` with `tracking-tighter` and small-caps editorial eyebrows (`uppercase tracking-[0.25em] text-[11px]`).
- **Motion**: If GSAP animations are used, register `useGsapContext` and always guard with `prefersReducedMotion()`.
- **Hero Reveal Signature**: Wrap individual headline rows in their own `div.overflow-hidden` container.

---

## 3. Registering the Surface

Once implemented, add the new surface to `.impeccable/surfaces/surfaces.json`:

```json
{
  "id": "new-feature",
  "name": "Feature Name",
  "route": "/[locale]/new-feature",
  "mode": "persuade | read | operate | explore",
  "featureEntry": "src/features/new-feature/new-feature-page.tsx"
}
```

---

## 4. Verification Check

Before completing any new surface, run:
```bash
pnpm doctor
pnpm detect
pnpm verify
```
