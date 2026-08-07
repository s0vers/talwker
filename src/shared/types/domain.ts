export type Destination = {
	id: number;
	name: string;
	country: string;
	image: string;
	price: number;
	rating: number;
	duration: string;
	tag?: string;
	heroIntro?: string;
	bestMonths?: string;
	atmosphere?: string;
	languages?: string;
	currency?: string;
	cultureHighlights?: string[];
	signaturePlaces?: Array<{
		name: string;
		narrative: string;
		image?: string;
	}>;
	moodPlans?: Array<{
		title: string;
		summary: string;
		moments: string[];
	}>;
	practical?: {
		transport?: string;
		budget?: string;
		connectivity?: string;
		safety?: string;
	};
	gallery?: string[];
};

/** Expanded accordion panel composition — not one shared template. */
export type TourDayPanel =
	| "arrival"
	| "split"
	| "journal"
	| "options"
	| "logistics";

export type TourItineraryDay = {
	day: number;
	title: string;
	/** Short line shown in the collapsed row. */
	body: string;
	image: string;
	/** Ops chips: Transfer · Hotel · Breakfast — not destination mood. */
	chips?: string[];
	panel: TourDayPanel;
	/** Expanded prose for the open panel. */
	detail: string;
	/** Pace / operator callout. */
	note?: string;
	overnight?: string;
	/** Free-day choices (options panel). */
	options?: string[];
};

export type Tour = {
	id: number;
	slug: string;
	title: string;
	destination: string;
	destinationSlug?: string;
	image: string;
	panelImage?: string;
	price: number;
	originalPrice?: number;
	duration: string;
	groupSize: string;
	rating: number;
	reviews?: number;
	highlights: string[];
	summary: string;
	/** Why the days are ordered this way — tours job, not destination essay. */
	routeWhy: string;
	itinerary: TourItineraryDay[];
	includes: string[];
};

export type Testimonial = {
	id: number;
	name: string;
	avatar: string;
	location: string;
	rating: number;
	text: string;
	trip: string;
};

export type Stat = {
	value: string;
	label: string;
};

export type StoryBodyBlock =
	| { type: "paragraph"; text: string }
	| { type: "pullquote"; text: string }
	| { type: "image"; src: string; alt: string };

export type Story = {
	id: number;
	slug: string;
	title: string;
	dek: string;
	heroImage: string;
	author: string;
	location: string;
	readMinutes: number;
	body: StoryBodyBlock[];
	relatedDestinationSlug?: string;
	relatedTourId?: number;
};

