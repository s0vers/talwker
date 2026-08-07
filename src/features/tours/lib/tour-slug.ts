import type { Tour } from "@/shared/types/domain";

export function getTourSlug(tour: Tour): string {
	return tour.slug;
}

export function findTourBySlug(tours: Tour[], slug: string): Tour | undefined {
	const normalized = slug.trim().toLowerCase();
	return tours.find((tour) => tour.slug.toLowerCase() === normalized);
}
