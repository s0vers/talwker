"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { Destinations3Grid, Destinations3Hero } from "@/features/destinations-3/sections";
import DestinationsCTA from "@/features/destinations/sections/destinations-cta";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export type Destinations3PageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function Destinations3Page({ list, grid, quickLinks }: Destinations3PageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<Destinations3Hero />
			<Destinations3Grid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
