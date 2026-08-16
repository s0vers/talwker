"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import {
	DESTINATIONS_GRID_RESULTS_ID,
	type DestinationsGridComputed,
	type DestinationsListParsed,
	type DestinationsQuickLink,
} from "@/features/destinations/lib/destinations-list-params";
import { useDestinationsResultsScroll } from "@/features/destinations/lib/use-destinations-results-scroll";
import { DestinationCard } from "@/shared/ui";
import { DestinationsGridPagination } from "./destinations-grid-pagination";
import { DestinationsGridToolbar } from "./destinations-grid-toolbar";

export type DestinationsGridProps = {
	list: DestinationsListParsed;
	grid: DestinationsGridComputed;
	quickLinks: DestinationsQuickLink[];
};

export default function DestinationsGrid({ list, grid, quickLinks }: DestinationsGridProps) {
	const t = useTranslations("Destinations.grid");
	const { pageItems, totalPages, currentPage, filteredCount } = grid;
	const resultsRef = useRef<HTMLDivElement>(null);
	useDestinationsResultsScroll(resultsRef, list);

	return (
		<section aria-labelledby="destinations-grid-title" className="border-t border-white/10 bg-[#070707] py-20 md:py-28">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-10 md:mb-14">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{t("label")}
					</p>
					<h2
						id="destinations-grid-title"
						className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
					>
						{t("title")}
					</h2>
					<p className="mt-4 max-w-2xl text-sm text-white/55 md:text-base">
						{t("description")}
					</p>
				</header>

				<DestinationsGridToolbar list={list} quickLinks={quickLinks} />

				<div
					ref={resultsRef}
					id={DESTINATIONS_GRID_RESULTS_ID}
					className="scroll-mt-28"
					tabIndex={-1}
				>
					{filteredCount === 0 ? (
						<p className="rounded-xl border border-white/10 bg-black/25 px-6 py-12 text-center text-sm text-white/55">
							{t("noResults")}
						</p>
					) : (
						<ul
							className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8"
							role="list"
						>
							{pageItems.map((dest) => (
								<li key={dest.id} className="min-w-0">
									<DestinationCard
										destination={dest}
										layout="grid"
										fromLabel={DESTINATIONS_SECTION.fromLabel}
										exploreButtonLabel={DESTINATIONS_SECTION.exploreButtonLabel}
										href={`/destinations/${destinationToSlug(dest)}`}
									/>
								</li>
							))}
						</ul>
					)}
				</div>

				{filteredCount > 0 ? (
					<DestinationsGridPagination
						listParams={{ q: list.q, filter: list.filter }}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				) : null}
			</div>
		</section>
	);
}
