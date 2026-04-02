"use client";

import { CTA_COPY } from "@/features/home/content/section-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function CTA() {
	return (
		<EditorialCtaBand
			id="contact"
			headingId="contact-title"
			label={CTA_COPY.label}
			titleLead={CTA_COPY.titleLead}
			titleAccent={CTA_COPY.titleAccent}
			description={CTA_COPY.description}
			primary={{ label: CTA_COPY.primaryAction }}
			secondary={{ label: CTA_COPY.secondaryAction }}
		/>
	);
}
