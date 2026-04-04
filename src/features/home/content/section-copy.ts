/** Feature-owned strings for the home page — structured for a future i18n pass. */
export const SKIP_TO_MAIN_LABEL = "Skip to main content";

export const LOADER_COPY = {
	subline: "Crafting journeys",
} as const;

export const NAVBAR_CTA_LABEL = "Let's Talk";

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
	/** Second block: `{titleLine2Prefix} {titleAccent}` */
	titleLine2Prefix: "We craft",
	titleAccent: "memories.",
	description:
		"Founded by a community of passionate wanderers, Talkwer connects curious souls with the world's most extraordinary places. Every itinerary is a story waiting to unfold.",
	ratingSummary: "Avg. rating · 3,200 reviews",
} as const;

export const ABOUT_HOME_STATS = [
	{ value: 500, suffix: "+", label: "Destinations" },
	{ value: 12, suffix: "yr", label: "Experience" },
	{ value: 50, suffix: "K", label: "Travelers" },
] as const;

export const MARQUEE_WORDS = [
	"Bali",
	"Santorini",
	"Kyoto",
	"Patagonia",
	"Maldives",
	"Amalfi",
	"Iceland",
	"Morocco",
	"Peru",
	"Norway",
] as const;

export const DESTINATIONS_SECTION = {
	label: "Explore the World",
	title: "Popular Destinations",
	description:
		"Handpicked places our travelers keep coming back to. Scroll to glide through the journeys.",
	countSuffix: "Destinations",
	viewAllCta: "View All Destinations",
	fromLabel: "From",
	exploreButtonLabel: "Explore",
} as const;

export const FEATURED_TOURS_SECTION = {
	label: "Curated For You",
	title: "Featured Tours",
	description:
		"Our most popular tour packages, designed for extraordinary experiences at unbeatable value.",
	viewAllCta: "View All Tours",
	savePrefix: "Save $",
	startingAt: "Starting at",
} as const;

export const TESTIMONIALS_SECTION = {
	label: "Traveler Stories",
	title: "What Our Travelers Say",
	description:
		"Real stories from real adventurers who trusted Talkwer to craft their perfect getaway.",
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
	{ href: "/destinations", label: "Destinations" },
	{ href: "/tours", label: "Tours" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
	{ href: "/stories", label: "Stories" },
] as const;

export const FOOTER_COLUMNS = {
	Explore: ["Destinations", "Tours", "Experiences", "Blog"],
	Company: ["About", "Careers", "Press", "Partners"],
	Support: ["FAQ", "Booking Policy", "Cancellation", "Contact"],
} as const;

export const LEGAL_LINKS = ["Privacy", "Terms", "Cookies"] as const;

export const FOOTER_COPY = {
	blurb:
		"Crafting unforgettable journeys since 2010. The best stories begin with a single step into the unknown.",
	/** Shown after © {year} */
	copyrightRest: "Talkwer. All rights reserved.",
} as const;
