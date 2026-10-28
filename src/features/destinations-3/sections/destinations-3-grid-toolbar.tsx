"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { DESTINATIONS_GRID_QUICK_SEARCHES } from "@/features/destinations/content/destinations-page-copy";
import {
	DESTINATIONS_SELECT_CONTENT_CLASS,
	DESTINATIONS_SELECT_ITEM_CLASS,
	DESTINATIONS_SELECT_TRIGGER_SURFACE
} from "@/features/destinations/lib/destinations-select-classes";
import {
	buildDestinationsListHref,
	destinationsListHasActiveRefinements,
	normalizeDestinationsSearchForm,
	type DestinationsListParsed,
	type DestinationsQuickLink,
	type DestinationsSelectKey,
	filterToSelectKey,
	isQuickSearchActive,
	selectKeyToFormFields
} from "@/features/destinations/lib/destinations-list-params";
import { DESTINATIONS_3_LIST_PATH } from "@/features/destinations-3/lib/destinations-3-list-path";
import { cn } from "@/lib/utils";

const underlineField =
	"h-11 rounded-none border-0 border-b border-white/18 bg-transparent px-0 text-white shadow-none outline-none ring-0 transition-colors placeholder:text-white/35 focus-visible:border-orange-500/55 focus-visible:ring-0";

export type Destinations3GridToolbarProps = {
	list: DestinationsListParsed;
	quickLinks: DestinationsQuickLink[];
};

function Destinations3GridToolbarInner({
	list,
	quickLinks
}: Destinations3GridToolbarProps) {
	const t = useTranslations("Destinations3.grid");
	const router = useRouter();
	const [qDraft, setQDraft] = useState(list.q);
	const [selectKey, setSelectKey] = useState<DestinationsSelectKey>(() =>
		filterToSelectKey(list.filter)
	);
	const { tag: hiddenTag, maxPrice: hiddenMaxPrice } =
		selectKeyToFormFields(selectKey);

	const hrefById = Object.fromEntries(
		quickLinks.map(l => [l.id, l.href] as const)
	);
	const showClear = destinationsListHasActiveRefinements(list);

	const quickSearchLabels: Record<string, string> = {
		bali: t("quickSearchBali"),
		japan: t("quickSearchJapan"),
		italy: t("quickSearchItaly"),
		luxury: t("quickSearchLuxury"),
		under2k: t("quickSearchUnder2k")
	};

	function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const normalized = normalizeDestinationsSearchForm({
			q: String(fd.get("q") ?? ""),
			tag: String(fd.get("tag") ?? ""),
			maxPrice: String(fd.get("maxPrice") ?? "")
		});
		router.push(
			buildDestinationsListHref(normalized, DESTINATIONS_3_LIST_PATH),
			{ scroll: false }
		);
	}

	return (
		<div className="mb-12 space-y-10 md:mb-16 md:space-y-12">
			<div>
				<p className="mb-3 text-xs font-medium text-white/50">
					{t("quickSearchesLabel")}
				</p>
				<div
					className="flex flex-wrap gap-2 md:gap-2.5"
					role="group"
					aria-label={t("quickSearchesLabel")}
				>
					{DESTINATIONS_GRID_QUICK_SEARCHES.map(item => {
						const href = hrefById[item.id] ?? DESTINATIONS_3_LIST_PATH;
						const active = isQuickSearchActive(list, item);
						const label = quickSearchLabels[item.id] ?? item.label;
						return (
							<Link
								key={item.id}
								href={href}
								scroll={false}
								className={cn(
									"rounded-full px-4 py-2 text-[11px] font-medium transition-colors md:px-5",
									active
										? "bg-orange-500/18 text-orange-100"
										: "bg-white/4 text-white/65 hover:bg-white/8 hover:text-white"
								)}
							>
								{label}
							</Link>
						);
					})}
				</div>
			</div>

			<form
				onSubmit={handleSearchSubmit}
				role="search"
				aria-label={t("searchFieldLabel")}
			>
				<input type="hidden" name="tag" value={hiddenTag} aria-hidden />
				<input
					type="hidden"
					name="maxPrice"
					value={hiddenMaxPrice}
					aria-hidden
				/>

				<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
					<div className="min-w-0 flex-1">
						<label htmlFor="destinations-3-search" className="sr-only">
							{t("searchFieldLabel")}
						</label>
						<Input
							id="destinations-3-search"
							type="search"
							name="q"
							value={qDraft}
							onChange={e => setQDraft(e.target.value)}
							placeholder={t("searchPlaceholder")}
							autoComplete="off"
							className={underlineField}
						/>
					</div>

					<div className="flex w-full items-center gap-3 sm:gap-4 lg:w-auto lg:shrink-0">
						<div className="min-w-0 flex-1 sm:max-w-48 lg:w-56 lg:flex-none">
							<label htmlFor="destinations-3-filter" className="sr-only">
								{t("filterLabel")}
							</label>
							<Select
								value={selectKey}
								onValueChange={v => setSelectKey(v as DestinationsSelectKey)}
							>
								<SelectTrigger
									id="destinations-3-filter"
									className={cn(DESTINATIONS_SELECT_TRIGGER_SURFACE, "w-full")}
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent
									position="popper"
									sideOffset={8}
									className={DESTINATIONS_SELECT_CONTENT_CLASS}
								>
									<SelectItem
										value="all"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterAll")}
									</SelectItem>
									<SelectItem
										value="popular"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterTagPopular")}
									</SelectItem>
									<SelectItem
										value="trending"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterTagTrending")}
									</SelectItem>
									<SelectItem
										value="new"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterTagNew")}
									</SelectItem>
									<SelectItem
										value="luxury"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterTagLuxury")}
									</SelectItem>
									<SelectItem
										value="under2000"
										className={DESTINATIONS_SELECT_ITEM_CLASS}
									>
										{t("filterUnder2000")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<button
							type="submit"
							className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-200 transition-colors hover:bg-orange-500/25"
							aria-label={t("searchButton")}
						>
							<LuArrowRight
								className="size-5 transition-transform group-hover:translate-x-0.5"
								aria-hidden
							/>
						</button>
					</div>
				</div>

				<div className="mt-3 flex min-h-5 items-center gap-4">
					<Link
						href={DESTINATIONS_3_LIST_PATH}
						scroll={false}
						tabIndex={showClear ? 0 : -1}
						aria-hidden={!showClear}
						className={cn(
							"inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-orange-300",
							!showClear && "pointer-events-none invisible"
						)}
					>
						<LuX className="size-3.5 shrink-0 opacity-80" aria-hidden />
						{t("clearFilters")}
					</Link>
				</div>
			</form>
		</div>
	);
}

export function Destinations3GridToolbar(props: Destinations3GridToolbarProps) {
	const searchParams = useSearchParams();
	const urlKey = searchParams?.toString() ?? "";
	return <Destinations3GridToolbarInner key={urlKey} {...props} />;
}
