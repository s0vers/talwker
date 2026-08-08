"use client";

import { PRESS_CTA } from "@/features/press/content/press-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function PressCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="press-cta-title"
			label={PRESS_CTA.label}
			titleLead={PRESS_CTA.titleLead}
			titleAccent={PRESS_CTA.titleAccent}
			description={PRESS_CTA.description}
			primary={{
				label: PRESS_CTA.primaryAction,
				href: PRESS_CTA.primaryHref,
			}}
			secondary={{
				label: PRESS_CTA.secondaryAction,
				href: PRESS_CTA.secondaryHref,
			}}
		/>
	);
}
