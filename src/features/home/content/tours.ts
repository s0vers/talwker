import type { Tour } from "@/shared/types/domain";
import { defineTours } from "@/lib/content-guards";

export const TOURS: Tour[] = defineTours([
	{
		id: 1,
		slug: "bali-cultural-immersion",
		title: "Bali Cultural Immersion",
		destination: "Bali, Indonesia",
		destinationSlug: "bali-indonesia",
		image: "/image.jpg",
		price: 1299,
		originalPrice: 1599,
		duration: "7 Days / 6 Nights",
		groupSize: "Max 12",
		rating: 4.9,
		reviews: 234,
		highlights: ["Temple Tours", "Rice Terraces", "Cooking Class"],
		summary:
			"Seven days paced for temple mornings, terrace walks, and a kitchen you actually cook in — not a checklist sprint across the island.",
		itinerary: [
			{
				day: 1,
				title: "Arrival & Ubud hush",
				body: "Land, transfer, and a slow first evening in the hills.",
			},
			{
				day: 2,
				title: "Temple circuit",
				body: "Guided visits with room for quiet courtyards between the crowds.",
			},
			{
				day: 3,
				title: "Rice terrace morning",
				body: "Walk the edges at cooler hours; afternoon free.",
			},
			{
				day: 4,
				title: "Cooking class",
				body: "Market first, then a home kitchen — recipes you can remake.",
			},
			{
				day: 5,
				title: "Coast day",
				body: "South shore light and a sunset without a forced itinerary.",
			},
			{
				day: 6,
				title: "Open day",
				body: "Optional spa, bike, or village walk — your call.",
			},
			{
				day: 7,
				title: "Departure",
				body: "Transfer out with a packed breakfast and buffer time.",
			},
		],
		includes: [
			"Airport transfers",
			"6 nights lodging",
			"Daily breakfast",
			"Cooking class",
			"Local guide days 2–4",
		],
	},
	{
		id: 2,
		slug: "greek-island-odyssey",
		title: "Greek Island Odyssey",
		destination: "Santorini & Mykonos",
		destinationSlug: "santorini-greece",
		image: "/image.jpg",
		price: 2199,
		originalPrice: 2799,
		duration: "10 Days / 9 Nights",
		groupSize: "Max 16",
		rating: 4.8,
		reviews: 189,
		highlights: ["Sunset Cruise", "Wine Tasting", "Beach Hopping"],
		summary:
			"Ten days between caldera cliffs and Aegean beaches — ferry hops with room to linger, not a port-a-day scramble.",
		itinerary: [
			{
				day: 1,
				title: "Athens arrival",
				body: "Meet the group, overnight near the port, early ferry briefing.",
			},
			{
				day: 2,
				title: "Santorini landing",
				body: "Check in and a first walk along the caldera rim at golden hour.",
			},
			{
				day: 3,
				title: "Wine & villages",
				body: "Local pours and quieter alleys away from the cruise crowds.",
			},
			{
				day: 4,
				title: "Sunset cruise",
				body: "Sail the caldera; dinner back ashore at your own pace.",
			},
			{
				day: 5,
				title: "Ferry to Mykonos",
				body: "Morning crossing, settle into town, free afternoon.",
			},
			{
				day: 6,
				title: "Beach circuit",
				body: "Hop the better coves with a guide who knows the wind.",
			},
			{
				day: 7,
				title: "Open island day",
				body: "Optional Delos, beach club, or old town wandering.",
			},
			{
				day: 8,
				title: "Mykonos by night",
				body: "Late dinner plan; no forced club crawl.",
			},
			{
				day: 9,
				title: "Buffer & ferry north",
				body: "One more swim window, then return toward Athens.",
			},
			{
				day: 10,
				title: "Departure",
				body: "Airport transfer with cushion for summer traffic.",
			},
		],
		includes: [
			"Inter-island ferries",
			"9 nights lodging",
			"Daily breakfast",
			"Sunset cruise",
			"Local guides on Santorini days 2–4",
		],
	},
	{
		id: 3,
		slug: "patagonia-expedition",
		title: "Patagonia Expedition",
		destination: "Torres del Paine, Chile",
		destinationSlug: "patagonia-chile",
		image: "/image.jpg",
		price: 3499,
		duration: "12 Days / 11 Nights",
		groupSize: "Max 8",
		rating: 5.0,
		reviews: 97,
		highlights: ["Glacier Trek", "Wildlife Safari", "Camping"],
		summary:
			"Twelve days under big sky — glacier approaches, wildlife watches, and nights that earn the silence between wind gusts.",
		itinerary: [
			{
				day: 1,
				title: "Punta Arenas arrival",
				body: "Gear check, briefing, and a quiet first night before the park.",
			},
			{
				day: 2,
				title: "Into Torres del Paine",
				body: "Transfer north; first overlook and camp setup.",
			},
			{
				day: 3,
				title: "Base towers day hike",
				body: "Classic approach with turnaround timed for weather.",
			},
			{
				day: 4,
				title: "Lake & ridgeline",
				body: "Shorter mileage, bigger views; rest if the wind spikes.",
			},
			{
				day: 5,
				title: "Wildlife morning",
				body: "Guanaco, condor windows — optics and patience over chase.",
			},
			{
				day: 6,
				title: "Glacier approach",
				body: "Guided ice edge walk with crampon familiarization.",
			},
			{
				day: 7,
				title: "Weather buffer",
				body: "Flexible route: valley walk or hut day if fronts roll in.",
			},
			{
				day: 8,
				title: "Grey sector",
				body: "Lake crossing or shore trek depending on conditions.",
			},
			{
				day: 9,
				title: "Camp reset",
				body: "Shorter day, hot meal, and packing for the exit.",
			},
			{
				day: 10,
				title: "Southern roads",
				body: "Leave the park; lodge night with showers that feel earned.",
			},
			{
				day: 11,
				title: "Open day south",
				body: "Optional museum, cafe hours, or a last shoreline walk.",
			},
			{
				day: 12,
				title: "Departure",
				body: "Airport transfer with weather-aware timing.",
			},
		],
		includes: [
			"Park transfers",
			"11 nights lodging / camping mix",
			"Most meals on trek days",
			"Glacier guide day",
			"Shared camping gear",
		],
	},
	{
		id: 4,
		slug: "japan-heritage-trail",
		title: "Japan Heritage Trail",
		destination: "Tokyo to Kyoto",
		destinationSlug: "kyoto-japan",
		image: "/image.jpg",
		price: 2899,
		originalPrice: 3299,
		duration: "9 Days / 8 Nights",
		groupSize: "Max 14",
		rating: 4.9,
		reviews: 312,
		highlights: ["Tea Ceremony", "Mt. Fuji", "Bamboo Forest"],
		summary:
			"Nine days from Tokyo pulse to Kyoto temples — shinkansen between, tea and bamboo with time to breathe, not a shrine stampede.",
		itinerary: [
			{
				day: 1,
				title: "Tokyo arrival",
				body: "Settle in, neighborhood walk, and a light group dinner.",
			},
			{
				day: 2,
				title: "City layers",
				body: "Guided mix of old and new districts; evening free.",
			},
			{
				day: 3,
				title: "Fuji day",
				body: "Day trip toward the mountain — weather decides the viewpoint.",
			},
			{
				day: 4,
				title: "Shinkansen west",
				body: "Bullet train to Kyoto; check in and a slow first stroll.",
			},
			{
				day: 5,
				title: "Temple morning",
				body: "Early starts at quieter precincts before day-trippers peak.",
			},
			{
				day: 6,
				title: "Tea ceremony",
				body: "Hosted session with context, not a photo-op only stop.",
			},
			{
				day: 7,
				title: "Arashiyama light",
				body: "Bamboo path early; afternoon open for markets or rest.",
			},
			{
				day: 8,
				title: "Open Kyoto day",
				body: "Optional day trip or neighborhood deep dive — your call.",
			},
			{
				day: 9,
				title: "Departure",
				body: "Transfer to Kansai or return rail with buffer for bags.",
			},
		],
		includes: [
			"Tokyo–Kyoto shinkansen",
			"8 nights lodging",
			"Daily breakfast",
			"Tea ceremony",
			"Local guide days in Tokyo and Kyoto",
		],
	},
]);
