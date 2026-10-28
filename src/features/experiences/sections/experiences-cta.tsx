"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export function ExperiencesCTA() {
	const t = useTranslations("Experiences.cta");

	return (
		<EditorialCtaBand
			label={t("label")}
			titleLead={t("titleLead")}
			titleAccent={t("titleAccent")}
			description={t("description")}
			primary={{
				label: t("primaryAction"),
				href: "/contact",
			}}
			secondary={{
				label: t("secondaryAction"),
				href: "/tours",
			}}
			showTopFrame
		/>
	);
}
