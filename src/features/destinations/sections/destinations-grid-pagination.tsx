import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { DESTINATIONS_GRID } from "@/features/destinations/content/destinations-page-copy";
import {
	buildDestinationsListHref,
	type DestinationsListParsed,
} from "@/features/destinations/lib/destinations-list-params";
import { cn } from "@/lib/utils";

export type DestinationsGridPaginationProps = {
	listParams: Pick<DestinationsListParsed, "q" | "filter">;
	currentPage: number;
	totalPages: number;
};

export function DestinationsGridPagination({
	listParams,
	currentPage,
	totalPages,
}: DestinationsGridPaginationProps) {
	if (totalPages <= 1) return null;

	const hrefForPage = (page: number) => {
		const clamped = Math.min(Math.max(1, page), totalPages);
		return buildDestinationsListHref({ ...listParams, page: clamped });
	};

	return (
		<nav
			className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
			aria-label="Destinations pagination"
		>
			<p
				className="order-2 text-center text-xs text-white/45 sm:order-1 sm:text-left"
				aria-live="polite"
				aria-atomic="true"
			>
				{DESTINATIONS_GRID.paginationPage} {currentPage} {DESTINATIONS_GRID.paginationOf} {totalPages}
			</p>

			<div className="order-1 flex w-full flex-wrap items-center justify-center gap-2 sm:order-2 sm:w-auto sm:justify-end">
				<Link
					href={hrefForPage(currentPage - 1)}
					scroll={false}
					aria-disabled={currentPage <= 1}
					className={cn(
						"inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
						currentPage <= 1
							? "pointer-events-none cursor-not-allowed border-white/10 text-white/25"
							: "border-white/20 text-white/80 hover:border-orange-500/50 hover:text-white",
					)}
				>
					<LuChevronLeft className="h-4 w-4" aria-hidden />
					{DESTINATIONS_GRID.paginationPrevious}
				</Link>

				<div className="flex flex-wrap items-center justify-center gap-1.5 px-2">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
						<Link
							key={n}
							href={hrefForPage(n)}
							scroll={false}
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
						</Link>
					))}
				</div>

				<Link
					href={hrefForPage(currentPage + 1)}
					scroll={false}
					aria-disabled={currentPage >= totalPages}
					className={cn(
						"inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
						currentPage >= totalPages
							? "pointer-events-none cursor-not-allowed border-white/10 text-white/25"
							: "border-white/20 text-white/80 hover:border-orange-500/50 hover:text-white",
					)}
				>
					{DESTINATIONS_GRID.paginationNext}
					<LuChevronRight className="h-4 w-4" aria-hidden />
				</Link>
			</div>
		</nav>
	);
}
