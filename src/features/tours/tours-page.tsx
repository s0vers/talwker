"use client";

import { ToursCTA, ToursCatalog, ToursHero } from "@/features/tours/sections";
import type { Tour } from "@/shared/types/domain";

export type ToursPageProps = {
	tours: Tour[];
	destinationFilter?: string;
};

export default function ToursPage({ tours, destinationFilter }: ToursPageProps) {

	return (
		<>
			<ToursHero tours={tours} destinationFilter={destinationFilter} />
			<ToursCatalog tours={tours} destinationFilter={destinationFilter} />
			<ToursCTA />
		</>
	);
}
