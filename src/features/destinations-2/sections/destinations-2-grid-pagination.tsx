import { Link } from "@/i18n/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { DESTINATIONS_2_GRID } from "@/features/destinations-2/content/destinations-2-page-copy";
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import {
	buildDestinationsListHref,
	type DestinationsListParsed,
} from "@/features/destinations/lib/destinations-list-params";
import { cn } from "@/lib/utils";

export type Destinations2GridPaginationProps = {
	listParams: Pick<DestinationsListParsed, "q" | "filter">;
	currentPage: number;
	totalPages: number;
};

export function Destinations2GridPagination({
	listParams,
	currentPage,
	totalPages,
}: Destinations2GridPaginationProps) {
	if (totalPages <= 1) return null;

	const hrefForPage = (page: number) => {
		const clamped = Math.min(Math.max(1, page), totalPages);
		return buildDestinationsListHref({ ...listParams, page: clamped }, DESTINATIONS_2_LIST_PATH);
	};

	return (
		<nav
			className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
			aria-label="Destinations pagination"
		>
			<p className="text-center text-xs tabular-nums text-white/45 sm:text-left" aria-live="polite" aria-atomic="true">
				{DESTINATIONS_2_GRID.paginationPage} {currentPage}
				<span className="mx-1 text-white/25">{DESTINATIONS_2_GRID.paginationOf}</span>
				{totalPages}
			</p>

			<div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
				<Link
					href={hrefForPage(currentPage - 1)}
					scroll={false}
					aria-disabled={currentPage <= 1}
					className={cn(
						"inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
						currentPage <= 1
							? "pointer-events-none border-white/10 text-white/20"
							: "border-white/18 text-white/75 hover:border-orange-500/40 hover:text-white",
					)}
				>
					<LuChevronLeft className="h-4 w-4" aria-hidden />
					{DESTINATIONS_2_GRID.paginationPrevious}
				</Link>

				<div className="flex flex-wrap items-center justify-center gap-1 px-2">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
						<Link
							key={n}
							href={hrefForPage(n)}
							scroll={false}
							aria-label={`${DESTINATIONS_2_GRID.paginationGoToPage} ${n}`}
							aria-current={n === currentPage ? "page" : undefined}
							className={cn(
								"flex h-9 min-w-9 items-center justify-center rounded-sm border text-xs font-semibold tabular-nums",
								n === currentPage
									? "border-orange-500/55 bg-orange-500/10 text-orange-300"
									: "border-white/12 text-white/60 hover:border-white/22",
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
						"inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
						currentPage >= totalPages
							? "pointer-events-none border-white/10 text-white/20"
							: "border-white/18 text-white/75 hover:border-orange-500/40 hover:text-white",
					)}
				>
					{DESTINATIONS_2_GRID.paginationNext}
					<LuChevronRight className="h-4 w-4" aria-hidden />
				</Link>
			</div>
		</nav>
	);
}
