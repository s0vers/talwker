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
		src: "/unsplash-texture-detail.jpg",
		alt: "Close texture detail from streets and materials",
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
		title: "The story belongs to those who keep the place alive.",
		body: "Conversations happen in short windows, between shifts, family errands, and preparation for tomorrow. Daily life becomes the most honest guide.",
		pullQuote:
			"Once you follow local routines instead of tourist clocks, the destination starts to feel personal.",
	},
	culturePulse: {
		kicker: "Culture",
		title: "Tradition is less performance and more practice.",
		body: "Rituals, food, craft, and gathering spaces are repeated with care, each small repetition preserving identity across generations.",
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
	},
	santorini: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
		atmosphere: {
			kicker: "Santorini",
			title: "White walls against volcanic memory.",
			body: "The horizon feels cinematic, yet the island's pulse is local: ferry schedules, family kitchens, and cliffside routines.",
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
	},
	kyoto: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
		atmosphere: {
			kicker: "Kyoto",
			title: "Quiet streets where craft survives in plain sight.",
			body: "Kyoto feels refined, but its beauty is practical: inherited techniques, disciplined routines, and neighborhood continuity.",
		},
	},
	amalfi: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
	},
	maldives: {
		...FALLBACK_STORY_SEED,
		variant: "coastal",
	},
	iceland: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
	},
	morocco: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
	},
	peru: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
	},
	norway: {
		...FALLBACK_STORY_SEED,
		variant: "mountain",
	},
};
