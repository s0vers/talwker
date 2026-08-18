"use client";

import { useTranslations } from "next-intl";
import { EditorialCtaBand } from "@/shared/ui";

export default function CTA() {
	const t = useTranslations("Home.cta");

	return (
		<EditorialCtaBand
			id="contact"
			headingId="contact-title"
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
		/>
	);
}
