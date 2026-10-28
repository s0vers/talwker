export const EXPERIENCES_HERO = {
	eyebrow: "Curated Catalog",
	title: "Crafted Experiences & Field Journeys",
	description:
		"Immersive travel formats designed for depth over speed — from alpine treks and coastal sailing to culinary traditions and tea house rituals.",
	primaryAction: "Explore All Tours",
	primaryHref: "/tours",
	secondaryAction: "Plan Custom Trip",
	secondaryHref: "/contact",
} as const;

export type ExperienceCategory = "all" | "culinary" | "alpine" | "coastal" | "cultural" | "wellness";

export type ExperienceItem = {
	id: string;
	title: string;
	category: ExperienceCategory;
	categoryLabel: string;
	description: string;
	image: string;
	imageAlt: string;
	duration: string;
	groupSize: string;
	price: string;
	tourSlug?: string;
	highlights: string[];
	itinerarySummary: string;
};

export const EXPERIENCE_CATEGORIES: { id: ExperienceCategory; label: string }[] = [
	{ id: "all", label: "All Experiences" },
	{ id: "cultural", label: "Cultural Immersion" },
	{ id: "coastal", label: "Coastal & Islands" },
	{ id: "alpine", label: "Alpine & Trekking" },
	{ id: "culinary", label: "Culinary & Markets" },
	{ id: "wellness", label: "Wellness & Slow Pacing" },
];

export const EXPERIENCES_CATALOG: ExperienceItem[] = [
	{
		id: "bali-culture",
		title: "Ubud Temple & Terrace Traditions",
		category: "cultural",
		categoryLabel: "Cultural Immersion",
		description: "Paced mornings in quiet temple courtyards, terrace walks, and home kitchen culinary sessions.",
		image: "/bali-ubud-temple.webp",
		imageAlt: "Balinese temple courtyard overlooking terraced hills at sunrise",
		duration: "7 Days",
		groupSize: "Max 12",
		price: "From $1,299",
		tourSlug: "bali-cultural-immersion",
		highlights: ["Private temple access", "Traditional home cooking class", "Terrace morning walk"],
		itinerarySummary: "A quiet inland stay in Ubud followed by 2 coastal days. Designed around morning light before crowds peak.",
	},
	{
		id: "greek-coastal",
		title: "Aegean Cliff & Island Sailing",
		category: "coastal",
		categoryLabel: "Coastal & Islands",
		description: "Caldera rim walking, sunset boat sails, and quiet Mediterranean cove exploration.",
		image: "/santorini-white-village.jpg",
		imageAlt: "Whitewashed Santorini cliffs overlooking Aegean sea",
		duration: "10 Days",
		groupSize: "Max 16",
		price: "From $2,199",
		tourSlug: "greek-island-odyssey",
		highlights: ["Catamaran sunset sail", "Volcanic vineyard tasting", "Mykonos cove hopping"],
		itinerarySummary: "Balanced itinerary between Santorini and Mykonos with dedicated buffer days and private boat transfers.",
	},
	{
		id: "patagonia-alpine",
		title: "Torres del Paine Glacier Expedition",
		category: "alpine",
		categoryLabel: "Alpine & Trekking",
		description: "Glacier approaches, wildlife watching, and big-sky alpine trekking under Torres del Paine peaks.",
		image: "/patagonia-torres-del-paine.webp",
		imageAlt: "Glacial lake below the Torres del Paine mountains",
		duration: "12 Days",
		groupSize: "Max 8",
		price: "From $3,499",
		tourSlug: "patagonia-expedition",
		highlights: ["Base towers approach", "Glacier ice trek", "Puma & wildlife optics safari"],
		itinerarySummary: "Expedition-style trekking with mountain guide leads, weather buffers, and a concluding lodge reset.",
	},
	{
		id: "japan-heritage",
		title: "Kyoto Tea & Heritage Trails",
		category: "cultural",
		categoryLabel: "Cultural Immersion",
		description: "Shinkansen journeys, private tea house ceremonies, and serene bamboo path walks.",
		image: "/kyoto-historic-street.webp",
		imageAlt: "Historic Kyoto street framed by cherry blossoms",
		duration: "9 Days",
		groupSize: "Max 14",
		price: "From $2,899",
		tourSlug: "japan-heritage-trail",
		highlights: ["Private tea master session", "Arashiyama early access", "Fuji vista day trip"],
		itinerarySummary: "Tokyo arrival logistics transitioning to historic Kyoto temples and traditional ryokan hospitalities.",
	},
	{
		id: "amalfi-culinary",
		title: "Amalfi Cliffside & Kitchen Gatherings",
		category: "culinary",
		categoryLabel: "Culinary & Markets",
		description: "Lemon grove harvests, coastal cliff paths, and family-owned trattoria masterclasses.",
		image: "/amalfi-cliffside-village.jpg",
		imageAlt: "Amalfi coastal village perched on cliffs",
		duration: "8 Days",
		groupSize: "Max 10",
		price: "From $2,499",
		highlights: ["Lemon orchard lunch", "Private boat to Capri", "Pasta & limoncello class"],
		itinerarySummary: "A sensory exploration of the Tyrrhenian coast, combining coastal trekking with artisan food producers.",
	},
	{
		id: "iceland-wellness",
		title: "Northern Lights & Geothermal Reset",
		category: "wellness",
		categoryLabel: "Wellness & Slow Pacing",
		description: "Glacial valley walks, geothermal hot springs, and evening aurora borealis watches.",
		image: "/iceland-aurora-waterfall.jpg",
		imageAlt: "Aurora borealis over a winter waterfall in Iceland",
		duration: "6 Days",
		groupSize: "Max 12",
		price: "From $1,999",
		highlights: ["Private geothermal soaking", "Godafoss aurora hunt", "Superjeep glacier trek"],
		itinerarySummary: "Paced winter journey focused on thermal recovery, quiet night skies, and Iceland's South Coast natural wonders.",
	},
];

export const EXPERIENCES_SPOTLIGHT = {
	eyebrow: "Curator's Spotlight",
	title: "The Art of Paced Discovery",
	quote:
		"Travel is at its best when it moves at the speed of human observation. We limit group sizes and build unscheduled blocks so place can happen to you.",
	curatorName: "Elena Rostova",
	curatorTitle: "Head of Editorial Experience, Talkwer",
	image: "/desert-camp-tea.jpg",
	imageAlt: "Local tea ceremony ritual",
} as const;

export const EXPERIENCES_CTA = {
	label: "Tailored Journeys",
	titleLead: "Looking for a custom",
	titleAccent: "experience?",
	description: "Let our editorial team design a private journey around your exact pacing, dates, and interests.",
	primaryAction: "Request Custom Trip",
	primaryHref: "/contact",
	secondaryAction: "Browse All Tours",
	secondaryHref: "/tours",
} as const;
