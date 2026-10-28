"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export function FaqCTA() {
	const t = useTranslations("FAQ");

	return (
		<EditorialCtaBand
			label={t("cta.label")}
			titleLead={t("cta.titleLead")}
			titleAccent={t("cta.titleAccent")}
			description={t("cta.description")}
			primary={{
				label: t("cta.primaryAction"),
				href: "/contact",
			}}
			secondary={{
				label: t("cta.secondaryAction"),
				href: "/tours",
			}}
			showTopFrame
		/>
	);
}
