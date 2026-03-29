# Release Checklist

Run this checklist before merging release-bound changes.

- [ ] `pnpm verify` passes locally.
- [ ] `pnpm check:image-sizes` passes for all `next/image fill` usage.
- [ ] Accessibility checklist reviewed (`docs/ACCESSIBILITY_CHECKLIST.md`).
- [ ] SEO playbook requirements satisfied (`docs/SEO_PLAYBOOK.md`).
- [ ] Performance budget policy reviewed (`docs/PERFORMANCE_BUDGETS.md`).
- [ ] Dependency governance checks reviewed (`docs/DEPENDENCY_GOVERNANCE.md`).
- [ ] No visual design drift on home sections.
- [ ] No motion behavior drift on GSAP sections.
