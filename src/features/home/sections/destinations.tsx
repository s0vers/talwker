"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { getFeaturedDestinations } from "@/features/home/content/featured-destinations";
import { DestinationsStage } from "@/features/home/sections/destinations-stage";
import { cn } from "@/lib/utils";
import { SectionCta, SectionHeading } from "@/shared/ui";

const AUTOPLAY_MS = 5000;

function subscribeReducedMotion(onStoreChange: () => void) {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

export default function Destinations() {
	const t = useTranslations("Home.destinations");
	const featured = getFeaturedDestinations();
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const stageWrapRef = useRef<HTMLDivElement>(null);

	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [progress, setProgress] = useState(0);

	const filterCategories = [
		{ key: "All", label: t("filterAll") },
		{ key: "Popular", label: t("filterPopular") },
		{ key: "Trending", label: t("filterTrending") },
		{ key: "Luxury", label: t("filterLuxury") },
		{ key: "New", label: t("filterNew") },
	];

	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		() => false,
	);

	const activeDestinations =
		selectedCategory === "All"
			? featured
			: DESTINATIONS.filter((d) => d.tag === selectedCategory);

	const handleSelectDestination = (index: number) => {
		setProgress(0);
		setActiveIndex(index);
	};

	useEffect(() => {
		if (reduceMotion || paused) {
			const frame = requestAnimationFrame(() => setProgress(0));
			return () => cancelAnimationFrame(frame);
		}
		const started = performance.now();
		let frame: number;
		const tick = (now: number) => {
			const ratio = Math.min(1, (now - started) / AUTOPLAY_MS);
			setProgress(ratio);
			if (ratio >= 1) {
				setProgress(0);
				setActiveIndex((i) => (i + 1) % activeDestinations.length);
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [activeIndex, paused, reduceMotion, activeDestinations.length]);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const stage = stageWrapRef.current;
			if (heading && stage) {
				gsap.fromTo(
					[heading, stage],
					{ y: 32, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.12,
						ease: "power3.out",
						clearProps: "opacity,transform",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 85%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="destinations"
			aria-labelledby="destinations-title"
			className="bg-[#050505] py-20 md:py-36 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={t("label")}
						labelId="destinations-label"
						title={t("title")}
						titleId="destinations-title"
						description={t("description")}
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
							{t("spotlightBadge")}
						</div>

						{/* Category Filter Tabs */}
						<div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 scrollbar-none backdrop-blur-md">
							{filterCategories.map((cat) => {
								const active = selectedCategory === cat.key;
								return (
									<button
										key={cat.key}
										type="button"
										onClick={() => {
											setSelectedCategory(cat.key);
											handleSelectDestination(0);
										}}
										className={cn(
											"shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
											active
												? "bg-orange-500 text-black shadow-md shadow-orange-500/25"
												: "text-white/60 hover:bg-white/10 hover:text-white",
										)}
									>
										{cat.label}
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
						onSelect={handleSelectDestination}
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
						{t("viewAllCta")}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}

