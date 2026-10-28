import type { Tour } from "@/shared/types/domain";
import { defineTours } from "@/lib/content-guards";

export const TOURS: Tour[] = defineTours([
	{
		id: 1,
		slug: "bali-cultural-immersion",
		styles: ["Cultural", "Nature"],
		title: "Bali Cultural Immersion",
		destination: "Bali, Indonesia",
		destinationSlug: "bali-indonesia",
		image: "/bali-ubud-temple.webp",
		panelImage: "/bali-ubud-temple.webp",
		price: 1299,
		originalPrice: 1599,
		duration: "7 Days / 6 Nights",
		groupSize: "Max 12",
		rating: 4.9,
		reviews: 234,
		highlights: ["Temple Tours", "Rice Terraces", "Cooking Class"],
		summary:
			"Seven days paced for temple mornings, terrace walks, and a kitchen you actually cook in — not a checklist sprint across the island.",
		routeWhy:
			"Hills first so jet lag meets quiet streets, not beach clubs. Temples and terraces while legs are fresh; the coast lands mid-trip as a release, not the opener. An open day before departure keeps the exit unhurried.",
		itinerary: [
			{
				day: 1,
				title: "Arrival & Ubud hush",
				body: "Land, transfer, and a slow first evening in the hills.",
				image: "/bali-ubud-temple.webp",
				chips: ["Transfer", "Hotel", "Welcome"],
				panel: "arrival",
				detail:
					"Private transfer inland to Ubud. Check in, stretch the travel out of your legs, and take a short neighborhood walk before a light welcome dinner — no temple circuit on day one.",
				note: "We keep the first evening short so sleep wins over sightseeing.",
				overnight: "Ubud"
			},
			{
				day: 2,
				title: "Temple circuit",
				body: "Guided visits with room for quiet courtyards.",
				image: "/bali-ubud-temple.webp",
				chips: ["Guided", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"A paced temple morning with a local guide who knows when courtyards empty. Midday pause for shade and water; afternoon free to rest or wander the roads near the hotel.",
				note: "Dress code covered — sarongs provided when needed.",
				overnight: "Ubud"
			},
			{
				day: 3,
				title: "Rice terrace morning",
				body: "Cooler hours on the edges; afternoon free.",
				image: "/bali-ubud-temple.webp",
				chips: ["Walk", "Hotel", "Breakfast"],
				panel: "journal",
				detail:
					"Early walk along terrace paths before heat and day-trippers peak. Guides keep the group small and the route flexible if paths are wet. Afternoon is unscheduled on purpose.",
				overnight: "Ubud"
			},
			{
				day: 4,
				title: "Cooking class",
				body: "Market first, then a home kitchen.",
				image: "/bali-ubud-temple.webp",
				chips: ["Market", "Class", "Breakfast"],
				panel: "split",
				detail:
					"Morning market run for produce and spice, then a home kitchen session with recipes you can remake. Lunch is what you cook — no hotel buffet encore.",
				note: "Dietary needs flagged at booking; the kitchen adapts.",
				overnight: "Ubud"
			},
			{
				day: 5,
				title: "Coast day",
				body: "South shore light without a forced itinerary.",
				image: "/bali-ubud-temple.webp",
				chips: ["Transfer", "Hotel", "Breakfast"],
				panel: "arrival",
				detail:
					"Transfer south for a change of air. Beach time, cafe hours, and a sunset window with no mandatory activity block — the mid-trip release after inland days.",
				note: "Lodging shifts to the coast for two nights.",
				overnight: "South shore"
			},
			{
				day: 6,
				title: "Open day",
				body: "Spa, bike, or village walk — your call.",
				image: "/bali-ubud-temple.webp",
				chips: ["Free", "Hotel", "Breakfast"],
				panel: "options",
				detail:
					"We hold the day open so the group can recover or dig deeper. Book one option with the host desk, or do nothing — both count as using the day well.",
				options: [
					"Spa morning at a partner studio",
					"Village bike loop with a local rider",
					"Slow café + market walk without a guide"
				],
				overnight: "South shore"
			},
			{
				day: 7,
				title: "Departure",
				body: "Transfer out with buffer time.",
				image: "/bali-ubud-temple.webp",
				chips: ["Transfer", "Breakfast"],
				panel: "logistics",
				detail:
					"Packed breakfast, luggage load, and airport transfer timed with traffic buffers. No last-minute temple stop bolted onto departure morning.",
				note: "Flight times shared the night before for pickup windows."
			}
		],
		includes: [
			"Airport transfers",
			"6 nights lodging",
			"Daily breakfast",
			"Cooking class",
			"Local guide days 2–4"
		]
	},
	{
		id: 2,
		slug: "greek-island-odyssey",
		styles: ["Cultural", "Luxury"],
		title: "Greek Island Odyssey",
		destination: "Santorini & Mykonos",
		destinationSlug: "santorini-greece",
		image: "/santorini-white-village.jpg",
		panelImage: "/santorini-white-village.jpg",
		price: 2199,
		originalPrice: 2799,
		duration: "10 Days / 9 Nights",
		groupSize: "Max 16",
		rating: 4.8,
		reviews: 189,
		highlights: ["Sunset Cruise", "Wine Tasting", "Beach Hopping"],
		summary:
			"Ten days between caldera cliffs and Aegean beaches — ferry hops with room to linger, not a port-a-day scramble.",
		routeWhy:
			"Athens is a staging night, not a city tour. Santorini gets the early days for cliff light and wine before ferry fatigue. Mykonos follows once the group has a rhythm — beaches and nights without stacking both islands into the same weekend crush.",
		itinerary: [
			{
				day: 1,
				title: "Athens arrival",
				body: "Port-side overnight and ferry briefing.",
				image: "/santorini-white-village.jpg",
				chips: ["Transfer", "Hotel", "Briefing"],
				panel: "arrival",
				detail:
					"Meet near the port, short briefing on ferry timing, and an early night. Athens is logistics today — the islands carry the trip.",
				overnight: "Athens (port)"
			},
			{
				day: 2,
				title: "Santorini landing",
				body: "Caldera rim walk at golden hour.",
				image: "/santorini-white-village.jpg",
				chips: ["Ferry", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Morning ferry, check-in, and a first rim walk timed for softer light. We avoid the noon crush at the main overlooks.",
				overnight: "Santorini"
			},
			{
				day: 3,
				title: "Wine & villages",
				body: "Local pours away from cruise crowds.",
				image: "/santorini-white-village.jpg",
				chips: ["Guided", "Hotel", "Breakfast"],
				panel: "journal",
				detail:
					"Village lanes and a tasting stop chosen for space, not Instagram density. Afternoon open for rest or a quieter cliff path.",
				overnight: "Santorini"
			},
			{
				day: 4,
				title: "Sunset cruise",
				body: "Sail the caldera; dinner ashore.",
				image: "/santorini-white-village.jpg",
				chips: ["Cruise", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Afternoon sail on the caldera with a sunset window. Dinner back ashore at your pace — no forced group club night.",
				overnight: "Santorini"
			},
			{
				day: 5,
				title: "Ferry to Mykonos",
				body: "Crossing, settle, free afternoon.",
				image: "/santorini-white-village.jpg",
				chips: ["Ferry", "Hotel", "Breakfast"],
				panel: "arrival",
				detail:
					"Morning crossing and hotel check-in. Afternoon free to map town lanes before beach days begin.",
				overnight: "Mykonos"
			},
			{
				day: 6,
				title: "Beach circuit",
				body: "Coves timed for wind and crowds.",
				image: "/santorini-white-village.jpg",
				chips: ["Beach", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Guided cove hops with someone who reads wind and boat traffic. Midday shade break built in.",
				overnight: "Mykonos"
			},
			{
				day: 7,
				title: "Open island day",
				body: "Delos, beach club, or old town.",
				image: "/santorini-white-village.jpg",
				chips: ["Free", "Hotel", "Breakfast"],
				panel: "options",
				detail:
					"Hold the day flexible. Pick one track or mix lightly — we do not stack Delos and a late beach club into the same forced schedule.",
				options: [
					"Optional Delos morning boat",
					"Beach club afternoon with shade",
					"Old-town wandering and late lunch"
				],
				overnight: "Mykonos"
			},
			{
				day: 8,
				title: "Mykonos by night",
				body: "Late dinner plan — no club crawl.",
				image: "/santorini-white-village.jpg",
				chips: ["Dinner", "Hotel", "Breakfast"],
				panel: "journal",
				detail:
					"A reserved dinner window and optional stroll. Nightlife is elective; the itinerary does not sell a forced crawl.",
				overnight: "Mykonos"
			},
			{
				day: 9,
				title: "Buffer & ferry north",
				body: "One more swim, then Athens-bound.",
				image: "/santorini-white-village.jpg",
				chips: ["Ferry", "Hotel", "Breakfast"],
				panel: "logistics",
				detail:
					"Morning swim window if seas allow, then ferry north with buffer for summer schedules. Overnight near Athens for the outbound flight.",
				overnight: "Athens (port)"
			},
			{
				day: 10,
				title: "Departure",
				body: "Airport transfer with traffic cushion.",
				image: "/santorini-white-village.jpg",
				chips: ["Transfer", "Breakfast"],
				panel: "logistics",
				detail:
					"Airport run timed for summer traffic. Bags staged the night before when possible."
			}
		],
		includes: [
			"Inter-island ferries",
			"9 nights lodging",
			"Daily breakfast",
			"Sunset cruise",
			"Local guides on Santorini days 2–4"
		]
	},
	{
		id: 3,
		slug: "patagonia-expedition",
		styles: ["Adventure", "Nature"],
		title: "Patagonia Expedition",
		destination: "Torres del Paine, Chile",
		destinationSlug: "patagonia-chile",
		image: "/patagonia-torres-del-paine.webp",
		panelImage: "/patagonia-torres-del-paine.webp",
		price: 3499,
		duration: "12 Days / 11 Nights",
		groupSize: "Max 8",
		rating: 5.0,
		reviews: 97,
		highlights: ["Glacier Trek", "Wildlife Safari", "Camping"],
		summary:
			"Twelve days under big sky — glacier approaches, wildlife watches, and nights that earn the silence between wind gusts.",
		routeWhy:
			"A staging night in Punta Arenas before the park so gear and weather briefings aren’t rushed. Harder approaches early while energy is high; a weather buffer mid-route; softer days and a lodge reset before the long exit south.",
		itinerary: [
			{
				day: 1,
				title: "Punta Arenas arrival",
				body: "Gear check and briefing before the park.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Transfer", "Lodge", "Briefing"],
				panel: "arrival",
				detail:
					"Arrive, gear check, and a weather briefing. Early night — the park starts tomorrow, not tonight.",
				overnight: "Punta Arenas"
			},
			{
				day: 2,
				title: "Into Torres del Paine",
				body: "Transfer north; first overlook and camp.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Transfer", "Camp", "Meals"],
				panel: "split",
				detail:
					"North into the park, first overlook stop, camp setup with wind in mind. Short walk if light allows.",
				overnight: "Torres camp"
			},
			{
				day: 3,
				title: "Base towers day hike",
				body: "Classic approach with weather turnaround.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Hike", "Camp", "Meals"],
				panel: "split",
				detail:
					"Full approach toward the towers with timed turnarounds. Guides call weather early — summit vanity never overrides safety.",
				note: "Hardest mileage early while legs are fresh.",
				overnight: "Torres camp"
			},
			{
				day: 4,
				title: "Lake & ridgeline",
				body: "Shorter miles, bigger views.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Hike", "Camp", "Meals"],
				panel: "journal",
				detail:
					"Shorter day along lake and ridge lines. Rest built in if wind spikes — Patagonia edits the plan constantly.",
				overnight: "Torres camp"
			},
			{
				day: 5,
				title: "Wildlife morning",
				body: "Optics and patience over chase.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Wildlife", "Camp", "Meals"],
				panel: "journal",
				detail:
					"Quiet wildlife window — guanaco and condor odds over forced sightings. Midday camp rest.",
				overnight: "Torres camp"
			},
			{
				day: 6,
				title: "Glacier approach",
				body: "Ice edge with crampon familiarization.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Glacier", "Camp", "Meals"],
				panel: "split",
				detail:
					"Guided ice-edge approach and crampon familiarization. Technical but paced — not a summit push.",
				overnight: "Torres camp"
			},
			{
				day: 7,
				title: "Weather buffer",
				body: "Flexible valley or hut day.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Flexible", "Camp", "Meals"],
				panel: "options",
				detail:
					"Held for fronts. We choose the softer path when the sky says so — this day exists so other days can stay ambitious.",
				options: [
					"Valley walk if ceilings lift",
					"Hut day and gear dry-out",
					"Short ridge if winds allow"
				],
				overnight: "Torres camp"
			},
			{
				day: 8,
				title: "Grey sector",
				body: "Lake crossing or shore trek.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Trek", "Camp", "Meals"],
				panel: "split",
				detail:
					"Grey sector day — lake crossing or shore trek depending on water and wind. Guides decide morning-of.",
				overnight: "Grey camp"
			},
			{
				day: 9,
				title: "Camp reset",
				body: "Shorter day and packing for exit.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Rest", "Camp", "Meals"],
				panel: "journal",
				detail:
					"Shorter miles, hot meal, pack for leaving the park. Bodies get a reset before the southern road.",
				overnight: "Grey camp"
			},
			{
				day: 10,
				title: "Southern roads",
				body: "Leave the park; lodge night.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Transfer", "Lodge", "Dinner"],
				panel: "arrival",
				detail:
					"Exit transfer and lodge night with real showers. The park ends; the trip softens.",
				overnight: "Southern lodge"
			},
			{
				day: 11,
				title: "Open day south",
				body: "Museum, café, or shoreline.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Free", "Lodge", "Breakfast"],
				panel: "options",
				detail:
					"Recovery day before flights. Optional culture or shoreline — or sleep.",
				options: [
					"Local museum / café hours",
					"Shoreline walk",
					"Full rest at lodge"
				],
				overnight: "Southern lodge"
			},
			{
				day: 12,
				title: "Departure",
				body: "Weather-aware airport timing.",
				image: "/patagonia-torres-del-paine.webp",
				chips: ["Transfer", "Breakfast"],
				panel: "logistics",
				detail:
					"Airport transfer with weather-aware buffers. Gear bags checked the night before when possible."
			}
		],
		includes: [
			"Park transfers",
			"11 nights lodging / camping mix",
			"Most meals on trek days",
			"Glacier guide day",
			"Shared camping gear"
		]
	},
	{
		id: 4,
		slug: "japan-heritage-trail",
		styles: ["Cultural", "Nature"],
		title: "Japan Heritage Trail",
		destination: "Tokyo to Kyoto",
		destinationSlug: "kyoto-japan",
		image: "/kyoto-historic-street.webp",
		panelImage: "/kyoto-historic-street.webp",
		price: 2899,
		originalPrice: 3299,
		duration: "9 Days / 8 Nights",
		groupSize: "Max 14",
		rating: 4.9,
		reviews: 312,
		highlights: ["Tea Ceremony", "Mt. Fuji", "Bamboo Forest"],
		summary:
			"Nine days from Tokyo pulse to Kyoto temples — shinkansen between, tea and bamboo with time to breathe, not a shrine stampede.",
		routeWhy:
			"Tokyo first for arrival logistics and city layers. Fuji as a mid-Tokyo day trip while still based east. Shinkansen west once the group is oriented; Kyoto temples and tea with early starts, then an open day so departure isn’t stacked on a shrine morning.",
		itinerary: [
			{
				day: 1,
				title: "Tokyo arrival",
				body: "Neighborhood walk and light dinner.",
				image: "/kyoto-historic-street.webp",
				chips: ["Transfer", "Hotel", "Dinner"],
				panel: "arrival",
				detail:
					"Settle in, short neighborhood orientation, light group dinner. No shrine marathon on arrival night.",
				overnight: "Tokyo"
			},
			{
				day: 2,
				title: "City layers",
				body: "Old and new districts; evening free.",
				image: "/kyoto-historic-street.webp",
				chips: ["Guided", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Guided mix of older streets and newer districts. Evening free so the city can be yours without a forced izakaya crawl.",
				overnight: "Tokyo"
			},
			{
				day: 3,
				title: "Fuji day",
				body: "Weather decides the viewpoint.",
				image: "/kyoto-historic-street.webp",
				chips: ["Day trip", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Day trip toward Fuji. Viewpoint is weather-led — clear summit views are a gift, not a guarantee we fake with filters.",
				note: "Backup lower viewpoints ready if cloud sits on the peak.",
				overnight: "Tokyo"
			},
			{
				day: 4,
				title: "Shinkansen west",
				body: "Bullet train to Kyoto; slow stroll.",
				image: "/kyoto-historic-street.webp",
				chips: ["Rail", "Hotel", "Breakfast"],
				panel: "arrival",
				detail:
					"Shinkansen west, hotel check-in, and a slow first Kyoto stroll. Transit day stays human-paced.",
				overnight: "Kyoto"
			},
			{
				day: 5,
				title: "Temple morning",
				body: "Early starts before day-trippers peak.",
				image: "/kyoto-historic-street.webp",
				chips: ["Guided", "Hotel", "Breakfast"],
				panel: "journal",
				detail:
					"Early temple precincts before day-tripper peaks. Guides choose quieter approaches when main gates clog.",
				overnight: "Kyoto"
			},
			{
				day: 6,
				title: "Tea ceremony",
				body: "Hosted session with context.",
				image: "/kyoto-historic-street.webp",
				chips: ["Tea", "Hotel", "Breakfast"],
				panel: "journal",
				detail:
					"Hosted tea with explanation — not a photo-op-only stop. Afternoon open afterward.",
				overnight: "Kyoto"
			},
			{
				day: 7,
				title: "Arashiyama light",
				body: "Bamboo early; afternoon open.",
				image: "/kyoto-historic-street.webp",
				chips: ["Walk", "Hotel", "Breakfast"],
				panel: "split",
				detail:
					"Bamboo path early, before the corridor densifies. Afternoon free for markets or rest.",
				overnight: "Kyoto"
			},
			{
				day: 8,
				title: "Open Kyoto day",
				body: "Day trip or neighborhood deep dive.",
				image: "/kyoto-historic-street.webp",
				chips: ["Free", "Hotel", "Breakfast"],
				panel: "options",
				detail:
					"Last full day without stacking departure logistics. Choose depth over another stampede.",
				options: [
					"Optional day trip outside the basin",
					"Neighborhood deep dive with a map brief",
					"Full rest before travel day"
				],
				overnight: "Kyoto"
			},
			{
				day: 9,
				title: "Departure",
				body: "Kansai or return rail with buffer.",
				image: "/kyoto-historic-street.webp",
				chips: ["Transfer", "Breakfast"],
				panel: "logistics",
				detail:
					"Transfer to Kansai or return rail with luggage buffer. No dawn shrine bolted onto outbound morning."
			}
		],
		includes: [
			"Tokyo–Kyoto shinkansen",
			"8 nights lodging",
			"Daily breakfast",
			"Tea ceremony",
			"Local guide days in Tokyo and Kyoto"
		]
	}
]);
