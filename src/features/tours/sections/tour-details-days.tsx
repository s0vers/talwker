"use client";

import { useId, useRef, useState } from "react";
import { TOUR_DETAILS_DAYS } from "@/features/tours/content/tour-details-copy";
import { TourDayExpandedBody } from "@/features/tours/sections/tour-details-day-panels";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext
} from "@/lib/useGsap";
import { cn } from "@/lib/utils";
import type { Tour, TourItineraryDay } from "@/shared/types/domain";

type TourDetailsDaysProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

function DayPanel({
	day,
	open,
	onToggle,
	panelId,
	buttonId,
	tourImage
}: {
	day: TourItineraryDay;
	open: boolean;
	onToggle: () => void;
	panelId: string;
	buttonId: string;
	tourImage: string;
}) {
	return (
		<li
			id={`tour-day-${day.day}`}
			data-tour-day
			data-panel={day.panel}
			className={cn(
				"overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300",
				open
					? "border-orange-500/35 bg-[#0a0a0a] shadow-[inset_0_1px_0_0_rgba(249,115,22,0.12)]"
					: "border-orange-500/15 bg-transparent hover:border-orange-500/28 hover:bg-orange-500/3"
			)}
		>
			<h3 className="m-0">
				<button
					type="button"
					id={buttonId}
					aria-expanded={open}
					aria-controls={panelId}
					onClick={onToggle}
					className="flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white md:gap-5 md:px-5 md:py-5"
				>
					<span className="font-mono text-lg font-semibold tracking-tight text-orange-500/90 tabular-nums md:text-xl">
						{formatDay(day.day)}
					</span>
					<span className="min-w-0 flex-1">
						<span className="block text-base font-semibold tracking-tight text-white md:text-lg">
							{day.title}
						</span>
						<span className="mt-1.5 block text-sm text-white/40 md:text-[13px]">
							{day.body}
						</span>
					</span>
					<span
						className={cn(
							"mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/20 text-white/45 transition-[transform,border-color,color,background-color] duration-300",
							open &&
								"rotate-180 border-orange-500/40 bg-orange-500/10 text-orange-400"
						)}
						aria-hidden
					>
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<path
								d="M4 6l4 4 4-4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span className="sr-only">
						{open
							? TOUR_DETAILS_DAYS.collapseHint
							: TOUR_DETAILS_DAYS.expandHint}
					</span>
				</button>
			</h3>

			<div
				id={panelId}
				role="region"
				aria-labelledby={buttonId}
				hidden={!open}
				className={cn(
					!open && "hidden",
					open && "border-t border-orange-500/15 px-4 pt-4 md:px-5 md:pt-5"
				)}
			>
				<TourDayExpandedBody day={day} showImage={day.image !== tourImage} />
			</div>
		</li>
	);
}

export default function TourDetailsDays({ tour }: TourDetailsDaysProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const baseId = useId();
	const firstDay = tour.itinerary[0]?.day ?? 1;
	const [openDays, setOpenDays] = useState<ReadonlySet<number>>(
		() => new Set([firstDay])
	);
	const dayCount = tour.itinerary.length;

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;
		const rows = sectionRef.current?.querySelectorAll("[data-tour-day]");
		if (!rows?.length) return;
		createStaggerReveal(rows, sectionRef.current, {
			y: 18,
			duration: 0.55,
			stagger: 0.04,
			start: "top 90%"
		});
	}, [tour.slug]);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tour-days-title"
			className="@container text-white"
		>
			<header className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="text-[11px] font-semibold tracking-[0.22em] text-orange-500 uppercase">
						{TOUR_DETAILS_DAYS.label}
					</p>
					<h2
						id="tour-days-title"
						className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
					>
						{TOUR_DETAILS_DAYS.title}
					</h2>
				</div>
				<p className="font-mono text-[11px] tracking-[0.16em] text-white/35 uppercase">
					{dayCount} days
				</p>
			</header>

			<ol className="m-0 flex list-none flex-col gap-3 p-0 md:gap-3.5">
				{tour.itinerary.map(day => {
					const open = openDays.has(day.day);
					return (
						<DayPanel
							key={`${tour.slug}-${day.day}`}
							day={day}
							open={open}
							onToggle={() => {
								setOpenDays(current => {
									const next = new Set(current);
									if (next.has(day.day)) next.delete(day.day);
									else next.add(day.day);
									return next;
								});
							}}
							panelId={`${baseId}-panel-${day.day}`}
							buttonId={`${baseId}-btn-${day.day}`}
							tourImage={tour.image}
						/>
					);
				})}
			</ol>
		</section>
	);
}
