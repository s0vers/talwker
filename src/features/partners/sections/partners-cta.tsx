"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export function PartnersCTA() {
	const t = useTranslations("Partners");

	return (
		<EditorialCtaBand
			label={t("cta.label")}
			titleLead={t("cta.titleLead")}
			titleAccent={t("cta.titleAccent")}
			description={t("cta.description")}
			primary={{
				label: t("cta.primaryAction"),
				href: "/login",
			}}
			secondary={{
				label: t("cta.secondaryAction"),
				href: "/contact",
			}}
			showTopFrame
		/>
	);
}
