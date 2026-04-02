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

/** Shared by movement section components that consume the narrative view model */
export type DestinationNarrativeSectionProps = {
	model: DestinationNarrativeViewModel;
};
