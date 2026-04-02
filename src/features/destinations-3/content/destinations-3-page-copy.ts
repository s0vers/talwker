/** Copy for `/destinations-3` — culture, people, named places (field-guide index). */
export const DESTINATIONS_3_PAGE_HERO = {
	rail: "Field guide · v3",
	kicker: "Culture · people · coordinates",
	title: "Read places through",
	titleAccent: "who holds them.",
	lede:
		"This index opens our third layout: less dossier, more atlas — neighborhoods, rituals, and the small politics of daily life. Same curated roster; a different editorial lens.",
	statA: { label: "Focus", value: "Culture" },
	statB: { label: "Lens", value: "Places" },
	footnote: "Tiles link to long-form guides — no rankings, no checkout in the story body.",
} as const;

export const DESTINATIONS_3_GRID = {
	label: "Index",
	title: "Choose a place on the map",
	description:
		"Each entry opens a field-guide read: who lives there, what gets repeated, and a few named coordinates worth understanding — not a shopping list.",
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
