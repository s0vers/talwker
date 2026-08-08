import { EditorialCtaBand } from "@/shared/ui";
import { CAREERS_CTA } from "../content/careers-copy";

export function CareersCTA() {
	return (
		<EditorialCtaBand
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
			showTopFrame
		/>
	);
}
