export type ExperienceTheme = {
	id: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	href: string;
};

export const EXPERIENCE_THEMES: ExperienceTheme[] = [
	{
		id: "culinary",
		title: "Culinary & Culture",
		description: "Local markets, regional kitchens, and traditional gatherings.",
		image: "/morocco-souk-market.jpg",
		imageAlt: "Spices and local food market stalls",
		href: "/destinations?tag=popular",
	},
	{
		id: "mountain-hiking",
		title: "Highland Trails",
		description: "Alpine views, mountain passes, and serene high-altitude routes.",
		image: "/andes-alpine-lake.jpg",
		imageAlt: "Glacial lake surrounded by snow-capped mountains",
		href: "/tours",
	},
	{
		id: "coastal-escape",
		title: "Mediterranean Coast",
		description: "Cliffside villages, azure waters, and historic coastal paths.",
		image: "/amalfi-cliffside-village.jpg",
		imageAlt: "Coastal hillside village overlooking the ocean",
		href: "/destinations?tag=trending",
	},
	{
		id: "cherry-blossom",
		title: "Seasonal Rituals",
		description: "Spring blooms, autumn foliage, and time-honored ceremonies.",
		image: "/fuji-pagoda-cherry-blossoms.jpg",
		imageAlt: "Pagoda framed by cherry blossoms and Mount Fuji",
		href: "/stories",
	},
	{
		id: "northern-lights",
		title: "Wild Wilderness",
		description: "Auroras, glacial valleys, and untamed natural landscapes.",
		image: "/iceland-aurora-waterfall.jpg",
		imageAlt: "Northern lights glowing green over a winter waterfall",
		href: "/destinations?tag=new",
	},
	{
		id: "island-retreat",
		title: "Archipelago Life",
		description: "Secluded coves, whitewashed architecture, and island calm.",
		image: "/santorini-white-village.jpg",
		imageAlt: "White island architecture against deep blue sea",
		href: "/destinations?tag=luxury",
	},
];
