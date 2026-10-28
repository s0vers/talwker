"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export default function StoriesCTA() {
	const t = useTranslations("Stories.cta");

	return (
		<EditorialCtaBand
			showTopFrame
			headingId="stories-cta-title"
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
				href: "/tours",
			}}
		/>
	);
}
