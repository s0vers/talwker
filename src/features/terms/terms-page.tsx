import { PolicyDocument } from "@/shared/ui";
import { TERMS_COPY } from "./content/terms-copy";

export default function TermsPage() {
	return (
		<PolicyDocument
			eyebrow={TERMS_COPY.eyebrow}
			title={TERMS_COPY.title}
			effectiveDate={TERMS_COPY.effectiveDate}
			intro={TERMS_COPY.intro}
			sections={TERMS_COPY.sections.map((s) => ({
				id: s.id,
				heading: s.heading,
				body: <p>{s.body}</p>,
			}))}
		/>
	);
}
