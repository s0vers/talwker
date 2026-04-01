"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DESTINATIONS_GRID } from "@/features/destinations/content/destinations-page-copy";
import { DestinationCard } from "@/shared/ui";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export default function DestinationsGrid() {
	const [page, setPage] = useState(1);
	const listAnchorRef = useRef<HTMLDivElement>(null);

	const totalPages = Math.max(1, Math.ceil(DESTINATIONS.length / PAGE_SIZE));
	/** Clamped so we never read past the last page if the list shrinks (no effect + setState). */
	const currentPage = Math.min(Math.max(1, page), totalPages);

	const pageItems = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return DESTINATIONS.slice(start, start + PAGE_SIZE);
	}, [currentPage]);

	const scrollListIntoView = useCallback(() => {
		listAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	const goToPage = useCallback(
		(next: number) => {
			const clamped = Math.min(Math.max(1, next), totalPages);
			setPage(clamped);
			queueMicrotask(() => scrollListIntoView());
		},
		[totalPages, scrollListIntoView],
	);

	const showPagination = totalPages > 1;

	return (
		<section
			aria-labelledby="destinations-grid-title"
			className="border-t border-white/10 bg-[#070707] py-20 md:py-28"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-10 md:mb-14">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{DESTINATIONS_GRID.label}
					</p>
					<h2
						id="destinations-grid-title"
						className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
					>
						{DESTINATIONS_GRID.title}
					</h2>
					<p className="mt-4 max-w-2xl text-sm text-white/55 md:text-base">
						{DESTINATIONS_GRID.description}
					</p>
				</header>

				<div ref={listAnchorRef} className="scroll-mt-24">
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
								/>
							</li>
						))}
					</ul>
				</div>

				{showPagination ? (
					<nav
						className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
						aria-label="Destinations pagination"
					>
						<p
							className="order-2 text-center text-xs text-white/45 sm:order-1 sm:text-left"
							aria-live="polite"
							aria-atomic="true"
						>
							{DESTINATIONS_GRID.paginationPage} {currentPage} {DESTINATIONS_GRID.paginationOf}{" "}
							{totalPages}
						</p>

						<div className="order-1 flex w-full flex-wrap items-center justify-center gap-2 sm:order-2 sm:w-auto sm:justify-end">
							<button
								type="button"
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage <= 1}
								className={cn(
									"inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
									currentPage <= 1
										? "cursor-not-allowed border-white/10 text-white/25"
										: "border-white/20 text-white/80 hover:border-orange-500/50 hover:text-white",
								)}
							>
								<LuChevronLeft className="h-4 w-4" aria-hidden />
								{DESTINATIONS_GRID.paginationPrevious}
							</button>

							<div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
									<button
										key={n}
										type="button"
										onClick={() => goToPage(n)}
										aria-label={`${DESTINATIONS_GRID.paginationGoToPage} ${n}`}
										aria-current={n === currentPage ? "page" : undefined}
										className={cn(
											"flex h-10 min-w-10 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors",
											n === currentPage
												? "border-orange-500 bg-orange-500/15 text-orange-400"
												: "border-white/15 text-white/70 hover:border-white/30 hover:text-white",
										)}
									>
										{n}
									</button>
								))}
							</div>

							<button
								type="button"
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage >= totalPages}
								className={cn(
									"inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
									currentPage >= totalPages
										? "cursor-not-allowed border-white/10 text-white/25"
										: "border-white/20 text-white/80 hover:border-orange-500/50 hover:text-white",
								)}
							>
								{DESTINATIONS_GRID.paginationNext}
								<LuChevronRight className="h-4 w-4" aria-hidden />
							</button>
						</div>
					</nav>
				) : null}
			</div>
		</section>
	);
}
