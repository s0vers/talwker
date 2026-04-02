import type { DestinationDetails3Seed } from "@/features/destination-details-3/lib/details-3-types";

export const FALLBACK_DETAILS_3_SEED: DestinationDetails3Seed = {
	hero: {
		kicker: "Field notes",
		title: "A place read through its habits, not its brochure.",
		dek: "Below: who keeps the rhythm, what gets repeated without an audience, and a few coordinates that carry more meaning than a highlight reel.",
	},
	people: {
		kicker: "People",
		title: "The street belongs to returners, not arrivals.",
		body: "Teachers, fishers, shopkeepers, and elders share corners year after year. Their disputes, favors, and silences are the real continuity — not a script written for strangers.",
		pullQuote: "What you overhear in line is the place arguing with itself before lunch.",
	},
	culture: [
		{
			title: "Calendar over catalog",
			body: "Feast days, market banter, and doors left open after dusk are membership — not decoration. Culture is what people rehearse when no one is selling tickets.",
		},
		{
			title: "Hand-to-hand knowledge",
			body: "Recipes, songs, and jokes migrate through families and apprenticeships. Identity shows up in repetition, correction, and the embarrassment of cutting corners in front of your teacher.",
		},
		{
			title: "Public life as argument",
			body: "Squares, docks, and temple steps are where consensus is tested. Politeness here is often strategic patience, not performance for visitors.",
		},
	],
	places: [
		{
			name: "The old quarter",
			narrative:
				"Narrow lanes where facades are honest about wear. Morning deliveries set the tempo; evening light turns the same walls into a different city.",
		},
		{
			name: "The working waterfront",
			narrative:
				"Rope, fuel, gossip, and weather forecasts share the same bench. The harbor is a ledger of who showed up, who owes a favor, and which forecast no one trusted.",
		},
		{
			name: "The high ground",
			narrative:
				"Where the view is wide enough to argue about the whole town. Locals use it for perspective — not only for photographs.",
		},
	],
	close: {
		kicker: "Close",
		title: "You leave with fewer highlights and more understanding.",
		body: "People first, then landscape, then the quiet details that outlast any itinerary — the ones no one sells because they belong to everyday life.",
	},
	fieldNotes: [
		{ label: "Languages", value: "Ask which language is used for jokes, not only menus." },
		{ label: "Seasons", value: "Light and crowds shift the same street twice a year — visit twice in your mind before you go once in person." },
	],
};

export const DESTINATION_DETAILS_3_SEEDS: Record<string, DestinationDetails3Seed> = {
	bali: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Bali",
			title: "Ritual time, courtyard space, and surf at the edge of ordinary days.",
			dek: "The island gives spectacle quickly; its deeper grammar is offerings, banjar work, and the patience of neighborhoods that measure years in shared duties.",
		},
		people: {
			kicker: "Daily holders",
			title: "Life still gathers around the banjar, the field, and the family compound.",
			body: "Farmers, teachers, priests, and vendors share a calendar of community labor and temple rhythm. Children grow beside cremation towers and terraces — not as scenery, but as the architecture of obligation and care.",
			pullQuote: "A neighborhood here is a ledger of who carried the gamelan and who swept the pavilion.",
		},
		culture: [
			{
				title: "Ceremony as shared clock",
				body: "Temple processions and canang sari belong to a Hindu-Balinese calendar that does not pause for outsiders. Dance and shadow puppetry are how generations thank, argue with, and reconcile the unseen.",
			},
			{
				title: "Sound as public memory",
				body: "Gamelan rehearsals leak through walls; a rehearsal is also a social contract about who listens, who corrects, and who arrives late with a plausible excuse.",
			},
			{
				title: "Offerings as punctuation",
				body: "Small trays on thresholds mark time more honestly than any app notification — gratitude, apology, and reminder in palm leaves and petals.",
			},
		],
		places: [
			{
				name: "Ubud ridgelines",
				narrative: "Rice terraces as slow argument with gravity — footpaths used by farmers before dawn, then by everyone else after coffee.",
			},
			{
				name: "Denpasar markets",
				narrative: "Where price is half the conversation and reputation is the other half — the same aunties who remember your mother’s favorite stall.",
			},
			{
				name: "Southern fishing villages",
				narrative: "Boats leave on a vocabulary of tide and rumor; the sea is a workplace before it is a backdrop.",
			},
		],
		close: {
			kicker: "Close",
			title: "Bali stays in the habits you notice after the postcards fade.",
			body: "Return with respect for calendars you cannot buy tickets to — and for the people who keep them without an audience.",
		},
	},
	santorini: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Santorini",
			title: "White walls, volcanic memory, and ferries that set the island’s real clock.",
			dek: "The caldera reads cinematic from above; daily life is mooring space, family kitchens, and cliff routines that do not need your admiration to continue.",
		},
		people: {
			kicker: "Island holders",
			title: "Captains, growers, and kitchen tables hold the cliff together.",
			body: "Winemakers and hotel workers trade news in the same cafés where elders remember the earthquake. Disputes are about water, boats, and cousins’ weddings — small politics that keep a vertical village coherent.",
			pullQuote: "When the last ferry rumor passes the port, the caldera already knows.",
		},
		culture: [
			{
				title: "Maritime Greek stubbornness",
				body: "Easter fires, panigiria, and dry-stone patience carry Cycladic memory without turning it into costume.",
			},
			{
				title: "Seasons of wind and work",
				body: "The polite season and the honest season are not always the same; locals read both in the same forecast.",
			},
		],
		places: [
			{ name: "Oia after the buses", narrative: "The hour when cruise schedules thin and residents reclaim the same steps tourists photographed at noon." },
			{ name: "Pyrgos lanes", narrative: "A maze of walls where cats, grandmothers, and delivery scooters negotiate right-of-way by tradition, not signage." },
			{ name: "The inner vineyards", narrative: "Assyrtiko rooted in pumice — agriculture that looks delicate and behaves stubborn." },
		],
	},
	patagonia: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Patagonia",
			title: "Wind, distance, and a scale that edits how people speak.",
			dek: "Life is organized around exposure, gates that must be closed, and stories long enough to match the horizon.",
		},
		people: {
			kicker: "Who stays",
			title: "Gauchos, guides, and families who know every gate by heart.",
			body: "Shepherds and mechanics share a vocabulary of river crossings and which pump still works. Trust is built on pickup benches and truthful weather, not introductions.",
			pullQuote: "Reputation is whether you closed the gate and fed the dog.",
		},
		culture: [
			{ title: "Mate as punctuation", body: "A circle that slows time enough for a whole anecdote — argument, pause, and restart included." },
			{ title: "Stories that outlive maps", body: "Songs and wool co-ops survived crises by patience, not slogans." },
		],
		places: [
			{ name: "Estancia roads", narrative: "Gravel that teaches you how far “nearby” really is." },
			{ name: "Trailheads at false dawn", narrative: "Where guides and weather apps negotiate quietly while clients lace their boots." },
			{ name: "Village bars", narrative: "Warm rooms where the same joke about Buenos Aires never gets old because the wind outside keeps renewing it." },
		],
	},
	kyoto: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Kyoto",
			title: "Craft in plain sight — discipline worn as daily clothing.",
			dek: "Refinement here is practical: inherited techniques, neighborhood continuity, and embarrassment about cutting corners in front of your teacher.",
		},
		people: {
			kicker: "Makers and keepers",
			title: "Tea teachers, dyers, and caretakers who answer to apprenticeship lines.",
			body: "Shopkeepers still navigate favors from last year’s festival. Days are measured in seasons of sweets, incense, and which name to use on the second visit.",
			pullQuote: "Respect is knowing the second name, not performing the first.",
		},
		culture: [
			{ title: "Festival as rehearsal", body: "Gion drums and obon lanterns belong to a calendar that treats craft as moral practice." },
			{ title: "Seasonal sweets as clock", body: "Wagashi names mark weeks more precisely than any headline." },
		],
		places: [
			{ name: "Nishiki’s narrow canopy", narrative: "A corridor of knives, pickles, and gossip — a classroom in commerce." },
			{ name: "Temple moss at closing", narrative: "When gravel rakes are honest about the day’s traffic." },
			{ name: "Craft alleys east of the river", narrative: "Where apprentices sweep longer than tourists wait." },
		],
	},
	amalfi: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Amalfi Coast",
			title: "Vertical geography, sea-salt Catholicism, and stairs that remember generations.",
			dek: "Scooters, saints’ days, and lemon groves share the same cliff — beauty is ordinary labor here.",
		},
		people: {
			kicker: "Coast families",
			title: "Fishers, growers, and grandmothers defending recipes on the stairs.",
			body: "Feuds about parking and cousins’ weddings are how a vertical town stays coherent. Gossip travels faster than hydrofoils — with more footnotes.",
			pullQuote: "On this coast, detail is a form of citizenship.",
		},
		culture: [
			{ title: "Processions in narrow lanes", body: "Faith measured in steps, sweat, and who carries the banner this year." },
			{ title: "Citrus as argument", body: "Limoncello in chipped glasses — sweetness with a Campanian edge." },
		],
		places: [
			{ name: "Amalfi’s duomo steps", narrative: "Where cruise-ship hours and parish hours negotiate without a schedule posted." },
			{ name: "Positano’s vertical lanes", narrative: "Stairs as main streets; calves as local credential." },
			{ name: "Ravello’s gardens", narrative: "Views sold to visitors, maintained by gardeners who know the soil by name." },
		],
	},
	maldives: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Maldives",
			title: "Atolls, Friday rhythm, and boats that read the reef before the brochure.",
			dek: "Islamic and oceanic life share docks, weddings, and the quiet pride of keeping a coral house standing through monsoon logic.",
		},
		people: {
			kicker: "Island crews",
			title: "Captains, teachers, and families who arbitrate tides before politics.",
			body: "Children learn currents before capitals; elders settle boat disputes the way other towns argue over parking. Generosity is spare fuel and remembered grandmothers’ names.",
			pullQuote: "Coordinates shared are a form of respect, not small talk.",
		},
		culture: [
			{ title: "Bodu beru and borrowed drums", body: "Weddings that pull rhythm from neighboring islands — membership through sound." },
			{ title: "Friday as hinge", body: "The week turns on prayer and the social gravity that follows it." },
		],
		places: [
			{ name: "Male’s tight grid", narrative: "A capital compressed into walking distance — intensity without skyscrapers." },
			{ name: "Island jetties", narrative: "Where fuel, gossip, and tuna share the same planks." },
			{ name: "House reefs at slack tide", narrative: "When the water tells the truth about depth and respect." },
		],
	},
	iceland: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Iceland",
			title: "Weather as editor, fairness as folklore, and midnight light that refuses drama.",
			dek: "Sheep, geothermal work, and rescue volunteers share one national obsession: a trustworthy forecast and closing the gate behind you.",
		},
		people: {
			kicker: "Who endures",
			title: "Farmers, engineers, and musicians who never trust a calm day.",
			body: "Community shows up in jackets with reflective stripes — competence as kindness, silence as agreement.",
			pullQuote: "Fair play is national infrastructure.",
		},
		culture: [
			{ title: "Pools as parliament", body: "Hot water as public space — agendas dissolve at 38°C." },
			{ title: "Sagas as weather", body: "Old stories return whenever the wind argues back." },
		],
		places: [
			{ name: "Reykjavík side streets", narrative: "Where design shops and fish-and-bread lines share the same wind." },
			{ name: "South coast black beaches", narrative: "Beauty that demands distance and respect — not a prop." },
			{ name: "Highland tracks", narrative: "Roads that humble GPS and reward patience." },
		],
	},
	morocco: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Morocco",
			title: "Medina logic, mint tea diplomacy, and craft that argues with your patience.",
			dek: "Hospitality is serious theater — generosity with rules, tea with time, and souks that teach you to listen before you name a price in your head.",
		},
		people: {
			kicker: "Neighborhood brokers",
			title: "Shopkeepers, guides, and grandmothers who remember your second visit.",
			body: "Reputation travels through courtyards. A favor today is a thread in tomorrow’s negotiation — not cynicism, continuity.",
			pullQuote: "Tea poured twice is still an agenda.",
		},
		culture: [
			{ title: "Call to prayer as hinge", body: "The day folds around sound — commerce inhales and exhales with it." },
			{ title: "Craft as apprenticeship", body: "Zellige and leather work punish hurry; mastery is visible in corners tourists do not photograph." },
		],
		places: [
			{ name: "Fez medina roofs", narrative: "Chaos from above reads as pattern — tanneries as geography." },
			{ name: "Marrakech dusk squares", narrative: "Storytellers, orange juice, and the politeness of crowd distance." },
			{ name: "Atlas foothill towns", narrative: "Berber markets where altitude changes what counts as “nearby.”" },
		],
	},
	peru: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Peru",
			title: "Altitude as editor, coast as counter-melody, and kitchens that remember empires.",
			dek: "From Pacific fog to Andean sun, the country argues with itself productively — languages, potatoes, and festivals stacked in layers.",
		},
		people: {
			kicker: "High and coastal",
			title: "Market women, guides, and cooks who translate between elevations.",
			body: "Quechua and Spanish share stalls and jokes; respect is measured in how you handle coca tea, not how loudly you praise the view.",
			pullQuote: "Altitude sickness and generosity can arrive the same afternoon.",
		},
		culture: [
			{ title: "Festival as labor", body: "Virgen processions carry months of sewing and debt — sacred and social at once." },
			{ title: "Ceviche as geography", body: "Lime and chili as coastal argument; potatoes as highland answer." },
		],
		places: [
			{ name: "Cusco stone seams", narrative: "Inca walls that embarrass modern rulers with their fit." },
			{ name: "Lima’s comedores", narrative: "Where office workers and students share the same lunch democracy." },
			{ name: "Sacred Valley villages", narrative: "Agriculture that still reads stars and gossip with equal seriousness." },
		],
	},
	norway: {
		...FALLBACK_DETAILS_3_SEED,
		hero: {
			kicker: "Norway",
			title: "Fjords, cabin law, and equality worn like wool.",
			dek: "Nature is not decoration — it is the room where Norwegians learn proportion, modesty, and how to leave things better than found.",
		},
		people: {
			kicker: "Coastal and inland",
			title: "Fishers, engineers, and hikers who share a national love of correct layers.",
			body: "Dugnad and cabin keys teach the same lesson: community is maintenance, not applause.",
			pullQuote: "Silence is often agreement; layers are often love.",
		},
		culture: [
			{ title: "Allemannsrett", body: "Freedom to roam with responsibility — ethics written into landscape law." },
			{ title: "National day as school parade", body: "Children with flags — earnestness without militarism." },
		],
		places: [
			{ name: "Bergen wharf", narrative: "Rain as character trait; dried fish as punctuation." },
			{ name: "Lofoten fishing racks", narrative: "Cod as calendar; racks as vertical handwriting against sky." },
			{ name: "Oslo fjord ferries", narrative: "Commute as minor expedition — binoculars optional, punctuality not." },
		],
	},
};
