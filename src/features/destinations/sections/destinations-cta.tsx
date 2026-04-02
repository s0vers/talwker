"use client";

import { DESTINATIONS_CTA_COPY } from "@/features/destinations/content/destinations-page-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function DestinationsCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="destinations-cta-title"
			label={DESTINATIONS_CTA_COPY.label}
			titleLead={DESTINATIONS_CTA_COPY.titleLead}
			titleAccent={DESTINATIONS_CTA_COPY.titleAccent}
			description={DESTINATIONS_CTA_COPY.description}
			primary={{
				label: DESTINATIONS_CTA_COPY.primaryAction,
				href: DESTINATIONS_CTA_COPY.primaryHref,
			}}
			secondary={{
				label: DESTINATIONS_CTA_COPY.secondaryAction,
				href: DESTINATIONS_CTA_COPY.secondaryHref,
			}}
		/>
	);
}
