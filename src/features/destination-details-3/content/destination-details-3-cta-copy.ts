import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import type { Destination } from "@/shared/types/domain";

/** Softer end-of-story framing for the v3 field-guide layout */
export function getDestinationDetails3TourCta(destination: Destination) {
	const slug = destinationToSlug(destination);
	const { name, country } = destination;

	return {
		slug,
		label: `${name} · ${country}`,
		titleLead: "Keep reading",
		titleAccent: `about ${name}.`,
		description: `If this place stayed with you, wander the tours index — same curiosity, no hard sell in the story above.`,
		primaryAction: "Browse tours",
		primaryHref: `/tours?destination=${encodeURIComponent(slug)}`,
	} as const;
}
