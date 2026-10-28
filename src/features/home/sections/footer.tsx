import { getTranslations } from "next-intl/server";
import type { FooterCopy } from "../lib/home-static-copy";
import { FooterView } from "./footer-view";

export default async function Footer() {
	const t = await getTranslations("Footer");
	const copy: FooterCopy = {
		explore: t("explore"),
		company: t("company"),
		support: t("support"),
		legal: t("legal"),
		destinations: t("destinations"),
		tours: t("tours"),
		stories: t("stories"),
		experiences: t("experiences"),
		about: t("about"),
		careers: t("careers"),
		press: t("press"),
		partners: t("partners"),
		faq: t("faq"),
		bookingPolicy: t("bookingPolicy"),
		cancellation: t("cancellation"),
		contact: t("contact"),
		privacy: t("privacy"),
		terms: t("terms"),
		cookies: t("cookies"),
		blurb: t("blurb"),
		copyrightRest: t("copyrightRest")
	};
	return <FooterView copy={copy} />;
}
