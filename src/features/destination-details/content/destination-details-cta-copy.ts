import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import type { Destination } from "@/shared/types/domain";

/** End-of-story CTA on a specific destination detail page */
export function getDestinationDetailsTourCta(destination: Destination) {
	const slug = destinationToSlug(destination);
	const { name, country } = destination;

	return {
		slug,
		label: `${name} · ${country}`,
		titleLead: "Start a tour",
		titleAccent: `in ${name}.`,
		description: `Browse itineraries shaped for ${name} — the same sense of place you just read, ready to plan.`,
		primaryAction: "Browse tours",
		primaryHref: `/tours?destination=${encodeURIComponent(slug)}`,
	} as const;
}
