"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { getFeaturedDestinations } from "@/features/home/content/featured-destinations";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationsStage } from "@/features/home/sections/destinations-stage";
import { cn } from "@/lib/utils";
import { SectionCta, SectionHeading } from "@/shared/ui";

const AUTOPLAY_MS = 5000;
const featured = getFeaturedDestinations();

function subscribeReducedMotion(onStoreChange: () => void) {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

export default function Destinations() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const stageWrapRef = useRef<HTMLDivElement>(null);

	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [progress, setProgress] = useState(0);

	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		() => false,
	);

	const activeDestinations = useMemo(() => {
		if (selectedCategory === "All") return featured;
		const filtered = DESTINATIONS.filter((d) => d.tag === selectedCategory);
		return filtered.length > 0 ? filtered : featured;
	}, [selectedCategory]);

	useEffect(() => {
		if (reduceMotion || paused) {
			const reset = requestAnimationFrame(() => setProgress(0));
			return () => cancelAnimationFrame(reset);
		}
		let frame = 0;
		const started = performance.now();
		const tick = (now: number) => {
			const elapsed = now - started;
			const ratio = Math.min(1, elapsed / AUTOPLAY_MS);
			setProgress(ratio);
			if (ratio >= 1) {
				setActiveIndex((i) => (i + 1) % activeDestinations.length);
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [activeIndex, paused, reduceMotion, activeDestinations]);

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
			className="bg-[#050505] py-28 md:py-36 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
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

					<div className="flex flex-col items-start gap-4 md:items-end">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
							</span>
							{DESTINATIONS_SECTION.spotlightBadge}
						</div>

						{/* Category Filter Tabs */}
						<div className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
							{DESTINATIONS_SECTION.filterCategories.map((cat) => {
								const active = selectedCategory === cat;
								return (
									<button
										key={cat}
										type="button"
										onClick={() => {
											setSelectedCategory(cat);
											setActiveIndex(0);
										}}
										className={cn(
											"rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
											active
												? "bg-orange-500 text-black shadow-md shadow-orange-500/25"
												: "text-white/60 hover:bg-white/10 hover:text-white",
										)}
									>
										{cat}
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div ref={stageWrapRef}>
					<DestinationsStage
						destinations={activeDestinations}
						activeIndex={activeIndex}
						progress={progress}
						showProgress={!reduceMotion && !paused}
						onSelect={setActiveIndex}
						onPauseChange={setPaused}
						isPaused={paused}
					/>
				</div>

				<div className="mt-16 text-center">
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

