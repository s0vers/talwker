"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { DestinationsCTA, DestinationsGrid, DestinationsHero } from "@/features/destinations/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export type DestinationsPageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function DestinationsPage({ list, grid, quickLinks }: DestinationsPageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<DestinationsHero />
			<DestinationsGrid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
