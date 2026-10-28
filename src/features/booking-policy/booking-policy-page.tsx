"use client";

import { useTranslations } from "next-intl";
import { PolicyDocument } from "@/shared/ui";
import { BOOKING_POLICY_COPY } from "./content/booking-policy-copy";

export default function BookingPolicyPage() {
	const t = useTranslations("Legal");

	return (
		<>
			<PolicyDocument
				eyebrow={t("bookingPolicyEyebrow")}
				title={t("bookingPolicyTitle")}
				effectiveDate={t("bookingPolicyEffectiveDate")}
				intro={t("bookingPolicyIntro")}
				sections={BOOKING_POLICY_COPY.sections.map((s) => ({
					id: s.id,
					heading: t.has(`bookingSections.${s.id}.heading`) ? t(`bookingSections.${s.id}.heading`) : s.heading,
					body: <p>{t.has(`bookingSections.${s.id}.body`) ? t(`bookingSections.${s.id}.body`) : s.body}</p>,
				}))}
			/>
		</>
	);
}
