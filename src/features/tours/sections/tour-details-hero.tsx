"use client";

import Image from "next/image";
import { useRef } from "react";
import { TOUR_DETAILS_HERO } from "@/features/tours/content/tour-details-copy";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsHeroProps = {
	tour: Tour;
};

const SUMMARY_MAX = 140;

function formatPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}

function oneLineSummary(summary: string): string {
	const trimmed = summary.trim();
	if (trimmed.length <= SUMMARY_MAX) return trimmed;
	const cut = trimmed.slice(0, SUMMARY_MAX);
	const lastSpace = cut.lastIndexOf(" ");
	const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
	return `${base.replace(/[.,;:\s]+$/, "")}…`;
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
				y: 32,
				opacity: 0,
				duration: 0.9,
				stagger: 0.09,
				ease: "power3.out",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-details-title"
			className="relative min-h-[85svh] overflow-hidden border-b border-white/10 bg-[#050505] text-white md:min-h-[100svh]"
		>
			<div className="absolute inset-0">
				<Image
					src={tour.image}
					alt={tour.title}
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/35"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_20%_100%,rgba(249,115,22,0.14),transparent_55%)]"
					aria-hidden
				/>
			</div>

			<div className="relative mx-auto flex min-h-[85svh] max-w-[1600px] flex-col justify-end pad-x pb-14 pt-32 md:min-h-[100svh] md:pb-20 md:pt-40">
				<p
					data-hero-item
					className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
				>
					{TOUR_DETAILS_HERO.kicker}
				</p>

				<p
					data-hero-item
					className="mt-5 text-sm font-medium tracking-wide text-white/70 md:text-base"
				>
					{tour.destination}
				</p>

				<h1
					data-hero-item
					id="tour-details-title"
					className="mt-3 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white"
				>
					{tour.title}
				</h1>

				<p
					data-hero-item
					className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
				>
					{oneLineSummary(tour.summary)}
				</p>

				<p
					data-hero-item
					className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 md:text-xs"
				>
					<span>{tour.duration}</span>
					<span className="text-white/20" aria-hidden>
						|
					</span>
					<span>{tour.groupSize}</span>
					<span className="text-white/20" aria-hidden>
						|
					</span>
					<span>
						{TOUR_DETAILS_HERO.fromPrefix}{" "}
						<span className="text-orange-400">{formatPrice(tour.price)}</span>
					</span>
					<span className="text-white/20" aria-hidden>
						|
					</span>
					<span>
						{TOUR_DETAILS_HERO.ratingPrefix} {tour.rating.toFixed(1)}
					</span>
				</p>
			</div>
		</section>
	);
}
