"use client";

import { useTranslations } from "next-intl";
import { PolicyDocument } from "@/shared/ui";
import { CANCELLATION_COPY } from "./content/cancellation-copy";

export default function CancellationPage() {
	const t = useTranslations("Legal");

	return (
		<>
			<PolicyDocument
				eyebrow={t("cancellationEyebrow")}
				title={t("cancellationTitle")}
				effectiveDate={t("cancellationEffectiveDate")}
				intro={t("cancellationIntro")}
				sections={CANCELLATION_COPY.sections.map((s) => ({
					id: s.id,
					heading: t.has(`cancellationSections.${s.id}.heading`) ? t(`cancellationSections.${s.id}.heading`) : s.heading,
					body: <p>{t.has(`cancellationSections.${s.id}.body`) ? t(`cancellationSections.${s.id}.body`) : s.body}</p>,
				}))}
			/>
		</>
	);
}
