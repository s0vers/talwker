export interface TelemetryMetric {
	id: string;
	label: string;
	value: string;
	unit: string;
	status: "nominal" | "active" | "optimal";
}

export const TELEMETRY_METRICS: TelemetryMetric[] = [
	{
		id: "bortle",
		label: "DARK SKY INDEX",
		value: "CLASS 1",
		unit: "21.98 MAG/ARCSEC²",
		status: "optimal",
	},
	{
		id: "solar-zenith",
		label: "SOLAR ZENITH",
		value: "-24.1°",
		unit: "ASTRONOMICAL VOID",
		status: "optimal",
	},
	{
		id: "aurora",
		label: "AURORAL OVAL",
		value: "KP 5.4",
		unit: "ACTIVE SUB-STORM",
		status: "active",
	},
	{
		id: "lunar",
		label: "LUNAR DISK",
		value: "0.2%",
		unit: "NEW MOON ALIGNMENT",
		status: "optimal",
	},
	{
		id: "seeing",
		label: "ATMOSPHERIC SEEING",
		value: "0.62″",
		unit: "SUB-ARCSEC RESOLUTION",
		status: "nominal",
	},
	{
		id: "airglow",
		label: "AIRGLOW EMISSION",
		value: "557.7 NM",
		unit: "OXYGEN GREEN EMISSION",
		status: "active",
	},
];

export const OBSERVATORY_COPY = {
	hero: {
		protocolBadge: "OBSERVATORY PROTOCOL // ISSUE Nº 05 // DARK-SKY SANCTUARIES",
		coordinates: "LAT 23° 51' S — LONG 67° 42' W",
		elevationBadge: "ALTITUDE 5,050M",
		headlineLine1: "VOYAGES THROUGH THE",
		headlineLine2: "UNLIGHTED EARTH",
		lead: "Where civilization recedes into absolute shadow, the cosmos reclaims the horizon. Journey to Earth's pristine nocturnal sanctuaries with observational astrophysicists and celestial wayfinders.",
		ctaExplore: "EXPLORE SANCTUARIES",
		ctaChronometer: "TWILIGHT SPECTRUM",
	},
	waypoints: {
		badge: "FIELD STATIONS // 01",
		title: "Sanctuaries of the Dark Sky",
		subtitle:
			"Four planetary frontiers certified for zero light contamination, extreme atmospheric dryness, and unparalleled interstellar transparency.",
	},
	chronometer: {
		badge: "LIGHT SPECTRUM // 02",
		title: "The Twilight Chronometer",
		subtitle:
			"Experience the gradual surrender of sunlight through four distinct optical phases, from the warm amber descent of golden hour to the infinite void of astronomical midnight.",
	},
	cartography: {
		badge: "TERRAIN & ORBIT // 03",
		title: "Nocturnal Route Cartography",
		subtitle:
			"High-altitude trails engineered for starlight traverses, featuring designated astro-bivouac checkpoints and elevation profiles.",
	},
	ledger: {
		badge: "EXPEDITION CALENDAR // 04",
		title: "The Nocturnal Ledger",
		subtitle:
			"Limited-berth field expeditions timed to celestial phenomena: meteor shower peaks, equinox solar winds, and new moon galactic alignments.",
	},
	voices: {
		badge: "ASTRAL DISPATCHES // 05",
		title: "Voices from the Night Horizon",
		subtitle:
			"Philosophical reflections and field records from the astronomers, indigenous wayfinders, and scouts who guide our nocturnal expeditions.",
	},
	invitation: {
		badge: "DEPARTURE PORTAL // 06",
		title: "Step Into The Cosmic Shadow",
		lead: "Our expedition architects curate bespoke private itineraries to the world's most remote nocturnal observatories and wilderness dark-sky reserves.",
		ctaConsult: "REQUEST BESPOKE EXPEDITION",
		ctaConcierge: "CONCIERGE FIELD DISPATCH",
	},
};
