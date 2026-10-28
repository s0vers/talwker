"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeClientCopy } from "@/features/home/lib/home-client-copy";
import { LuArrowRight } from "react-icons/lu";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import { useDeferredGsapContext } from "@/lib/use-deferred-gsap";
import { FEATURED_TOURS_SECTION } from "@/features/home/content/section-copy";
import type { Tour, TourStyle } from "@/shared/types/domain";
import { cn } from "@/lib/utils";
import {
	SectionCta,
	SectionHeading,
	TourCard,
	type TourCardProps
} from "@/shared/ui";

type FeaturedTour = TourCardProps["tour"] &
	Pick<Tour, "id" | "slug" | "styles">;

type FeaturedToursProps = {
	tours: readonly FeaturedTour[];
	copy: HomeClientCopy["tours"];
};

export default function FeaturedTours({ tours, copy }: FeaturedToursProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	const [selectedStyle, setSelectedStyle] = useState<TourStyle | "All">("All");
	const [imagesReady, setImagesReady] = useState(false);

	useEffect(() => {
		const grid = cardsRef.current;
		if (!grid) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setImagesReady(true);
				observer.disconnect();
			},
			{ rootMargin: "200px" }
		);
		observer.observe(grid);
		return () => observer.disconnect();
	}, []);

	const filteredTours = tours.filter(
		tour => selectedStyle === "All" || tour.styles.includes(selectedStyle)
	);

	useDeferredGsapContext(
		sectionRef,
		({ gsap }) => {
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
							once: true
						}
					}
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
							once: true
						}
					}
				);
			}
		},
		[selectedStyle]
	);

	const filterTabLabels: Record<string, string> = {
		All: copy.filterAll,
		Cultural: copy.filterCultural,
		Adventure: copy.filterAdventure,
		Nature: copy.filterNature,
		Luxury: copy.filterLuxury
	};

	return (
		<section
			ref={sectionRef}
			id="tours"
			aria-labelledby="featured-tours-title"
			className="relative overflow-hidden bg-[#070707] py-28 md:py-36"
		>
			<div className="pad-x relative mx-auto max-w-[1600px]">
				<div
					ref={headingRef}
					className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
				>
					<SectionHeading
						containerClassName="max-w-xl"
						label={copy.label}
						labelId="featured-tours-label"
						title={copy.title}
						titleId="featured-tours-title"
						description={copy.description}
						descriptionId="featured-tours-description"
					/>

					<div className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
						{FEATURED_TOURS_SECTION.filterCategories.map(style => {
							const active = selectedStyle === style;
							const label = filterTabLabels[style] ?? style;
							return (
								<button
									key={style}
									type="button"
									aria-pressed={active}
									onClick={() => setSelectedStyle(style)}
									className={cn(
										"inline-flex min-h-11 items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
										active
											? "bg-orange-500 text-[#050505]"
											: "text-white/60 hover:bg-white/10 hover:text-white"
									)}
								>
									{label}
								</button>
							);
						})}
					</div>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
				>
					{filteredTours.map(tour => (
						<TourCard
							imageReady={imagesReady}
							key={tour.id}
							tour={tour}
							href={`/tours/${tour.slug}`}
							savePrefix={copy.savePrefix}
							startingAt={copy.startingAt}
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
						{copy.viewAllCta}
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
