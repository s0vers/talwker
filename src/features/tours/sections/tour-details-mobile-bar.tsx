"use client";

import Link from "next/link";
import { getBookingHref } from "@/features/booking/lib/booking-href";
import {
	TOUR_DETAILS_MOBILE_BAR,
	TOUR_DETAILS_SHEET,
} from "@/features/tours/content/tour-details-copy";
import { formatTourPrice } from "@/features/tours/lib/format-tour-price";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import type { Tour } from "@/shared/types/domain";

type TourDetailsMobileBarProps = {
	tour: Tour;
};

export default function TourDetailsMobileBar({ tour }: TourDetailsMobileBarProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050505]/95 px-4 py-3 backdrop-blur-md lg:hidden">
			<div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
				<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
					{TOUR_DETAILS_MOBILE_BAR.fromPrefix}{" "}
					<span className="text-base font-semibold tracking-tight text-orange-400">
						{formatTourPrice(tour.price)}
					</span>
				</p>
				<Link
					href={getBookingHref(getTourSlug(tour))}
					className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
				>
					{TOUR_DETAILS_SHEET.inquireLabel}
				</Link>
			</div>
		</div>
	);
}
