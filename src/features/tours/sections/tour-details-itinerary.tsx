"use client";

import Image from "next/image";
import { TOUR_DETAILS_ITINERARY } from "@/features/tours/content/tour-details-copy";
import type { Tour } from "@/shared/types/domain";

type TourDetailsItineraryProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

export default function TourDetailsItinerary({ tour }: TourDetailsItineraryProps) {
	return (
		<div aria-label={TOUR_DETAILS_ITINERARY.title}>
			{tour.itinerary.map((entry, index) => (
				<section
					key={`${tour.slug}-day-${entry.day}`}
					id={`tour-day-${entry.day}`}
					data-tour-day
					className="relative min-h-[100svh] scroll-mt-20 overflow-hidden border-b border-white/10 text-white lg:scroll-mt-0"
				>
					<div className="absolute inset-0 overflow-hidden">
						<div data-tour-day-media className="absolute inset-0 scale-105 will-change-transform">
							<Image
								src={entry.image}
								alt=""
								fill
								priority={index === 0}
								sizes="100vw"
								className="object-cover"
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/30"
							aria-hidden
						/>
						<div
							className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_15%_100%,rgba(249,115,22,0.12),transparent_55%)]"
							aria-hidden
						/>
					</div>

					<div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end pad-x pb-16 pt-28 md:pb-24 md:pt-36">
						<div data-tour-day-copy className="max-w-xl">
							<span className="font-mono text-xs tracking-[0.2em] text-orange-500">
								{TOUR_DETAILS_ITINERARY.dayPrefix} {formatDay(entry.day)}
							</span>
							<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white">
								{entry.title}
							</h2>
							<p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
								{entry.body}
							</p>
						</div>
					</div>
				</section>
			))}
		</div>
	);
}
