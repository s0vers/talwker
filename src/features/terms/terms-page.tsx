"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PolicyDocument } from "@/shared/ui";
import { TERMS_COPY } from "./content/terms-copy";

export default function TermsPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
		</>
	);
}
