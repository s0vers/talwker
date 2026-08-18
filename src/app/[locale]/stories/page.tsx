import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getLocalizedStories } from "@/features/stories/lib/localized-stories";
import StoriesPage from "@/features/stories/stories-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const descriptions: Record<string, string> = {
		en: "Field essays from Talkwer travelers — temple mornings, empty alleys after the ships leave, and the quiet hours itineraries never schedule.",
		es: "Crónicas de campo de viajeros de Talkwer: amaneceres en templos, callejuelas silenciosas y las horas de calma que ningún itinerario programa.",
		ja: "Talkwerの旅人たちによる現地紀行文。寺院の朝、船が去った後の静かな路地、旅程には記されない穏やかな時間。",
	};

	const titles: Record<string, string> = {
		en: "Stories",
		es: "Historias",
		ja: "ジャーナル・紀行文",
	};

	return createPageMetadata({
		title: titles[locale] ?? "Stories",
		description: descriptions[locale] ?? descriptions.en,
		path: "/stories",
		locale,
		keywords: [
			"travel stories",
			"travel essays",
			"Talkwer magazine",
			"traveler voices",
			"destination narratives",
		],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const localizedStories = getLocalizedStories(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Stories", path: "/stories" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<StoriesPage stories={localizedStories} />
		</>
	);
}
