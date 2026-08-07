import type { Metadata } from "next";
import { STORIES } from "@/features/stories/content/stories";
import StoriesPage from "@/features/stories/stories-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Stories",
	description:
		"Field essays from Talkwer travelers — temple mornings, empty alleys after the ships leave, and the quiet hours itineraries never schedule.",
	path: "/stories",
	keywords: [
		"travel stories",
		"travel essays",
		"Talkwer magazine",
		"traveler voices",
		"destination narratives",
	],
});

export default function Page() {
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
