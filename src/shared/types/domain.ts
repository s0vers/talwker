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

export type TourItineraryDay = {
	day: number;
	title: string;
	body: string;
};

export type Tour = {
	id: number;
	slug: string;
	title: string;
	destination: string;
	destinationSlug?: string;
	image: string;
	price: number;
	originalPrice?: number;
	duration: string;
	groupSize: string;
	rating: number;
	reviews?: number;
	highlights: string[];
	summary: string;
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

