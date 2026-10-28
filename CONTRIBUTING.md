# Contributing to Talkwer

Thanks for helping improve the project. Reproducible bug reports, documentation fixes, accessibility improvements, and focused code changes are welcome.

## Before starting

Search existing issues before opening a new one. For a bug, include the route, reproduction steps, expected and actual behavior, browser/OS, Node and pnpm versions, and relevant console output. Use fictional data in screenshots and reports.

For larger features or visual redesigns, open an issue explaining the problem and proposed behavior before investing in implementation. Report security issues privately as described in [SECURITY.md](SECURITY.md).

## Local setup

Follow the [README](README.md#getting-started). Use Node.js 22+ and the pnpm version in `package.json`, install with `pnpm install --frozen-lockfile`, and work on a branch.

## Code conventions

- Keep app routes thin. Put feature entries, sections, copy, and helpers under `src/features/<name>/`, following a sibling feature such as `about`, `destinations`, or `contact`.
- Use kebab-case for feature filenames. Keep primitives in `src/components/ui/` and reusable app compositions in `src/shared/ui/`.
- Shared code must not import feature modules. Shared catalogs currently live in `src/features/home/content/`.
- Preserve the existing design and animation intent during fixes. Describe intentional visual changes in the pull request.
- Use the scoped GSAP context helper in `src/lib/useGsap.ts`, clean up effects and listeners, and respect reduced-motion preferences.
- Keep message keys and ICU placeholders aligned across the three dictionaries.
- Give `next/image` fill images an appropriate `sizes` value and keep public source images within the byte budget.
- Format files you change with Prettier. Avoid unrelated repository-wide formatting.

See [docs/INDEX.md](docs/INDEX.md) and `.cursor/rules/` for the full architecture and quality contracts. Agent-specific instructions live in `AGENTS.md`; no editor plugin or local agent runtime is required to contribute.

## Validate your changes

Run `pnpm verify` and `pnpm deps:audit`. The verify command builds the app and checks lint, types, filenames, and images. The project has no configured test runner.

For behavior or visual changes, run `pnpm start` after building and verify the affected routes, a narrow viewport, keyboard interaction, and reduced motion where applicable. Use a production build for visual checks because development can serve missing CSS. Describe exactly what you checked; do not claim coverage you did not perform.

For link changes, run `pnpm audit:preview-links http://localhost:3000` against the production preview. This only crawls English server-rendered anchors.

## Pull requests

Explain the problem, resulting behavior, and validation. Include before/after screenshots for visible changes and list any remaining limitations. Keep unrelated work in separate pull requests and update documentation when commands, behavior, or file locations change.

Preserve third-party notices and submit only assets you have permission to contribute. Contributions are provided under the project's MIT license, except for clearly identified third-party material under its original license.
