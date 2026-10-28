export interface CelestialWaypoint {
	id: string;
	title: string;
	region: string;
	country: string;
	coordinates: string;
	elevation: string;
	bortleClass: number;
	bortleRating: string;
	focalHighlights: string[];
	optimalWindow: string;
	focalSpecs: {
		aperture: string;
		isoRange: string;
		skyBrightness: string;
	};
	description: string;
	image: string;
	slug: string;
}

export interface TwilightPhase {
	id: string;
	phaseNumber: string;
	name: string;
	subTitle: string;
	solarAngle: string;
	colorTemperature: string;
	ambientSpectrum: string;
	visualAtmosphere: string;
	navigationalVisibility: string;
	image: string;
	expeditionAdvice: string;
	starCount: string;
}

export interface CartographyWaypointNode {
	km: number;
	name: string;
	altM: number;
	type: "camp" | "pass" | "observatory" | "summit";
	notes: string;
}

export interface CartographyRoute {
	id: string;
	title: string;
	trailName: string;
	region: string;
	country: string;
	distanceKm: number;
	elevationGainM: number;
	peakAltitudeM: number;
	durationDays: string;
	waypoints: CartographyWaypointNode[];
	description: string;
	starlightGuidance: string;
}

export interface NocturnalDeparture {
	id: string;
	title: string;
	astronomicalEvent: string;
	dates: string;
	lunarPhase: string;
	leadGuide: string;
	totalBerths: number;
	remainingBerths: number;
	price: string;
	duration: string;
	location: string;
	status: "open" | "last-spots" | "waitlist";
}

export interface AstralVoice {
	id: string;
	quote: string;
	author: string;
	role: string;
	observatory: string;
	coordinates: string;
	year: string;
}

export const CELESTIAL_WAYPOINTS: CelestialWaypoint[] = [
	{
		id: "atacama",
		title: "Atacama Altiplano",
		region: "Antofagasta",
		country: "Chile",
		coordinates: "23° 51' S, 67° 42' W",
		elevation: "5,050M",
		bortleClass: 1,
		bortleRating: "Class 1 — Zero Light Contamination",
		focalHighlights: ["Galactic Core Meridian", "Magellanic Clouds", "Zodiacal Cone"],
		optimalWindow: "22:00 – 04:30 // June to September",
		focalSpecs: {
			aperture: "f/1.4 – f/2.8",
			isoRange: "ISO 3200 – 6400",
			skyBrightness: "21.98 mag/arcsec²",
		},
		description:
			"Perched on the hyper-arid volcanic plateau of the Chajnantor, where the thinnest atmosphere on Earth reveals interstellar dust lanes with crystalline razor-edge clarity.",
		image: "/atacama-altiplano-night.webp",
		slug: "atacama-chile",
	},
	{
		id: "tromso",
		title: "Tromsø Auroral Fjords",
		region: "Troms og Finnmark",
		country: "Norway",
		coordinates: "69° 39' N, 18° 57' E",
		elevation: "1,238M",
		bortleClass: 2,
		bortleRating: "Class 2 — Deep Arctic Marine Reserve",
		focalHighlights: ["Geomagnetic Aurora Borealis", "Polar Twilight Arc", "Orion Horizon"],
		optimalWindow: "20:30 – 03:00 // November to February",
		focalSpecs: {
			aperture: "f/1.8 – f/2.0",
			isoRange: "ISO 1600 – 3200",
			skyBrightness: "21.72 mag/arcsec²",
		},
		description:
			"Where solar wind ribbons dance in vivid emerald and violet curtains over silent frozen fjords and jagged snow-capped peaks under the perpetual polar night.",
		image: "/tromso-aurora-fjord.webp",
		slug: "tromso-norway",
	},
	{
		id: "fuji",
		title: "Fuji Zenith Plateau",
		region: "Yamanashi",
		country: "Japan",
		coordinates: "35° 21' N, 138° 43' E",
		elevation: "3,776M",
		bortleClass: 2,
		bortleRating: "Class 2 — High Alpine Shadow Basin",
		focalHighlights: ["Subaru Pleiades Cluster", "Winter Hexagon", "Dawn Light Gradient"],
		optimalWindow: "01:00 – 05:00 // October to March",
		focalSpecs: {
			aperture: "f/2.0 – f/2.8",
			isoRange: "ISO 2000 – 4000",
			skyBrightness: "21.65 mag/arcsec²",
		},
		description:
			"Rising above lower atmospheric inversions and cloud seas, sacred snows catch the faint silver glow of the Andromeda galaxy and ancient constellations.",
		image: "/fuji-pagoda-cherry-blossoms.jpg",
		slug: "mount-fuji-japan",
	},
	{
		id: "santorini",
		title: "Cycladic Deep Horizon",
		region: "Aegean Archipelago",
		country: "Greece",
		coordinates: "36° 23' N, 25° 26' E",
		elevation: "567M",
		bortleClass: 3,
		bortleRating: "Class 3 — Open Maritime Horizon",
		focalHighlights: ["Cygnus Summer Rift", "Scorpius Tail", "Bioluminescent Sea Glow"],
		optimalWindow: "23:00 – 04:00 // May to October",
		focalSpecs: {
			aperture: "f/1.4 – f/2.8",
			isoRange: "ISO 1600 – 3200",
			skyBrightness: "21.40 mag/arcsec²",
		},
		description:
			"Sheer volcanic caldera precipices dropping directly into midnight indigo waters, creating an unobstructed 360-degree maritime view of the celestial equator.",
		image: "/santorini-white-village.jpg",
		slug: "santorini-greece",
	},
];

export const TWILIGHT_PHASES: TwilightPhase[] = [
	{
		id: "golden-hour",
		phaseNumber: "PHASE 01",
		name: "Golden Hour // Solar Descent",
		subTitle: "Sun 0° to +6° above horizon",
		solarAngle: "+4.2°",
		colorTemperature: "2800K Warm Amber",
		ambientSpectrum: "from-amber-500/20 via-orange-500/10 to-transparent",
		visualAtmosphere:
			"Long low-rake shadows stretch across alpine ridgelines; atmospheric dust layers scatter deep ochre and gold wavelengths.",
		navigationalVisibility: "Full topographical contour identification with high chromatic contrast.",
		image: "/maldives-overwater-villas.jpg",
		expeditionAdvice:
			"Calibrate compass bearings while landmark silhouettes remain distinct against the western horizon.",
		starCount: "0 – 2 bright planetary points (Venus/Jupiter)",
	},
	{
		id: "civil-twilight",
		phaseNumber: "PHASE 02",
		name: "Civil Twilight // The Cobalt Shift",
		subTitle: "Sun 0° to -6° below horizon",
		solarAngle: "-3.8°",
		colorTemperature: "5400K Deep Slate-Cyan",
		ambientSpectrum: "from-white/10 via-[#0a0a0a] to-transparent",
		visualAtmosphere:
			"The sky deepens into a saturated ultramarine vault. Ground features lose their color warmth, receding into sharp slate-blue silhouettes.",
		navigationalVisibility: "Horizon line clearly distinguishable; trail surfaces still navigable without artificial headlamps.",
		image: "/lagoon-cottages.jpg",
		expeditionAdvice:
			"Establish basecamp shelters and ignite bivouac lanterns before ambient lux drops below 3.4 cd/m².",
		starCount: "10 – 30 first-magnitude navigational stars",
	},
	{
		id: "nautical-twilight",
		phaseNumber: "PHASE 03",
		name: "Nautical Twilight // Astral Navigatrix",
		subTitle: "Sun -6° to -12° below horizon",
		solarAngle: "-9.4°",
		colorTemperature: "8200K Deep Obsidian",
		ambientSpectrum: "from-orange-500/10 via-[#080808] to-transparent",
		visualAtmosphere:
			"Major constellations lock into sharp relief. The boundary between earth and sky begins to merge into uniform dark velvet.",
		navigationalVisibility: "Horizon becomes faint; primary sextant readings and astro-navigational fixes become possible.",
		image: "/andes-alpine-lake.jpg",
		expeditionAdvice:
			"Switch all instrumentation to red-spectrum LED illumination to preserve scotopic dark-adaptation vision.",
		starCount: "300 – 600 catalogued star points",
	},
	{
		id: "astronomical-midnight",
		phaseNumber: "PHASE 04",
		name: "Astronomical Midnight // The Deep Void",
		subTitle: "Sun -18° or lower below horizon",
		solarAngle: "-24.1°",
		colorTemperature: "Infinite Starlight",
		ambientSpectrum: "from-orange-500/10 via-[#050505] to-[#050505]",
		visualAtmosphere:
			"Zero solar interference. The Milky Way arch cascades like incandescent diamond dust across zenith from horizon to horizon.",
		navigationalVisibility: "Navigation relies entirely on celestial orientation and topographical memory.",
		image: "/iceland-aurora-waterfall.jpg",
		expeditionAdvice:
			"Engage long-exposure celestial tracking mounts; maximum atmospheric transparency achieved.",
		starCount: "4,500+ visible naked-eye stars & dust lanes",
	},
];

export const CARTOGRAPHY_ROUTES: CartographyRoute[] = [
	{
		id: "atacama-high-traverse",
		title: "Atacama Altiplano Meridian",
		trailName: "Volcán Licancabur to Salar de Tara",
		region: "High Atacama Desert",
		country: "Chile",
		distanceKm: 68.4,
		elevationGainM: 3240,
		peakAltitudeM: 5210,
		durationDays: "5 Days / 4 Nights",
		description:
			"Traverse the stark volcanic crest of the high puna desert beneath the world's driest nocturnal sky, sleeping in solitary geothermal refuges.",
		starlightGuidance:
			"Night marches guided by the alignment of the Southern Cross (Crux) and the dark coal sack nebula.",
		waypoints: [
			{ km: 0, name: "San Pedro Basecamp", altM: 2400, type: "camp", notes: "Aclimatization waypoint & telescope calibration" },
			{ km: 18.2, name: "Guatin Canyon Pass", altM: 3250, type: "pass", notes: "Thermal stream traverse under twilight" },
			{ km: 34.0, name: "Chajnantor Observatory Ridge", altM: 4500, type: "observatory", notes: "Direct zenith observation station" },
			{ km: 51.5, name: "Licancabur Crater Bivouac", altM: 5210, type: "summit", notes: "Sub-zero high altitude night camp" },
			{ km: 68.4, name: "Salar de Tara Monoliths", altM: 4300, type: "camp", notes: "Expedition terminus among ancient ignimbrite pillars" },
		],
	},
	{
		id: "arctic-aurora-ridge",
		title: "Arctic Auroral Ridge Traverse",
		trailName: "Kvaløya Summit to Ersfjord Fjordline",
		region: "Troms Coastal Highlands",
		country: "Norway",
		distanceKm: 44.8,
		elevationGainM: 2180,
		peakAltitudeM: 1044,
		durationDays: "4 Days / 3 Nights",
		description:
			"Winter snowshoe trek over jagged coastal massifs illuminated solely by geomagnetic auroral storms reflecting on midnight ocean waves.",
		starlightGuidance:
			"Bearing maintained via Polaris zenith alignment and coastal fjord lighthouse sweeps.",
		waypoints: [
			{ km: 0, name: "Kvaløya Sea Shore", altM: 10, type: "camp", notes: "Tide mark departure point" },
			{ km: 12.5, name: "Store Blåmann Shoulder", altM: 640, type: "pass", notes: "Exposed arctic wind traverse" },
			{ km: 26.0, name: "Skamtinden Peak Bivouac", altM: 884, type: "summit", notes: "360-degree fjord auroral observation ledge" },
			{ km: 37.2, name: "Ersfjordbotn Mountain Hut", altM: 420, type: "observatory", notes: "Wood-stove arctic refuge & dark sky deck" },
			{ km: 44.8, name: "Grøtfjord Terminus", altM: 0, type: "camp", notes: "Coastal landing & recovery point" },
		],
	},
	{
		id: "fuji-alpine-ascent",
		title: "Subashiri Nocturnal Ascent",
		trailName: "Subashiri Trail to Kengamine Peak",
		region: "Mount Fuji",
		country: "Japan",
		distanceKm: 28.6,
		elevationGainM: 2450,
		peakAltitudeM: 3776,
		durationDays: "2 Days / 1 Night",
		description:
			"The traditional nocturnal pilgrimage through ancient volcanic cinder forests, rising above cloud seas for the sacred Goraiko dawn starlight transition.",
		starlightGuidance:
			"Path illuminated by starlight reflected on black volcanic basalt sand.",
		waypoints: [
			{ km: 0, name: "Subashiri 5th Station", altM: 1970, type: "camp", notes: "Forest perimeter departure point" },
			{ km: 7.4, name: "Dairoku-gome Mountain Hut", altM: 2700, type: "pass", notes: "Boundary of alpine tree line" },
			{ km: 14.8, name: "Original 8th Station", altM: 3400, type: "observatory", notes: "High altitude twilight observation balcony" },
			{ km: 21.0, name: "Kengamine Crater Summit", altM: 3776, type: "summit", notes: "Highest point in Japan; 360° celestial dome" },
			{ km: 28.6, name: "Sunabashiri Descent Basin", altM: 2000, type: "camp", notes: "Rapid volcanic sand sliding descent" },
		],
	},
];

export const NOCTURNAL_DEPARTURES: NocturnalDeparture[] = [
	{
		id: "perseid-atacama-2026",
		title: "Atacama Perseid Zenith Immersion",
		astronomicalEvent: "Perseid Meteor Stream Peak // New Moon",
		dates: "August 10 – August 18, 2026",
		lunarPhase: "0.2% Illumination (Pure Dark Sky)",
		leadGuide: "Dr. Elena Vasquez (Astrophysicist & Alpine Guide)",
		totalBerths: 8,
		remainingBerths: 2,
		price: "$4,250",
		duration: "9 Days",
		location: "Chajnantor Plateau, Chile",
		status: "last-spots",
	},
	{
		id: "aurora-equinox-tromso",
		title: "Arctic Equinox Auroral Traverse",
		astronomicalEvent: "Autumnal Equinox Solar Flare Window",
		dates: "September 20 – September 27, 2026",
		lunarPhase: "Waxing Crescent (12% Illumination)",
		leadGuide: "Lars Lindqvist (Polar Expedition Leader)",
		totalBerths: 10,
		remainingBerths: 4,
		price: "$3,890",
		duration: "8 Days",
		location: "Tromsø & Lyngen Alps, Norway",
		status: "open",
	},
	{
		id: "fuji-milkyway-solstice",
		title: "Fuji Zenith Winter Galactic Trek",
		astronomicalEvent: "Winter Solstice Cold-Air Clarity Peak",
		dates: "December 18 – December 23, 2026",
		lunarPhase: "New Moon (0% Illumination)",
		leadGuide: "Kenji Takahashi (Mountain Master & Night Photographer)",
		totalBerths: 6,
		remainingBerths: 1,
		price: "$2,780",
		duration: "6 Days",
		location: "Mount Fuji & Yamanakako, Japan",
		status: "last-spots",
	},
	{
		id: "santorini-cygnus-rift",
		title: "Cycladic Maritime Starlight Voyage",
		astronomicalEvent: "Cygnus Star Cloud Oceanic Transit",
		dates: "October 04 – October 11, 2026",
		lunarPhase: "New Moon Alignment",
		leadGuide: "Dimitri Costas (Aegean Skipper & Navigator)",
		totalBerths: 12,
		remainingBerths: 6,
		price: "$3,150",
		duration: "8 Days",
		location: "Santorini & Anafi, Greece",
		status: "open",
	},
];

export const ASTRAL_VOICES: AstralVoice[] = [
	{
		id: "quote-1",
		quote:
			"To stand in the high Atacama at 3:00 AM with zero artificial light is to remember that the universe is not above us — we are suspended inside of it, clinging to a stone spinning through infinite light.",
		author: "Dr. Marcela Quintana",
		role: "Observational Astronomer & High-Altitude Navigator",
		observatory: "Paranal Cosmic Survey, Chile",
		coordinates: "24° 37' S, 70° 24' W",
		year: "Field Note // 2025",
	},
	{
		id: "quote-2",
		quote:
			"The northern lights are not silent when you are alone on a glacier. You feel the atmospheric charge before you see the green fire break across the jagged teeth of the peaks.",
		author: "Henrik Vinter",
		role: "Arctic Wilderness Scout & Glacier Guide",
		observatory: "Tromsø Auroral Station, Norway",
		coordinates: "69° 39' N, 18° 57' E",
		year: "Field Note // 2026",
	},
	{
		id: "quote-3",
		quote:
			"Ancient navigators crossed the Pacific not by calculating distance, but by memorizing the houses of the stars rising through the waves. That ancestral literacy is what we awaken on these expeditions.",
		author: "Master Navigator Keanu",
		role: "Polynesian Celestial Wayfinder",
		observatory: "Oceanic Horizon Guild",
		coordinates: "20° 42' N, 156° 55' W",
		year: "Field Note // 2024",
	},
];
