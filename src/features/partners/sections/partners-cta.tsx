import { EditorialCtaBand } from "@/shared/ui";
import { PARTNERS_CTA } from "../content/partners-copy";

export function PartnersCTA() {
	return (
		<EditorialCtaBand
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
			showTopFrame
		/>
	);
}
