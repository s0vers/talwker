import { EditorialCtaBand } from "@/shared/ui";
import { PRESS_CTA } from "../content/press-copy";

export function PressCTA() {
	return (
		<EditorialCtaBand
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
			showTopFrame
		/>
	);
}
