# Home Destinations Stage + Filmstrip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home Destinations pin-scrub carousel with a hybrid Featured Stage + Filmstrip (4 curated picks, auto-cycle / swipe / thumbs, CTA to `/destinations`).

**Architecture:** Feature-first rewrite under `src/features/home/` only — no new app route. Reference `featured-tours.tsx` for section shell (`SectionHeading` / `SectionCta` / `useGsap` entrance). Stage + filmstrip stay section-local; `DestinationCard` and `/destinations` catalog stay unchanged. Catalog source of truth remains `DESTINATIONS`; featured ids live in a new content module.

**Tech Stack:** Next.js 16 App Router, React client sections, Tailwind v4, GSAP via `@/lib/useGsap`, `next/image`, `pnpm` / `pnpm verify` (no unit test runner).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-09-home-destinations-stage-filmstrip-design.md`
- Home Destinations section only — do not redesign `/destinations` or destination detail pages.
- Do not promote stage/filmstrip into `shared/ui`.
- Do not change `DestinationCard` API for this work.
- Desktop: filmstrip overlay on stage. Mobile: filmstrip below stage.
- Exactly **4** featured destinations; no pin / horizontal scrub ScrollTrigger.
- Shell: dark canvas (`bg-[#050505]`), `orange-500` accent, Inter, `pad-x`, `max-w-[1600px]`.
- Motion: `@/lib/useGsap` + `gsap.context` + early `prefersReducedMotion()`; autoplay off under reduced motion.
- Kebab-case under `src/features`; prefer `pnpm`; end each task with `pnpm typecheck`; final handoff `pnpm verify` + `pnpm build && pnpm start` visual QA.

---

## File map

| Path | Responsibility |
|------|----------------|
| `src/features/home/content/featured-destinations.ts` | Four curated ids + `getFeaturedDestinations()` |
| `src/features/home/content/section-copy.ts` | Update `DESTINATIONS_SECTION` copy + stage a11y strings |
| `src/features/home/sections/destinations-filmstrip.tsx` | Thumb buttons + active / progress UI |
| `src/features/home/sections/destinations-stage.tsx` | Immersive stage, swipe, meta, explore CTA |
| `src/features/home/sections/destinations.tsx` | Section compose + autoplay + entrance motion |
| `docs/INDEX.md` | Link new spec/plan |

---

### Task 1: Featured content + section copy

**Files:**
- Create: `src/features/home/content/featured-destinations.ts`
- Modify: `src/features/home/content/section-copy.ts`
- Modify: `docs/INDEX.md`

**Interfaces:**
- Consumes: `DESTINATIONS` from `@/features/home/content/destinations`, `Destination` from `@/shared/types/domain`
- Produces: `FEATURED_DESTINATION_IDS`, `getFeaturedDestinations()`, updated `DESTINATIONS_SECTION` fields

- [ ] **Step 1: Add featured destinations module**

```ts
// src/features/home/content/featured-destinations.ts
import type { Destination } from "@/shared/types/domain";
import { DESTINATIONS } from "@/features/home/content/destinations";

/** Editorial home tease — Bali (Popular), Santorini (Trending), Kyoto (New), Maldives (Luxury). */
export const FEATURED_DESTINATION_IDS = [1, 2, 4, 6] as const;

export function getFeaturedDestinations(
	catalog: readonly Destination[] = DESTINATIONS,
): Destination[] {
	const byId = new Map(catalog.map((d) => [d.id, d]));
	const featured = FEATURED_DESTINATION_IDS.map((id) => {
		const dest = byId.get(id);
		if (!dest) {
			throw new Error(`Featured destination id ${id} missing from DESTINATIONS`);
		}
		return dest;
	});
	if (featured.length !== 4) {
		throw new Error("Home destinations tease requires exactly 4 featured destinations");
	}
	return featured;
}
```

- [ ] **Step 2: Update DESTINATIONS_SECTION copy**

In `src/features/home/content/section-copy.ts`, replace the destinations block with:

```ts
export const DESTINATIONS_SECTION = {
	label: "Explore the World",
	title: "Popular Destinations",
	description:
		"Four handpicked places to start with — then browse the full map when you're ready.",
	countSuffix: "Destinations",
	viewAllCta: "View All Destinations",
	fromLabel: "From",
	exploreButtonLabel: "Explore",
	stageRegionLabel: "Featured destinations",
	filmstripLabel: "Choose a featured destination",
} as const;
```

Remove any remaining “scroll to glide” wording if it appears elsewhere for this section.

- [ ] **Step 3: Link docs index**

In `docs/INDEX.md` Superpowers bullet list, add:

```md
- Spec/plan: `docs/superpowers/specs/2026-08-09-home-destinations-stage-filmstrip-design.md`, `docs/superpowers/plans/2026-08-09-home-destinations-stage-filmstrip.md`.
```

- [ ] **Step 4: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS (no TS errors from new module / copy keys).

- [ ] **Step 5: Commit**

```bash
git add src/features/home/content/featured-destinations.ts src/features/home/content/section-copy.ts docs/INDEX.md
git commit -m "$(cat <<'EOF'
feat(home): curate four featured destinations for stage tease

EOF
)"
```

---

### Task 2: Filmstrip component

**Files:**
- Create: `src/features/home/sections/destinations-filmstrip.tsx`

**Interfaces:**
- Consumes: `Destination`, `DESTINATIONS_SECTION.filmstripLabel`
- Produces: `DestinationsFilmstrip` with props below

```ts
export type DestinationsFilmstripProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	/** 0–1 progress through the current autoplay interval; hide bar when paused / reduced motion */
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	className?: string;
};
```

- [ ] **Step 1: Implement filmstrip**

```tsx
// src/features/home/sections/destinations-filmstrip.tsx
"use client";

import Image from "next/image";
import type { Destination } from "@/shared/types/domain";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { cn } from "@/lib/utils";

export type DestinationsFilmstripProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	className?: string;
};

export function DestinationsFilmstrip({
	destinations,
	activeIndex,
	progress,
	showProgress,
	onSelect,
	className,
}: DestinationsFilmstripProps) {
	return (
		<div
			role="group"
			aria-label={DESTINATIONS_SECTION.filmstripLabel}
			className={cn("grid grid-cols-4 gap-2 md:gap-3", className)}
		>
			{destinations.map((dest, index) => {
				const active = index === activeIndex;
				return (
					<button
						key={dest.id}
						type="button"
						aria-label={`${dest.name}, ${dest.country}`}
						aria-current={active ? "true" : undefined}
						onClick={() => onSelect(index)}
						className={cn(
							"relative h-16 overflow-hidden rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:h-20 md:h-24",
							active ? "border-orange-500" : "border-white/15 hover:border-white/35",
						)}
					>
						<Image
							src={dest.image}
							alt=""
							fill
							sizes="(max-width: 768px) 25vw, 160px"
							className="object-cover"
						/>
						<span className="absolute inset-0 bg-black/35" />
						<span className="absolute bottom-1.5 left-2 right-2 truncate text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11px]">
							{dest.name}
						</span>
						{active && showProgress ? (
							<span
								aria-hidden
								className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20"
							>
								<span
									className="block h-full origin-left bg-orange-500"
									style={{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }}
								/>
							</span>
						) : null}
					</button>
				);
			})}
		</div>
	);
}
```

Do **not** export from `sections/index.ts` — private to the Destinations section.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/sections/destinations-filmstrip.tsx
git commit -m "$(cat <<'EOF'
feat(home): add destinations filmstrip thumbs

EOF
)"
```

---

### Task 3: Stage component

**Files:**
- Create: `src/features/home/sections/destinations-stage.tsx`

**Interfaces:**
- Consumes: `Destination`, `destinationToSlug`, `DESTINATIONS_SECTION`, `DestinationsFilmstrip`
- Produces: `DestinationsStage` with props below

```ts
export type DestinationsStageProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	onPauseChange: (paused: boolean) => void;
	className?: string;
};
```

- [ ] **Step 1: Implement stage (hybrid layout + swipe)**

```tsx
// src/features/home/sections/destinations-stage.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import type { Destination } from "@/shared/types/domain";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationsFilmstrip } from "@/features/home/sections/destinations-filmstrip";
import { cn } from "@/lib/utils";

export type DestinationsStageProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	onPauseChange: (paused: boolean) => void;
	className?: string;
};

const SWIPE_THRESHOLD_PX = 48;

export function DestinationsStage({
	destinations,
	activeIndex,
	progress,
	showProgress,
	onSelect,
	onPauseChange,
	className,
}: DestinationsStageProps) {
	const dest = destinations[activeIndex]!;
	const href = `/destinations/${destinationToSlug(dest)}`;
	const pointerStartX = useRef<number | null>(null);

	const go = (next: number) => {
		const len = destinations.length;
		onSelect(((next % len) + len) % len);
	};

	return (
		<div
			className={cn("relative", className)}
			onMouseEnter={() => onPauseChange(true)}
			onMouseLeave={() => onPauseChange(false)}
			onFocusCapture={() => onPauseChange(true)}
			onBlurCapture={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
					onPauseChange(false);
				}
			}}
		>
			<div
				role="region"
				aria-roledescription="carousel"
				aria-label={DESTINATIONS_SECTION.stageRegionLabel}
				tabIndex={0}
				className="relative min-h-[420px] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:min-h-[520px]"
				onKeyDown={(e) => {
					if (e.key === "ArrowRight") {
						e.preventDefault();
						go(activeIndex + 1);
					} else if (e.key === "ArrowLeft") {
						e.preventDefault();
						go(activeIndex - 1);
					}
				}}
				onPointerDown={(e) => {
					pointerStartX.current = e.clientX;
					onPauseChange(true);
				}}
				onPointerUp={(e) => {
					const start = pointerStartX.current;
					pointerStartX.current = null;
					if (start == null) return;
					const delta = e.clientX - start;
					if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
					go(delta < 0 ? activeIndex + 1 : activeIndex - 1);
				}}
				onPointerCancel={() => {
					pointerStartX.current = null;
				}}
			>
				{/* Crossfade: stack images; only active is opaque */}
				{destinations.map((item, index) => (
					<div
						key={item.id}
						aria-hidden={index !== activeIndex}
						className={cn(
							"absolute inset-0 transition-opacity duration-500 ease-out",
							index === activeIndex ? "opacity-100" : "opacity-0",
						)}
					>
						<Image
							src={item.image}
							alt=""
							fill
							priority={index === 0}
							sizes="(max-width: 768px) 100vw, min(1600px, 100vw)"
							className="object-cover"
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

				<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 p-5 md:p-8 md:pb-28">
					<div aria-live="polite" aria-atomic="true">
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
							{dest.country}
							{dest.tag ? ` · ${dest.tag}` : null}
						</p>
						<h3 className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tighter text-white">
							{dest.name}
						</h3>
						<p className="mt-2 text-sm text-white/55">
							{dest.duration} · {DESTINATIONS_SECTION.fromLabel} $
							{dest.price.toLocaleString()}
						</p>
					</div>
					<Link
						href={href}
						className="group inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-orange-400"
					>
						{DESTINATIONS_SECTION.exploreButtonLabel} {dest.name}
						<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				{/* Desktop overlay filmstrip */}
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden p-5 md:block md:p-6">
					<div className="pointer-events-auto">
						<DestinationsFilmstrip
							destinations={destinations}
							activeIndex={activeIndex}
							progress={progress}
							showProgress={showProgress}
							onSelect={onSelect}
						/>
					</div>
				</div>
			</div>

			{/* Mobile filmstrip below stage */}
			<div className="mt-4 md:hidden">
				<DestinationsFilmstrip
					destinations={destinations}
					activeIndex={activeIndex}
					progress={progress}
					showProgress={showProgress}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
}
```

Notes for implementer:
- Keep overlay vs below split exactly as above (`hidden md:block` / `md:hidden`).
- Decorative images use `alt=""`; destination name is announced via live region + thumb labels.
- Do not export from `sections/index.ts`.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`  
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/sections/destinations-stage.tsx
git commit -m "$(cat <<'EOF'
feat(home): add destinations featured stage

EOF
)"
```

---

### Task 4: Wire Destinations section (drop pin scrub)

**Files:**
- Modify: `src/features/home/sections/destinations.tsx` (full rewrite)

**Interfaces:**
- Consumes: `getFeaturedDestinations`, `DestinationsStage`, `DESTINATIONS_SECTION`, `SectionHeading`, `SectionCta`, `useGsapContext` / `gsap` / `prefersReducedMotion`
- Produces: default export `Destinations` (same public import used by `home-page.tsx`)

- [ ] **Step 1: Rewrite destinations.tsx**

Replace the entire file with:

```tsx
// src/features/home/sections/destinations.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { getFeaturedDestinations } from "@/features/home/content/featured-destinations";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationsStage } from "@/features/home/sections/destinations-stage";
import { SectionCta, SectionHeading } from "@/shared/ui";

const AUTOPLAY_MS = 5000;
const featured = getFeaturedDestinations();

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const stageWrapRef = useRef<HTMLDivElement>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [progress, setProgress] = useState(0);
	const [reduceMotion, setReduceMotion] = useState(false);

	useEffect(() => {
		setReduceMotion(prefersReducedMotion());
	}, []);

	useEffect(() => {
		if (reduceMotion || paused) {
			setProgress(0);
			return;
		}
		let frame = 0;
		const started = performance.now();
		const tick = (now: number) => {
			const elapsed = now - started;
			const ratio = Math.min(1, elapsed / AUTOPLAY_MS);
			setProgress(ratio);
			if (ratio >= 1) {
				setActiveIndex((i) => (i + 1) % featured.length);
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [activeIndex, paused, reduceMotion]);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const stage = stageWrapRef.current;
			if (heading) {
				gsap.from(heading, {
					y: 28,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out",
					immediateRender: false,
					scrollTrigger: {
						trigger: heading,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			}
			if (stage) {
				gsap.from(stage, {
					y: 40,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					immediateRender: false,
					scrollTrigger: {
						trigger: stage,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="destinations"
			aria-labelledby="destinations-title"
			className="bg-[#050505] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={DESTINATIONS_SECTION.label}
						labelId="destinations-label"
						title={DESTINATIONS_SECTION.title}
						titleId="destinations-title"
						description={DESTINATIONS_SECTION.description}
						descriptionId="destinations-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/55"
					/>
					<div className="hidden shrink-0 flex-col items-end text-right text-[11px] uppercase tracking-[0.22em] text-white/35 md:flex">
						<span className="text-white/55">0{featured.length}</span>
						<span className="mt-1 h-px w-10 bg-white/15" />
						<span className="mt-2">{DESTINATIONS_SECTION.countSuffix}</span>
					</div>
				</div>

				<div ref={stageWrapRef}>
					<DestinationsStage
						destinations={featured}
						activeIndex={activeIndex}
						progress={progress}
						showProgress={!reduceMotion && !paused}
						onSelect={setActiveIndex}
						onPauseChange={setPaused}
					/>
				</div>

				<div className="mt-12 text-center">
					<SectionCta
						href="/destinations"
						icon={
							<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						}
					>
						{DESTINATIONS_SECTION.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
```

Critical: delete all previous pin / `x` scrub / `totalScroll` ScrollTrigger code. Confirm `home-page.tsx` still imports `{ Destinations }` from `./sections` unchanged.

- [ ] **Step 2: Typecheck + lint gates**

Run: `pnpm typecheck`  
Expected: PASS.

Run: `pnpm lint`  
Expected: PASS (no unused imports from old carousel).

- [ ] **Step 3: Commit**

```bash
git add src/features/home/sections/destinations.tsx
git commit -m "$(cat <<'EOF'
feat(home): replace destinations pin-scrub with stage tease

EOF
)"
```

---

### Task 5: Verify + visual QA

**Files:**
- None (validation only)

- [ ] **Step 1: Full verify**

Run: `pnpm verify`  
Expected: all gates PASS (lint, filenames, image-sizes, typecheck, deps as configured).

- [ ] **Step 2: Production build + serve**

Run: `pnpm build && pnpm start`  
Open `http://localhost:3000/#destinations` (or scroll to Destinations).

Manual checklist:
- [ ] No viewport pin; section height is short (not scrubbing through 10 cards)
- [ ] Desktop: filmstrip overlays bottom of stage
- [ ] Mobile width: filmstrip sits below stage
- [ ] Autoplay advances ~5s with progress hairline; pauses on hover/focus
- [ ] Thumb click + swipe change destination; Explore links to `/destinations/[slug]`
- [ ] View All → `/destinations`
- [ ] With OS reduced motion: no autoplay; manual controls still work
- [ ] Hero “destinations” anchor still lands on `#destinations`

- [ ] **Step 3: Commit docs-only fixes if verify required INDEX/docs edits; otherwise stop**

If Step 2 found copy/layout bugs, fix in a follow-up commit on the same branch — do not leave pin-scrub residual code.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Tease 4 destinations → `/destinations` | 1, 4 |
| Hybrid C desktop overlay / mobile below | 3 |
| Auto-cycle ~5s, pause, reduced motion off | 4 |
| Thumb jump + swipe + keyboard | 3 |
| No pin scrub | 4 |
| Featured ids content module | 1 |
| Stage + filmstrip local files | 2, 3 |
| Copy without “scroll to glide” | 1 |
| Keep DestinationCard / catalog pages | (untouched) |
| a11y live region / thumb names / focus | 2, 3 |
| `pnpm verify` + build visual QA | 5 |
