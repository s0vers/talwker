# Talkwer Motion Lifecycle Guide

Use this guide to keep GSAP implementation consistent across feature sections
without changing animation feel.

## Default pattern

- Prefer `useGsapContext(scopeRef, animation, deps)` from `@/lib/useGsap`.
- Keep timeline/tween values unchanged (duration, easing, start/end, scrub).
- Keep target refs scoped to the section root.

## When to use `useGsapContext`

- Any section-level animation with ScrollTrigger.
- Any animation that needs cleanup on unmount.
- Any animation that should respect reduced motion automatically.

## When plain `useEffect` is acceptable

- Non-GSAP state effects (e.g. navbar scroll state, event listeners).
- Logic unrelated to GSAP/ScrollTrigger.

## Invariants

- No visual drift during refactors.
- No timing/easing/trigger drift during refactors.
- No leaked triggers or stale contexts after navigation/unmount.

