export type ExperienceStyle = {
	id: string;
	title: string;
	description: string;
	href: string;
};

export const EXPERIENCE_STYLES: ExperienceStyle[] = [
	{
		id: "field-notes",
		title: "Field Notes",
		description: "Slow days, strong places, and room to notice local rhythm.",
		href: "/stories",
	},
	{
		id: "signature",
		title: "Signature Journeys",
		description: "Hand-built itineraries crafted with a distinct narrative arc.",
		href: "/tours",
	},
	{
		id: "coastal",
		title: "Coastal Pacing",
		description: "Shorelines, island routes, and open salt-air atmospheres.",
		href: "/destinations?tag=popular",
	},
	{
		id: "elevated",
		title: "Elevated Stays",
		description: "Fewer transfers, finer accommodations, and deeper local access.",
		href: "/destinations?tag=luxury",
	},
];
