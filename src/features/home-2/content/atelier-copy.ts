export interface HeroSlide {
	id: string;
	destinationSlug: string;
	title: string;
	subtitle: string;
	region: string;
	coordinates: string;
	elevation: string;
	season: string;
	localTimezone: string;
	image: string;
	cameraMeta: string;
	tag: string;
}

export interface MapWaypoint {
	id: string;
	name: string;
	country: string;
	slug: string;
	lat: number;
	lng: number;
	elevation: string;
	tempCelsius: number;
	condition: string;
	activeDispatch: string;
	image: string;
	status: "Active Expedition" | "Camp Bivouac" | "Summit Push" | "Nocturnal Watch";
}

export interface DarkroomPlate {
	id: string;
	frameNumber: string;
	title: string;
	location: string;
	coordinates: string;
	elevation: string;
	filmStock: string;
	shutterSpeed: string;
	focalLength: string;
	aperture: string;
	iso: string;
	year: string;
	excerpt: string;
	image: string;
	slug: string;
}

export interface ExpeditionBoardingPass {
	id: string;
	passNumber: string;
	tourSlug: string;
	title: string;
	destination: string;
	routeCode: string;
	departureDates: string;
	durationDays: number;
	maxCapacity: number;
	spotsRemaining: number;
	priceUSD: number;
	intensity: "Demanding" | "Moderate" | "Challenging";
	image: string;
	flightGate: string;
	naturalistGuide: string;
}

export const HERO_SLIDES: HeroSlide[] = [
	{
		id: "slide-patagonia",
		destinationSlug: "patagonia",
		title: "PATAGONIA",
		subtitle: "GLACIAL MONOGRAPH",
		region: "Southern Ice Field, Chile",
		coordinates: "51.2532° S, 72.8814° W",
		elevation: "2,850M",
		season: "Spring Solstice",
		localTimezone: "UTC-3",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		cameraMeta: "35mm ƒ/2.8 · ISO 100",
		tag: "HIGH ALPINE",
	},
	{
		id: "slide-kyoto",
		destinationSlug: "kyoto",
		title: "KYOTO",
		subtitle: "ZEN SANCTUARIES",
		region: "Arashiyama Bamboo Basin, Japan",
		coordinates: "35.0116° N, 135.7681° E",
		elevation: "420M",
		season: "Maple Twilight",
		localTimezone: "UTC+9",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		cameraMeta: "50mm ƒ/1.4 · ISO 200",
		tag: "CONTEMPLATIVE",
	},
	{
		id: "slide-amalfi",
		destinationSlug: "amalfi-coast",
		title: "AMALFI",
		subtitle: "VERTICAL CLIFFSIDES",
		region: "Tyrrhenian Coastline, Italy",
		coordinates: "40.6340° N, 14.6027° E",
		elevation: "310M",
		season: "Late Harvest",
		localTimezone: "UTC+1",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		cameraMeta: "28mm ƒ/4.0 · ISO 64",
		tag: "MARITIME",
	},
	{
		id: "slide-iceland",
		destinationSlug: "iceland",
		title: "ICELAND",
		subtitle: "AURORA CHASM",
		region: "Godafoss Volcanic Valley, Iceland",
		coordinates: "64.1466° N, 21.9426° W",
		elevation: "1,100M",
		season: "Polar Night",
		localTimezone: "UTC+0",
		image: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		cameraMeta: "24mm ƒ/1.8 · ISO 1600",
		tag: "SUB-ZERO",
	},
];

export const MAP_WAYPOINTS: MapWaypoint[] = [
	{
		id: "wp-patagonia",
		name: "Patagonia Massif",
		country: "Chile",
		slug: "patagonia",
		lat: -51.2532,
		lng: -72.8814,
		elevation: "2,850M",
		tempCelsius: 4,
		condition: "Clear alpine twilight",
		activeDispatch: "Team reached the high glacial ridge. Wind steady at 12 knots. Zero light pollution.",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		status: "Active Expedition",
	},
	{
		id: "wp-kyoto",
		name: "Kyoto Sanctuaries",
		country: "Japan",
		slug: "kyoto",
		lat: 35.0116,
		lng: 135.7681,
		elevation: "420M",
		tempCelsius: 18,
		condition: "Misty morning mist",
		activeDispatch: "Silent dawn tea meditation recorded. Ancient cedar canopy filtering first dawn rays.",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		status: "Camp Bivouac",
	},
	{
		id: "wp-amalfi",
		name: "Amalfi Coastline",
		country: "Italy",
		slug: "amalfi-coast",
		lat: 40.634,
		lng: 14.6027,
		elevation: "310M",
		tempCelsius: 22,
		condition: "Cobalt sea breeze",
		activeDispatch: "Maritime traverse along the Sentiero degli Dei cliff path complete.",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		status: "Summit Push",
	},
	{
		id: "wp-iceland",
		name: "Icelandic Aurora Chasm",
		country: "Iceland",
		slug: "iceland",
		lat: 64.1466,
		lng: -21.9426,
		elevation: "1,100M",
		tempCelsius: -6,
		condition: "KP5 geomagnetic activity",
		activeDispatch: "Green curtains of solar particles pulsating across the sub-polar night sky.",
		image: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		status: "Nocturnal Watch",
	},
	{
		id: "wp-santorini",
		name: "Santorini Caldera",
		country: "Greece",
		slug: "santorini",
		lat: 36.3932,
		lng: 25.4615,
		elevation: "260M",
		tempCelsius: 24,
		condition: "Golden Aegean hour",
		activeDispatch: "Volcanic ridge survey completed with drone atmospheric telemetry.",
		image: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		status: "Camp Bivouac",
	},
	{
		id: "wp-bali",
		name: "Bali Highlands",
		country: "Indonesia",
		slug: "bali",
		lat: -8.3405,
		lng: 115.092,
		elevation: "1,450M",
		tempCelsius: 26,
		condition: "Tropical highland mist",
		activeDispatch: "Sacred volcano caldera traverse underway at dawn.",
		image: "/sun-idyllic-beautiful-relax-sky.jpg",
		status: "Active Expedition",
	},
];

export const DARKROOM_PLATES: DarkroomPlate[] = [
	{
		id: "dr-01",
		frameNumber: "EXP-01 // PATAGONIA",
		title: "Granite Monolith at Blue Hour",
		location: "Torres del Paine, Chile",
		coordinates: "51.2532° S, 72.8814° W",
		elevation: "2,850m",
		filmStock: "Kodak Tri-X 400",
		shutterSpeed: "1/125s",
		focalLength: "35mm",
		aperture: "ƒ/2.8",
		iso: "400",
		year: "2026",
		excerpt: "Sub-zero winds carving pristine reflection pools into the glacial moraine basin.",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		slug: "patagonia",
	},
	{
		id: "dr-02",
		frameNumber: "EXP-02 // KYOTO",
		title: "The Autumn Temple Solstice",
		location: "Higashiyama, Kyoto",
		coordinates: "35.0116° N, 135.7681° E",
		elevation: "420m",
		filmStock: "Fujifilm Velvia 50",
		shutterSpeed: "1/60s",
		focalLength: "50mm",
		aperture: "ƒ/1.4",
		iso: "100",
		year: "2025",
		excerpt: "Centuries of moss and hand-hewn cedar bathed in early morning autumnal vapor.",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		slug: "kyoto",
	},
	{
		id: "dr-03",
		frameNumber: "EXP-03 // AMALFI",
		title: "Vertical Limestones over Cobalt",
		location: "Positano Ridge, Italy",
		coordinates: "40.6340° N, 14.6027° E",
		elevation: "310m",
		filmStock: "Kodak Portra 160",
		shutterSpeed: "1/500s",
		focalLength: "28mm",
		aperture: "ƒ/5.6",
		iso: "160",
		year: "2026",
		excerpt: "Sun-drenched terraces plunging into the Mediterranean with architectural defiance.",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		slug: "amalfi-coast",
	},
	{
		id: "dr-04",
		frameNumber: "EXP-04 // ICELAND",
		title: "Geothermal Steam & Solar Green",
		location: "Godafoss, Iceland",
		coordinates: "64.1466° N, 21.9426° W",
		elevation: "1,100m",
		filmStock: "CineStill 800T",
		shutterSpeed: "4.0s",
		focalLength: "24mm",
		aperture: "ƒ/1.8",
		iso: "800",
		year: "2026",
		excerpt: "Geomagnetic ionization lighting the frozen canyon in celestial green luminescence.",
		image: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		slug: "iceland",
	},
];

export const EXPEDITION_PASSES: ExpeditionBoardingPass[] = [
	{
		id: "pass-patagonia",
		passNumber: "TK-0842-PTG",
		tourSlug: "patagonia-expedition",
		title: "Patagonia Glacial Solstice Traverse",
		destination: "Patagonia, Chile",
		routeCode: "SCL → PUQ → TPA",
		departureDates: "OCT 14 — OCT 24, 2026",
		durationDays: 10,
		maxCapacity: 6,
		spotsRemaining: 2,
		priceUSD: 3850,
		intensity: "Demanding",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		flightGate: "GATE 04",
		naturalistGuide: "Dr. Elena Rostova",
	},
	{
		id: "pass-kyoto",
		passNumber: "TK-0219-KYO",
		tourSlug: "bali-cultural-immersion",
		title: "Kyoto Zen Hermitage & Bamboo Path",
		destination: "Kyoto, Japan",
		routeCode: "KIX → UKY → ARS",
		departureDates: "NOV 02 — NOV 09, 2026",
		durationDays: 8,
		maxCapacity: 6,
		spotsRemaining: 1,
		priceUSD: 2950,
		intensity: "Moderate",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		flightGate: "GATE 02",
		naturalistGuide: "Kenzo Takahashi",
	},
	{
		id: "pass-amalfi",
		passNumber: "TK-0571-AML",
		tourSlug: "greek-island-odyssey",
		title: "Amalfi Maritime Ridge & Secret Coves",
		destination: "Amalfi Coast, Italy",
		routeCode: "NAP → AMF → POS",
		departureDates: "SEP 18 — SEP 25, 2026",
		durationDays: 8,
		maxCapacity: 6,
		spotsRemaining: 3,
		priceUSD: 3200,
		intensity: "Moderate",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		flightGate: "GATE 07",
		naturalistGuide: "Gianluigi Moretti",
	},
];
