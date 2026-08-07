"use client";

import { useRef } from "react";
import { TOUR_DETAILS_SUMMARY } from "@/features/tours/content/tour-details-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Tour } from "@/shared/types/domain";

type TourDetailsSummaryProps = {
	tour: Tour;
};

export default function TourDetailsSummary({ tour }: TourDetailsSummaryProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-summary-item]");
			if (!nodes?.length) return;
			createStaggerReveal(nodes, sectionRef.current, {
				y: 28,
				duration: 0.75,
				stagger: 0.08,
				start: "top 84%",
			});
		},
		[tour.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-details-summary-heading"
			className="border-b border-white/10 bg-[#0a0a0a] text-white"
		>
			<div className="mx-auto grid max-w-[1600px] gap-12 pad-x py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-16 md:py-24">
				<div data-summary-item>
					<h2
						id="tour-details-summary-heading"
						className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
					>
						{TOUR_DETAILS_SUMMARY.label}
					</h2>
					<p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed">
						{tour.summary}
					</p>
				</div>

				<div data-summary-item>
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
						{TOUR_DETAILS_SUMMARY.highlightsLabel}
					</p>
					<ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
						{tour.highlights.map((highlight) => (
							<li
								key={highlight}
								className="py-4 text-sm leading-relaxed text-white/75 md:text-base"
							>
								{highlight}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
