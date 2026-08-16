"use client";

import { useRef } from "react";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { TOURS } from "@/features/home/content/tours";
import { FEATURED_TOURS_SECTION } from "@/features/home/content/section-copy";
import { SectionCta, SectionHeading, TourCard } from "@/shared/ui";

export default function FeaturedTours() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const grid = cardsRef.current;
			const cards = grid?.querySelectorAll<HTMLElement>("[data-tour-card]");

			if (heading) {
				gsap.from(heading, {
					y: 36,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			}

			if (grid && cards?.length) {
				gsap.from(cards, {
					y: 52,
					opacity: 0,
					scale: 0.96,
					duration: 0.9,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: grid,
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
			id="tours"
			aria-labelledby="featured-tours-title"
			className="bg-[#0b0b0b] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div
					ref={headingRef}
					className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end"
				>
					<SectionHeading
						label={FEATURED_TOURS_SECTION.label}
						labelId="featured-tours-label"
						title={FEATURED_TOURS_SECTION.title}
						titleId="featured-tours-title"
						description={FEATURED_TOURS_SECTION.description}
						descriptionId="featured-tours-description"
					/>
					<SectionCta
						href="/tours"
						icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
					>
						{FEATURED_TOURS_SECTION.viewAllCta}
					</SectionCta>
				</div>

				<div
					ref={cardsRef}
					className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
				>
					{TOURS.map((tour) => (
						<TourCard
							key={tour.id}
							tour={tour}
							href={`/tours/${tour.slug}`}
							savePrefix={FEATURED_TOURS_SECTION.savePrefix}
							startingAt={FEATURED_TOURS_SECTION.startingAt}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
