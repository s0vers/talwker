"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { LuSearch, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DESTINATIONS_GRID,
	DESTINATIONS_GRID_QUICK_SEARCHES,
} from "@/features/destinations/content/destinations-page-copy";
import {
	DESTINATIONS_SELECT_CONTENT_CLASS,
	DESTINATIONS_SELECT_ITEM_CLASS,
	DESTINATIONS_SELECT_TRIGGER_SURFACE,
} from "@/features/destinations/lib/destinations-select-classes";
import {
	buildDestinationsListHref,
	DEFAULT_DESTINATIONS_LIST_PATH,
	getDestinationsListClearHref,
	destinationsListHasActiveRefinements,
	normalizeDestinationsSearchForm,
	type DestinationsListParsed,
	type DestinationsQuickLink,
	type DestinationsSelectKey,
	filterToSelectKey,
	isQuickSearchActive,
	selectKeyToFormFields,
} from "@/features/destinations/lib/destinations-list-params";
import { cn } from "@/lib/utils";

const surfaceControl = cn(DESTINATIONS_SELECT_TRIGGER_SURFACE, "placeholder:text-white/35");

export type DestinationsGridToolbarProps = {
	list: DestinationsListParsed;
	quickLinks: DestinationsQuickLink[];
};

function DestinationsGridToolbarInner({ list, quickLinks }: DestinationsGridToolbarProps) {
	const router = useRouter();
	const [qDraft, setQDraft] = useState(list.q);
	const [selectKey, setSelectKey] = useState<DestinationsSelectKey>(() => filterToSelectKey(list.filter));
	const { tag: hiddenTag, maxPrice: hiddenMaxPrice } = selectKeyToFormFields(selectKey);

	const hrefById = Object.fromEntries(quickLinks.map((l) => [l.id, l.href] as const));
	const clearHref = getDestinationsListClearHref();
	const showClear = destinationsListHasActiveRefinements(list);

	function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const normalized = normalizeDestinationsSearchForm({
			q: String(fd.get("q") ?? ""),
			tag: String(fd.get("tag") ?? ""),
			maxPrice: String(fd.get("maxPrice") ?? ""),
		});
		router.push(buildDestinationsListHref(normalized), { scroll: false });
	}

	return (
		<div className="mb-10 space-y-6 md:mb-12">
			<form onSubmit={handleSearchSubmit} role="search" aria-label="Search destinations">
				<input type="hidden" name="tag" value={hiddenTag} aria-hidden />
				<input type="hidden" name="maxPrice" value={hiddenMaxPrice} aria-hidden />

				<div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-x-4">
					<div className="flex min-w-0 flex-1 flex-col">
						<label
							htmlFor="destinations-search"
							className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45"
						>
							{DESTINATIONS_GRID.searchFieldLabel}
						</label>
						<Input
							id="destinations-search"
							type="search"
							name="q"
							value={qDraft}
							onChange={(e) => setQDraft(e.target.value)}
							placeholder={DESTINATIONS_GRID.searchPlaceholder}
							autoComplete="off"
							className={cn(surfaceControl)}
						/>
						<div className="min-h-4.5 pt-1.5">
							<Link
								href={clearHref}
								scroll={false}
								tabIndex={showClear ? 0 : -1}
								aria-hidden={!showClear}
								className={cn(
									"inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-orange-300",
									!showClear && "pointer-events-none invisible",
								)}
							>
								<LuX className="size-3 shrink-0 opacity-80" aria-hidden />
								{DESTINATIONS_GRID.clearFilters}
							</Link>
						</div>
					</div>

					<div className="flex w-full shrink-0 flex-col lg:w-56">
						<label
							htmlFor="destinations-filter"
							className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45"
						>
							{DESTINATIONS_GRID.filterLabel}
						</label>
						<Select value={selectKey} onValueChange={(v) => setSelectKey(v as DestinationsSelectKey)}>
							<SelectTrigger id="destinations-filter" className={cn(surfaceControl, "w-full")}>
								<SelectValue />
							</SelectTrigger>
							<SelectContent position="popper" sideOffset={8} className={DESTINATIONS_SELECT_CONTENT_CLASS}>
								<SelectItem value="all" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterAll}
								</SelectItem>
								<SelectItem value="popular" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterTagPopular}
								</SelectItem>
								<SelectItem value="trending" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterTagTrending}
								</SelectItem>
								<SelectItem value="new" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterTagNew}
								</SelectItem>
								<SelectItem value="luxury" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterTagLuxury}
								</SelectItem>
								<SelectItem value="under2000" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{DESTINATIONS_GRID.filterUnder2000}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col lg:shrink-0">
						<span
							className="mb-2 hidden text-[11px] uppercase tracking-[0.18em] text-white/45 lg:block lg:invisible"
							aria-hidden
						>
							{DESTINATIONS_GRID.filterLabel}
						</span>
						<Button
							type="submit"
							variant="outline"
							className={cn(
								"h-12 w-full shrink-0 rounded-full border-orange-500/60 bg-orange-500/15 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400 sm:w-auto",
								"shadow-[0_1px_0_rgba(255,255,255,0.04)] hover:border-orange-400 hover:bg-orange-500/25 hover:text-orange-300",
							)}
						>
							<LuSearch className="mr-2 h-4 w-4" aria-hidden />
							{DESTINATIONS_GRID.searchButton}
						</Button>
					</div>
				</div>
			</form>

			<div>
				<p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
					{DESTINATIONS_GRID.quickSearchesLabel}
				</p>
				<div className="flex flex-wrap gap-2" role="group" aria-label={DESTINATIONS_GRID.quickSearchesLabel}>
					{DESTINATIONS_GRID_QUICK_SEARCHES.map((item) => {
						const href = hrefById[item.id] ?? DEFAULT_DESTINATIONS_LIST_PATH;
						const active = isQuickSearchActive(list, item);
						return (
							<Link
								key={item.id}
								href={href}
								scroll={false}
								className={cn(
									"rounded-full border px-4 py-2 text-xs font-medium transition-colors",
									active
										? "border-orange-500 bg-orange-500/15 text-orange-300"
										: "border-white/15 text-white/70 hover:border-white/30 hover:text-white",
								)}
							>
								{item.label}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export function DestinationsGridToolbar(props: DestinationsGridToolbarProps) {
	const searchParams = useSearchParams();
	const urlKey = searchParams.toString();
	return <DestinationsGridToolbarInner key={urlKey} {...props} />;
}
