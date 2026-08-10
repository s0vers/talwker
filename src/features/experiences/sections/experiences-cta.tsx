import { EditorialCtaBand } from "@/shared/ui";
import { EXPERIENCES_CTA } from "../content/experiences-page-copy";

export function ExperiencesCTA() {
	return (
		<EditorialCtaBand
			label={EXPERIENCES_CTA.label}
			titleLead={EXPERIENCES_CTA.titleLead}
			titleAccent={EXPERIENCES_CTA.titleAccent}
			description={EXPERIENCES_CTA.description}
			primary={{
				label: EXPERIENCES_CTA.primaryAction,
				href: EXPERIENCES_CTA.primaryHref,
			}}
			secondary={{
				label: EXPERIENCES_CTA.secondaryAction,
				href: EXPERIENCES_CTA.secondaryHref,
			}}
			showTopFrame
		/>
	);
}
