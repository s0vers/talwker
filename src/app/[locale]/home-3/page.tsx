import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Home3Page from "@/features/home-3/home-3-page";
import { createPageMetadata } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Nocturnal Observatory — Talkwer",
		description:
			"Celestial cartography, astronomical dossiers, and nocturnal wilderness expeditions for the astronomical voyager.",
		path: "/home-3",
		absoluteTitle: true,
		locale
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<RouteMessages namespaces={[]}>
			<Home3Page />
		</RouteMessages>
	);
}
