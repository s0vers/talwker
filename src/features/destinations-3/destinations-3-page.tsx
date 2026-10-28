"use client";

import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { Destinations3Grid, Destinations3Hero } from "@/features/destinations-3/sections";
import DestinationsCTA from "@/features/destinations/sections/destinations-cta";

export type Destinations3PageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function Destinations3Page({ list, grid, quickLinks }: Destinations3PageProps) {

	return (
		<>
			<Destinations3Hero />
			<Destinations3Grid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
