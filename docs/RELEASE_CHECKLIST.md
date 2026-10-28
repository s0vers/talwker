# Release Checklist

Run this checklist before merging release-bound changes.

- [ ] `pnpm verify` passes locally.
- [ ] `pnpm check:image-sizes` passes for all `next/image fill` usage.
- [ ] Accessibility checklist reviewed (`docs/ACCESSIBILITY_CHECKLIST.md`).
- [ ] SEO playbook requirements satisfied (`docs/SEO_PLAYBOOK.md`).
- [ ] `pnpm audit:mobile http://localhost:<port>` passes all five fresh mobile
      runs against a production server, without concurrent checks.
- [ ] Performance budget policy reviewed (`docs/PERFORMANCE_BUDGETS.md`).
- [ ] Dependency governance checks reviewed (`docs/DEPENDENCY_GOVERNANCE.md`).
- [ ] No visual design drift on home sections.
- [ ] No motion behavior drift on GSAP sections.

## Open-source distribution

- [ ] `pnpm install --frozen-lockfile` succeeds using the declared pnpm version
      and Node.js 22.19+.
- [ ] `pnpm deps:audit` has no unresolved production vulnerabilities.
- [ ] README commands, feature boundaries, and known limitations match the
      shipped code.
- [ ] MIT `LICENSE`, third-party component notices, and the Inter OFL are
      retained.
- [ ] New assets have recorded provenance and a distribution license.
- [ ] Public downloads contain no credentials, `.env.local`, build output, or
      temporary author files.
- [ ] Behavior changes have been exercised in a production browser preview; link
      changes have been crawled.
- [ ] CONTRIBUTING, SECURITY, and the changelog reflect the current release.

Marketplace submission evidence and placeholder packaging are historical tools,
not open-source release requirements.
