# Talkwer Clean Refactor Skill

## Purpose

Execute clean-code refactors on Talkwer while preserving current UI output.

## Trigger

Use when asked to improve code quality, modularity, or reuse without redesign.

## Minimal context bundle

- `.cursor/docs/PROJECT_MEMORY.md`
- `.cursor/rules/talkwer-visual-contract.mdc`
- `.cursor/rules/talkwer-architecture.mdc`
- `.cursor/rules/talkwer-reusability.mdc`
- target files only

## Checklist

1. Confirm no-design-change constraint.
2. Extract duplicate types/content into shared modules (feature `lib/` or `shared/` per `talkwer-architecture.mdc`).
3. Extract stable repeated UI patterns into small primitives.
4. Keep bespoke sections custom.
5. Validate imports follow feature/shared boundaries (`@/shared/*` never imports `@/features/*`).
6. Run `pnpm verify` (or at minimum lint, typecheck, and build).

## Output format

- Changed files list
- Reuse improvements made
- Risk notes
- Verification results

