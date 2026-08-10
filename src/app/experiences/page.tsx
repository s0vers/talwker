import type { Metadata } from "next";
import ExperiencesPage from "@/features/experiences/experiences-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Experiences",
	description: "Curated ways to experience the world through Talkwer travel styles, themes, and itineraries.",
	path: "/experiences",
	keywords: ["experiences", "travel styles", "curated travel", "signature journeys"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Experiences", path: "/experiences" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ExperiencesPage />
		</>
	);
}
