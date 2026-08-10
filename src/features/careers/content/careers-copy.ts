export const CAREERS_HERO = {
	eyebrow: "Careers at Talkwer",
	title: "Shape the Future of Editorial Travel",
	description:
		"Talkwer is an independent travel studio. We build hand-crafted itineraries, long-form field guides, and digital tools for intentional wanderers.",
	metrics: [
		{ value: "100%", label: "Remote-First Team" },
		{ value: "$3,500", label: "Annual Travel Stipend" },
		{ value: "Unlimited", label: "Paid Field Leave" },
	],
} as const;

export type CultureValue = {
	id: string;
	title: string;
	description: string;
	iconName: "feather" | "compass" | "shield" | "heart";
};

export const CAREERS_VALUES: CultureValue[] = [
	{
		id: "craftsmanship",
		title: "Uncompromising Craft",
		description: "Every sentence, image selection, and itinerary path is refined until it conveys true atmospheric detail.",
		iconName: "feather",
	},
	{
		id: "curiosity",
		title: "Relentless Curiosity",
		description: "We venture beyond commercial tourist corridors to discover authentic local narratives and hidden places.",
		iconName: "compass",
	},
	{
		id: "autonomy",
		title: "High Autonomy & Trust",
		description: "We operate asynchronously with clear focus windows — no endless status meetings or micro-management.",
		iconName: "shield",
	},
	{
		id: "traveler-first",
		title: "Traveler-First Pacing",
		description: "We measure success by how deeply our guests experience a culture, never by rushing through checklists.",
		iconName: "heart",
	},
];

export type PerkItem = {
	id: string;
	title: string;
	description: string;
	tag: string;
};

export const CAREERS_PERKS: PerkItem[] = [
	{
		id: "travel-stipend",
		title: "Annual Travel Grant",
		description: "$3,500 yearly credit to experience any Talkwer departure or independent field research trip.",
		tag: "Growth",
	},
	{
		id: "flexible-hours",
		title: "Asynchronous Work",
		description: "Work from anywhere in the world on your schedule. We value outcomes over hours spent online.",
		tag: "Flexibility",
	},
	{
		id: "health-wellness",
		title: "Health & Mind Care",
		description: "Comprehensive medical coverage, mental wellness allowance, and monthly fitness reimbursement.",
		tag: "Wellbeing",
	},
	{
		id: "team-retreats",
		title: "Global Team Retreats",
		description: "Bi-annual week-long hosted gatherings in destinations like Kyoto, Amalfi, and Patagonia.",
		tag: "Community",
	},
	{
		id: "gear-budget",
		title: "Home Office & Gear",
		description: "$1,500 initial tech grant for your ideal laptop, display, noise-canceling headphones, or camera gear.",
		tag: "Equipment",
	},
	{
		id: "sabbatical",
		title: "Field Sabbatical",
		description: "Fully paid 4-week sabbatical every 3 years for deep personal creative projects or extended travel.",
		tag: "Rest",
	},
];

export type JobPosition = {
	id: string;
	title: string;
	department: "Editorial" | "Operations" | "Design & Product" | "Engineering";
	location: string;
	type: string;
	summary: string;
	responsibilities: string[];
	requirements: string[];
};

export const OPEN_POSITIONS: JobPosition[] = [
	{
		id: "senior-travel-editor",
		title: "Senior Travel Editor & Storyteller",
		department: "Editorial",
		location: "Remote (Global)",
		type: "Full-Time",
		summary: "Lead field research and editorial curation for new European and Asian itineraries, writing rich destination notes.",
		responsibilities: [
			"Research and author immersive destination guides and day-by-day itinerary narratives.",
			"Collaborate with local guides and hosts to unearth authentic regional traditions.",
			"Edit field notes and photo essays from contributing writers.",
		],
		requirements: [
			"5+ years writing/editing for premier travel, culture, or lifestyle publications.",
			"Demonstrated portfolio of evocative long-form prose and visual storytelling.",
			"Willingness to travel 4–6 weeks per year for field assignments.",
		],
	},
	{
		id: "guest-experience-lead",
		title: "Guest Experience & Operations Manager",
		department: "Operations",
		location: "Remote (EU/US Timezones)",
		type: "Full-Time",
		summary: "Ensure every traveler receives seamless pre-trip consultation, personalized logistics support, and post-trip care.",
		responsibilities: [
			"Manage traveler communications from deposit confirmation to final return.",
			"Coordinate directly with boutique hoteliers and local expedition guides.",
			"Handle custom itinerary inquiries and special traveler requests.",
		],
		requirements: [
			"3+ years in high-touch hospitality, boutique travel operations, or luxury concierge services.",
			"Empathetic communication skills and obsessive attention to detail.",
			"Fluent written and spoken English; secondary language is a plus.",
		],
	},
	{
		id: "principal-brand-designer",
		title: "Principal Brand & UI Designer",
		department: "Design & Product",
		location: "Remote (Global)",
		type: "Full-Time",
		summary: "Shape the visual identity of Talkwer across digital interfaces, print field guides, typography, and brand campaigns.",
		responsibilities: [
			"Design editorial web interfaces, micro-interactions, and visual design tokens.",
			"Craft print-ready field notebooks, departure packets, and brand collateral.",
			"Establish design guidelines that embody quiet, sophisticated luxury.",
		],
		requirements: [
			"6+ years designing digital products or award-winning editorial platforms.",
			"Mastery of typography, layout composition, and interactive prototyping in Figma.",
			"Strong aesthetic alignment with dark-mode, minimalist, and editorial aesthetics.",
		],
	},
	{
		id: "senior-frontend-engineer",
		title: "Senior Frontend Engineer (Next.js/React)",
		department: "Engineering",
		location: "Remote (Global)",
		type: "Full-Time",
		summary: "Build state-of-the-art web experiences, interactive maps, and animation pipelines using Next.js, React, Tailwind, and GSAP.",
		responsibilities: [
			"Architect and implement performant Next.js App Router pages and features.",
			"Craft fluid, accessible motion and scroll animations using GSAP.",
			"Maintain 100% static site build readiness and Lighthouse performance standards.",
		],
		requirements: [
			"5+ years engineering modern React and TypeScript web applications.",
			"Deep expertise in Next.js 15+, Tailwind v4, and modern CSS layout math.",
			"Passion for polished UI micro-interactions and performance optimization.",
		],
	},
];

export const CAREERS_CTA = {
	label: "Don't See Your Role?",
	titleLead: "Have a unique",
	titleAccent: "craft to share?",
	description: "We are always eager to connect with extraordinary writers, photographers, guides, and developers.",
	primaryAction: "Send Open Application",
	primaryHref: "/contact?subject=careers",
	secondaryAction: "About Talkwer Studio",
	secondaryHref: "/about",
} as const;
