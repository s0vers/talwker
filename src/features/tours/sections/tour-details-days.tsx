"use client";

import Image from "next/image";
import { useRef } from "react";
import { TOUR_DETAILS_DAYS } from "@/features/tours/content/tour-details-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsDaysProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

export default function TourDetailsDays({ tour }: TourDetailsDaysProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const rows = sectionRef.current?.querySelectorAll("[data-tour-day]");
			if (!rows?.length) return;
			createStaggerReveal(rows, sectionRef.current, {
				y: 24,
				duration: 0.65,
				stagger: 0.05,
				start: "top 90%",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-days-title"
			className="text-white"
		>
			<header className="mb-8 md:mb-10">
				<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
					{TOUR_DETAILS_DAYS.label}
				</p>
				<h2
					id="tour-days-title"
					className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
				>
					{TOUR_DETAILS_DAYS.title}
				</h2>
			</header>

			<ol className="flex flex-col gap-6 md:gap-8">
				{tour.itinerary.map((day) => (
					<li
						key={day.day}
						id={`tour-day-${day.day}`}
						data-tour-day
						className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:gap-6 sm:p-5"
					>
								<div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
							<Image
								src={day.image}
								alt=""
								fill
								sizes="(max-width: 640px) 100vw, 40vw"
								className="object-cover"
							/>
						</div>
						<div className="flex flex-col justify-center">
							<p className="font-mono text-[11px] tracking-[0.18em] text-orange-500/90">
								{TOUR_DETAILS_DAYS.dayPrefix} {formatDay(day.day)}
							</p>
							<h3 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-xl">
								{day.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-white/55 md:text-[15px]">
								{day.body}
							</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
