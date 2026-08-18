"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { FEATURED_TOURS_SECTION } from "@/features/home/content/section-copy";
import { TOURS } from "@/features/home/content/tours";
import { cn } from "@/lib/utils";
import { SectionCta, SectionHeading, TourCard } from "@/shared/ui";

export default function FeaturedTours() {
	const t = useTranslations("Home.tours");
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	const [selectedStyle, setSelectedStyle] = useState<string>("All");

	const filteredTours = useMemo(() => {
		if (selectedStyle === "All") return TOURS;
		return TOURS.filter((tour) => {
			if (selectedStyle === "Cultural") {
				return tour.highlights.some(
					(h) => h.includes("Temple") || h.includes("Tea"),
				);
			}
			if (selectedStyle === "Adventure") {
				return (
					tour.highlights.some(
						(h) => h.includes("Cruise") || h.includes("Beach"),
					) || tour.destination.includes("Santorini")
				);
			}
			if (selectedStyle === "Nature") {
				return tour.highlights.some(
					(h) => h.includes("Glacier") || h.includes("Wildlife"),
				);
			}
			if (selectedStyle === "Luxury") {
				return (
					tour.originalPrice != null ||
					tour.highlights.some((h) => h.includes("Tea"))
				);
			}
			return true;
		});
	}, [selectedStyle]);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const grid = cardsRef.current;
			const cards = grid?.querySelectorAll<HTMLElement>("[data-tour-card]");

			if (heading) {
				gsap.fromTo(
					heading,
					{ y: 32, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
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

			if (grid && cards?.length) {
				gsap.fromTo(
					cards,
					{ y: 44, opacity: 0, scale: 0.97 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.8,
						stagger: 0.1,
						ease: "power3.out",
						clearProps: "opacity,transform",
						scrollTrigger: {
							trigger: grid,
							start: "top 85%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			}
		},
		[selectedStyle],
	);

	const filterTabLabels: Record<string, string> = {
		All: t("filterAll"),
		Cultural: t("filterCultural"),
		Adventure: t("filterAdventure"),
		Nature: t("filterNature"),
		Luxury: t("filterLuxury"),
	};

	return (
		<section
			ref={sectionRef}
			id="tours"
			aria-labelledby="featured-tours-title"
			className="relative overflow-hidden bg-[#070707] py-28 md:py-36"
		>
			{/* Ambient atmosphere glow */}
			<div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[140px]" />

			<div className="relative mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={t("label")}
						labelId="featured-tours-label"
						title={t("title")}
						titleId="featured-tours-title"
						description={t("description")}
						descriptionId="featured-tours-description"
					/>

					<div className="flex flex-col items-start gap-4 md:items-end">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
							</span>
							{t("spotlightBadge")}
						</div>

						{/* Style Filter Tabs */}
						<div className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
							{FEATURED_TOURS_SECTION.filterCategories.map((style) => {
								const active = selectedStyle === style;
								const label = filterTabLabels[style] ?? style;
								return (
									<button
										key={style}
										type="button"
										onClick={() => setSelectedStyle(style)}
										className={cn(
											"rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
											active
												? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
												: "text-white/60 hover:bg-white/10 hover:text-white",
										)}
									>
										{label}
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
				>
					{filteredTours.map((tour) => (
						<TourCard
							key={tour.id}
							tour={tour}
							href={`/tours/${tour.slug}`}
							savePrefix={t("savePrefix")}
							startingAt={t("startingAt")}
						/>
					))}
				</div>

				<div className="mt-16 text-center">
					<SectionCta
						href="/tours"
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

