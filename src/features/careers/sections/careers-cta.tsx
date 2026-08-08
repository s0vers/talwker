"use client";

import { CAREERS_CTA } from "@/features/careers/content/careers-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function CareersCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="careers-cta-title"
			label={CAREERS_CTA.label}
			titleLead={CAREERS_CTA.titleLead}
			titleAccent={CAREERS_CTA.titleAccent}
			description={CAREERS_CTA.description}
			primary={{
				label: CAREERS_CTA.primaryAction,
				href: CAREERS_CTA.primaryHref,
			}}
			secondary={{
				label: CAREERS_CTA.secondaryAction,
				href: CAREERS_CTA.secondaryHref,
			}}
		/>
	);
}
