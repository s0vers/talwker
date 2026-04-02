/** Copy for `/destinations-2` — distinct voice from the primary destinations page. */
export const DESTINATIONS_2_PAGE_HERO = {
	rail: "Alternate index",
	kicker: "Field atlas · v2",
	title: "Places measured in",
	titleAccent: "texture, not ticks.",
	lede:
		"This grid is a second lens on the same collection — looser typography, sharper cards, and room to wander before you commit.",
	statA: { label: "Curated", value: "Same roster" },
	statB: { label: "Lens", value: "Editorial" },
	footnote: "Scroll to filter — links open the story route for this layout.",
} as const;

export const DESTINATIONS_2_GRID = {
	label: "Atlas",
	title: "Pick a place; open its dossier",
	description:
		"Each tile routes to `/destinations-2/[slug]` — the alternate long-form layout — not the primary story page.",
	paginationPrevious: "Back",
	paginationNext: "Ahead",
	paginationPage: "Sheet",
	paginationOf: "/",
	paginationGoToPage: "Jump to sheet",
	searchPlaceholder: "Filter by name, country, tag…",
	searchFieldLabel: "Query",
	filterLabel: "Refine",
	filterAll: "All",
	filterTagPopular: "Popular",
	filterTagTrending: "Trending",
	filterTagNew: "New",
	filterTagLuxury: "Luxury",
	filterUnder2000: "Under $2,000",
	searchButton: "Apply",
	clearFilters: "Reset",
	quickSearchesLabel: "Shortcuts",
	noResults: "Nothing matches — try a shorter query or clear filters.",
} as const;
