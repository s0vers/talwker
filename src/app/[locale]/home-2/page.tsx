import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Home2Page from "@/features/home-2/home-2-page";
import { createPageMetadata } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Expedition Atelier — Talkwer",
		description:
			"Curated visual folio, field dispatches, and archival dossiers for the contemplative traveler.",
		path: "/home-2",
		absoluteTitle: true,
		locale
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<RouteMessages namespaces={[]}>
			<Home2Page />
		</RouteMessages>
	);
}
