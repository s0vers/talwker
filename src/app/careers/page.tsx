import type { Metadata } from "next";
import CareersPage from "@/features/careers/careers-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Careers",
	description:
		"Talkwer hires rarely. Learn how we work and introduce yourself if your craft fits our editorial travel studio.",
	path: "/careers",
	keywords: ["talkwer careers", "travel editorial jobs", "talkwer hiring"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Careers", path: "/careers" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CareersPage />
		</>
	);
}
