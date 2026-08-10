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
		image: "/unsplash-market-culture.jpg",
		imageAlt: "Spices and local food market stalls",
		href: "/destinations?tag=popular",
	},
	{
		id: "mountain-hiking",
		title: "Highland Trails",
		description: "Alpine views, mountain passes, and serene high-altitude routes.",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		imageAlt: "Glacial lake surrounded by snow-capped mountains",
		href: "/tours",
	},
	{
		id: "coastal-escape",
		title: "Mediterranean Coast",
		description: "Cliffside villages, azure waters, and historic coastal paths.",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		imageAlt: "Coastal hillside village overlooking the ocean",
		href: "/destinations?tag=trending",
	},
	{
		id: "cherry-blossom",
		title: "Seasonal Rituals",
		description: "Spring blooms, autumn foliage, and time-honored ceremonies.",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		imageAlt: "Pagoda framed by cherry blossoms and Mount Fuji",
		href: "/stories",
	},
	{
		id: "northern-lights",
		title: "Wild Wilderness",
		description: "Auroras, glacial valleys, and untamed natural landscapes.",
		image: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		imageAlt: "Northern lights glowing green over a winter waterfall",
		href: "/destinations?tag=new",
	},
	{
		id: "island-retreat",
		title: "Archipelago Life",
		description: "Secluded coves, whitewashed architecture, and island calm.",
		image: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		imageAlt: "White island architecture against deep blue sea",
		href: "/destinations?tag=luxury",
	},
];
