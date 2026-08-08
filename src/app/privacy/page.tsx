import type { Metadata } from "next";
import PrivacyPage from "@/features/privacy/privacy-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Privacy Policy",
	description: "How Talkwer collects, uses, and protects information from the Contact form and site.",
	path: "/privacy",
	keywords: ["privacy policy", "talkwer privacy", "data protection"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Privacy Policy", path: "/privacy" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<PrivacyPage />
		</>
	);
}
