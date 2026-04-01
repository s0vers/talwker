import type { Metadata } from "next";
import StoriesPage from "@/features/stories/stories-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Stories",
	description:
		"Travel stories and testimonials from Talkwer travelers — real voices from the road.",
	path: "/stories",
	keywords: ["travel stories", "travel testimonials", "Talkwer reviews", "traveler voices"],
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
			<StoriesPage />
		</>
	);
}
