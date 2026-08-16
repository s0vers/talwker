import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { STORIES } from "@/features/stories/content/stories";
import StoriesPage from "@/features/stories/stories-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Stories",
		description:
			"Field essays from Talkwer travelers — temple mornings, empty alleys after the ships leave, and the quiet hours itineraries never schedule.",
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
			<StoriesPage stories={STORIES} />
		</>
	);
}
