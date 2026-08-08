"use client";

import { PARTNERS_CTA } from "@/features/partners/content/partners-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function PartnersCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="partners-cta-title"
			label={PARTNERS_CTA.label}
			titleLead={PARTNERS_CTA.titleLead}
			titleAccent={PARTNERS_CTA.titleAccent}
			description={PARTNERS_CTA.description}
			primary={{
				label: PARTNERS_CTA.primaryAction,
				href: PARTNERS_CTA.primaryHref,
			}}
			secondary={{
				label: PARTNERS_CTA.secondaryAction,
				href: PARTNERS_CTA.secondaryHref,
			}}
		/>
	);
}
