import type { DestinationNarrativeSeed, NarrativeImage } from "@/features/destination-details/lib/story-types";

const UNSPLASH_EDITORIAL_SET: Record<string, NarrativeImage> = {
	portraitA: {
		src: "/unsplash-local-portrait-a.jpg",
		alt: "Local resident portrait in soft natural light",
		role: "documentary",
		orientation: "portrait",
	},
	portraitB: {
		src: "/unsplash-local-portrait-b.jpg",
		alt: "Craftsperson focused on daily work",
		role: "documentary",
		orientation: "portrait",
	},
	market: {
		src: "/unsplash-market-culture.jpg",
		alt: "Busy local market scene with daily exchanges",
		role: "context",
		orientation: "landscape",
	},
	texture: {
		src: "/unsplash-texture-underwater-cave.jpg",
		alt: "Scuba diver swimming through an underwater cave in blue light",
		role: "texture",
		orientation: "square",
	},
	culture: {
		src: "/unsplash-culture-ritual.jpg",
		alt: "Cultural gathering moment during golden hour",
		role: "context",
		orientation: "landscape",
	},
};

export const FALLBACK_STORY_SEED: DestinationNarrativeSeed = {
	variant: "coastal",
	atmosphere: {
		kicker: "Arrival",
		title: "A place that reveals itself in layers.",
		body: "The first impression is visual, but the real entry is slower: light, pace, and voices set the rhythm before landmarks do.",
	},
	livingGeography: {
		kicker: "Land and daily rhythm",
		title: "Terrain writes the timetable of every day.",
		body: "Routes, meals, and routines are shaped by distance, weather, and elevation. The geography is not a backdrop here; it is the main editor.",
	},
	peoplePortrait: {
		kicker: "People",
		title: "The street belongs to the people who return to it every day.",
		body: "Teachers, fishers, shopkeepers, and grandparents share the same corners year after year. Their work shifts, family rows, and small kindnesses are the real continuity—not a script for strangers, but the weave of who actually lives here.",
		pullQuote:
			"What you overhear in line is the place arguing with itself, making peace, and starting over before lunch.",
	},
	culturePulse: {
		kicker: "Culture",
		title: "Culture is what people rehearse without an audience.",
		body: "Recipes, songs, jokes, and prayers migrate hand to hand. Feast days, market banter, and the way a door stays open after dark—these are membership, not decoration. Identity shows up in what gets repeated when no one is selling tickets.",
	},
	sensoryImmersion: {
		kicker: "Sensory passage",
		title: "Texture, sound, and light complete the memory.",
		body: "Stone underfoot, voices in narrow streets, and changing shadows at dusk build the part of the journey that photos alone cannot hold.",
	},
	reflectiveClose: {
		kicker: "Close",
		title: "The place stays with you after the map ends.",
		body: "You leave with fewer highlights and more understanding: people first, then landscape, then the quiet details that remain long after travel ends.",
	},
	images: {
		documentary: [UNSPLASH_EDITORIAL_SET.portraitA, UNSPLASH_EDITORIAL_SET.portraitB],
		texture: [UNSPLASH_EDITORIAL_SET.texture],
	},
};

export const DESTINATION_STORY_COPY: Record<string, DestinationNarrativeSeed> = {
	bali: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
		atmosphere: {
			kicker: "Bali",
			title: "Morning incense, surf light, and courtyard silence.",
			body: "Bali opens gently. The island gives spectacle quickly, but its deeper character appears in everyday ritual and neighborhood rhythm.",
		},
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Life still gathers around the banjar, the field, and the family compound.",
			body: "Farmers, teachers, priests, and vendors share a calendar of offerings and community work. Children grow up beside cremation towers and rice terraces—not as scenery, but as the ordinary architecture of obligation and care.",
			pullQuote:
				"A neighborhood here is a ledger of who carried the gamelan, who swept the pavilion, and who brought rice when someone was sick.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Ceremony is the rhythm the island agrees to keep.",
			body: "Temple processions, gamelan rehearsals, and the slow choreography of canang sari belong to a Hindu-Balinese calendar that does not pause for outsiders. Dance, shadow puppetry, and woven offerings are how generations argue, thank, and reconcile with the unseen.",
		},
	},
	santorini: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
		atmosphere: {
			kicker: "Santorini",
			title: "White walls against volcanic memory.",
			body: "The horizon feels cinematic, yet the island's pulse is local: ferry schedules, family kitchens, and cliffside routines.",
		},
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "The island is held together by captains, growers, and kitchen tables.",
			body: "Winemakers, hotel workers, and elders who remember the earthquake still trade news in the same cafés. Their disputes are about water, mooring space, and whose cousin is getting married—small politics that keep a cliff village coherent.",
			pullQuote:
				"When the last ferry rumor passes through the port, the whole caldera already knows before the schedule updates.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Feast days, fishing gear, and island Greek stubbornness.",
			body: "Easter fires, panigiria, and the stubborn patience of dry-stone walls carry Cycladic memory. Assyrtiko in the glass, octopus on the grill, and the same family names on shop awnings—the culture here is maritime Greek life tuned to wind and tourist season without becoming a costume.",
		},
	},
	patagonia: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		atmosphere: {
			kicker: "Patagonia",
			title: "Wind, distance, and a scale that humbles language.",
			body: "Patagonia is read through weather and movement. Life is organized around exposure, resilience, and shared practical knowledge.",
		},
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Gauchos, guides, and town families who know every gate by heart.",
			body: "Shepherds, park rangers, and mechanics share a vocabulary of cold snaps, river crossings, and which fuel pump still works. Trust is built in shared silence on a pickup bench, not in polished introductions.",
			pullQuote:
				"Out here, reputation is whether you closed the gate, fed the dog, and told the truth about the weather.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Mate circles, lamb on the fire, and stories that outlive maps.",
			body: "Patagonian identity is pastoral and stubborn: folk songs that mock Buenos Aires, wool co-ops that survived every crisis, and the shared ritual of slowing down long enough to hear a whole anecdote. Culture is the patience to stay when the wind argues back.",
		},
	},
	kyoto: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		atmosphere: {
			kicker: "Kyoto",
			title: "Quiet streets where craft survives in plain sight.",
			body: "Kyoto feels refined, but its beauty is practical: inherited techniques, disciplined routines, and neighborhood continuity.",
		},
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Makers, monks, and shopkeepers who inherited more than a storefront.",
			body: "Tea teachers, textile dyers, and temple caretakers still answer to apprenticeship lines and neighborhood gossip. Their days are measured in seasons of sweets, incense, and who owes whom a favor from last year's festival.",
			pullQuote:
				"Respect here is knowing which name to use on the second visit, not the first.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Seasonal kaiseki, temple markets, and the discipline of repetition.",
			body: "Gion matsuri drums, obon lanterns, and the slow perfection of wagashi belong to a city that treats craft as moral practice. Culture in Kyoto is not an aesthetic filter—it is apprenticeship, calendar, and the embarrassment of cutting corners in front of your teacher.",
		},
	},
	amalfi: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Fishermen, lemon growers, and families who built the stairs.",
			body: "Boat captains, hoteliers, and grandmothers defending recipes share the same vertical geography. Their feuds are about parking a scooter, a cousin's wedding, and which saint's day gets the bigger fireworks.",
			pullQuote:
				"On this coast, gossip travels faster than the hydrofoil—and carries more detail.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Sea-salt Catholicism, citrus, and arguments over the perfect sauce.",
			body: "Processions through narrow lanes, limoncello in chipped glasses, and the stubborn Campanian insistence on anchovies and silence at the table—the culture here is maritime Italy with a cliff-edge volume knob.",
		},
	},
	maldives: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Island crews, schoolteachers, and families who read the reef first.",
			body: "Fishing captains, resort workers, and imams share a geography of atolls and tides. Children learn to name currents before they learn to name capitals; elders arbitrate boat disputes the way other towns argue over parking.",
			pullQuote:
				"Out here, generosity is measured in spare fuel, shared coordinates, and who remembers your grandmother's name.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Bodu beru drums, Friday prayer, and the politics of a shared boat.",
			body: "Maldivian life is Islamic and oceanic: tuna shared on the dock, weddings that borrow drums from every island, and the quiet pride of keeping a coral house standing one monsoon after another.",
		},
	},
	iceland: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Farmers, rescue volunteers, and the people who never trust a calm forecast.",
			body: "Sheep herders, geothermal engineers, and musicians who play past midnight share a national obsession with weather apps and fair play. Community is built in search-and-rescue jackets, not in networking events.",
			pullQuote:
				"In a town of three hundred, everyone knows who left the door unlocked—and who fixed it.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Sagas, swimming pools, and the blunt poetry of survival.",
			body: "Þorrablót tables, Christmas book floods, and the stubborn belief that hot water and dry humor are civil rights—Icelandic culture is North Atlantic stoicism with a soft spot for children and sheep.",
		},
	},
	morocco: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Medina artisans, drivers, and grandmothers who run the real economy.",
			body: "Metalworkers, carpet sellers, and cousins who remember every wedding debt negotiate life in the same alleyways tourists photograph. Their days are mint tea, funeral visits, and who gets the good seat at the Friday couscous.",
			pullQuote:
				"A favor here is currency; an insult is forgetting to ask after someone's mother.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Call to prayer, hammam steam, and the choreography of the souk.",
			body: "Gnawa nights, Andalusian echoes in Fès, and the blunt poetry of darija jokes—Moroccan culture is Islamic, Amazigh, and Mediterranean at once, argued over bread, music, and which cousin tells the best story.",
		},
	},
	peru: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Highland herders, market women, and cooks who guard the potatoes.",
			body: "Quechua-speaking farmers, Lima chefs, and bus drivers who know every switchback share a country of altitude and appetite. Their humor is dry, their memory for slights long, and their generosity often arrives as soup.",
			pullQuote:
				"Here you are judged by whether you finish your plate—and whether you showed up when it mattered.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "Virgen de la Candelaria, ceviche counters, and Andean time.",
			body: "From mountain festivals to coastal cevicherías, Peruvian culture is Indigenous and coastal at once: brass bands, ají, and the stubborn belief that a joke and a plate of food can end an argument.",
		},
	},
	norway: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		peoplePortrait: {
			...FALLBACK_STORY_SEED.peoplePortrait,
			title: "Fishers, nurses, and cabin heirs who measure years in seasons.",
			body: "Ship crews, teachers, and grandparents minding skis share a low-drama contract: keep the path clear, respect the quota, and never boast about the weather. Community is practical and slightly shy.",
			pullQuote:
				"Trust is built in who shows up for the dugnad, not who talks the longest.",
		},
		culturePulse: {
			...FALLBACK_STORY_SEED.culturePulse,
			title: "National day buns, bunad pride, and the right to roam with care.",
			body: "From coastal kvæfjordkake to Sámi joik, Norwegian culture is fjord-deep Protestantism mixed with outdoor stubbornness—music, constitution day, and the quiet insistence that nature is shared, not conquered.",
		},
	},
};
