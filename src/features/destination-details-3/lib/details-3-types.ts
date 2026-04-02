export type Details3CultureItem = {
	title: string;
	body: string;
};

export type Details3PlaceSeed = {
	name: string;
	narrative: string;
	image?: string;
};

export type Details3FieldNote = {
	label: string;
	value: string;
};

/** Authoring shape in `details-3-seeds.ts` */
export type DestinationDetails3Seed = {
	hero: {
		kicker: string;
		title: string;
		dek: string;
	};
	people: {
		kicker?: string;
		title: string;
		body: string;
		pullQuote?: string;
	};
	culture: Details3CultureItem[];
	places: Details3PlaceSeed[];
	close: {
		kicker?: string;
		title: string;
		body: string;
	};
	fieldNotes?: Details3FieldNote[];
};

export type Details3PlaceResolved = {
	index: string;
	name: string;
	narrative: string;
	imageSrc: string;
	imageAlt: string;
};

export type DestinationDetails3ViewModel = {
	destinationLabel: string;
	hero: {
		kicker: string;
		title: string;
		dek: string;
		imageSrc: string;
		imageAlt: string;
	};
	people: {
		kicker?: string;
		title: string;
		body: string;
		pullQuote?: string;
	};
	culture: Details3CultureItem[];
	places: Details3PlaceResolved[];
	close: {
		kicker?: string;
		title: string;
		body: string;
	};
	fieldNotes: Details3FieldNote[] | null;
};
