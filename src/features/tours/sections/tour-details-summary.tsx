"use client";

import type { Tour } from "@/shared/types/domain";

type TourDetailsSummaryProps = {
	tour: Tour;
};

/**
 * Standalone summary essay — removed from the detail page composition.
 * Hero carries a single summary line; kept for Task 4 / optional reuse.
 */
export default function TourDetailsSummary({ tour }: TourDetailsSummaryProps) {
	return (
		<section
			aria-label="Tour brief"
			className="border-b border-white/10 bg-[#0a0a0a] text-white"
		>
			<div className="mx-auto max-w-[1600px] pad-x py-10 md:py-12">
				<p className="max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
					{tour.summary}
				</p>
			</div>
		</section>
	);
}
