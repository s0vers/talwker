import { DESTINATIONS_GRID_QUICK_SEARCHES } from "@/features/destinations/content/destinations-page-copy";
import type { Destination } from "@/shared/types/domain";

export const PAGE_SIZE = 8;

/** Fragment + scroll target: the card grid / empty state (not the section header or toolbar). */
export const DESTINATIONS_GRID_RESULTS_ID = "destinations-results";

/**
 * Reset URL for “Clear filters” — no query and **no hash** so scroll alignment does not run
 * and the viewport stays where the user already is.
 */
export const DESTINATIONS_LIST_CLEAR_HREF = "/destinations";

export const FILTER_ALL = "all";

export const filterValue = {
	tag: (t: string) => `tag:${t}`,
	price: (n: number) => `price:${n}`,
} as const;

/** URL slug → destination tag label (canonical). */
const TAG_SLUG_TO_CANONICAL: Record<string, string> = {
	popular: "Popular",
	trending: "Trending",
	new: "New",
	luxury: "Luxury",
};

const ALLOWED_FILTERS = new Set<string>([
	FILTER_ALL,
	filterValue.tag("Popular"),
	filterValue.tag("Trending"),
	filterValue.tag("New"),
	filterValue.tag("Luxury"),
	filterValue.price(2000),
]);

export type DestinationsSelectKey = "all" | "popular" | "trending" | "new" | "luxury" | "under2000";

export function tagSlugToFilter(slug: string): string {
	const canonical = TAG_SLUG_TO_CANONICAL[slug.toLowerCase()];
	return canonical ? filterValue.tag(canonical) : FILTER_ALL;
}

export function canonicalTagToSlug(canonical: string): string | null {
	const entry = Object.entries(TAG_SLUG_TO_CANONICAL).find(([, v]) => v === canonical);
	return entry ? entry[0] : null;
}

export function normalizeFilter(raw: string): string {
	if (raw === FILTER_ALL) return FILTER_ALL;
	return ALLOWED_FILTERS.has(raw) ? raw : FILTER_ALL;
}

export function destinationMatches(d: Destination, appliedQuery: string, appliedFilter: string): boolean {
	if (appliedFilter !== FILTER_ALL) {
		if (appliedFilter.startsWith("tag:")) {
			const tag = appliedFilter.slice(4);
			if (d.tag !== tag) return false;
		} else if (appliedFilter.startsWith("price:")) {
			const max = Number(appliedFilter.slice(6));
			if (!Number.isFinite(max) || d.price >= max) return false;
		}
	}
	const q = appliedQuery.trim().toLowerCase();
	if (!q) return true;
	const haystack = [d.name, d.country, d.tag, d.duration]
		.filter(Boolean)
		.join(" ")
		.toLowerCase();
	return haystack.includes(q);
}

export type DestinationsListParsed = {
	q: string;
	filter: string;
	page: number;
};

/** Result of server-side grid slicing; shared by `destinations-page` and `DestinationsGrid`. */
export type DestinationsGridComputed = {
	pageItems: Destination[];
	totalPages: number;
	currentPage: number;
	filteredCount: number;
};

export function parseDestinationsListParams(input: {
	q?: string;
	/** e.g. `luxury`, `popular` */
	tag?: string;
	/** e.g. `2000` for under-$2k filter */
	maxPrice?: string;
	page?: string;
	/** Legacy: `tag:Luxury` style — still accepted */
	filter?: string;
}): DestinationsListParsed {
	const q = (input.q ?? "").trim().toLowerCase();
	let page = Number.parseInt(input.page ?? "1", 10);
	if (!Number.isFinite(page) || page < 1) page = 1;

	let filter = FILTER_ALL;
	const maxRaw = input.maxPrice?.trim();
	const tagRaw = input.tag?.trim().toLowerCase();

	if (maxRaw === "2000") {
		filter = filterValue.price(2000);
	} else if (tagRaw) {
		filter = normalizeFilter(tagSlugToFilter(tagRaw));
	} else if (input.filter?.trim()) {
		filter = normalizeFilter(input.filter.trim());
	}

	return { q, filter, page };
}

/** Normalize toolbar `FormData` (`q`, `tag`, `maxPrice`) before building a list URL. */
export function normalizeDestinationsSearchForm(input: {
	q: string;
	tag: string;
	maxPrice: string;
}): DestinationsListParsed {
	const maxRaw = input.maxPrice.trim();
	const tagRaw = input.tag.trim().toLowerCase();
	let filter = FILTER_ALL;
	if (maxRaw === "2000") {
		filter = filterValue.price(2000);
	} else if (tagRaw) {
		filter = normalizeFilter(tagSlugToFilter(tagRaw));
	}
	return {
		q: input.q.trim().toLowerCase(),
		filter,
		page: 1,
	};
}

export function buildDestinationsListQueryString(p: DestinationsListParsed): string {
	const u = new URLSearchParams();
	if (p.q) u.set("q", p.q);
	if (p.filter === filterValue.price(2000)) {
		u.set("maxPrice", "2000");
	} else if (p.filter.startsWith("tag:")) {
		const slug = canonicalTagToSlug(p.filter.slice(4));
		if (slug) u.set("tag", slug);
	}
	if (p.page > 1) u.set("page", String(p.page));
	return u.toString();
}

export function buildDestinationsListHref(p: DestinationsListParsed): string {
	const qs = buildDestinationsListQueryString(p);
	const path = qs ? `/destinations?${qs}` : "/destinations";
	return `${path}#${DESTINATIONS_GRID_RESULTS_ID}`;
}

export function destinationsListHasActiveRefinements(list: DestinationsListParsed): boolean {
	return (
		list.q.trim() !== "" ||
		list.filter !== FILTER_ALL ||
		list.page > 1
	);
}

export function filterToSelectKey(filter: string): DestinationsSelectKey {
	if (filter === FILTER_ALL) return "all";
	if (filter === filterValue.price(2000)) return "under2000";
	if (filter.startsWith("tag:")) {
		const slug = canonicalTagToSlug(filter.slice(4));
		if (slug && slug in TAG_SLUG_TO_CANONICAL) return slug as DestinationsSelectKey;
	}
	return "all";
}

export function selectKeyToFormFields(key: DestinationsSelectKey): { tag: string; maxPrice: string } {
	if (key === "under2000") return { tag: "", maxPrice: "2000" };
	if (key === "all") return { tag: "", maxPrice: "" };
	return { tag: key, maxPrice: "" };
}

export function computeDestinationsGridResult(
	destinations: readonly Destination[],
	parsed: DestinationsListParsed,
): DestinationsGridComputed {
	const filtered = destinations.filter((d) => destinationMatches(d, parsed.q, parsed.filter));
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(Math.max(1, parsed.page), totalPages);
	const start = (currentPage - 1) * PAGE_SIZE;
	const pageItems = filtered.slice(start, start + PAGE_SIZE);
	return { pageItems, totalPages, currentPage, filteredCount: filtered.length };
}

export type DestinationsQuickLink = { id: string; label: string; href: string };

export function isQuickSearchActive(
	parsed: DestinationsListParsed,
	item: (typeof DESTINATIONS_GRID_QUICK_SEARCHES)[number],
): boolean {
	if (parsed.page !== 1) return false;
	if ("query" in item && item.query !== undefined) {
		return parsed.filter === FILTER_ALL && parsed.q === item.query.toLowerCase() && parsed.q !== "";
	}
	if ("tag" in item && item.tag !== undefined) {
		return parsed.q === "" && parsed.filter === filterValue.tag(item.tag);
	}
	if ("maxPrice" in item && item.maxPrice !== undefined) {
		return parsed.q === "" && parsed.filter === filterValue.price(item.maxPrice);
	}
	return false;
}

export function getDestinationsQuickSearchLinks(): DestinationsQuickLink[] {
	return DESTINATIONS_GRID_QUICK_SEARCHES.map((item) => {
		let q = "";
		let filter = FILTER_ALL;
		if ("query" in item && item.query !== undefined) {
			q = item.query.toLowerCase();
		} else if ("tag" in item && item.tag !== undefined) {
			filter = filterValue.tag(item.tag);
		} else if ("maxPrice" in item && item.maxPrice !== undefined) {
			filter = filterValue.price(item.maxPrice);
		}
		return {
			id: item.id,
			label: item.label,
			href: buildDestinationsListHref({ q, filter, page: 1 }),
		};
	});
}
