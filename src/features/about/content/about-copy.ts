export const ABOUT_HERO_COPY = {
	tagline: "Our Story",
	titleLines: ["We exist to", "inspire the", "art of"],
	titleAccent: "wandering.",
	description:
		"Born from a restless love of the unknown, Talkwer connects curious souls with the world's most extraordinary corners.",
} as const;

export const ABOUT_STORY_COPY = {
	label: "Where It Began",
	titleLead: "A spark of curiosity",
	titleAccent: "became a movement.",
	paragraphs: [
		"In 2010, a small group of friends — tired of cookie‑cutter package holidays — set out to prove that travel could be more personal, more meaningful, more alive.",
		"What started as a shared spreadsheet of hidden gems quickly grew into Talkwer: a platform where every itinerary is a story, every destination a chapter waiting to be written.",
		"Today, we partner with local guides, boutique stays, and cultural ambassadors across six continents to craft journeys that leave travellers changed — not just tanned.",
	],
	imageAlt: "Talkwer team exploring a coastal trail at sunrise",
} as const;

export const ABOUT_PHILOSOPHY = {
	line: "We believe the best stories are lived, not told. Every journey we craft is an invitation to lose yourself in a place — and return home more found than ever.",
} as const;

export const ABOUT_VALUES = [
	{
		id: 1,
		number: "01",
		title: "Human‑First Travel",
		description:
			"We design every journey around the people who take it. Your pace, your interests, your story.",
		accent: "People over itineraries.",
	},
	{
		id: 2,
		number: "02",
		title: "Radical Curiosity",
		description:
			"We're never satisfied with surface level. We dig deeper, ask more questions, and uncover the places that guidebooks miss.",
		accent: "Go beyond the obvious.",
	},
	{
		id: 3,
		number: "03",
		title: "Sustainable Footprints",
		description:
			"Every trip supports local economies and respects the ecosystems we visit. We tread lightly so the next traveller can experience the same magic.",
		accent: "Travel with purpose.",
	},
	{
		id: 4,
		number: "04",
		title: "Fearless Honesty",
		description:
			"We tell you the real deal — the best time to go, the overrated spots, the hidden costs. Transparency builds trust.",
		accent: "No sugarcoating.",
	},
] as const;

export const ABOUT_JOURNEY = [
	{
		year: "2010",
		title: "The First Step",
		description:
			"Three friends, one shared document, and a dream to make travel personal again.",
	},
	{
		year: "2013",
		title: "Talkwer Goes Live",
		description:
			"Our platform launched with 12 destinations and a community of 200 early explorers.",
	},
	{
		year: "2016",
		title: "100 Destinations",
		description:
			"Partnerships with local guides on six continents took our catalogue past the century mark.",
	},
	{
		year: "2019",
		title: "50,000 Travellers",
		description:
			"Half a hundred thousand curious souls had trusted us with their journeys.",
	},
	{
		year: "2022",
		title: "Sustainability Pledge",
		description:
			"We committed to carbon-neutral operations and launched our community conservation fund.",
	},
	{
		year: "2025",
		title: "The Next Chapter",
		description:
			"AI‑powered itinerary co‑creation, deeper local partnerships, and a vision to make every trip transformative.",
	},
] as const;

export const ABOUT_TEAM = [
	{
		id: 1,
		name: "Elena Marchetti",
		role: "Founder & CEO",
		bio: "Former journalist turned travel evangelist. Has visited 94 countries and counting.",
		image: "/image.jpg",
	},
	{
		id: 2,
		name: "Kai Nakamura",
		role: "Head of Experiences",
		bio: "Ex-adventure guide who now curates itineraries that balance thrill with soul.",
		image: "/image.jpg",
	},
	{
		id: 3,
		name: "Amara Osei",
		role: "Creative Director",
		bio: "Storyteller and visual thinker. Turns travel moments into lasting brand memories.",
		image: "/image.jpg",
	},
	{
		id: 4,
		name: "Leo Dufresne",
		role: "Head of Partnerships",
		bio: "Connects Talkwer with the world's best local guides and boutique operators.",
		image: "/image.jpg",
	},
] as const;

export const ABOUT_STATS = [
	{ value: 500, suffix: "+", label: "Destinations" },
	{ value: 50, suffix: "K+", label: "Travellers" },
	{ value: 15, suffix: "", label: "Years of Exploration" },
	{ value: 4.9, suffix: "", label: "Average Rating" },
] as const;

export const ABOUT_CTA_COPY = {
	label: "Join the Journey",
	titleLead: "Your next story starts",
	titleAccent: "here.",
	description:
		"Whether it's your first adventure or your fiftieth, we're ready to craft something unforgettable together.",
	primaryAction: "Plan Your Trip",
	secondaryAction: "Browse Destinations",
} as const;
