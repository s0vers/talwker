"use client";

import Link from "next/link";
import { TOUR_DETAILS_SHEET } from "@/features/tours/content/tour-details-copy";
import { formatTourPrice } from "@/features/tours/lib/format-tour-price";
import type { Tour } from "@/shared/types/domain";

type TourDetailsSheetProps = {
	tour: Tour;
};

export default function TourDetailsSheet({ tour }: TourDetailsSheetProps) {
	return (
		<aside
			aria-label={TOUR_DETAILS_SHEET.ariaLabel}
			className="rounded-2xl border border-white/12 bg-[#0a0a0a] p-6 text-white lg:sticky lg:top-24 lg:z-10 lg:max-h-[calc(100svh-6.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:p-7"
		>
			<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
				{TOUR_DETAILS_SHEET.fromLabel}
			</p>
			<p className="mt-2 text-3xl font-semibold tracking-tight text-orange-400">
				{formatTourPrice(tour.price)}
				{tour.originalPrice ? (
					<span className="ml-3 text-base font-medium text-white/30 line-through">
						{formatTourPrice(tour.originalPrice)}
					</span>
				) : null}
			</p>

			<dl className="mt-6 space-y-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em]">
				<div className="flex items-baseline justify-between gap-4">
					<dt className="text-white/35">{TOUR_DETAILS_SHEET.durationLabel}</dt>
					<dd className="text-right text-white/75">{tour.duration}</dd>
				</div>
				<div className="flex items-baseline justify-between gap-4">
					<dt className="text-white/35">{TOUR_DETAILS_SHEET.groupLabel}</dt>
					<dd className="text-right text-white/75">{tour.groupSize}</dd>
				</div>
				<div className="flex items-baseline justify-between gap-4">
					<dt className="text-white/35">{TOUR_DETAILS_SHEET.ratingLabel}</dt>
					<dd className="text-right text-white/75">{tour.rating.toFixed(1)}</dd>
				</div>
			</dl>

			<div className="mt-6 border-t border-white/10 pt-6">
				<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
					{TOUR_DETAILS_SHEET.includesLabel}
				</p>
				<ul className="mt-4 space-y-2.5">
					{tour.includes.map((item) => (
						<li
							key={item}
							className="flex gap-2 text-sm leading-snug text-white/60"
						>
							<span
								className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500"
								aria-hidden
							/>
							{item}
						</li>
					))}
				</ul>
			</div>

			<div className="mt-8 flex flex-col gap-3">
				<Link
					href={TOUR_DETAILS_SHEET.inquireHref}
					className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-orange-400"
				>
					{TOUR_DETAILS_SHEET.inquireLabel}
				</Link>
				<a
					href={TOUR_DETAILS_SHEET.mailtoHref}
					className="text-center text-[11px] font-medium tracking-wide text-white/45 underline-offset-4 transition-colors hover:text-white/70 hover:underline"
				>
					{TOUR_DETAILS_SHEET.mailtoLabel}
				</a>
			</div>

			{tour.destinationSlug ? (
				<p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/45">
					{TOUR_DETAILS_SHEET.destinationLinkPrefix}{" "}
					<Link
						href={`/destinations/${tour.destinationSlug}`}
						className="text-orange-400 underline-offset-4 transition-colors hover:text-orange-300 hover:underline"
					>
						{tour.destination}
					</Link>
				</p>
			) : null}
		</aside>
	);
}
