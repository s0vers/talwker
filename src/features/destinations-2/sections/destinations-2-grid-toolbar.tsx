"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { DESTINATIONS_2_GRID } from "@/features/destinations-2/content/destinations-2-page-copy";
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import {
	DESTINATIONS_GRID_QUICK_SEARCHES,
} from "@/features/destinations/content/destinations-page-copy";
import {
	buildDestinationsListHref,
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

const surface =
	"border-white/12 bg-[#111]/80 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/35";

const selectItem = "rounded-sm text-white data-highlighted:bg-white/10 data-highlighted:text-white";

export type Destinations2GridToolbarProps = {
	list: DestinationsListParsed;
	quickLinks: DestinationsQuickLink[];
};

function Destinations2GridToolbarInner({ list, quickLinks }: Destinations2GridToolbarProps) {
	const router = useRouter();
	const [qDraft, setQDraft] = useState(list.q);
	const [selectKey, setSelectKey] = useState<DestinationsSelectKey>(() => filterToSelectKey(list.filter));
	const { tag: hiddenTag, maxPrice: hiddenMaxPrice } = selectKeyToFormFields(selectKey);

	const hrefById = Object.fromEntries(quickLinks.map((l) => [l.id, l.href] as const));
	const clearHref = getDestinationsListClearHref(DESTINATIONS_2_LIST_PATH);
	const showClear = destinationsListHasActiveRefinements(list);

	function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const normalized = normalizeDestinationsSearchForm({
			q: String(fd.get("q") ?? ""),
			tag: String(fd.get("tag") ?? ""),
			maxPrice: String(fd.get("maxPrice") ?? ""),
		});
		router.push(buildDestinationsListHref(normalized, DESTINATIONS_2_LIST_PATH), { scroll: false });
	}

	return (
		<div className="mb-12 space-y-8 border-l-2 border-orange-500/25 pl-6 md:mb-16">
			<form onSubmit={handleSearchSubmit} role="search" aria-label="Search destinations">
				<input type="hidden" name="tag" value={hiddenTag} aria-hidden />
				<input type="hidden" name="maxPrice" value={hiddenMaxPrice} aria-hidden />

				<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
					<div className="min-w-0 flex-1">
						<label htmlFor="destinations-2-search" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
							{DESTINATIONS_2_GRID.searchFieldLabel}
						</label>
						<Input
							id="destinations-2-search"
							type="search"
							name="q"
							value={qDraft}
							onChange={(e) => setQDraft(e.target.value)}
							placeholder={DESTINATIONS_2_GRID.searchPlaceholder}
							autoComplete="off"
							className={cn(surface, "h-11 rounded-sm")}
						/>
						<div className="min-h-5 pt-2">
							<Link
								href={clearHref}
								scroll={false}
								tabIndex={showClear ? 0 : -1}
								aria-hidden={!showClear}
								className={cn(
									"inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-orange-300",
									!showClear && "pointer-events-none invisible",
								)}
							>
								<LuX className="size-3 shrink-0 opacity-80" aria-hidden />
								{DESTINATIONS_2_GRID.clearFilters}
							</Link>
						</div>
					</div>

					<div className="w-full shrink-0 lg:w-52">
						<label htmlFor="destinations-2-filter" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
							{DESTINATIONS_2_GRID.filterLabel}
						</label>
						<Select value={selectKey} onValueChange={(v) => setSelectKey(v as DestinationsSelectKey)}>
							<SelectTrigger id="destinations-2-filter" className={cn(surface, "h-11 w-full rounded-sm")}>
								<SelectValue />
							</SelectTrigger>
							<SelectContent
								position="popper"
								sideOffset={8}
								className="border-white/12 bg-[#0e0e0e] text-white"
							>
								<SelectItem value="all" className={selectItem}>
									{DESTINATIONS_2_GRID.filterAll}
								</SelectItem>
								<SelectItem value="popular" className={selectItem}>
									{DESTINATIONS_2_GRID.filterTagPopular}
								</SelectItem>
								<SelectItem value="trending" className={selectItem}>
									{DESTINATIONS_2_GRID.filterTagTrending}
								</SelectItem>
								<SelectItem value="new" className={selectItem}>
									{DESTINATIONS_2_GRID.filterTagNew}
								</SelectItem>
								<SelectItem value="luxury" className={selectItem}>
									{DESTINATIONS_2_GRID.filterTagLuxury}
								</SelectItem>
								<SelectItem value="under2000" className={selectItem}>
									{DESTINATIONS_2_GRID.filterUnder2000}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex shrink-0 flex-col">
						<span
							className="mb-2 hidden text-[10px] uppercase tracking-[0.2em] text-white/45 lg:block lg:invisible"
							aria-hidden
						>
							{DESTINATIONS_2_GRID.filterLabel}
						</span>
						<Button
							type="submit"
							variant="outline"
							className="h-11 shrink-0 rounded-sm border-orange-500/50 bg-orange-500/10 px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300 hover:bg-orange-500/20"
						>
							<LuSearch className="mr-2 h-4 w-4" aria-hidden />
							{DESTINATIONS_2_GRID.searchButton}
						</Button>
					</div>
				</div>
			</form>

			<div>
				<p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/40">{DESTINATIONS_2_GRID.quickSearchesLabel}</p>
				<div className="flex flex-wrap gap-2" role="group" aria-label={DESTINATIONS_2_GRID.quickSearchesLabel}>
					{DESTINATIONS_GRID_QUICK_SEARCHES.map((item) => {
						const href = hrefById[item.id] ?? DESTINATIONS_2_LIST_PATH;
						const active = isQuickSearchActive(list, item);
						return (
							<Link
								key={item.id}
								href={href}
								scroll={false}
								className={cn(
									"rounded-sm border px-3 py-2 text-xs font-medium transition-colors",
									active
										? "border-orange-500/60 bg-orange-500/10 text-orange-200"
										: "border-white/12 text-white/65 hover:border-white/25 hover:text-white",
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

export function Destinations2GridToolbar(props: Destinations2GridToolbarProps) {
	const searchParams = useSearchParams();
	const urlKey = searchParams.toString();
	return <Destinations2GridToolbarInner key={urlKey} {...props} />;
}
