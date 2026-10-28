"use client";

import { useTranslations } from "next-intl";
import { PolicyDocument } from "@/shared/ui";
import { PRIVACY_COPY } from "./content/privacy-copy";

export default function PrivacyPage() {
	const t = useTranslations("Legal");

	return (
		<>
			<PolicyDocument
				eyebrow={t("privacyEyebrow")}
				title={t("privacyTitle")}
				effectiveDate={t("privacyEffectiveDate")}
				intro={t("privacyIntro")}
				sections={PRIVACY_COPY.sections.map((s) => ({
					id: s.id,
					heading: t.has(`privacySections.${s.id}.heading`) ? t(`privacySections.${s.id}.heading`) : s.heading,
					body: <p>{t.has(`privacySections.${s.id}.body`) ? t(`privacySections.${s.id}.body`) : s.body}</p>,
				}))}
			/>
		</>
	);
}
