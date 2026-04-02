import {
	DESTINATION_DETAILS_3_SEEDS,
	FALLBACK_DETAILS_3_SEED,
} from "@/features/destination-details-3/content/details-3-seeds";
import type {
	DestinationDetails3ViewModel,
	Details3CultureItem,
	Details3PlaceResolved,
} from "@/features/destination-details-3/lib/details-3-types";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import type { Destination } from "@/shared/types/domain";

function getSeedKey(destination: Destination): string {
	const slug = destinationToSlug(destination);
	return slug.split("-")[0] ?? slug;
}

function collectSourceImages(destination: Destination): string[] {
	return [
		destination.image,
		...(destination.gallery ?? []),
		"/travel-europe-tourism-bougainvillea-village.jpg",
		"/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		"/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
	];
}

function pickByIndex(images: string[], index: number, fallback: string): string {
	const candidate = images[index];
	return candidate && candidate.length > 0 ? candidate : fallback;
}

function cultureFromDomain(highlights: string[]): Details3CultureItem[] {
	return highlights.map((body, i) => {
		const sentence = body.split(/(?<=[.!?])\s+/)[0]?.trim() ?? body;
		const title =
			sentence.length > 52 ? `${sentence.slice(0, 49).trim()}…` : sentence || `Thread ${i + 1}`;
		return { title, body };
	});
}

export function getDestinationDetails3ViewModel(destination: Destination): DestinationDetails3ViewModel {
	const key = getSeedKey(destination);
	const baseSeed = DESTINATION_DETAILS_3_SEEDS[key] ?? FALLBACK_DETAILS_3_SEED;
	const sourceImages = collectSourceImages(destination);
	const fallbackImg = destination.image || "/image.jpg";

	const cultureFromSeed = baseSeed.culture;
	const culture: Details3CultureItem[] =
		destination.cultureHighlights && destination.cultureHighlights.length > 0
			? cultureFromDomain(destination.cultureHighlights)
			: cultureFromSeed;

	const placesFromDomain = destination.signaturePlaces;
	let placeSeeds = baseSeed.places;
	if (placesFromDomain && placesFromDomain.length > 0) {
		placeSeeds = placesFromDomain.map((p) => ({
			name: p.name,
			narrative: p.narrative,
			image: p.image,
		}));
	}

	const places: Details3PlaceResolved[] = placeSeeds.map((p, index) => {
		const imageSrc = p.image ?? pickByIndex(sourceImages, index + 1, fallbackImg);
		return {
			index: String(index + 1).padStart(2, "0"),
			name: p.name,
			narrative: p.narrative,
			imageSrc,
			imageAlt: `${p.name} — ${destination.name}`,
		};
	});

	const fieldFromDomain: { label: string; value: string }[] = [];
	if (destination.languages) {
		fieldFromDomain.push({ label: "Languages", value: destination.languages });
	}
	if (destination.bestMonths) {
		fieldFromDomain.push({ label: "Light & season", value: destination.bestMonths });
	}
	if (destination.practical?.transport) {
		fieldFromDomain.push({ label: "Moving through", value: destination.practical.transport });
	}

	const fieldNotes =
		fieldFromDomain.length > 0
			? [...fieldFromDomain, ...(baseSeed.fieldNotes ?? [])]
			: (baseSeed.fieldNotes ?? null);

	const heroImage = pickByIndex(sourceImages, 0, fallbackImg);

	return {
		destinationLabel: `${destination.name}, ${destination.country}`,
		hero: {
			kicker: baseSeed.hero.kicker,
			title: baseSeed.hero.title,
			dek: baseSeed.hero.dek,
			imageSrc: heroImage,
			imageAlt: `${destination.name} — ${destination.country}`,
		},
		people: baseSeed.people,
		culture,
		places,
		close: baseSeed.close,
		fieldNotes: fieldNotes && fieldNotes.length > 0 ? fieldNotes : null,
	};
}
