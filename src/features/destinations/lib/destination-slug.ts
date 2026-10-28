import type { Destination } from "@/shared/types/domain";

export function destinationToSlug(destination: Pick<Destination, "name" | "country">): string {
	return `${destination.name}-${destination.country}`
		.toLowerCase()
		.replace(/&/g, " and ")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function findDestinationBySlug(
	destinations: readonly Destination[],
	slug: string,
): Destination | undefined {
	const normalized = slug.trim().toLowerCase();
	return destinations.find((destination) => destinationToSlug(destination) === normalized);
}
