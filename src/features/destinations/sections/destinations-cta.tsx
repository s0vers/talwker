"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export default function DestinationsCTA() {
	const t = useTranslations("Destinations.cta");

	return (
		<EditorialCtaBand
			showTopFrame
			headingId="destinations-cta-title"
			label={t("label")}
			titleLead={t("titleLead")}
			titleAccent={t("titleAccent")}
			description={t("description")}
			primary={{
				label: t("primaryAction"),
				href: "/tours",
			}}
			secondary={{
				label: t("secondaryAction"),
				href: "/stories",
			}}
		/>
	);
}
