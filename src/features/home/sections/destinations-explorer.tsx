"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { HomeClientCopy } from "@/features/home/lib/home-client-copy";
import { LuArrowRight } from "react-icons/lu";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useDeferredGsapContext } from "@/lib/use-deferred-gsap";
import { DestinationsStage } from "@/features/home/sections/destinations-stage";
import { cn } from "@/lib/utils";
import { SectionCta, SectionHeading } from "@/shared/ui";

const AUTOPLAY_MS = 5000;

function subscribeReducedMotion(onStoreChange: () => void) {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	mq.addEventListener("change", onStoreChange);
	return () => mq.removeEventListener("change", onStoreChange);
}

import type { DestinationSummary } from "@/features/home/lib/destination-summary";

type DestinationsExplorerProps = {
	catalog: readonly DestinationSummary[];
	copy: HomeClientCopy["destinations"];
	featured: readonly DestinationSummary[];
};

export default function DestinationsExplorer({
	catalog,
	copy,
	featured
}: DestinationsExplorerProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const stageWrapRef = useRef<HTMLDivElement>(null);

	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [interactionPaused, setInteractionPaused] = useState(false);
	const [pageVisible, setPageVisible] = useState(true);
	const [stageVisible, setStageVisible] = useState(false);
	const [stageReady, setStageReady] = useState(false);
	const [cycle, setCycle] = useState(0);

	const filterCategories = [
		{ key: "All", label: copy.filterAll },
		{ key: "Popular", label: copy.filterPopular },
		{ key: "Trending", label: copy.filterTrending },
		{ key: "Luxury", label: copy.filterLuxury },
		{ key: "New", label: copy.filterNew }
	];

	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		() => false
	);

	const activeDestinations =
		selectedCategory === "All"
			? featured
			: catalog.filter(d => d.tag === selectedCategory);

	const handleSelectDestination = (index: number) => {
		setCycle(current => current + 1);
		setActiveIndex(index);
	};

	useEffect(() => {
		const updateVisibility = () => setPageVisible(!document.hidden);
		updateVisibility();
		document.addEventListener("visibilitychange", updateVisibility);
		return () =>
			document.removeEventListener("visibilitychange", updateVisibility);
	}, []);

	useEffect(() => {
		const stage = stageWrapRef.current;
		if (!stage) return;
		const observer = new IntersectionObserver(
			([entry]) => setStageVisible(entry.isIntersecting),
			{ threshold: 0.1 }
		);
		const preloadObserver = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setStageReady(true);
				preloadObserver.disconnect();
			},
			{ rootMargin: "200px" }
		);
		observer.observe(stage);
		preloadObserver.observe(stage);
		return () => {
			observer.disconnect();
			preloadObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (
			reduceMotion ||
			paused ||
			interactionPaused ||
			!pageVisible ||
			!stageVisible ||
			activeDestinations.length < 2
		)
			return;
		const timer = window.setTimeout(() => {
			setActiveIndex(index => (index + 1) % activeDestinations.length);
		}, AUTOPLAY_MS);
		return () => window.clearTimeout(timer);
	}, [
		activeIndex,
		cycle,
		paused,
		interactionPaused,
		pageVisible,
		stageVisible,
		reduceMotion,
		activeDestinations.length
	]);

	useDeferredGsapContext(
		sectionRef,
		({ gsap }) => {
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
							once: true
						}
					}
				);
			}
		},
		[]
	);

	return (
		<section
			ref={sectionRef}
			id="destinations"
			aria-labelledby="destinations-title"
			className="overflow-hidden bg-[#050505] py-20 md:py-36"
		>
			<div className="pad-x mx-auto max-w-[1600px]">
				<div
					ref={headingRef}
					className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={copy.label}
						labelId="destinations-label"
						title={copy.title}
						titleId="destinations-title"
						description={copy.description}
						descriptionId="destinations-description"
						labelClassName="mb-3"
						descriptionClassName="mt-4 text-white/55"
					/>

					<div className="scrollbar-none flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5">
						{filterCategories.map(cat => {
							const active = selectedCategory === cat.key;
							return (
								<button
									key={cat.key}
									type="button"
									aria-pressed={active}
									onClick={() => {
										setSelectedCategory(cat.key);
										handleSelectDestination(0);
									}}
									className={cn(
										"inline-flex min-h-11 shrink-0 items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
										active
											? "bg-orange-500 text-[#050505]"
											: "text-white/60 hover:bg-white/10 hover:text-white"
									)}
								>
									{cat.label}
								</button>
							);
						})}
					</div>
				</div>

				<div ref={stageWrapRef}>
					<DestinationsStage
						copy={copy}
						imagesReady={stageReady}
						preloadNext={stageVisible}
						destinations={activeDestinations}
						activeIndex={activeIndex}
						cycle={cycle}
						showProgress={
							!reduceMotion &&
							!paused &&
							!interactionPaused &&
							stageVisible &&
							pageVisible &&
							activeDestinations.length > 1
						}
						onSelect={handleSelectDestination}
						onPauseChange={setPaused}
						onInteractionChange={setInteractionPaused}
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
						{copy.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
