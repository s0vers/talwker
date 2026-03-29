export const HERO_COPY = {
	tagline: "Wander · Discover · Share",
	titleLines: ["Travel is the", "only thing you", "buy that makes"],
	titleAccent: "you richer.",
	description:
		"Curated journeys to the world's most extraordinary corners. Every trip a story. Every story worth sharing.",
	exploreLabel: "Explore",
} as const;

export const ABOUT_COPY = {
	label: "About Talkwer",
	titleLead: "We don't just plan trips.",
	titleAccent: "memories.",
	description:
		"Founded by a community of passionate wanderers, Talkwer connects curious souls with the world's most extraordinary places. Every itinerary is a story waiting to unfold.",
	ratingSummary: "Avg. rating · 3,200 reviews",
} as const;

export const NEWSLETTER_COPY = {
	label: "Stay in the Loop",
	title: "Get Exclusive Travel Deals",
	description:
		"Subscribe to our newsletter and be the first to know about flash sales, new destinations, and insider travel tips.",
	inputPlaceholder: "Enter your email",
	subscribeLabel: "Subscribe",
	disclaimer: "No spam, ever. Unsubscribe anytime.",
} as const;

export const CTA_COPY = {
	label: "Ready?",
	titleLead: "Let's plan something",
	titleAccent: "extraordinary",
	description:
		"Tell us your dream destination and travel style. We'll craft an itinerary you'll never forget.",
	primaryAction: "Start Planning",
	secondaryAction: "Browse Tours",
} as const;

export const NAV_LINKS = [
	{ href: "#destinations", label: "Destinations" },
	{ href: "#tours", label: "Tours" },
	{ href: "/about", label: "About" },
	{ href: "#testimonials", label: "Stories" },
] as const;

export const FOOTER_COLUMNS = {
	Explore: ["Destinations", "Tours", "Experiences", "Blog"],
	Company: ["About", "Careers", "Press", "Partners"],
	Support: ["FAQ", "Booking Policy", "Cancellation", "Contact"],
} as const;

export const LEGAL_LINKS = ["Privacy", "Terms", "Cookies"] as const;
