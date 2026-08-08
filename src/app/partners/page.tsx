import type { Metadata } from "next";
import PartnersPage from "@/features/partners/partners-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Partners",
	description:
		"Partner with Talkwer — for local guides, lodges, and operators who share our editorial standards.",
	path: "/partners",
	keywords: ["talkwer partners", "travel partnerships", "local guides"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Partners", path: "/partners" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<PartnersPage />
		</>
	);
}
