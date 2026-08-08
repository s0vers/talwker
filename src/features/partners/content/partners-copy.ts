export const PARTNERS_HERO = {
	eyebrow: "Partner Network",
	title: "Elevate Local Hospitality & Field Expertise",
	description:
		"We partner with independent boutique hoteliers, master expedition guides, and local cultural hosts who share our dedication to intentional, unhurried travel.",
	stats: [
		{ value: "120+", label: "Vetted Local Partners" },
		{ value: "28", label: "Global Regions" },
		{ value: "98%", label: "Partner Renewal Rate" },
	],
} as const;

export type PartnerTier = {
	id: string;
	title: string;
	category: string;
	description: string;
	criteria: string[];
	badge: string;
};

export const PARTNER_TIERS: PartnerTier[] = [
	{
		id: "boutique-lodging",
		title: "Boutique Hoteliers & Lodges",
		category: "Accommodations",
		description: "Architecturally distinct sanctuaries with fewer than 30 rooms, rooted in regional character and warm local hospitality.",
		criteria: ["Fewer than 30 rooms or villas", "Strong local architectural identity", "Sustainable water & energy practices"],
		badge: "Lodging Partner",
	},
	{
		id: "expedition-guides",
		title: "Expedition & Trail Operators",
		category: "Guiding",
		description: "Certified wilderness masters, mountain guides, and marine captains leading intimate, safety-focused explorations.",
		criteria: ["Certified wilderness first response", "Max 1:6 guide-to-guest ratio", "Leave-No-Trace operational code"],
		badge: "Field Partner",
	},
	{
		id: "cultural-hosts",
		title: "Cultural Hosts & Artisans",
		category: "Experiences",
		description: "Family kitchens, historic tea masters, organic vintners, and local craft ateliers offering private authentic access.",
		criteria: ["Family or artisan owned", "Authentic historical heritage", "Private hosted guest sessions"],
		badge: "Culture Partner",
	},
];

export type PartnerBenefit = {
	id: string;
	title: string;
	description: string;
	tag: string;
};

export const PARTNER_BENEFITS: PartnerBenefit[] = [
	{
		id: "global-reach",
		title: "Discreet Global Audience",
		description: "Connect directly with respectful, high-value travelers who appreciate deep craft and longer stays.",
		tag: "Audience",
	},
	{
		id: "fair-commissions",
		title: "Transparent Fair Terms",
		description: "We operate on clear, sustainable commission structures with zero hidden platform gouging or forced discounts.",
		tag: "Financials",
	},
	{
		id: "editorial-spotlight",
		title: "Premier Editorial Feature",
		description: "Your property or experience is showcased with bespoke photography, video, and written field notes.",
		tag: "Storytelling",
	},
	{
		id: "predictable-pacing",
		title: "Paced Guest Arrivals",
		description: "Our small-group caps (8–16 travelers) ensure your staff and local environment are never overwhelmed.",
		tag: "Operations",
	},
];

export const PARTNERS_TESTIMONIAL = {
	quote:
		"Talkwer travelers arrive with genuine curiosity and respect. They stay longer, engage deeply with our team, and value the quiet details of our property.",
	name: "Mateo Silva",
	role: "Owner, Patagonia Glacial Lodge, Chile",
} as const;

export const PARTNERS_CTA = {
	label: "Join The Network",
	titleLead: "Ready to partner with",
	titleAccent: "Talkwer Studio?",
	description: "Submit a brief inquiry about your property, experience, or guiding services. Our partnership team replies within 48 hours.",
	primaryAction: "Submit Partnership Inquiry",
	primaryHref: "/contact?subject=partners",
	secondaryAction: "Explore Destinations",
	secondaryHref: "/destinations",
} as const;
