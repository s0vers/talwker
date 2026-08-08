import type { Metadata } from "next";
import PressPage from "@/features/press/press-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Press",
	description:
		"Media inquiries for talkwer. — brand positioning, quotes, and editorial collaboration requests.",
	path: "/press",
	keywords: ["talkwer press", "travel media", "talkwer brand"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Press", path: "/press" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<PressPage />
		</>
	);
}
