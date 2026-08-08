import { PolicyDocument } from "@/shared/ui";
import { COOKIES_COPY } from "./content/cookies-copy";

export default function CookiesPage() {
	return (
		<PolicyDocument
			eyebrow={COOKIES_COPY.eyebrow}
			title={COOKIES_COPY.title}
			effectiveDate={COOKIES_COPY.effectiveDate}
			intro={COOKIES_COPY.intro}
			sections={COOKIES_COPY.sections.map((s) => ({
				id: s.id,
				heading: s.heading,
				body: <p>{s.body}</p>,
			}))}
		/>
	);
}
