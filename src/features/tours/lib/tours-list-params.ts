import type { Tour } from "@/shared/types/domain";

export type ToursListParams = {
	destination?: string;
};

function firstSearchParam(value: string | string[] | undefined): string | undefined {
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value[0];
	return undefined;
}

export function parseToursListParams(
	sp: Record<string, string | string[] | undefined>,
): ToursListParams {
	const raw = firstSearchParam(sp.destination)?.trim().toLowerCase();
	return raw ? { destination: raw } : {};
}

/**
 * Filter tours by destination slug. When a slug is set but nothing matches,
 * return the full catalog so the index stays useful — callers should still
 * surface a muted empty-filter note via copy.
 */
export function filterToursByDestinationSlug(
	tours: Tour[],
	destinationSlug?: string,
): Tour[] {
	if (!destinationSlug) return tours;
	const matched = tours.filter((tour) => tour.destinationSlug === destinationSlug);
	return matched.length > 0 ? matched : tours;
}

export function toursMatchDestinationFilter(
	tours: Tour[],
	destinationSlug?: string,
): boolean {
	if (!destinationSlug) return true;
	return tours.some((tour) => tour.destinationSlug === destinationSlug);
}
