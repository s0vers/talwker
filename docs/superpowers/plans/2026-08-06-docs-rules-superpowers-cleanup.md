# Docs / Rules / Superpowers Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize Talkwer agent/docs ownership: three Cursor rules, living `docs/`, committed `docs/superpowers/`, gitignored `.superpowers/`, and no `.cursor/docs` memory layer.

**Architecture:** Merge six overlapping `.mdc` rules into three; delete `.cursor/docs` and `docs/REFACTOR_NOTES.md`; retarget skills and indexes; add Superpowers folders + `.gitignore` entry. No application source changes.

**Tech Stack:** Markdown / Cursor `.mdc` rules / git / pnpm verify gates (no app code).

## Global Constraints

- No theme or frontend redesign in this plan.
- No intentional change to visual, motion, or architecture policy — compress only.
- End state: exactly three files under `.cursor/rules/`.
- Commit `docs/superpowers/{specs,plans}/`; gitignore `.superpowers/` only.
- Prefer `pnpm` for any package scripts.
- Historical mentions inside `docs/superpowers/specs/*` describing the cleanup itself are allowed; living docs/skills/AGENTS/PR template must not reference deleted paths.

---

## File map

| Path | Action |
|---|---|
| `.cursor/rules/talkwer-architecture.mdc` | Rewrite (architecture + reusability) |
| `.cursor/rules/talkwer-design.mdc` | Create (design-principles + visual-contract) |
| `.cursor/rules/talkwer-quality.mdc` | Create (quality-gates + motion-contract + lifecycle invariants) |
| `.cursor/rules/talkwer-design-principles.mdc` | Delete |
| `.cursor/rules/talkwer-visual-contract.mdc` | Delete |
| `.cursor/rules/talkwer-quality-gates.mdc` | Delete |
| `.cursor/rules/talkwer-motion-contract.mdc` | Delete |
| `.cursor/rules/talkwer-reusability.mdc` | Delete |
| `.cursor/docs/*` | Delete entire directory |
| `docs/REFACTOR_NOTES.md` | Delete |
| `docs/superpowers/plans/.gitkeep` | Create (if needed) |
| `.gitignore` | Add `.superpowers/` |
| `AGENTS.md` | Add where-truth-lives pointer |
| `docs/INDEX.md` | Rewrite index sections |
| `docs/README.md` | Drop REFACTOR_NOTES if listed; keep extended docs list accurate |
| `docs/DESTINATION_DETAILS_PHILOSOPHY.md` | Retarget motion doc pointers to `talkwer-quality.mdc` |
| `.github/pull_request_template.md` | Fix docs sync wording |
| `.cursor/skills/*/SKILL.md` | Retarget context bundles |

---

### Task 1: Gitignore + Superpowers plans scaffold

**Files:**
- Modify: `.gitignore`
- Create: `docs/superpowers/plans/.gitkeep`

**Interfaces:**
- Consumes: none
- Produces: ignored `.superpowers/`; tracked empty `plans/` directory alongside existing `specs/`

- [ ] **Step 1: Append ignore rule**

Add to the end of `.gitignore`:

```
# Superpowers local runtime (brainstorm companion, SDD progress, etc.)
.superpowers/
```

- [ ] **Step 2: Ensure plans directory is tracked**

Create `docs/superpowers/plans/.gitkeep` with empty contents (or a single newline).

- [ ] **Step 3: Verify ignore**

Run (PowerShell):

```powershell
git check-ignore -v .superpowers/
```

Expected: a line showing `.gitignore` matches `.superpowers/`. If the path does not exist yet, create a temp file and re-check:

```powershell
New-Item -ItemType Directory -Force -Path .superpowers | Out-Null
New-Item -ItemType File -Force -Path .superpowers/.keep | Out-Null
git check-ignore -v .superpowers/.keep
Remove-Item -Recurse -Force .superpowers
```

Expected: `gitignore` rule hits `.superpowers/.keep`.

- [ ] **Step 4: Commit**

```powershell
git add .gitignore docs/superpowers/plans/.gitkeep
git commit -m @"
chore: gitignore .superpowers and track plans dir

Keep Superpowers runtime local; ensure docs/superpowers/plans is versioned.
"@
```

---

### Task 2: Write the three merged Cursor rules

**Files:**
- Modify: `.cursor/rules/talkwer-architecture.mdc`
- Create: `.cursor/rules/talkwer-design.mdc`
- Create: `.cursor/rules/talkwer-quality.mdc`

**Interfaces:**
- Consumes: content from the six existing rule files + motion-lifecycle invariants
- Produces: final rule filenames used by Tasks 3–5

- [ ] **Step 1: Overwrite `talkwer-architecture.mdc`**

Replace entire file with:

```mdc
---
description: Talkwer architecture boundaries and reusability thresholds
globs: src/**/*.{ts,tsx}
alwaysApply: false
---

# Talkwer architecture

## Folder intent

- `src/features/*`: feature-level composition. Use `src/features/<name>/content/` for page-specific copy; `src/features/<name>/lib/` for feature-local hooks and pure helpers. Shared catalog data used on multiple routes may live in `src/features/home/content/`.
- `src/shared/*`: reusable primitives, shared domain types, and reusable helpers.
- `src/components/ui/*`: shadcn primitives and low-level UI building blocks.

## Canonical UI split

- Keep shadcn primitives in `src/components/ui/*`.
- Keep app-specific reusable compositions in `src/shared/ui/*`.
- Do not place page-specific sections in either UI folder.

## Import rules

- Feature modules can import from `src/shared/*`.
- Shared modules must not import from feature modules.
- Active route entry points should import feature entry files directly where possible.
- Import shared UI via `@/shared/ui` barrel instead of deep file paths.

## Feature growth rule

- New page sections must live under `src/features/<page>/sections/*`.
- Feature entry files should use kebab-case (`home-page.tsx`, etc.).

## Reuse what repeats

Extract a shared primitive when all are true:

- Pattern appears in 3+ places.
- Visual and behavior contract are stable.
- API can stay small and explicit.

## Keep bespoke sections bespoke

- Hero storytelling and section-specific motion can remain custom.
- Do not force one generic component to cover unrelated layout patterns.

## Preferred extraction order

1. Shared types and static content.
2. Heading/CTA/badge primitives.
3. Section shells and card scaffolds.
4. Animation helpers.

## Anti-patterns

- Prop-heavy universal components with many boolean flags.
- Copy-pasting class strings across sections when a stable primitive exists.
- Premature abstraction of one-off markup.
```

- [ ] **Step 2: Create `talkwer-design.mdc`**

```mdc
---
description: Talkwer visual language and no-design-change refactor contract
globs: src/**/*.{tsx,css}
alwaysApply: false
---

# Talkwer design

## Product context

Static Next.js travel magazine / landing (“Talkwer”). The **shipped home** is `src/features/home/home-page.tsx`: dark editorial UI, GSAP motion, Inter from `layout.tsx`. Metadata tagline: *Wander. Discover. Share.*

## Brand and voice

- **Wordmark**: `talkwer` + **orange** full stop — `<span className="text-orange-500">.</span>` (see Navbar, Footer, InitialLoader).
- **Accent**: `orange-500` for emphasis, CTAs, logo dot, marquee bullets, stat suffixes. Do not replace with arbitrary reds or purples.
- Keep Talkwer palette and typography consistent across feature sections. Avoid introducing a second template style without an explicit redesign decision.

## Color and surfaces (main site)

- **Page shell**: `bg-[#050505]` or `bg-[#0a0a0a]`, text `text-white` with opacity steps (`white/40`, `white/25`, `white/15`) for hierarchy.
- **Borders/dividers**: subtle `border-white/[0.06]` (or equivalent low-contrast white borders).
- **shadcn tokens** (`globals.css`): HSL variables — `primary` (cyan), `secondary` (warm yellow), `accent` (teal). Use these for **UI primitives** (`Button`, forms). For **marketing sections** on the dark home, prefer explicit `orange-500` / neutrals already in use for consistency.

## Token reference

| Role | Typical classes / tokens |
|---|---|
| Page bg | `bg-[#050505]`, `bg-[#0a0a0a]` |
| Muted text | `text-white/40`, `text-white/25`, `text-white/15` |
| Accent | `text-orange-500`, `bg-orange-500`, borders `border-orange-500` |
| Dividers | `border-white/[0.06]` |
| Horizontal padding | class `pad-x` |
| Gradient text utility | `.text-gradient` in `globals.css` |

## Token governance

- Prefer existing semantic token classes and established utility patterns before introducing new raw color values.
- Any new palette token or hardcoded color must be reviewed as a design decision, not a local convenience change.
- Avoid one-off color drift across sections; align with `docs/PERFORMANCE_BUDGETS.md` and `docs/RELEASE_CHECKLIST.md` guardrails.

## Layout

- **Horizontal padding**: utility `.pad-x` — `px-5 md:px-10 lg:px-16 xl:px-24` (`globals.css`). Prefer this over ad-hoc `px-*` on full-width sections.
- **Content width**: main editorial columns use `max-w-[1600px]` + `pad-x` (Navbar, Footer). Inner blocks may use `max-w-*` for readable measure.
- **Hero**: full viewport height patterns — `h-[100svh] min-h-[650px]`, bottom-aligned type, image + gradient overlay.

## Typography

- **Body font**: Inter (root `layout.tsx`). One type family site-wide; parallel destination layouts differ by composition and motion, not by loading serif/mono stacks.
- **Editorial nav / labels**: small caps feel — `uppercase`, `tracking-[0.15em]`–`0.2em`, `text-[11px]`–`text-[13px]`, `font-medium` or `font-semibold`.
- **Display**: large fluid headlines via `clamp(...)`; tight `leading` and `tracking-tighter` on hero lines; occasional **italic** + `orange-500` for one emphasis phrase (Hero pattern).

## Motion (design intent)

- Use `@/lib/useGsap` — register ScrollTrigger when needed; wrap timelines in `gsap.context` and revert on unmount.
- Call `prefersReducedMotion()` early and skip heavy animation when true.
- Favor scrub and stagger for scroll storytelling; avoid gratuitous bounce.
- Lifecycle details and hook choice live in `.cursor/rules/talkwer-quality.mdc`.

## Components and icons

- Compose with `cn()` from `@/lib/utils` when merging Tailwind classes.
- Icons: Lucide (`react-icons/lu`); keep sizes consistent (`h-4 w-4`, `h-5 w-5`, etc.).

## Accessibility and polish

- Selection: global `::selection` uses orange — keep contrast acceptable for any new surfaces.
- Images: `next/image` with sensible `sizes`; `priority` on above-the-fold hero.
- Interactive: visible focus for custom controls; `aria-label` on icon-only buttons.

## No-design-change refactor contract

When the task is quality/refactor without an explicit redesign:

### Non-negotiables

- Keep existing visual identity: dark editorial palette, orange accent usage, type scale intent, and section order.
- Preserve spacing rhythm and layout width behavior (`pad-x`, `max-w-[1600px]`, section paddings).
- Preserve current animation intent and timing feel unless fixing accessibility via reduced-motion fallbacks.

### Allowed changes

- Move code, extract components, split files, and normalize data/types.
- Replace duplicated markup with reusable primitives when rendered output remains equivalent.
- Improve semantics/accessibility without changing the visual surface.

### Verification checklist

- Compare before/after class composition and section hierarchy.
- Confirm no new colors/typography scales introduced to active homepage.
- Validate that major above-the-fold and section CTA visuals remain unchanged.

## Anti-patterns

- Light full-page backgrounds on the main home without a deliberate redesign.
- Mixing Talkwer dark editorial style with a second unrelated visual system on the same page.
- New animation paths that ignore `prefersReducedMotion`.
```

- [ ] **Step 3: Create `talkwer-quality.mdc`**

```mdc
---
description: Talkwer quality gates and GSAP motion lifecycle contract
globs: src/**/*.{ts,tsx,css}
alwaysApply: false
---

# Talkwer quality

## Required checks

- `pnpm verify`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm check:filenames`
- `pnpm check:image-sizes`

## Review checklist

- No visual regressions on active homepage sections.
- No duplicate domain types across feature files.
- No placeholder links (`href="#"`) in active UX paths.
- Accessibility checklist reviewed (`docs/ACCESSIBILITY_CHECKLIST.md`).
- Release checklist reviewed (`docs/RELEASE_CHECKLIST.md`).

## Motion lifecycle

### Default pattern

- Prefer `useGsapContext(scopeRef, animation, deps)` from `@/lib/useGsap`.
- Keep timeline/tween values unchanged during refactors (duration, easing, start/end, scrub).
- Keep target refs scoped to the section root.
- Always clean up via context revert on unmount.

### Hook decision rule

- Use `useGsapContext` for all GSAP/ScrollTrigger section animations.
- Use plain `useEffect` only for non-GSAP side effects (navbar scroll state, DOM listeners, etc.).

### Accessibility

- Respect reduced-motion with `prefersReducedMotion()`.
- Skip non-essential animation when reduced-motion is enabled.

### Performance

- Avoid duplicate ScrollTrigger registrations in component trees.
- Keep timeline creation scoped to the section refs.

### Invariants

- No visual drift during refactors.
- No timing/easing/trigger drift during refactors.
- No leaked triggers or stale contexts after navigation/unmount.
```

- [ ] **Step 4: Sanity check rule count (before deletes)**

Run:

```powershell
Get-ChildItem .cursor/rules -Filter *.mdc | Select-Object -ExpandProperty Name
```

Expected: old files still present plus the two new ones (`talkwer-design.mdc`, `talkwer-quality.mdc`). Architecture already overwritten.

- [ ] **Step 5: Commit**

```powershell
git add .cursor/rules/talkwer-architecture.mdc .cursor/rules/talkwer-design.mdc .cursor/rules/talkwer-quality.mdc
git commit -m @"
docs: merge Cursor rules into architecture, design, quality

Compress six overlapping contracts into three enforceable rule files.
"@
```

---

### Task 3: Delete obsolete memory docs and old rules

**Files:**
- Delete: `.cursor/docs/PROJECT_MEMORY.md`
- Delete: `.cursor/docs/DESIGN_MEMORY.md`
- Delete: `.cursor/docs/motion-lifecycle.md`
- Delete: `.cursor/rules/talkwer-design-principles.mdc`
- Delete: `.cursor/rules/talkwer-visual-contract.mdc`
- Delete: `.cursor/rules/talkwer-quality-gates.mdc`
- Delete: `.cursor/rules/talkwer-motion-contract.mdc`
- Delete: `.cursor/rules/talkwer-reusability.mdc`
- Delete: `docs/REFACTOR_NOTES.md`

**Interfaces:**
- Consumes: Task 2 merged rules must already exist
- Produces: exactly three `.mdc` files under `.cursor/rules/`

- [ ] **Step 1: Delete files**

```powershell
Remove-Item -Force .cursor/docs/PROJECT_MEMORY.md, .cursor/docs/DESIGN_MEMORY.md, .cursor/docs/motion-lifecycle.md
Remove-Item -Force .cursor/rules/talkwer-design-principles.mdc, .cursor/rules/talkwer-visual-contract.mdc, .cursor/rules/talkwer-quality-gates.mdc, .cursor/rules/talkwer-motion-contract.mdc, .cursor/rules/talkwer-reusability.mdc
Remove-Item -Force docs/REFACTOR_NOTES.md
Remove-Item -Force -Recurse .cursor/docs
```

- [ ] **Step 2: Confirm end state**

```powershell
Get-ChildItem .cursor/rules -Filter *.mdc | Select-Object -ExpandProperty Name
Test-Path .cursor/docs
Test-Path docs/REFACTOR_NOTES.md
```

Expected rule names only:

```
talkwer-architecture.mdc
talkwer-design.mdc
talkwer-quality.mdc
```

Expected: `.cursor/docs` and `docs/REFACTOR_NOTES.md` are gone (`False`).

- [ ] **Step 3: Commit**

```powershell
git add -A .cursor/docs .cursor/rules docs/REFACTOR_NOTES.md
git commit -m @"
chore: remove duplicate agent memory and obsolete rules

Drop .cursor/docs, REFACTOR_NOTES, and merged-away rule files.
"@
```

---

### Task 4: Retarget skills, INDEX, AGENTS, PR template, philosophy links

**Files:**
- Modify: `.cursor/skills/talkwer-clean-refactor/SKILL.md`
- Modify: `.cursor/skills/talkwer-component-audit/SKILL.md`
- Modify: `.cursor/skills/talkwer-release-check/SKILL.md`
- Modify: `docs/INDEX.md`
- Modify: `docs/README.md`
- Modify: `AGENTS.md`
- Modify: `.github/pull_request_template.md`
- Modify: `docs/DESTINATION_DETAILS_PHILOSOPHY.md`

**Interfaces:**
- Consumes: final rule names from Task 2
- Produces: zero living references to deleted paths outside historical specs

- [ ] **Step 1: Rewrite skill context bundles**

`talkwer-clean-refactor/SKILL.md` minimal context:

```markdown
## Minimal context bundle

- `AGENTS.md`
- `.cursor/rules/talkwer-architecture.mdc`
- `.cursor/rules/talkwer-design.mdc`
- target files only
```

`talkwer-component-audit/SKILL.md` minimal context:

```markdown
## Minimal context bundle

- `AGENTS.md`
- `.cursor/rules/talkwer-architecture.mdc`
- `src/components/ui/**/*`
- `src/features/**/*`
- `src/shared/**/*`
```

`talkwer-release-check/SKILL.md` minimal context:

```markdown
## Minimal context bundle

- `AGENTS.md`
- `.cursor/rules/talkwer-quality.mdc`
- `.cursor/rules/talkwer-design.mdc`
- changed files
```

- [ ] **Step 2: Replace `docs/INDEX.md` with**

```markdown
# Docs Index

## Project docs

- `docs/README.md` — project overview and getting started.
- `docs/ACCESSIBILITY_CHECKLIST.md` — section-level a11y baseline and release usage.
- `docs/SEO_PLAYBOOK.md` — metadata architecture and route implementation pattern.
- `docs/PERFORMANCE_BUDGETS.md` — performance budgets and image discipline.
- `docs/DEPENDENCY_GOVERNANCE.md` — dependency update and security audit policy.
- `docs/RELEASE_CHECKLIST.md` — release gate checklist.
- `docs/DESTINATION_DETAILS_PHILOSOPHY.md` — destination story page editorial philosophy, data model, motion hooks, and parallel layouts.
- `docs/THIRD_PARTY_LICENSES.md` — third-party license notes.

## Agent contracts

- `AGENTS.md` — commands, runtime notes, and entry pointer.
- `.cursor/rules/talkwer-architecture.mdc` — feature/shared boundaries and reuse thresholds.
- `.cursor/rules/talkwer-design.mdc` — visual language and no-design-change contract.
- `.cursor/rules/talkwer-quality.mdc` — verify gates and GSAP lifecycle.

## Superpowers

- `docs/superpowers/specs/` — committed design specs (process history).
- `docs/superpowers/plans/` — committed implementation plans.
- `.superpowers/` — local runtime only (gitignored).

## New page/module checklist

1. Create page feature folder: `src/features/<page>/`.
2. Add feature entry file in kebab-case (e.g. `about-page.tsx`, `destinations-page.tsx`).
3. Add section files under `src/features/<page>/sections/` in kebab-case; export public sections from `sections/index.ts` when the page imports multiple.
4. Optional: add `src/features/<page>/content/` for page-only copy; optional `lib/` for URL helpers, hooks, or pure logic (no UI).
5. Add `src/app/<route>/page.tsx` that loads data and renders the feature entry (metadata + JSON-LD live here or in `lib/seo` helpers).
6. Keep page-specific UI in feature sections, not in `src/shared/ui` or `src/components/ui` except primitives.
7. Put reusable app-level compositions in `src/shared/ui/`.
8. Keep shadcn-style primitives in `src/components/ui/`.
9. Run `pnpm verify`.

### Example: `/destinations`

- Feature: `src/features/destinations/` (`destinations-page.tsx`, `sections/*`, `content/destinations-page-copy.ts`, `lib/destinations-list-params.ts`).
- Route: `src/app/destinations/page.tsx` — reads `searchParams`, uses `DESTINATIONS` from `home/content/destinations`, passes parsed list + grid into the client page shell.

## Maintenance checklist

1. If paths move, update `docs/` and `.cursor/rules/` references together.
2. If standards change, update the matching `.cursor/rules/*.mdc` file in the same PR.
3. Keep `AGENTS.md` command table aligned with `package.json` scripts.
4. Confirm CI workflow (`.github/workflows/verify.yml`) uses the same `pnpm verify` gate.
5. Specs and plans for process work go under `docs/superpowers/`; do not commit `.superpowers/`.

## Naming exception policy

- `scripts/check-kebab-case.mjs` enforces kebab-case in `src/features`.
- Framework-reserved basenames (`page`, `layout`, `loading`, `error`, `not-found`, `route`) are allowed.
- Any new exception must be justified in PR notes before updating the script allowlist.
```

- [ ] **Step 3: Update `docs/README.md` extended docs list**

Ensure it does **not** list `REFACTOR_NOTES`. Keep:

```markdown
## Extended docs

- `docs/INDEX.md` - master index and maintenance checklist
- `docs/ACCESSIBILITY_CHECKLIST.md` - a11y validation baseline
- `docs/SEO_PLAYBOOK.md` - reusable metadata and route conventions
- `docs/PERFORMANCE_BUDGETS.md` - budget guardrails and asset discipline
- `docs/DEPENDENCY_GOVERNANCE.md` - dependency update and audit policy
- `docs/RELEASE_CHECKLIST.md` - release-ready validation flow
```

(If `DESTINATION_DETAILS_PHILOSOPHY` / licenses are not listed, that is fine — INDEX remains the full map.)

- [ ] **Step 4: Update `AGENTS.md`**

After the opening paragraph (before Quick reference), insert:

```markdown
### Where truth lives

- Commands / runtime: this file.
- Structure and checklists: `docs/INDEX.md`, `docs/README.md`.
- Enforceable contracts: `.cursor/rules/talkwer-architecture.mdc`, `talkwer-design.mdc`, `talkwer-quality.mdc`.
- Process specs/plans: `docs/superpowers/`. Local Superpowers runtime: `.superpowers/` (gitignored).
```

Do not add any `.cursor/docs` references.

- [ ] **Step 5: Update PR template Docs and Rules Sync**

Replace that section with:

```markdown
## Docs and Rules Sync

- [ ] Updated `docs/` and `.cursor/rules/` if paths or conventions changed
- [ ] Added/updated Superpowers spec or plan under `docs/superpowers/` when process docs changed
- [ ] Confirmed `AGENTS.md` command table is still accurate
- [ ] Release checklist alignment validated (`docs/RELEASE_CHECKLIST.md`)
```

- [ ] **Step 6: Fix `docs/DESTINATION_DETAILS_PHILOSOPHY.md` pointers**

Replace any `.cursor/docs/motion-lifecycle.md` references with `.cursor/rules/talkwer-quality.mdc`.

Concrete replacements:

- `` `DestinationDetailsSectionsMotion` mounts **`bindDestinationDetailsScroll(root)`** inside `useGsapContext` (see `.cursor/docs/motion-lifecycle.md` if present). ``
  → `` `DestinationDetailsSectionsMotion` mounts **`bindDestinationDetailsScroll(root)`** inside `useGsapContext` (see `.cursor/rules/talkwer-quality.mdc`). ``

- `- Project motion notes: `.cursor/docs/motion-lifecycle.md` (if present).`
  → `- Project motion notes: `.cursor/rules/talkwer-quality.mdc`.`

- [ ] **Step 7: Commit**

```powershell
git add AGENTS.md docs/INDEX.md docs/README.md docs/DESTINATION_DETAILS_PHILOSOPHY.md .github/pull_request_template.md .cursor/skills
git commit -m @"
docs: retarget indexes and skills to three-rule layout

Point living docs and skills at AGENTS, INDEX, and merged Cursor rules.
"@
```

---

### Task 5: Reference sweep + verify

**Files:**
- Verify only (modify only if grep finds living stragglers)

**Interfaces:**
- Consumes: Tasks 1–4 complete
- Produces: clean grep + green `pnpm verify`

- [ ] **Step 1: Grep living surfaces for deleted paths**

```powershell
rg -n "\.cursor/docs|talkwer-visual-contract|talkwer-design-principles|talkwer-motion-contract|talkwer-quality-gates|talkwer-reusability|REFACTOR_NOTES|PROJECT_MEMORY|DESIGN_MEMORY|motion-lifecycle" AGENTS.md docs .cursor .github --glob "!docs/superpowers/specs/**"
```

Expected: no matches in living files. Mentions inside `docs/superpowers/specs/**` describing the cleanup are OK and excluded by the glob. If any living hit remains, fix and amend via a **new** commit (do not `--amend` unless commit rules allow).

- [ ] **Step 2: Confirm rule file set**

```powershell
Get-ChildItem .cursor/rules -Filter *.mdc | Select-Object -ExpandProperty Name
```

Expected exactly:

```
talkwer-architecture.mdc
talkwer-design.mdc
talkwer-quality.mdc
```

- [ ] **Step 3: Run verify**

```powershell
pnpm verify
```

Expected: pass (lint, typecheck, filename check, image sizes, build). No app source changes, so failures indicate unrelated environment issues — fix only if this PR caused them.

- [ ] **Step 4: Final commit if Step 1 required fixes; otherwise done**

If fixes were needed:

```powershell
git add -A
git commit -m @"
docs: clear remaining stale rule and memory references

Finish ownership cleanup so living docs match the three-rule layout.
"@
```

---

## Spec coverage checklist

| Spec requirement | Task |
|---|---|
| `.superpowers/` gitignored | Task 1 |
| `docs/superpowers/plans` tracked | Task 1 |
| Three merged rules | Task 2 |
| Delete `.cursor/docs`, old rules, `REFACTOR_NOTES` | Task 3 |
| Skills / INDEX / AGENTS / PR / philosophy retarget | Task 4 |
| Grep + `pnpm verify` | Task 5 |
| Out of scope: theme/frontend | Global Constraints |
