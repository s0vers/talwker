"use client";

import { useTranslations } from "next-intl";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PolicyDocument } from "@/shared/ui";
import { CANCELLATION_COPY } from "./content/cancellation-copy";

export default function CancellationPage() {
	const t = useTranslations("Legal");
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
