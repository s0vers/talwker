"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import {
	DESTINATIONS_GRID_QUICK_SEARCHES,
} from "@/features/destinations/content/destinations-page-copy";
import {
	DESTINATIONS_SELECT_CONTENT_CLASS,
	DESTINATIONS_SELECT_ITEM_CLASS,
	DESTINATIONS_SELECT_TRIGGER_SURFACE,
} from "@/features/destinations/lib/destinations-select-classes";
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

export type Destinations2GridToolbarProps = {
	list: DestinationsListParsed;
	quickLinks: DestinationsQuickLink[];
};

function Destinations2GridToolbarInner({ list, quickLinks }: Destinations2GridToolbarProps) {
	const t = useTranslations("Destinations2.grid");
	const router = useRouter();
	const [qDraft, setQDraft] = useState(list.q);
	const [selectKey, setSelectKey] = useState<DestinationsSelectKey>(() => filterToSelectKey(list.filter));
	const { tag: hiddenTag, maxPrice: hiddenMaxPrice } = selectKeyToFormFields(selectKey);

	const hrefById = Object.fromEntries(quickLinks.map((l) => [l.id, l.href] as const));
	const clearHref = getDestinationsListClearHref(DESTINATIONS_2_LIST_PATH);
	const showClear = destinationsListHasActiveRefinements(list);

	const quickSearchLabels: Record<string, string> = {
		bali: t("quickSearchBali"),
		japan: t("quickSearchJapan"),
		italy: t("quickSearchItaly"),
		luxury: t("quickSearchLuxury"),
		under2k: t("quickSearchUnder2k"),
	};

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
			<form onSubmit={handleSearchSubmit} role="search" aria-label={t("searchFieldLabel")}>
				<input type="hidden" name="tag" value={hiddenTag} aria-hidden />
				<input type="hidden" name="maxPrice" value={hiddenMaxPrice} aria-hidden />

				<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_13rem_auto] lg:items-end lg:gap-6">
					<div className="min-w-0">
						<label htmlFor="destinations-2-search" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
							{t("searchFieldLabel")}
						</label>
						<Input
							id="destinations-2-search"
							type="search"
							name="q"
							value={qDraft}
							onChange={(e) => setQDraft(e.target.value)}
							placeholder={t("searchPlaceholder")}
							autoComplete="off"
							className={cn(surface, "h-12 rounded-sm")}
						/>
					</div>

					<div className="w-full">
						<label htmlFor="destinations-2-filter" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
							{t("filterLabel")}
						</label>
						<Select value={selectKey} onValueChange={(v) => setSelectKey(v as DestinationsSelectKey)}>
							<SelectTrigger id="destinations-2-filter" className={cn(DESTINATIONS_SELECT_TRIGGER_SURFACE, "h-12 w-full")}>
								<SelectValue />
							</SelectTrigger>
							<SelectContent position="popper" sideOffset={8} className={DESTINATIONS_SELECT_CONTENT_CLASS}>
								<SelectItem value="all" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterAll")}
								</SelectItem>
								<SelectItem value="popular" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterTagPopular")}
								</SelectItem>
								<SelectItem value="trending" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterTagTrending")}
								</SelectItem>
								<SelectItem value="new" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterTagNew")}
								</SelectItem>
								<SelectItem value="luxury" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterTagLuxury")}
								</SelectItem>
								<SelectItem value="under2000" className={DESTINATIONS_SELECT_ITEM_CLASS}>
									{t("filterUnder2000")}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex lg:justify-end">
						<Button
							type="submit"
							variant="outline"
							className="h-12 w-full rounded-sm border-orange-500/50 bg-orange-500/10 px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300 hover:bg-orange-500/20 lg:w-auto"
						>
							<LuSearch className="mr-2 h-4 w-4" aria-hidden />
							{t("searchButton")}
						</Button>
					</div>
				</div>

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
						{t("clearFilters")}
					</Link>
				</div>
			</form>

			<div>
				<p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/40">{t("quickSearchesLabel")}</p>
				<div className="flex flex-wrap gap-2" role="group" aria-label={t("quickSearchesLabel")}>
					{DESTINATIONS_GRID_QUICK_SEARCHES.map((item) => {
						const href = hrefById[item.id] ?? DESTINATIONS_2_LIST_PATH;
						const active = isQuickSearchActive(list, item);
						const label = quickSearchLabels[item.id] ?? item.label;
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
								{label}
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
