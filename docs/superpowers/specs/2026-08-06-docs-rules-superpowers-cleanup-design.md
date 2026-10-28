# Docs, Rules, and Superpowers Cleanup — Design

Date: 2026-08-06  
Status: approved for planning  
Scope: documentation / agent contracts / gitignore only — no theme or frontend work

## Goal

Stop duplicate and overlapping agent guidance from burning context before theme work. Establish one ownership tree: human docs, Cursor rules, Superpowers process docs, and ignored local runtime state.

## Decisions locked

- Hard consolidate (not light tidy).
- Agent operating memory: `AGENTS.md` + slim `.cursor/rules` only; delete `.cursor/docs/`.
- Compress six rules into three; keep the three Talkwer skills (retarget paths).
- Keep living product docs; remove stale migration narrative (`docs/REFACTOR_NOTES.md`).
- Canonical split: humans → `docs/`; process → `docs/superpowers/{specs,plans}/` (committed); runtime → `.superpowers/` (gitignored).

## Target tree

```
AGENTS.md
docs/
  README.md
  INDEX.md
  ACCESSIBILITY_CHECKLIST.md
  SEO_PLAYBOOK.md
  PERFORMANCE_BUDGETS.md
  DEPENDENCY_GOVERNANCE.md
  RELEASE_CHECKLIST.md
  DESTINATION_DETAILS_PHILOSOPHY.md
  THIRD_PARTY_LICENSES.md
  superpowers/
    specs/          # committed design specs
    plans/          # committed implementation plans
.cursor/
  rules/
    talkwer-architecture.mdc
    talkwer-design.mdc
    talkwer-quality.mdc
  skills/
    talkwer-clean-refactor/
    talkwer-component-audit/
    talkwer-release-check/
.superpowers/       # gitignored local runtime only
```

## Delete

- `.cursor/docs/PROJECT_MEMORY.md`
- `.cursor/docs/DESIGN_MEMORY.md`
- `.cursor/docs/motion-lifecycle.md`
- `.cursor/docs/` directory after empty
- Old rules after merge (end state: exactly the three files in the target tree):
  - overwrite/rewrite `talkwer-architecture.mdc` with architecture + reusability
  - create `talkwer-design.mdc`; delete `talkwer-design-principles.mdc` and `talkwer-visual-contract.mdc`
  - create `talkwer-quality.mdc`; delete `talkwer-quality-gates.mdc` and `talkwer-motion-contract.mdc`
  - delete `talkwer-reusability.mdc` after fold into architecture
- `docs/REFACTOR_NOTES.md`
- Optionally add empty `docs/superpowers/plans/.gitkeep` so the plans directory is tracked before the first plan lands

## Rule merge map

| New file | Folded sources | Globs |
|---|---|---|
| `talkwer-architecture.mdc` | architecture + reusability | `src/**/*.{ts,tsx}` |
| `talkwer-design.mdc` | design-principles + visual-contract + unique token facts from `DESIGN_MEMORY` if missing | `src/**/*.{tsx,css}` |
| `talkwer-quality.mdc` | quality-gates + motion-contract + essential invariants from `motion-lifecycle.md` | `src/**/*.{ts,tsx,css}` |

Merge policy: preserve contracts; remove duplicated prose; no intentional change to visual/motion/architecture policy.

## Skills

Keep all three. Update minimal context bundles:

- Drop every `.cursor/docs/*` reference.
- Point to new rule filenames + `AGENTS.md` / `docs/INDEX.md` as needed.
- Release-check → `talkwer-quality.mdc`
- Clean-refactor → architecture + design
- Component-audit → architecture

## Index, AGENTS, gitignore, PR template

### `docs/INDEX.md`

Single map for:

- Living product docs
- Agent contracts (the three rules)
- Superpowers: `docs/superpowers/specs|plans` vs `.superpowers/` runtime
- New-route + maintenance checklists with updated paths
- Remove the “AI/project memory” / `.cursor/docs` section

### `AGENTS.md`

Keep command table, verify notes, CSS caveat. Add a short “where truth lives” pointer to `docs/INDEX.md` and the three rules. Do not reference `.cursor/docs`.

### `.gitignore`

Add:

```
.superpowers/
```

### `.github/pull_request_template.md`

Replace “docs/rules/memory” wording with sync of docs/rules and Superpowers specs/plans when process docs change.

## Verification

- `pnpm verify` passes (no app behavior change expected).
- `git check-ignore -v .superpowers/` confirms ignore.
- Grep: no remaining references to `.cursor/docs`, deleted rule filenames, or `REFACTOR_NOTES` in living docs/skills/rules/AGENTS/PR template.
- Exactly three `.cursor/rules/*.mdc` files remain.

## Out of scope

- Theme / frontend redesign
- Application code refactors
- Rewriting destination philosophy content
- Changing `pnpm verify` script set

## Success criteria

- One clear ownership model; no parallel “memory” layer
- Superpowers folders exist and are documented in INDEX
- Local `.superpowers/` cannot be committed by accident
- Agent context load is three rules + AGENTS + task files, not six rules + three memory docs + overlapping product docs
