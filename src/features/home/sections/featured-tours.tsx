"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { TOURS } from "@/features/home/content/tours";
import { SectionCta, SectionHeading, TourCard } from "@/shared/ui";

export default function FeaturedTours() {
	const t = useTranslations("Home.tours");
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
						label={t("label")}
						labelId="featured-tours-label"
						title={t("title")}
						titleId="featured-tours-title"
						description={t("description")}
						descriptionId="featured-tours-description"
					/>
					<SectionCta
						href="/tours"
						icon={<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
					>
						{t("viewAllCta")}
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
							savePrefix={t("savePrefix")}
							startingAt={t("startingAt")}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
