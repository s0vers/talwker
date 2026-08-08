export const FAQ_HERO = {
	eyebrow: "Support",
	title: "Questions before you go",
	description: "Straight answers about booking, travel days, and how Talkwer works.",
} as const;

export type FaqItem = {
	id: string;
	question: string;
	answer: string;
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
				question: "How do I book a journey?",
				answer:
					"Start on Tours or Contact. We confirm availability, send a written confirmation, and collect deposits per our Booking Policy.",
				linkHref: "/booking-policy",
				linkLabel: "Read Booking Policy",
			},
			{
				id: "deposit",
				question: "Is a deposit required?",
				answer:
					"Usually yes. Deposit amounts and due dates are listed on your written confirmation. Late balances may release inventory.",
				linkHref: "/booking-policy",
				linkLabel: "View Booking Policy",
			},
			{
				id: "payment-methods",
				question: "What payment methods are accepted?",
				answer:
					"We accept major credit cards, bank wire transfers, and verified online payments. Instructions are provided upon booking confirmation.",
			},
		],
	},
	{
		id: "travel",
		title: "Travel & Pacing",
		items: [
			{
				id: "group-size",
				question: "How large are groups?",
				answer:
					"Most Talkwer departures stay small so the editorial pace holds. Exact caps appear on each tour page.",
				linkHref: "/tours",
				linkLabel: "Browse Tours",
			},
			{
				id: "fitness",
				question: "What fitness level do I need?",
				answer:
					"Each tour lists pacing and physical activity expectations. Reach out via Contact if you need an honest evaluation for your party.",
				linkHref: "/contact",
				linkLabel: "Contact Us",
			},
			{
				id: "inclusions",
				question: "What is included in the tour price?",
				answer:
					"Accommmodations, hosted experiences, ground transfers, and listed meals are included. International flights are quoted separately.",
			},
		],
	},
	{
		id: "planning",
		title: "Planning & Changes",
		items: [
			{
				id: "cancel",
				question: "What if I need to cancel?",
				answer:
					"Review Cancellation for windows, credits, and supplier rules. Reach Contact as early as you can to initiate a cancellation request.",
				linkHref: "/cancellation",
				linkLabel: "Read Cancellation Policy",
			},
			{
				id: "custom",
				question: "Can you build a custom trip?",
				answer:
					"Yes. Use Contact with dates, party size, and the feeling you want — we reply with a sketched approach.",
				linkHref: "/contact",
				linkLabel: "Request Custom Trip",
			},
			{
				id: "insurance",
				question: "Do I need travel insurance?",
				answer:
					"Comprehensive travel insurance covering medical, emergency evacuation, and trip interruption is strongly recommended for all journeys.",
			},
		],
	},
];
