"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { Destinations2Grid, Destinations2Hero } from "@/features/destinations-2/sections";
import DestinationsCTA from "@/features/destinations/sections/destinations-cta";

export type Destinations2PageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function Destinations2Page({ list, grid, quickLinks }: Destinations2PageProps) {

	return (
		<>
			<Destinations2Hero />
			<Destinations2Grid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
