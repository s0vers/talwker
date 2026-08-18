"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export function PressCTA() {
	const t = useTranslations("Press");

	return (
		<EditorialCtaBand
			label={t("cta.label")}
			titleLead={t("cta.titleLead")}
			titleAccent={t("cta.titleAccent")}
			description={t("cta.description")}
			primary={{
				label: t("cta.primaryAction"),
				href: "mailto:press@talkwer.com",
			}}
			secondary={{
				label: t("cta.secondaryAction"),
				href: "/stories",
			}}
			showTopFrame
		/>
	);
}
