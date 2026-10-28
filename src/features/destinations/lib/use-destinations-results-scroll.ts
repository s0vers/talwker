"use client";

import { type RefObject, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
	DESTINATIONS_GRID_RESULTS_ID,
	destinationsListHasActiveRefinements,
	type DestinationsListParsed,
} from "@/features/destinations/lib/destinations-list-params";

/** Legacy hash from earlier releases; still honored for bookmarks. */
const LEGACY_RESULTS_HASH = "#destinations-collection";

/**
 * After client navigations (search, chips, pagination), keep the viewport on the
 * results region without forcing a full scroll-to-top. Skips work on a plain
 * `/destinations` landing with no active refinements.
 */
export function useDestinationsResultsScroll(
	resultsRef: RefObject<HTMLDivElement | null>,
	list: DestinationsListParsed,
): void {
	const searchParams = useSearchParams();

	useEffect(() => {
		const el = resultsRef.current;
		if (!el) return;
		const h = window.location.hash;
		const hasResultsHash = h === `#${DESTINATIONS_GRID_RESULTS_ID}` || h === LEGACY_RESULTS_HASH;
		if (!hasResultsHash && !destinationsListHasActiveRefinements(list)) return;

		const id = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				el.scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
			});
		});
		return () => cancelAnimationFrame(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- resultsRef identity is stable
	}, [searchParams, list]);
}
