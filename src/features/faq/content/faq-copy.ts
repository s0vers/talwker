export const FAQ_HERO = {
	eyebrow: "Help & Support",
	title: "Frequently Asked Questions",
	description:
		"Search our knowledge base or browse answers by category — covering reservations, travel day pacing, safety protocols, and custom trip design.",
	searchPlaceholder: "Search questions (e.g. deposit, cancellation, group size, insurance)...",
} as const;

export type FaqItem = {
	id: string;
	question: string;
	answer: string;
	keywords: string[];
	linkHref?: string;
	linkLabel?: string;
};

export type FaqGroup = {
	id: string;
	title: string;
	items: FaqItem[];
};

export const FAQ_GROUPS: FaqGroup[] = [
	{
		id: "booking",
		title: "Booking & Reservations",
		items: [
			{
				id: "how-book",
				question: "How do I reserve a spot on a Talkwer departure?",
				answer:
					"Select your desired journey on Tours or submit a request on Contact. Once dates and party size are confirmed, we issue a written confirmation and collect a deposit per our Booking Policy.",
				keywords: ["reserve", "book", "tour", "confirmation", "deposit"],
				linkHref: "/booking-policy",
				linkLabel: "Read Booking Policy",
			},
			{
				id: "deposit-rules",
				question: "What is the deposit policy and payment timeline?",
				answer:
					"Most departures require a 25% deposit at confirmation to secure boutique lodging and local transport. Final balances are due 60 days before departure.",
				keywords: ["deposit", "payment", "timeline", "due date", "balance"],
				linkHref: "/booking-policy",
				linkLabel: "View Booking Policy",
			},
			{
				id: "payment-methods",
				question: "What payment methods do you accept?",
				answer:
					"We accept major credit cards (Visa, MasterCard, Amex), wire transfers, and verified bank transfers with zero hidden processing surcharges.",
				keywords: ["credit card", "wire", "payment", "amex", "currency"],
			},
			{
				id: "group-size",
				question: "How large are Talkwer group departures?",
				answer:
					"We strictly cap departure group sizes between 8 and 16 travelers (depending on destination terrain) to maintain an unhurried, editorial pacing.",
				keywords: ["group size", "capacity", "travelers", "small group"],
				linkHref: "/tours",
				linkLabel: "Browse Tours",
			},
		],
	},
	{
		id: "travel",
		title: "Travel Pacing & Logistics",
		items: [
			{
				id: "fitness-pacing",
				question: "What physical fitness level is required?",
				answer:
					"Each tour page lists activity ratings ranging from 'Relaxed Pacing' (coastal walks and city strolls) to 'Active Expedition' (highland mountain treks). Ask our team if you need a personalized read.",
				keywords: ["fitness", "activity", "hiking", "pacing", "difficulty"],
				linkHref: "/contact",
				linkLabel: "Ask Our Experience Team",
			},
			{
				id: "solo-travelers",
				question: "Do you welcome solo travelers? Is there a single supplement?",
				answer:
					"Over 40% of Talkwer guests travel solo. We offer single room options at cost without predatory single supplement markups.",
				keywords: ["solo", "single", "room", "supplement", "individual"],
			},
			{
				id: "inclusions-exclusions",
				question: "What is included in the departure price?",
				answer:
					"Accommodations, hosted experiences, ground transfers, regional guide leads, and specified meals are included. International long-haul flights are quoted separately.",
				keywords: ["inclusions", "flights", "meals", "hotels", "transfers"],
			},
		],
	},
	{
		id: "safety",
		title: "Safety, Insurance & Cancellations",
		items: [
			{
				id: "cancellation-policy",
				question: "What happens if I need to cancel or reschedule my trip?",
				answer:
					"Cancellations made 60+ days before departure receive a full refund minus a administrative fee. Transfers to future dates are supported under our Cancellation Policy.",
				keywords: ["cancel", "refund", "reschedule", "transfer", "cancellation"],
				linkHref: "/cancellation",
				linkLabel: "Read Cancellation Policy",
			},
			{
				id: "travel-insurance",
				question: "Is travel insurance required for Talkwer trips?",
				answer:
					"Comprehensive travel insurance covering medical expenses, emergency evacuation, and trip cancellation is required for all guests on active or wilderness itineraries.",
				keywords: ["insurance", "medical", "evacuation", "emergency", "coverage"],
			},
			{
				id: "health-safety",
				question: "How do you handle medical situations in remote regions?",
				answer:
					"All field guides carry satellite communicators, first-aid kits, and localized emergency evacuation protocols verified before every departure.",
				keywords: ["safety", "medical", "first aid", "satellite", "emergency"],
			},
		],
	},
	{
		id: "custom",
		title: "Custom & Private Journeys",
		items: [
			{
				id: "custom-trip",
				question: "Can Talkwer design a private custom trip for my family or group?",
				answer:
					"Yes. Our editorial team crafts private custom itineraries for families, couples, and private groups of 2 to 20 travelers.",
				keywords: ["custom", "private", "family", "tailored", "bespoke"],
				linkHref: "/contact",
				linkLabel: "Request Custom Trip",
			},
			{
				id: "lead-time",
				question: "How far in advance should we plan a custom itinerary?",
				answer:
					"We recommend reaching out 3 to 6 months prior to your desired departure window, especially for high-season dates in Japan, Greece, or Patagonia.",
				keywords: ["advance", "lead time", "planning", "custom dates"],
			},
		],
	},
];
