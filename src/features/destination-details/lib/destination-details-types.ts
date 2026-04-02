export type NarrativeVariant = "coastal" | "mountain";

export type ImageRole = "hero" | "documentary" | "texture" | "context";

export type NarrativeImage = {
	src: string;
	alt: string;
	role: ImageRole;
	orientation?: "landscape" | "portrait" | "square";
};

/** Copy block for one narrative chapter (atmosphere, geography, people, etc.) */
export type NarrativeChapterCopy = {
	kicker?: string;
	title: string;
	body: string;
	pullQuote?: string;
};

export type DestinationNarrativeSeed = {
	variant?: NarrativeVariant;
	atmosphere: NarrativeChapterCopy;
	livingGeography: NarrativeChapterCopy;
	peoplePortrait: NarrativeChapterCopy;
	culturePulse: NarrativeChapterCopy;
	sensoryImmersion: NarrativeChapterCopy;
	reflectiveClose: NarrativeChapterCopy;
	images?: Partial<Record<ImageRole, NarrativeImage[]>>;
};

export type DestinationNarrativeViewModel = {
	destinationLabel: string;
	variant: NarrativeVariant;
	motifLabel: string;
	atmosphere: NarrativeChapterCopy & { hero: NarrativeImage; texture?: NarrativeImage };
	livingGeography: NarrativeChapterCopy & { context: NarrativeImage; documentary: NarrativeImage };
	peoplePortrait: NarrativeChapterCopy & { portraits: NarrativeImage[] };
	culturePulse: NarrativeChapterCopy & { cultureImages: NarrativeImage[]; anchor: NarrativeImage };
	sensoryImmersion: NarrativeChapterCopy & { textures: NarrativeImage[] };
	reflectiveClose: NarrativeChapterCopy & { closingImage: NarrativeImage };
};

/** Props for each narrative chapter section + layout wrappers */
export type DestinationNarrativeSectionProps = {
	model: DestinationNarrativeViewModel;
};
