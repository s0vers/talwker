# Talkwer Project Memory Index

This file is the compact entry point for project context to reduce repeated
prompt payloads in future sessions.

## Memory precedence

1. `AGENTS.md` (workspace-level defaults and execution notes)
2. `.cursor/rules/talkwer-visual-contract.mdc`
3. `.cursor/rules/talkwer-design-principles.mdc`
4. `.cursor/rules/talkwer-architecture.mdc`
5. `.cursor/rules/talkwer-reusability.mdc`
6. `.cursor/rules/talkwer-motion-contract.mdc`
7. `.cursor/rules/talkwer-quality-gates.mdc`
8. `.cursor/docs/DESIGN_MEMORY.md` (human-friendly detailed design context)
9. `.cursor/docs/motion-lifecycle.md` (GSAP lifecycle reference)
10. `docs/SEO_PLAYBOOK.md` (metadata conventions for new routes)
11. `docs/RELEASE_CHECKLIST.md` (release gate sequence)

## Minimal context load strategy

For most tasks, load only:

- `.cursor/docs/PROJECT_MEMORY.md`
- one relevant rule file
- files being edited

Load broad docs only when necessary.

## Short operating contracts

- Keep Talkwer design unchanged unless explicitly requested.
- Prefer focused reuse over generic abstractions.
- Keep feature content data centralized and typed.
- Keep feature file names kebab-case.
- Run `pnpm verify` before finalizing refactors.

