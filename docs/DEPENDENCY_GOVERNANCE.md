# Dependency Governance

Dependency hygiene policy for open-source maintenance.

## Cadence

- Weekly: run `pnpm deps:outdated` and review major/minor drift.
- Monthly: run `pnpm deps:audit` and triage high/critical findings.
- Before release: run full `pnpm verify`.

## Update policy

- Prefer incremental upgrades over large version jumps.
- Upgrade one risk area at a time (framework, UI libs, tooling).
- Document notable dependency changes in PR summary.
- Avoid adding libraries for one-off utilities if native APIs suffice.

## Operational commands

- `pnpm deps:outdated`
- `pnpm deps:audit`
- `pnpm verify`

## CI workflow

- `.github/workflows/dependency-governance.yml` runs weekly and on-demand.
- Keep this workflow aligned with local command names in `package.json`.

## Maintenance note

Keep dependency scripts and release gates simple. Use the pinned pnpm version and Node.js 22+ in both CI workflows. The project currently has no configured test runner; validate behavior changes in a production preview.

## Reference material

- [pnpm outdated](https://pnpm.io/cli/outdated)
- [pnpm audit](https://pnpm.io/cli/audit)
- [Semantic Versioning](https://semver.org/)
