"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { Destinations2Grid, Destinations2Hero } from "@/features/destinations-2/sections";
import DestinationsCTA from "@/features/destinations/sections/destinations-cta";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export type Destinations2PageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function Destinations2Page({ list, grid, quickLinks }: Destinations2PageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<Destinations2Hero />
			<Destinations2Grid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
