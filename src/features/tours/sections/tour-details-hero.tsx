"use client";

import Image from "next/image";
import { useRef } from "react";
import { TOUR_DETAILS_HERO } from "@/features/tours/content/tour-details-copy";
import { formatTourPrice } from "@/features/tours/lib/format-tour-price";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsHeroProps = {
	tour: Tour;
};

export default function TourDetailsHero({ tour }: TourDetailsHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-hero-item]");
			if (!nodes?.length) return;
			gsap.from(nodes, {
				y: 20,
				opacity: 0,
				duration: 0.7,
				stagger: 0.06,
				ease: "power3.out",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-details-title"
			className="relative border-b border-white/10 bg-[#050505] text-white"
		>
			<div className="relative mx-auto max-w-[1600px] pad-x pb-10 pt-28 md:pb-12 md:pt-36">
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,32rem)]">
					<div>
						<p
							data-hero-item
							className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
						>
							{TOUR_DETAILS_HERO.kicker}
						</p>
						<p
							data-hero-item
							className="mt-4 text-sm text-white/50 md:text-[15px]"
						>
							{tour.destination}
						</p>
						<h1
							data-hero-item
							id="tour-details-title"
							className="mt-2 text-[clamp(1.85rem,4vw,3.1rem)] font-semibold leading-[1.1] tracking-tight text-white"
						>
							{tour.title}
						</h1>
						<p
							data-hero-item
							className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45"
						>
							<span>{tour.duration}</span>
							<span className="mx-2 text-white/20" aria-hidden>
								·
							</span>
							<span>{tour.groupSize}</span>
						</p>

						<div
							data-hero-item
							className="mt-10 max-w-2xl border-t border-white/10 pt-8"
						>
							<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500/90">
								{TOUR_DETAILS_HERO.routeWhyLabel}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
								{tour.routeWhy}
							</p>
						</div>
					</div>

					<div
						data-hero-item
						className="relative aspect-16/10 overflow-hidden rounded-xl border border-white/10 sm:aspect-5/4 lg:aspect-auto lg:h-full lg:min-h-88 lg:max-h-112"
					>
						<Image
							src={tour.image}
							alt=""
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 512px"
							className="object-cover"
						/>
					</div>
				</div>

				<dl
					data-hero-item
					className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4"
				>
					<div className="bg-[#050505] px-4 py-4 sm:px-5">
						<dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
							{TOUR_DETAILS_HERO.factsDays}
						</dt>
						<dd className="mt-1.5 text-lg font-semibold tabular-nums text-white">
							{tour.itinerary.length}
						</dd>
					</div>
					<div className="bg-[#050505] px-4 py-4 sm:px-5">
						<dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
							{TOUR_DETAILS_HERO.factsFrom}
						</dt>
						<dd className="mt-1.5 text-lg font-semibold tabular-nums text-orange-400">
							{formatTourPrice(tour.price)}
						</dd>
					</div>
					<div className="bg-[#050505] px-4 py-4 sm:px-5">
						<dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
							{TOUR_DETAILS_HERO.factsGroup}
						</dt>
						<dd className="mt-1.5 text-lg font-semibold text-white">
							{tour.groupSize.replace(/^Max\s+/i, "")}
						</dd>
					</div>
					<div className="bg-[#050505] px-4 py-4 sm:px-5">
						<dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
							{TOUR_DETAILS_HERO.factsRated}
						</dt>
						<dd className="mt-1.5 text-lg font-semibold tabular-nums text-white">
							{tour.rating.toFixed(1)}
						</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
