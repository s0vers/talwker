"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { TOUR_DETAILS_DAYS } from "@/features/tours/content/tour-details-copy";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import { cn } from "@/lib/utils";
import type { Tour, TourItineraryDay } from "@/shared/types/domain";

type TourDetailsDaysProps = {
	tour: Tour;
};

function formatDay(day: number): string {
	return String(day).padStart(2, "0");
}

function ChipLine({ chips }: { chips?: string[] }) {
	if (!chips?.length) return null;
	return (
		<p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
			{chips.join(" · ")}
		</p>
	);
}

function NoteCallout({ note }: { note?: string }) {
	if (!note) return null;
	return (
		<p className="border-l-2 border-orange-500/70 pl-3 text-sm leading-relaxed text-white/70">
			{note}
		</p>
	);
}

function Overnight({ overnight }: { overnight?: string }) {
	if (!overnight) return null;
	return (
		<p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
			<span className="text-white/25">{TOUR_DETAILS_DAYS.overnightLabel}</span>{" "}
			<span className="text-white/65">{overnight}</span>
		</p>
	);
}

/** Wide media first — arrival / settle. */
function ArrivalPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="space-y-5 pb-5 md:pl-[3.25rem] md:pb-6">
			<div className="relative aspect-[21/9] overflow-hidden rounded-xl md:aspect-[2.4/1]">
				<Image
					src={day.image}
					alt=""
					fill
					sizes="(max-width: 1024px) 100vw, 70vw"
					className="object-cover"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-transparent to-transparent"
					aria-hidden
				/>
			</div>
			<div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start">
				<div className="space-y-4">
					<p className="max-w-2xl text-[15px] leading-relaxed text-white/65 md:text-base">
						{day.detail}
					</p>
					<NoteCallout note={day.note} />
				</div>
				<div className="space-y-3 rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06]">
					<ChipLine chips={day.chips} />
					<Overnight overnight={day.overnight} />
				</div>
			</div>
		</div>
	);
}

/** Large image + prose side by side — guided / active days. */
function SplitPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="grid gap-6 pb-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8 md:pb-6 md:pl-[3.25rem]">
			<div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:min-h-[14rem]">
				<Image
					src={day.image}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, 40vw"
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col justify-center space-y-4 py-1">
				<p className="text-[15px] leading-relaxed text-white/65 md:text-base">
					{day.detail}
				</p>
				<NoteCallout note={day.note} />
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
					<ChipLine chips={day.chips} />
					<Overnight overnight={day.overnight} />
				</div>
			</div>
		</div>
	);
}

/** Copy-led with inset frame — quieter cultural / craft days. */
function JournalPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="pb-5 md:pl-[3.25rem] md:pb-6">
			<div className="relative overflow-hidden rounded-xl bg-white/[0.025] ring-1 ring-inset ring-white/[0.06]">
				<div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_11.5rem]">
					<div className="space-y-4 p-5 md:p-6">
						<p className="text-[15px] leading-relaxed text-white/65 md:text-base">
							{day.detail}
						</p>
						<NoteCallout note={day.note} />
						<div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
							<ChipLine chips={day.chips} />
							<Overnight overnight={day.overnight} />
						</div>
					</div>
					<div className="relative min-h-[10rem] border-t border-white/[0.06] md:min-h-0 md:border-t-0 md:border-l md:border-white/[0.06]">
						<Image
							src={day.image}
							alt=""
							fill
							sizes="(max-width: 768px) 100vw, 184px"
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

/** Choice list — open / free days. */
function OptionsPanel({ day }: { day: TourItineraryDay }) {
	const options = day.options?.length
		? day.options
		: [day.detail];

	return (
		<div className="grid gap-6 pb-5 md:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] md:gap-8 md:pb-6 md:pl-[3.25rem]">
			<div className="space-y-5">
				<p className="text-[15px] leading-relaxed text-white/65 md:text-base">
					{day.detail}
				</p>
				<ul className="space-y-3">
					{options.map((option) => (
						<li
							key={option}
							className="flex gap-3 text-sm leading-snug text-white/70"
						>
							<span
								className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
								aria-hidden
							/>
							{option}
						</li>
					))}
				</ul>
				<NoteCallout note={day.note} />
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					<ChipLine chips={day.chips} />
					<Overnight overnight={day.overnight} />
				</div>
			</div>
			<div className="relative aspect-[5/4] overflow-hidden rounded-xl">
				<Image
					src={day.image}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, 256px"
					className="object-cover"
				/>
			</div>
		</div>
	);
}

/** Dense exit block — departure / buffer. */
function LogisticsPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="pb-5 md:pl-[3.25rem] md:pb-6">
			<div className="grid gap-5 rounded-xl bg-white/[0.03] p-5 ring-1 ring-inset ring-white/[0.06] md:grid-cols-[minmax(0,1fr)_9rem] md:items-center md:gap-6 md:p-6">
				<div className="space-y-3">
					<p className="text-[15px] leading-relaxed text-white/65 md:text-base">
						{day.detail}
					</p>
					<NoteCallout note={day.note} />
					<ChipLine chips={day.chips} />
				</div>
				<div className="relative aspect-square overflow-hidden rounded-lg">
					<Image
						src={day.image}
						alt=""
						fill
						sizes="144px"
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	);
}

function ExpandedBody({ day }: { day: TourItineraryDay }) {
	switch (day.panel) {
		case "arrival":
			return <ArrivalPanel day={day} />;
		case "split":
			return <SplitPanel day={day} />;
		case "journal":
			return <JournalPanel day={day} />;
		case "options":
			return <OptionsPanel day={day} />;
		case "logistics":
			return <LogisticsPanel day={day} />;
		default:
			return <SplitPanel day={day} />;
	}
}

function DayPanel({
	day,
	open,
	onToggle,
	panelId,
	buttonId,
}: {
	day: TourItineraryDay;
	open: boolean;
	onToggle: () => void;
	panelId: string;
	buttonId: string;
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
					: "border-orange-500/15 bg-transparent hover:border-orange-500/28 hover:bg-orange-500/[0.03]",
			)}
		>
			<h3 className="m-0">
				<button
					type="button"
					id={buttonId}
					aria-expanded={open}
					aria-controls={panelId}
					onClick={onToggle}
					className="flex w-full items-start gap-4 px-4 py-4 text-left md:gap-5 md:px-5 md:py-5"
				>
					<span className="font-mono text-lg font-semibold tabular-nums tracking-tight text-orange-500/90 md:text-xl">
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
								"rotate-180 border-orange-500/40 bg-orange-500/10 text-orange-400",
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
					open && "border-t border-orange-500/15 px-4 pt-4 md:px-5 md:pt-5",
				)}
			>
				<ExpandedBody day={day} />
			</div>
		</li>
	);
}

export default function TourDetailsDays({ tour }: TourDetailsDaysProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const baseId = useId();
	const firstDay = tour.itinerary[0]?.day ?? 1;
	/** Independent open state — opening one day does not collapse another (avoids height-jump jitter). */
	const [openDays, setOpenDays] = useState<ReadonlySet<number>>(
		() => new Set([firstDay]),
	);
	const total = tour.itinerary.length;

	useEffect(() => {
		setOpenDays(new Set([tour.itinerary[0]?.day ?? 1]));
	}, [tour.slug]);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const rows = sectionRef.current?.querySelectorAll("[data-tour-day]");
			if (!rows?.length) return;
			createStaggerReveal(rows, sectionRef.current, {
				y: 18,
				duration: 0.55,
				stagger: 0.04,
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
			<header className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{TOUR_DETAILS_DAYS.label}
					</p>
					<h2
						id="tour-days-title"
						className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl"
					>
						{TOUR_DETAILS_DAYS.title}
					</h2>
				</div>
				<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
					{total} days
				</p>
			</header>

			<ol className="m-0 flex list-none flex-col gap-3 p-0 md:gap-3.5">
				{tour.itinerary.map((day) => {
					const open = openDays.has(day.day);
					return (
						<DayPanel
							key={`${tour.slug}-${day.day}`}
							day={day}
							open={open}
							onToggle={() => {
								setOpenDays((current) => {
									const next = new Set(current);
									if (next.has(day.day)) next.delete(day.day);
									else next.add(day.day);
									return next;
								});
							}}
							panelId={`${baseId}-panel-${day.day}`}
							buttonId={`${baseId}-btn-${day.day}`}
						/>
					);
				})}
			</ol>
		</section>
	);
}
