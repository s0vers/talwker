"use client";

import { STORIES_CTA_COPY } from "@/features/stories/content/stories-page-copy";
import { EditorialCtaBand } from "@/shared/ui";

export default function StoriesCTA() {
	return (
		<EditorialCtaBand
			showTopFrame
			headingId="stories-cta-title"
			label={STORIES_CTA_COPY.label}
			titleLead={STORIES_CTA_COPY.titleLead}
			titleAccent={STORIES_CTA_COPY.titleAccent}
			description={STORIES_CTA_COPY.description}
			primary={{
				label: STORIES_CTA_COPY.primaryAction,
				href: STORIES_CTA_COPY.primaryHref,
			}}
			secondary={{
				label: STORIES_CTA_COPY.secondaryAction,
				href: STORIES_CTA_COPY.secondaryHref,
			}}
		/>
	);
}
