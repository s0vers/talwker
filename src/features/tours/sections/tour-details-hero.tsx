"use client";

import Image from "next/image";
import { useRef } from "react";
import { TOUR_DETAILS_HERO } from "@/features/tours/content/tour-details-copy";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsHeroProps = {
	tour: Tour;
};

function formatPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}

export default function TourDetailsHero({ tour }: TourDetailsHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-hero-item]");
			if (!nodes?.length) return;
			gsap.from(nodes, {
				y: 24,
				opacity: 0,
				duration: 0.8,
				stagger: 0.07,
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
			<div className="relative mx-auto grid max-w-[1600px] gap-8 pad-x pb-12 pt-28 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-12 md:pb-16 md:pt-36">
				<div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 md:aspect-[5/4] md:max-h-[min(50svh,28rem)]">
					<Image
						src={tour.image}
						alt={tour.title}
						fill
						priority
						sizes="(max-width: 768px) 100vw, 55vw"
						className="object-cover"
					/>
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
						aria-hidden
					/>
				</div>

				<div>
					<p
						data-hero-item
						className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
					>
						{TOUR_DETAILS_HERO.kicker}
					</p>
					<p
						data-hero-item
						className="mt-4 text-sm font-medium text-white/65 md:text-base"
					>
						{tour.destination}
					</p>
					<h1
						data-hero-item
						id="tour-details-title"
						className="mt-2 text-[clamp(1.85rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-white"
					>
						{tour.title}
					</h1>
					<p
						data-hero-item
						className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
					>
						{tour.summary}
					</p>
					<p
						data-hero-item
						className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45"
					>
						<span>{tour.duration}</span>
						<span className="mx-2 text-white/20" aria-hidden>
							·
						</span>
						<span>{tour.groupSize}</span>
						<span className="mx-2 text-white/20" aria-hidden>
							·
						</span>
						<span>
							{TOUR_DETAILS_HERO.fromPrefix}{" "}
							<span className="text-orange-400">{formatPrice(tour.price)}</span>
						</span>
						<span className="mx-2 text-white/20" aria-hidden>
							·
						</span>
						<span>
							{TOUR_DETAILS_HERO.ratingPrefix} {tour.rating.toFixed(1)}
						</span>
					</p>
					{tour.highlights.length > 0 ? (
						<ul
							data-hero-item
							className="mt-6 flex flex-wrap gap-2"
							aria-label="Highlights"
						>
							{tour.highlights.map((item) => (
								<li
									key={item}
									className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-white/70"
								>
									{item}
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
		</section>
	);
}
