"use client";

import { useRef } from "react";
import { DESTINATIONS_2_GRID } from "@/features/destinations-2/content/destinations-2-page-copy";
import { Destinations2Card } from "@/features/destinations-2/sections/destinations-2-card";
import { Destinations2GridPagination } from "@/features/destinations-2/sections/destinations-2-grid-pagination";
import { Destinations2GridToolbar } from "@/features/destinations-2/sections/destinations-2-grid-toolbar";
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import {
	DESTINATIONS_GRID_RESULTS_ID,
	type DestinationsGridComputed,
	type DestinationsListParsed,
	type DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { useDestinationsResultsScroll } from "@/features/destinations/lib/use-destinations-results-scroll";

export type Destinations2GridProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export function Destinations2Grid({ list, grid, quickLinks }: Destinations2GridProps) {
	const { pageItems, totalPages, currentPage, filteredCount } = grid;
	const resultsRef = useRef<HTMLDivElement>(null);
	useDestinationsResultsScroll(resultsRef, list);

	return (
		<section aria-labelledby="destinations-2-grid-title" className="bg-[#060606] py-16 md:py-24">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-2 max-w-2xl">
					<p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-500/85">{DESTINATIONS_2_GRID.label}</p>
					<h2 id="destinations-2-grid-title" className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
						{DESTINATIONS_2_GRID.title}
					</h2>
					<p className="mt-4 text-sm leading-relaxed text-white/50 md:text-base">{DESTINATIONS_2_GRID.description}</p>
				</header>

				<Destinations2GridToolbar list={list} quickLinks={quickLinks} />

				<div
					ref={resultsRef}
					id={DESTINATIONS_GRID_RESULTS_ID}
					className="scroll-mt-28"
					tabIndex={-1}
				>
					{filteredCount === 0 ? (
						<p className="rounded-sm border border-dashed border-white/15 bg-black/30 px-6 py-14 text-center text-sm text-white/50">
							{DESTINATIONS_2_GRID.noResults}
						</p>
					) : (
						<ul className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3" role="list">
							{pageItems.map((dest) => (
								<li key={dest.id} className="min-w-0">
									<Destinations2Card
										destination={dest}
										href={`${DESTINATIONS_2_LIST_PATH}/${destinationToSlug(dest)}`}
									/>
								</li>
							))}
						</ul>
					)}
				</div>

				{filteredCount > 0 ? (
					<Destinations2GridPagination
						listParams={{ q: list.q, filter: list.filter }}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				) : null}
			</div>
		</section>
	);
}
