"use client";

import { TOURS_CTA_COPY } from "@/features/tours/content/tours-page-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function ToursCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="tours-cta-title"
			label={TOURS_CTA_COPY.label}
			titleLead={TOURS_CTA_COPY.titleLead}
			titleAccent={TOURS_CTA_COPY.titleAccent}
			description={TOURS_CTA_COPY.description}
			primary={{
				label: TOURS_CTA_COPY.primaryAction,
				href: TOURS_CTA_COPY.primaryHref,
			}}
			secondary={{
				label: TOURS_CTA_COPY.secondaryAction,
				href: TOURS_CTA_COPY.secondaryHref,
			}}
		/>
	);
}
