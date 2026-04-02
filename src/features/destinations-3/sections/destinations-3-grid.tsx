"use client";

import { useRef } from "react";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import {
	DESTINATIONS_GRID_RESULTS_ID,
	PAGE_SIZE,
	type DestinationsGridComputed,
	type DestinationsListParsed,
	type DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { useDestinationsResultsScroll } from "@/features/destinations/lib/use-destinations-results-scroll";
import { DESTINATIONS_3_GRID } from "@/features/destinations-3/content/destinations-3-page-copy";
import { DESTINATIONS_3_LIST_PATH } from "@/features/destinations-3/lib/destinations-3-list-path";
import { Destinations3Card } from "@/features/destinations-3/sections/destinations-3-card";
import { Destinations3GridPagination } from "@/features/destinations-3/sections/destinations-3-grid-pagination";
import { Destinations3GridToolbar } from "@/features/destinations-3/sections/destinations-3-grid-toolbar";

export type Destinations3GridProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export function Destinations3Grid({ list, grid, quickLinks }: Destinations3GridProps) {
	const { pageItems, totalPages, currentPage, filteredCount } = grid;
	const resultsRef = useRef<HTMLDivElement>(null);
	useDestinationsResultsScroll(resultsRef, list);

	return (
		<section aria-labelledby="destinations-3-grid-title" className="bg-[#050505] py-16 md:py-24">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-2 max-w-2xl">
					<p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-orange-500/85">
						{DESTINATIONS_3_GRID.label}
					</p>
					<h2 id="destinations-3-grid-title" className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
						{DESTINATIONS_3_GRID.title}
					</h2>
					<p className="mt-4 text-sm leading-relaxed text-white/52 md:text-base">{DESTINATIONS_3_GRID.description}</p>
				</header>

				<Destinations3GridToolbar list={list} quickLinks={quickLinks} />

				<div
					ref={resultsRef}
					id={DESTINATIONS_GRID_RESULTS_ID}
					className="scroll-mt-28"
					tabIndex={-1}
				>
					{filteredCount === 0 ? (
						<p className="rounded-sm border border-dashed border-white/15 bg-black/30 px-6 py-14 text-center text-sm text-white/50">
							{DESTINATIONS_3_GRID.noResults}
						</p>
					) : (
						<ul className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3" role="list">
							{pageItems.map((dest, i) => {
								const globalIndex = (currentPage - 1) * PAGE_SIZE + i + 1;
								const indexLabel = String(globalIndex).padStart(2, "0");
								return (
									<li key={dest.id} className="min-w-0">
										<Destinations3Card
											destination={dest}
											href={`${DESTINATIONS_3_LIST_PATH}/${destinationToSlug(dest)}`}
											indexLabel={indexLabel}
										/>
									</li>
								);
							})}
						</ul>
					)}
				</div>

				{filteredCount > 0 ? (
					<Destinations3GridPagination
						listParams={{ q: list.q, filter: list.filter }}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				) : null}
			</div>
		</section>
	);
}
