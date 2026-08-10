import type { Metadata } from "next";
import TermsPage from "@/features/terms/terms-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Terms of Use",
	description: "Terms for using the Talkwer site, content, and editorial itineraries.",
	path: "/terms",
	keywords: ["terms of use", "talkwer terms", "website terms"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Terms of Use", path: "/terms" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<TermsPage />
		</>
	);
}
