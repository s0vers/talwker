"use client";

import Image from "next/image";
import { useRef } from "react";
import { LuStar, LuClock, LuUsers, LuMapPin, LuArrowRight } from "react-icons/lu";
import {
	gsap,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { TOURS } from "@/features/home/content/tours";
import { FEATURED_TOURS_SECTION } from "@/features/home/content/section-copy";
import { PillBadge, SectionCta, SectionHeading } from "@/shared/ui";

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
						<div
							key={tour.id}
							data-tour-card
							className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
							style={{ transformStyle: "preserve-3d" }}
						>
							<div
								className="relative h-64 overflow-hidden"
								data-tour-card-image
							>
								<Image
									src={tour.image}
									alt={tour.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
								{tour.originalPrice && (
									<span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
										{FEATURED_TOURS_SECTION.savePrefix}
										{(tour.originalPrice - tour.price).toLocaleString()}
									</span>
								)}
								<div className="absolute bottom-5 left-4 right-4 flex items-center justify-between gap-3">
									<div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
										<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
										<span className="text-xs font-medium text-white/85">
											{tour.destination}
										</span>
									</div>
									<div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
										<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
										<span className="text-xs font-semibold text-white">
											{tour.rating}
										</span>
										<span className="text-xs text-white/50">
											({tour.reviews})
										</span>
									</div>
								</div>
							</div>

							<div className="p-6">
								<h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-white">
									{tour.title}
								</h3>

								<div className="mb-5 flex flex-wrap gap-2">
									{tour.highlights.map((hl) => (
										<PillBadge key={hl}>{hl}</PillBadge>
									))}
								</div>

								<div className="mb-5 grid grid-cols-2 gap-4 text-xs text-white/55">
									<span className="flex items-center gap-1.5">
										<LuClock className="h-3.5 w-3.5 text-orange-500" />
										{tour.duration}
									</span>
									<span className="flex items-center gap-1.5">
										<LuUsers className="h-3.5 w-3.5 text-orange-500" />
										{tour.groupSize}
									</span>
								</div>

								<div className="flex items-end justify-between border-t border-white/10 pt-5">
									<div className="text-[11px] uppercase tracking-[0.14em] text-white/55">
										{FEATURED_TOURS_SECTION.startingAt}
									</div>
									<div className="text-right">
										{tour.originalPrice && (
											<p className="text-xs text-white/55 line-through">
												${tour.originalPrice.toLocaleString()}
											</p>
										)}
										<p className="text-2xl font-semibold tracking-tight text-orange-500">
											${tour.price.toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

