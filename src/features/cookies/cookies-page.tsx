"use client";

import { useTranslations } from "next-intl";
import { PolicyDocument } from "@/shared/ui";
import { COOKIES_COPY } from "./content/cookies-copy";

export default function CookiesPage() {
	const t = useTranslations("Legal");

	return (
		<>
			<PolicyDocument
				eyebrow={t("cookiesEyebrow")}
				title={t("cookiesTitle")}
				effectiveDate={t("cookiesEffectiveDate")}
				intro={t("cookiesIntro")}
				sections={COOKIES_COPY.sections.map((s) => ({
					id: s.id,
					heading: t.has(`cookiesSections.${s.id}.heading`) ? t(`cookiesSections.${s.id}.heading`) : s.heading,
					body: <p>{t.has(`cookiesSections.${s.id}.body`) ? t(`cookiesSections.${s.id}.body`) : s.body}</p>,
				}))}
			/>
		</>
	);
}
