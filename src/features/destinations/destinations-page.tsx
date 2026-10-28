"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { DestinationsCTA, DestinationsGrid, DestinationsHero } from "@/features/destinations/sections";

export type DestinationsPageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function DestinationsPage({ list, grid, quickLinks }: DestinationsPageProps) {

	return (
		<>
			<DestinationsHero />
			<DestinationsGrid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
