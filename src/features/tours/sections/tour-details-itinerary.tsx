"use client";

import { useRef } from "react";
import { TOUR_DETAILS_ITINERARY } from "@/features/tours/content/tour-details-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsItineraryProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

export default function TourDetailsItinerary({ tour }: TourDetailsItineraryProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const days = sectionRef.current?.querySelectorAll("[data-tour-day]");
			if (!days?.length) return;
			createStaggerReveal(days, sectionRef.current, {
				y: 36,
				duration: 0.75,
				stagger: 0.07,
				start: "top 82%",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-details-itinerary-heading"
			className="border-b border-white/10 bg-[#050505] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-16 md:py-24">
				<div className="mb-10 md:mb-14">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{TOUR_DETAILS_ITINERARY.label}
					</p>
					<h2
						id="tour-details-itinerary-heading"
						className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
					>
						{TOUR_DETAILS_ITINERARY.title}
					</h2>
				</div>

				<ol className="divide-y divide-white/10 border-y border-white/10">
					{tour.itinerary.map((entry) => (
						<li
							key={`${tour.slug}-day-${entry.day}`}
							data-tour-day
							className="grid gap-4 py-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 md:py-10"
						>
							<span className="font-mono text-xs tracking-[0.18em] text-orange-500/90 md:pt-1">
								[{formatDay(entry.day)}]
							</span>
							<div className="min-w-0">
								<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
									{TOUR_DETAILS_ITINERARY.dayPrefix} {entry.day}
								</p>
								<h3 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
									{entry.title}
								</h3>
								<p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base">
									{entry.body}
								</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
