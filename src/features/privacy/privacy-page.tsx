import { PolicyDocument } from "@/shared/ui";
import { PRIVACY_COPY } from "./content/privacy-copy";

export default function PrivacyPage() {
	return (
		<PolicyDocument
			eyebrow={PRIVACY_COPY.eyebrow}
			title={PRIVACY_COPY.title}
			effectiveDate={PRIVACY_COPY.effectiveDate}
			intro={PRIVACY_COPY.intro}
			sections={PRIVACY_COPY.sections.map((s) => ({
				id: s.id,
				heading: s.heading,
				body: <p>{s.body}</p>,
			}))}
		/>
	);
}
