"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PolicyDocument } from "@/shared/ui";
import { PRIVACY_COPY } from "./content/privacy-copy";

export default function PrivacyPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
		</>
	);
}
