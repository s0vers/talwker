import Image from "next/image";
import { TOUR_DETAILS_DAYS } from "@/features/tours/content/tour-details-copy";
import type { TourItineraryDay } from "@/shared/types/domain";

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

function ArrivalPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="space-y-5 pb-5 md:pl-13 md:pb-6">
			<div className="relative aspect-21/9 overflow-hidden rounded-xl md:aspect-[2.4/1]">
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
				<div className="space-y-3 rounded-xl bg-white/3 p-4 ring-1 ring-inset ring-white/6">
					<ChipLine chips={day.chips} />
					<Overnight overnight={day.overnight} />
				</div>
			</div>
		</div>
	);
}

function SplitPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="grid gap-6 pb-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8 md:pb-6 md:pl-13">
			<div className="relative aspect-4/3 overflow-hidden rounded-xl md:aspect-auto md:min-h-56">
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

function JournalPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="pb-5 md:pl-13 md:pb-6">
			<div className="relative overflow-hidden rounded-xl bg-white/2.5 ring-1 ring-inset ring-white/6">
				<div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_11.5rem]">
					<div className="space-y-4 p-5 md:p-6">
						<p className="text-[15px] leading-relaxed text-white/65 md:text-base">
							{day.detail}
						</p>
						<NoteCallout note={day.note} />
						<div className="flex flex-col gap-2 border-t border-white/6 pt-4 sm:flex-row sm:items-center sm:justify-between">
							<ChipLine chips={day.chips} />
							<Overnight overnight={day.overnight} />
						</div>
					</div>
					<div className="relative min-h-40 border-t border-white/6 md:min-h-0 md:border-t-0 md:border-l md:border-white/6">
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

function OptionsPanel({ day }: { day: TourItineraryDay }) {
	const options = day.options?.length ? day.options : [day.detail];

	return (
		<div className="grid gap-6 pb-5 md:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] md:gap-8 md:pb-6 md:pl-13">
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
			<div className="relative aspect-5/4 overflow-hidden rounded-xl">
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

function LogisticsPanel({ day }: { day: TourItineraryDay }) {
	return (
		<div className="pb-5 md:pl-13 md:pb-6">
			<div className="grid gap-5 rounded-xl bg-white/3 p-5 ring-1 ring-inset ring-white/6 md:grid-cols-[minmax(0,1fr)_9rem] md:items-center md:gap-6 md:p-6">
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

/** Unique expanded layouts for itinerary days. */
export function TourDayExpandedBody({ day }: { day: TourItineraryDay }) {
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
	}
}
