import { PolicyDocument } from "@/shared/ui";
import { CANCELLATION_COPY } from "./content/cancellation-copy";

export default function CancellationPage() {
	return (
		<PolicyDocument
			eyebrow={CANCELLATION_COPY.eyebrow}
			title={CANCELLATION_COPY.title}
			effectiveDate={CANCELLATION_COPY.effectiveDate}
			intro={CANCELLATION_COPY.intro}
			sections={CANCELLATION_COPY.sections.map((s) => ({
				id: s.id,
				heading: s.heading,
				body: <p>{s.body}</p>,
			}))}
		/>
	);
}
