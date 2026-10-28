import { TOURS } from "@/features/home/content/tours";
import { findTourBySlug } from "@/features/tours/lib/tour-slug";
import type { Tour } from "@/shared/types/domain";

export function resolveBookingTour(slug: string | null | undefined): Tour | undefined {
	if (!slug) return undefined;
	return findTourBySlug(TOURS, slug);
}
