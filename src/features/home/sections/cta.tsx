import { getTranslations } from "next-intl/server";
import type { CtaCopy } from "../lib/home-static-copy";
import { CtaView } from "./cta-view";

export default async function CTA() {
	const t = await getTranslations("Home.cta");
	const copy: CtaCopy = {
		label: t("label"),
		titleLead: t("titleLead"),
		titleAccent: t("titleAccent"),
		description: t("description"),
		primaryAction: t("primaryAction"),
		secondaryAction: t("secondaryAction")
	};
	return <CtaView copy={copy} />;
}
