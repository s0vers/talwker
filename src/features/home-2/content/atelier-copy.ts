export interface DossierPlate {
	id: string;
	figureNumber: string;
	destinationSlug: string;
	titleKey: string;
	regionKey: string;
	coordinates: string;
	elevation: string;
	focalLength: string;
	seasonKey: string;
	excerptKey: string;
	image: string;
	tagKey: string;
}

export interface TelemetryFeed {
	id: string;
	locationKey: string;
	coordinates: string;
	elevation: string;
	tempCelsius: number;
	conditionKey: string;
	statusKey: string;
}

export interface SeasonalDeparture {
	id: string;
	tourSlug: string;
	titleKey: string;
	destinationKey: string;
	dateRange: string;
	durationDays: number;
	spotsLeft: number;
	priceUSD: number;
	image: string;
	intensity: "Moderate" | "Challenging" | "Demanding";
}

export interface ManifestoQuote {
	id: string;
	quoteKey: string;
	authorName: string;
	roleKey: string;
	year: number;
}

export const DOSSIER_PLATES: DossierPlate[] = [
	{
		id: "plate-patagonia",
		figureNumber: "FIG. 01",
		destinationSlug: "patagonia",
		titleKey: "plate1Title",
		regionKey: "plate1Region",
		coordinates: "51.2532° S, 72.8814° W",
		elevation: "2,850m",
		focalLength: "35mm ƒ/2.8",
		seasonKey: "seasonPlate1",
		excerptKey: "plate1Excerpt",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		tagKey: "tagGlacial",
	},
	{
		id: "plate-kyoto",
		figureNumber: "FIG. 02",
		destinationSlug: "kyoto",
		titleKey: "plate2Title",
		regionKey: "plate2Region",
		coordinates: "35.0116° N, 135.7681° E",
		elevation: "420m",
		focalLength: "50mm ƒ/1.4",
		seasonKey: "seasonPlate2",
		excerptKey: "plate2Excerpt",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		tagKey: "tagCultural",
	},
	{
		id: "plate-amalfi",
		figureNumber: "FIG. 03",
		destinationSlug: "amalfi-coast",
		titleKey: "plate3Title",
		regionKey: "plate3Region",
		coordinates: "40.6340° N, 14.6027° E",
		elevation: "310m",
		focalLength: "28mm ƒ/4.0",
		seasonKey: "seasonPlate3",
		excerptKey: "plate3Excerpt",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		tagKey: "tagCoastal",
	},
	{
		id: "plate-iceland",
		figureNumber: "FIG. 04",
		destinationSlug: "iceland",
		titleKey: "plate4Title",
		regionKey: "plate4Region",
		coordinates: "64.1466° N, 21.9426° W",
		elevation: "1,100m",
		focalLength: "24mm ƒ/1.8",
		seasonKey: "seasonPlate4",
		excerptKey: "plate4Excerpt",
		image: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		tagKey: "tagVolcanic",
	},
];

export const TELEMETRY_FEEDS: TelemetryFeed[] = [
	{
		id: "tel-patagonia",
		locationKey: "telPatagonia",
		coordinates: "51.2532° S, 72.8814° W",
		elevation: "2,850M",
		tempCelsius: 4,
		conditionKey: "condClearAlpine",
		statusKey: "statActiveTraverse",
	},
	{
		id: "tel-kyoto",
		locationKey: "telKyoto",
		coordinates: "35.0116° N, 135.7681° E",
		elevation: "420M",
		tempCelsius: 18,
		conditionKey: "condMistyDawn",
		statusKey: "statFieldNotesRecorded",
	},
	{
		id: "tel-tromso",
		locationKey: "telTromso",
		coordinates: "69.6492° N, 18.9553° E",
		elevation: "1,200M",
		tempCelsius: -6,
		conditionKey: "condAuroraActive",
		statusKey: "statNocturnalWatch",
	},
	{
		id: "tel-dolomites",
		locationKey: "telDolomites",
		coordinates: "46.4131° N, 11.8561° E",
		elevation: "3,343M",
		tempCelsius: 9,
		conditionKey: "condGoldenHour",
		statusKey: "statRidgeExpedition",
	},
];

export const SEASONAL_DEPARTURES: SeasonalDeparture[] = [
	{
		id: "dep-patagonia-solstice",
		tourSlug: "patagonia-trekking",
		titleKey: "dep1Title",
		destinationKey: "dep1Dest",
		dateRange: "OCT 14 — OCT 24",
		durationDays: 10,
		spotsLeft: 4,
		priceUSD: 3450,
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		intensity: "Demanding",
	},
	{
		id: "dep-kyoto-zen",
		tourSlug: "kyoto-cultural",
		titleKey: "dep2Title",
		destinationKey: "dep2Dest",
		dateRange: "NOV 02 — NOV 08",
		durationDays: 7,
		spotsLeft: 3,
		priceUSD: 2850,
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		intensity: "Moderate",
	},
	{
		id: "dep-amalfi-cliffside",
		tourSlug: "amalfi-discovery",
		titleKey: "dep3Title",
		destinationKey: "dep3Dest",
		dateRange: "SEP 18 — SEP 26",
		durationDays: 8,
		spotsLeft: 6,
		priceUSD: 3100,
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		intensity: "Moderate",
	},
];

export const MANIFESTO_QUOTES: ManifestoQuote[] = [
	{
		id: "quote-1",
		quoteKey: "quote1",
		authorName: "Elena Rostova",
		roleKey: "roleLeadPhotographer",
		year: 2026,
	},
	{
		id: "quote-2",
		quoteKey: "quote2",
		authorName: "Kenzo Takahashi",
		roleKey: "roleAlpineNavigator",
		year: 2025,
	},
	{
		id: "quote-3",
		quoteKey: "quote3",
		authorName: "Marcus Vance",
		roleKey: "roleExpeditionFounder",
		year: 2026,
	},
];
