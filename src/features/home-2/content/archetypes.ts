export interface ExpeditionArchetype {
	id: string;
	slug: string;
	titleKey: string;
	taglineKey: string;
	descriptionKey: string;
	coordinates: string;
	elevation: string;
	optimalSeasonKey: string;
	intensity: "Moderate" | "Challenging" | "Demanding" | "Extreme";
	durationDays: number;
	gearKeys: [string, string, string];
	highlights: string[];
	image: string;
	href: string;
}

export const EXPEDITION_ARCHETYPES: ExpeditionArchetype[] = [
	{
		id: "alpine",
		slug: "the-solitary-alpine",
		titleKey: "alpineTitle",
		taglineKey: "alpineTagline",
		descriptionKey: "alpineDesc",
		coordinates: "46.4131° N, 11.8561° E",
		elevation: "3,343m",
		optimalSeasonKey: "seasonSummerAutumn",
		intensity: "Demanding",
		durationDays: 8,
		gearKeys: ["alpineGear1", "alpineGear2", "alpineGear3"],
		highlights: [
			"High-altitude ridgeway bivouacs",
			"Monochrome dolomitic limestone towers",
			"Early-dawn alpine glow telemetry",
		],
		image: "/patagonia-torres-del-paine.webp",
		href: "/contact?expedition=the-solitary-alpine",
	},
	{
		id: "archipelago",
		slug: "the-midnight-archipelago",
		titleKey: "archipelagoTitle",
		taglineKey: "archipelagoTagline",
		descriptionKey: "archipelagoDesc",
		coordinates: "68.2355° N, 14.5682° E",
		elevation: "840m",
		optimalSeasonKey: "seasonSpringSummer",
		intensity: "Moderate",
		durationDays: 6,
		gearKeys: ["archipelagoGear1", "archipelagoGear2", "archipelagoGear3"],
		highlights: [
			"Fjord kayak nocturnal crossings",
			"Nordic red rorbu architectural stays",
			"Midnight sun long-exposure photography",
		],
		image: "/iceland-aurora-waterfall.jpg",
		href: "/contact?expedition=the-midnight-archipelago",
	},
	{
		id: "oasis",
		slug: "the-silk-oasis",
		titleKey: "oasisTitle",
		taglineKey: "oasisTagline",
		descriptionKey: "oasisDesc",
		coordinates: "26.6917° N, 37.9189° E",
		elevation: "780m",
		optimalSeasonKey: "seasonAutumnWinter",
		intensity: "Moderate",
		durationDays: 7,
		gearKeys: ["oasisGear1", "oasisGear2", "oasisGear3"],
		highlights: [
			"Carved sandstone monolith stargazing",
			"Bedouin sensory tea rituals",
			"Dune sea navigational traverses",
		],
		image: "/desert-camp-tea.jpg",
		href: "/contact?expedition=the-silk-oasis",
	},
	{
		id: "aurora",
		slug: "the-arctic-aurora",
		titleKey: "auroraTitle",
		taglineKey: "auroraTagline",
		descriptionKey: "auroraDesc",
		coordinates: "69.6492° N, 18.9553° E",
		elevation: "1,200m",
		optimalSeasonKey: "seasonWinter",
		intensity: "Challenging",
		durationDays: 9,
		gearKeys: ["auroraGear1", "auroraGear2", "auroraGear3"],
		highlights: [
			"Sub-zero aurora borealis tracking",
			"Husky traverse over frozen tundra",
			"Geothermal natural pool resets",
		],
		image: "/iceland-aurora-waterfall.jpg",
		href: "/contact?expedition=the-arctic-aurora",
	},
];
