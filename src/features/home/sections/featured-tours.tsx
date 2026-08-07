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

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;
		const grid = cardsRef.current;
		const cards = grid?.querySelectorAll<HTMLElement>("[data-tour-card]");
		if (grid && cards?.length) {
			gsap.from(cards, {
				y: 56,
				opacity: 0,
				scale: 0.94,
				rotationY: -8,
				transformOrigin: "center bottom",
				duration: 1,
				stagger: 0.12,
				ease: "power4.out",
				immediateRender: false,
				scrollTrigger: {
					trigger: grid,
					start: "top 78%",
					toggleActions: "play none none none",
				},
			});

			// Image scale-in inside each card (slight zoom settle)
			cards.forEach((card) => {
				const imgWrap = card.querySelector<HTMLElement>("[data-tour-card-image]");
				if (imgWrap) {
					gsap.from(imgWrap, {
						scale: 1.12,
						duration: 1.1,
						ease: "power3.out",
						immediateRender: false,
						scrollTrigger: {
							trigger: card,
							start: "top 85%",
							toggleActions: "play none none none",
						},
					});
				}
			});
		}
	}, []);

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
					style={{ perspective: "1000px" }}
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
					style={{ perspective: "1200px" }}
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

