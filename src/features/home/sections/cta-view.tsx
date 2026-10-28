import type { CtaCopy } from "../lib/home-static-copy";
import { EditorialCtaBand } from "@/shared/ui";

export function CtaView({ copy }: { copy: CtaCopy }) {
	return (
		<EditorialCtaBand
			id="contact"
			headingId="contact-title"
			label={copy.label}
			titleLead={copy.titleLead}
			titleAccent={copy.titleAccent}
			description={copy.description}
			primary={{
				label: copy.primaryAction,
				href: "/contact"
			}}
			secondary={{
				label: copy.secondaryAction,
				href: "/tours"
			}}
		/>
	);
}
