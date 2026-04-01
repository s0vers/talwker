import type { Metadata } from "next";
import ToursPage from "@/features/tours/tours-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Tours",
	description:
		"Browse Talkwer's curated tours — hand-built itineraries with room for wonder, taste, and the road less scripted.",
	path: "/tours",
	keywords: ["curated tours", "travel itineraries", "Talkwer tours", "small group travel"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Tours", path: "/tours" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ToursPage />
		</>
	);
}
