"use client";

import { useEffect, useState } from "react";
import DestinationsCTA from "@/features/destinations/sections/destinations-cta";
import { InitialLoader } from "@/features/home/sections";
import type {
	DestinationsGridComputed,
	DestinationsListParsed,
	DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { Destinations3Grid, Destinations3Hero } from "@/features/destinations-3/sections";

export type Destinations3PageProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function Destinations3Page({ list, grid, quickLinks }: Destinations3PageProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const mountedAt = Date.now();
		const MIN_LOADER_MS = 200;

		const clearLoading = () => {
			setIsLoading(false);
			document.body.style.overflow = originalOverflow;
		};

		const onReady = () => {
			const elapsed = Date.now() - mountedAt;
			const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
			if (remaining === 0) {
				clearLoading();
				return;
			}
			window.setTimeout(clearLoading, remaining);
		};

		if (document.readyState === "complete") {
			const timeout = setTimeout(onReady, 0);
			return () => clearTimeout(timeout);
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);
		const timeout = setTimeout(onReady, 1200);

		return () => {
			window.removeEventListener("load", handleLoad);
			clearTimeout(timeout);
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<Destinations3Hero />
			<Destinations3Grid list={list} grid={grid} quickLinks={quickLinks} />
			<DestinationsCTA />
		</>
	);
}
