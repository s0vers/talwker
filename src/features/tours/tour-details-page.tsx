"use client";

import { InitialLoader } from "@/features/home/sections";
import {
	TourDetailsDays,
	TourDetailsHero,
	TourDetailsMobileBar,
	TourDetailsSheet,
} from "@/features/tours/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Tour } from "@/shared/types/domain";

export type TourDetailsPageProps = {
	tour: Tour;
};

export default function TourDetailsPage({ tour }: TourDetailsPageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen bg-[#050505] pb-24 lg:pb-0">
				<TourDetailsHero tour={tour} />
				<div className="mx-auto grid max-w-[1600px] gap-10 pad-x py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-stretch lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem]">
					<div className="min-w-0">
						<TourDetailsDays key={tour.slug} tour={tour} />
					</div>
					{/* Stretch with itinerary so sticky sheet has a tall containing block */}
					<div className="relative min-w-0">
						<TourDetailsSheet tour={tour} />
					</div>
				</div>
				<TourDetailsMobileBar tour={tour} />
			</div>
		</>
	);
}
