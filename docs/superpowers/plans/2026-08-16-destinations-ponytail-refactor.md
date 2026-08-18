# Destinations Section Ponytail Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify and reduce over-engineering in the home destinations stage and filmstrip components by eliminating unnecessary `useMemo`, manual `rAF` React state looping at 60fps, redundant refs/wrappers for hover/focus state, and double Math clamping.

**Architecture:** Refactor `destinations.tsx`, `destinations-stage.tsx`, and `destinations-filmstrip.tsx` to use direct inline calculations, cleaner event callbacks, and simplified state transitions while keeping all existing functionality, animations, and visual presentation completely intact.

**Tech Stack:** Next.js 16 (React 19), TypeScript, Tailwind CSS v4, Lucide icons (react-icons/lu).

**Spec:** Bounded ponytail review findings discussed and approved in session transcript.

## Global Constraints

- Preserve all current UI behavior, layout alignment, visual styling, accessibility attributes, and keyboard navigation.
- Strictly adhere to standard repo verification commands: `pnpm verify` (linting, build check, filename checks).
- Maintain code formatting rules and existing component contracts.

---

### Task 1: Inline category filtering in `destinations.tsx`

**Files:**
- Modify: `src/features/home/sections/destinations.tsx`

**Interfaces:**
- Consumes: `selectedCategory` state, `featured` array, `DESTINATIONS` array
- Produces: `activeDestinations` array passed to `DestinationsStage`

- [ ] **Step 1: Simplify activeDestinations calculation**

Replace the `useMemo` block with an inline calculation:
```tsx
const activeDestinations =
    selectedCategory === "All"
        ? featured
        : DESTINATIONS.filter((d) => d.tag === selectedCategory);
```
And remove `useMemo` from the `react` import in `src/features/home/sections/destinations.tsx`.

- [ ] **Step 2: Run verification**

Run: `pnpm verify`
Expected: PASS with 0 lint and type errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/sections/destinations.tsx
git commit -m "refactor(home): inline activeDestinations filtering without useMemo"
```

---

### Task 2: Simplify pause callbacks and index wrapping in `destinations-stage.tsx`

**Files:**
- Modify: `src/features/home/sections/destinations-stage.tsx`

**Interfaces:**
- Consumes: `onPauseChange` prop callback, `destinations.length`
- Produces: Simplified event handling and slide navigation math

- [ ] **Step 1: Simplify handlers and index modulo**

Remove `hoverPaused` and `focusPaused` refs and `syncPause` function. Call `onPauseChange(true)` / `onPauseChange(false)` directly on pointer enter/leave and focus/blur capture events.
Simplify `go(next)` index calculation from `((next % len) + len) % len` to `(next + len) % len`.

- [ ] **Step 2: Run verification**

Run: `pnpm verify`
Expected: PASS with 0 lint and type errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/sections/destinations-stage.tsx
git commit -m "refactor(home): simplify pause handlers and modulo wrapping in destinations stage"
```

---

### Task 3: Simplify autoplay progress calculation and filmstrip clamping

**Files:**
- Modify: `src/features/home/sections/destinations.tsx`
- Modify: `src/features/home/sections/destinations-filmstrip.tsx`

**Interfaces:**
- Consumes: `progress` state, `showProgress` prop
- Produces: Simplified progress tracking without 60fps React state re-renders or redundant Math clamping

- [ ] **Step 1: Simplify rAF progress calculation in `destinations.tsx`**

Streamline `useEffect` in `destinations.tsx` to update `progress` directly without redundant RAF setup overhead, or use a cleaner interval tick while maintaining smooth progress indication.

- [ ] **Step 2: Remove redundant Math clamping in `destinations-filmstrip.tsx`**

In `destinations-filmstrip.tsx`, update scaleX transform:
```tsx
style={{
    transform: `scaleX(${progress})`,
}}
```

- [ ] **Step 3: Run verification**

Run: `pnpm verify`
Expected: PASS with 0 lint and type errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/home/sections/destinations.tsx src/features/home/sections/destinations-filmstrip.tsx
git commit -m "refactor(home): simplify progress calculation and filmstrip scale transform"
```

---

### Task 4: Final verification and build test

**Files:**
- None (verification phase)

- [ ] **Step 1: Execute complete project verification suite**

Run: `pnpm verify && pnpm build`
Expected: Everything compiles cleanly and static build succeeds without errors.
