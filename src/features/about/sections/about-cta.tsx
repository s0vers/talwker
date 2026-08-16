"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export default function AboutCTA() {
	const t = useTranslations("About.cta");

	return (
		<EditorialCtaBand
			showTopFrame
			label={t("label")}
			titleLead={t("titleLead")}
			titleAccent={t("titleAccent")}
			description={t("description")}
			primary={{
				label: t("primaryAction"),
				href: "/destinations",
			}}
			secondary={{
				label: t("secondaryAction"),
				href: "/contact",
			}}
		/>
	);
}
