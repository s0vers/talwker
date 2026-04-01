/** Copy for the dedicated destinations page. */
export const DESTINATIONS_PAGE_HERO = {
	verticalRail: "Talkwer · field notes",
	kicker: "The index",
	titleLine1: "Plot your",
	titleAccent: "next escape.",
	description:
		"Every pin on our map is vetted for story, texture, and the kind of detail you only find when someone has actually been there.",
	passEyebrow: "Curated departure",
	passTitle: "ANYWHERE → WONDER",
	passMeta: "APR 2026 · NO LAYOVERS ON CURIOSITY",
	coordinates: [
		{ line: "08°24'S · 115°11'E", place: "Bali" },
		{ line: "35°00'N · 135°46'E", place: "Kyoto" },
		{ line: "50°56'S · 73°04'W", place: "Patagonia" },
	],
	passFooter: "Boarding: explorers & daydreamers",
	scrollCue: "Scroll for the collection",
} as const;

export const DESTINATIONS_GRID = {
	label: "The collection",
	title: "Every destination we stand behind",
	description:
		"Same handpicked places as on the home page — here in a clear grid so you can scan the full set at a glance.",
	paginationPrevious: "Previous",
	paginationNext: "Next",
	paginationPage: "Page",
	paginationOf: "of",
	paginationGoToPage: "Go to page",
	searchPlaceholder: "Search by place, country, or vibe…",
	/** Visible field label (matches filter column heading for alignment). */
	searchFieldLabel: "Search",
	filterLabel: "Filter",
	filterAll: "All destinations",
	filterTagPopular: "Popular",
	filterTagTrending: "Trending",
	filterTagNew: "New",
	filterTagLuxury: "Luxury",
	filterUnder2000: "Under $2,000",
	searchButton: "Search",
	clearFilters: "Clear filters",
	quickSearchesLabel: "Popular searches",
	noResults: "No destinations match that search. Try another keyword or filter.",
} as const;

/** Preset chips: apply search and/or filter in one tap. */
export const DESTINATIONS_GRID_QUICK_SEARCHES = [
	{ id: "bali", label: "Bali", query: "bali" },
	{ id: "japan", label: "Japan", query: "japan" },
	{ id: "italy", label: "Italy", query: "italy" },
	{ id: "luxury", label: "Luxury", tag: "Luxury" as const },
	{ id: "under2k", label: "Under $2k", maxPrice: 2000 },
] as const;

export const DESTINATIONS_CTA_COPY = {
	label: "Beyond the map",
	titleLead: "Ready for",
	titleAccent: "the full trip?",
	description:
		"Pair a place with a hand-built itinerary or see how travelers experienced it on the ground.",
	primaryAction: "Browse tours",
	primaryHref: "/tours",
	secondaryAction: "Read stories",
	secondaryHref: "/stories",
} as const;
