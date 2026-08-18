"use client";

import { useTranslations } from "next-intl";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PolicyDocument } from "@/shared/ui";
import { TERMS_COPY } from "./content/terms-copy";

export default function TermsPage() {
	const t = useTranslations("Legal");
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<PolicyDocument
				eyebrow={t("termsEyebrow")}
				title={t("termsTitle")}
				effectiveDate={t("termsEffectiveDate")}
				intro={t("termsIntro")}
				sections={TERMS_COPY.sections.map((s) => ({
					id: s.id,
					heading: t.has(`termsSections.${s.id}.heading`) ? t(`termsSections.${s.id}.heading`) : s.heading,
					body: <p>{t.has(`termsSections.${s.id}.body`) ? t(`termsSections.${s.id}.body`) : s.body}</p>,
				}))}
			/>
		</>
	);
}
