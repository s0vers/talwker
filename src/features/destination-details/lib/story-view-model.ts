import { DESTINATION_STORY_COPY, FALLBACK_STORY_SEED } from "@/features/destination-details/content/story-copy";
import type {
	DestinationNarrativeSeed,
	DestinationNarrativeViewModel,
	ImageRole,
	NarrativeImage,
	NarrativeVariant,
} from "@/features/destination-details/lib/story-types";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import type { Destination } from "@/shared/types/domain";

const roleAltMap: Record<ImageRole, string> = {
	hero: "Destination panorama",
	documentary: "Local people and daily life",
	texture: "Destination texture and detail",
	context: "Street-level context view",
};

function inferVariant(destination: Destination): NarrativeVariant {
	const cue = `${destination.name} ${destination.country} ${destination.tag ?? ""}`.toLowerCase();
	if (
		cue.includes("patagonia") ||
		cue.includes("iceland") ||
		cue.includes("norway") ||
		cue.includes("peru") ||
		cue.includes("japan")
	) {
		return "mountain";
	}
	return "coastal";
}

function createImage(src: string, role: ImageRole, alt?: string): NarrativeImage {
	return {
		src,
		role,
		alt: alt ?? roleAltMap[role],
		orientation: role === "documentary" ? "portrait" : "landscape",
	};
}

function getSeed(destination: Destination): DestinationNarrativeSeed {
	const slug = destinationToSlug(destination);
	const shortKey = slug.split("-")[0];
	return DESTINATION_STORY_COPY[shortKey] ?? FALLBACK_STORY_SEED;
}

function collectSourceImages(destination: Destination): string[] {
	return [
		destination.image,
		...(destination.gallery ?? []),
		"/set-cottages-ocean-blue-sky.jpg",
		"/sun-idyllic-beautiful-relax-sky.jpg",
		"/travel-europe-tourism-bougainvillea-village.jpg",
		"/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		"/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		"/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		"/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
	];
}

function pickByIndex(images: string[], index: number, fallback: string): string {
	const candidate = images[index];
	return candidate && candidate.length > 0 ? candidate : fallback;
}

function getRoleImages(
	role: ImageRole,
	seed: DestinationNarrativeSeed,
	baseImages: string[],
	defaultIndex: number,
	fallback: string,
): NarrativeImage[] {
	const fromSeed = seed.images?.[role];
	if (fromSeed && fromSeed.length > 0) return fromSeed;
	return [createImage(pickByIndex(baseImages, defaultIndex, fallback), role)];
}

export function getDestinationStoryViewModel(destination: Destination): DestinationNarrativeViewModel {
	const seed = getSeed(destination);
	const sourceImages = collectSourceImages(destination);
	const variant = seed.variant ?? inferVariant(destination);
	const hero = getRoleImages("hero", seed, sourceImages, 0, "/image.jpg")[0];
	const documentary = getRoleImages("documentary", seed, sourceImages, 3, "/image.jpg");
	const context = getRoleImages("context", seed, sourceImages, 2, "/image.jpg");
	const texture = getRoleImages("texture", seed, sourceImages, 4, "/image.jpg");
	const contextExpanded =
		context.length > 1
			? context
			: [
					context[0],
					createImage(pickByIndex(sourceImages, 5, hero?.src ?? "/image.jpg"), "context"),
				];

	return {
		destinationLabel: `${destination.name}, ${destination.country}`,
		variant,
		motifLabel: destination.name,
		atmosphere: {
			...seed.atmosphere,
			hero,
			texture: texture[0],
		},
		livingGeography: {
			...seed.livingGeography,
			context: contextExpanded[0],
			documentary: documentary[0] ?? contextExpanded[0],
		},
		peoplePortrait: {
			...seed.peoplePortrait,
			portraits: documentary.slice(0, 3),
		},
		culturePulse: {
			...seed.culturePulse,
			cultureImages: [...contextExpanded, ...texture].slice(0, 3),
			anchor: contextExpanded[0],
		},
		sensoryImmersion: {
			...seed.sensoryImmersion,
			textures: [...texture, ...contextExpanded].slice(0, 2),
		},
		reflectiveClose: {
			...seed.reflectiveClose,
			closingImage: contextExpanded[1] ?? contextExpanded[0],
		},
	};
}
