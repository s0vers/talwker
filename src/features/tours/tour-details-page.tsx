"use client";

import {
	TourDetailsDays,
	TourDetailsHero,
	TourDetailsMobileBar,
	TourDetailsSheet,
} from "@/features/tours/sections";
import type { Tour } from "@/shared/types/domain";

export type TourDetailsPageProps = {
	tour: Tour;
};

export default function TourDetailsPage({ tour }: TourDetailsPageProps) {

	return (
		<>
			<div className="relative min-h-screen bg-[#050505] pb-24 lg:pb-0">
				<TourDetailsHero tour={tour} />
				<div className="mx-auto grid max-w-[1600px] gap-10 pad-x py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem]">
					<div className="min-w-0">
						<TourDetailsDays key={tour.slug} tour={tour} />
					</div>
					<TourDetailsSheet tour={tour} />
				</div>
				<TourDetailsMobileBar tour={tour} />
			</div>
		</>
	);
}
