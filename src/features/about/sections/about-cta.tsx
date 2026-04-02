"use client";

import { ABOUT_CTA_COPY } from "@/features/about/content/about-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function AboutCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			label={ABOUT_CTA_COPY.label}
			titleLead={ABOUT_CTA_COPY.titleLead}
			titleAccent={ABOUT_CTA_COPY.titleAccent}
			description={ABOUT_CTA_COPY.description}
			primary={{ label: ABOUT_CTA_COPY.primaryAction }}
			secondary={{ label: ABOUT_CTA_COPY.secondaryAction }}
		/>
	);
}
