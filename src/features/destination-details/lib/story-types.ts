export type NarrativeVariant = "coastal" | "mountain";

export type ImageRole = "hero" | "documentary" | "texture" | "context";

export type NarrativeImage = {
	src: string;
	alt: string;
	role: ImageRole;
	orientation?: "landscape" | "portrait" | "square";
};

export type MovementCopy = {
	kicker?: string;
	title: string;
	body: string;
	pullQuote?: string;
};

export type DestinationNarrativeSeed = {
	variant?: NarrativeVariant;
	atmosphere: MovementCopy;
	livingGeography: MovementCopy;
	peoplePortrait: MovementCopy;
	culturePulse: MovementCopy;
	sensoryImmersion: MovementCopy;
	reflectiveClose: MovementCopy;
	images?: Partial<Record<ImageRole, NarrativeImage[]>>;
};

export type DestinationNarrativeViewModel = {
	destinationLabel: string;
	variant: NarrativeVariant;
	motifLabel: string;
	atmosphere: MovementCopy & { hero: NarrativeImage; texture?: NarrativeImage };
	livingGeography: MovementCopy & { context: NarrativeImage; documentary: NarrativeImage };
	peoplePortrait: MovementCopy & { portraits: NarrativeImage[] };
	culturePulse: MovementCopy & { cultureImages: NarrativeImage[]; anchor: NarrativeImage };
	sensoryImmersion: MovementCopy & { textures: NarrativeImage[] };
	reflectiveClose: MovementCopy & { closingImage: NarrativeImage };
};
export type StorySectionDoc = {
	purpose: string;
	tone: string;
	visualIntent: string;
	copyBlocks: string;
	imageDirection: string;
	mobileAdaptation: string;
	a11yNotes: string;
};

export type StoryHero = {
	kicker: string;
	headline: string;
	subheadline: string;
	lead: string;
	whyItMatters: string;
	metaRail: string[];
	image: string;
};

export type StoryPlaceIntro = {
	chapter: string;
	heading: string;
	paragraphs: string[];
	pullLine: string;
	connectorToPeople: string;
	facts: Array<{ label: string; value: string }>;
};

export type StoryPeople = {
	heading: string;
	protagonistThread: string;
	paragraphs: string[];
	quote: string;
	dayRhythm: Array<{ label: string; detail: string }>;
	timelineSentence: string;
	connectorToCulture: string;
	images: string[];
};

export type StoryCulture = {
	heading: string;
	intro: string;
	backdrop: string;
	connectorToSignature: string;
	items: Array<{
		label: "Taste" | "Sound" | "Craft" | "Ritual";
		title: string;
		text: string;
		position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	}>;
};

export type StoryExperience = {
	chapter: string;
	title: string;
	mood: string;
	practical: string;
	transitionToNext?: string;
	image: string;
};

export type StoryPractical = {
	heading: string;
	framingLine: string;
	connectorToClosing: string;
	items: Array<{ label: string; value: string }>;
};

export type StoryClosing = {
	heading: string;
	reflection: string;
	statement: string;
	callbackLine: string;
	image: string;
};

export type StoryChapterMarker = {
	id: string;
	label: string;
	title: string;
};

export type DestinationStoryViewModel = {
	chapters: StoryChapterMarker[];
	hero: StoryHero;
	placeIntro: StoryPlaceIntro;
	people: StoryPeople;
	culture: StoryCulture;
	experiences: StoryExperience[];
	practical: StoryPractical;
	closing: StoryClosing;
	docs: Record<
		"hero" | "placeIntro" | "people" | "culture" | "experiences" | "practical" | "closing",
		StorySectionDoc
	>;
};
