export const PRESS_HERO = {
	eyebrow: "Press & Media Room",
	title: "News, Stories & Brand Assets",
	description:
		"Official media announcements, featured press coverage, and downloadable brand assets for journalists, publications, and media partners.",
	pressEmail: "press@talkwer.example",
} as const;

export type PressArticle = {
	id: string;
	publication: string;
	date: string;
	title: string;
	excerpt: string;
	category: "Feature" | "Award" | "Review" | "Interview";
	linkText: string;
};

export const PRESS_ARTICLES: PressArticle[] = [
	{
		id: "vogue-culture",
		publication: "Vogue",
		date: "May 2026",
		title: "The New Wave of Intentional, Slow Travel Studios",
		excerpt:
			"Talkwer eliminates the frantic checklist pace of modern tourism in favor of quiet morning light, authentic home kitchens, and deep local engagement.",
		category: "Feature",
		linkText: "Read Vogue Feature",
	},
	{
		id: "cntraveler-gold",
		publication: "Condé Nast Traveler",
		date: "March 2026",
		title: "Gold List 2026: Outstanding Small-Group Expeditions",
		excerpt:
			"From Aegean sailing coves to Torres del Paine base camps, Talkwer's hand-built itineraries stand out for narrative structure and seamless execution.",
		category: "Award",
		linkText: "View Gold List",
	},
	{
		id: "nyt-travel",
		publication: "The New York Times",
		date: "January 2026",
		title: "52 Places to Go: Reimagining the Island Pacing",
		excerpt:
			"By staging buffer days between ferry legs, Talkwer crafts island itineraries that actually allow travelers to experience quiet village rhythms.",
		category: "Review",
		linkText: "Read NYT Review",
	},
	{
		id: "wallpaper-design",
		publication: "Wallpaper*",
		date: "November 2025",
		title: "Design & Craftsmanship in Modern Travel Interfaces",
		excerpt:
			"How Talkwer combines minimalist digital design with tactile print field notes to elevate pre-departure anticipation.",
		category: "Interview",
		linkText: "Read Wallpaper* Article",
	},
];

export type PressKitAsset = {
	id: string;
	title: string;
	format: string;
	size: string;
	description: string;
	fileName: string;
};

export const PRESS_KIT_ASSETS: PressKitAsset[] = [
	{
		id: "logo-pack",
		title: "Brand Vector Logo Pack",
		format: "SVG / PNG",
		size: "12.4 MB",
		description: "High-resolution primary logos, wordmarks, and dark/light monochrome variants.",
		fileName: "talkwer-logo-pack-2026.zip",
	},
	{
		id: "image-vault",
		title: "Editorial Photography Vault",
		format: "JPG / RAW",
		size: "148 MB",
		description: "Curated high-res imagery of destinations, team field guides, and hosted travel moments.",
		fileName: "talkwer-press-photography.zip",
	},
	{
		id: "fact-sheet",
		title: "2026 Studio Fact Sheet",
		format: "PDF",
		size: "2.1 MB",
		description: "Company overview, founder biographies, key travel metrics, and sustainability commitments.",
		fileName: "talkwer-factsheet-2026.pdf",
	},
	{
		id: "brand-guidelines",
		title: "Brand Identity Guidelines",
		format: "PDF",
		size: "8.5 MB",
		description: "Typography rules, HSL color tokens, photo composition criteria, and usage policies.",
		fileName: "talkwer-brand-guidelines.pdf",
	},
];

export const PRESS_QUOTE = {
	quote:
		"Our goal is to give journalists, editors, and creators direct access to real story angles and high-resolution assets without media friction.",
	author: "Marcus Lindqvist",
	title: "Communications Director, Talkwer",
} as const;

export const PRESS_CTA = {
	label: "Media Enquiries",
	titleLead: "Need a commentary or",
	titleAccent: "custom asset?",
	description: "Our press team responds to media inquiries, interview requests, and image permissions within 24 hours.",
	primaryAction: "Contact Press Office",
	primaryHref: "/contact?subject=press",
	secondaryAction: "Explore All Tours",
	secondaryHref: "/tours",
} as const;
