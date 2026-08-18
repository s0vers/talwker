"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export default function ToursCTA() {
	const t = useTranslations("Tours.cta");

	return (
		<EditorialCtaBand
			showTopFrame
			headingId="tours-cta-title"
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
				href: "/stories",
			}}
		/>
	);
}
