"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PolicyDocument } from "@/shared/ui";
import { BOOKING_POLICY_COPY } from "./content/booking-policy-copy";

export default function BookingPolicyPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<PolicyDocument
				eyebrow={BOOKING_POLICY_COPY.eyebrow}
				title={BOOKING_POLICY_COPY.title}
				effectiveDate={BOOKING_POLICY_COPY.effectiveDate}
				intro={BOOKING_POLICY_COPY.intro}
				sections={BOOKING_POLICY_COPY.sections.map((s) => ({
					id: s.id,
					heading: s.heading,
					body: <p>{s.body}</p>,
				}))}
			/>
		</>
	);
}
