"use client";

import { TOUR_DETAILS_RAIL } from "@/features/tours/content/tour-details-copy";
import { prefersReducedMotion } from "@/lib/useGsap";
import { cn } from "@/lib/utils";
import type { Tour } from "@/shared/types/domain";

type TourDetailsRailProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

function scrollToHash(hash: string) {
	const id = hash.replace(/^#/, "");
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({
		behavior: prefersReducedMotion() ? "auto" : "smooth",
		block: "start",
	});
}

export default function TourDetailsRail({ tour }: TourDetailsRailProps) {
	const items = [
		...tour.itinerary.map((entry) => ({
			key: `day-${entry.day}`,
			label: `${TOUR_DETAILS_RAIL.dayPrefix} ${formatDay(entry.day)}`,
			target: `#tour-day-${entry.day}`,
		})),
		{
			key: "includes",
			label: TOUR_DETAILS_RAIL.includesLabel,
			target: "#tour-includes",
		},
	];

	return (
		<nav
			data-tour-rail
			aria-label={TOUR_DETAILS_RAIL.ariaLabel}
			className={cn(
				"z-20 border-b border-white/10 bg-[#050505]/95 backdrop-blur-md",
				// Navbar is `h-20` (fixed); clear it on mobile. Desktop keeps side-rail offset.
				"sticky top-20",
				"lg:sticky lg:top-28 lg:self-start lg:border-b-0 lg:border-r lg:border-white/10 lg:bg-transparent lg:backdrop-blur-none",
			)}
		>
			<ul
				className={cn(
					"flex gap-2 overflow-x-auto pad-x py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					"lg:flex-col lg:gap-1 lg:overflow-visible lg:px-4 lg:py-6",
				)}
			>
				{items.map((item) => (
					<li key={item.key} className="shrink-0">
						<button
							type="button"
							data-tour-rail-target={item.target}
							aria-current="false"
							onClick={() => scrollToHash(item.target)}
							className={cn(
								"whitespace-nowrap border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 transition-colors",
								"hover:border-orange-500/50 hover:text-orange-400",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60",
								"data-[tour-rail-active]:border-orange-500 data-[tour-rail-active]:bg-orange-500/10 data-[tour-rail-active]:text-orange-400",
								"lg:w-full lg:border-transparent lg:px-3 lg:text-left lg:data-[tour-rail-active]:border-l-orange-500 lg:data-[tour-rail-active]:border-y-transparent lg:data-[tour-rail-active]:border-r-transparent lg:data-[tour-rail-active]:bg-transparent",
							)}
						>
							{item.label}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
