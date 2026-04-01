import type { Metadata } from "next";
import DestinationsPage from "@/features/destinations/destinations-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Destinations",
	description:
		"Browse Talkwer's curated destinations — handpicked places with story, texture, and real on-the-ground detail.",
	path: "/destinations",
	keywords: [
		"travel destinations",
		"curated places",
		"Talkwer destinations",
		"where to travel",
		"inspired journeys",
	],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations", path: "/destinations" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<DestinationsPage />
		</>
	);
}
