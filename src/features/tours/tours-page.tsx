"use client";

import { InitialLoader } from "@/features/home/sections";
import { ToursCTA, ToursCatalog, ToursHero } from "@/features/tours/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Tour } from "@/shared/types/domain";

export type ToursPageProps = {
	tours: Tour[];
	destinationFilter?: string;
};

export default function ToursPage({ tours, destinationFilter }: ToursPageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<ToursHero tours={tours} destinationFilter={destinationFilter} />
			<ToursCatalog tours={tours} destinationFilter={destinationFilter} />
			<ToursCTA />
		</>
	);
}
