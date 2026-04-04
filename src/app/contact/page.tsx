import type { Metadata } from "next";
import ContactPage from "@/features/contact/contact-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Contact",
	description:
		"Reach Talkwer for editorial pitches, partnerships, press inquiries, and reader support. Find the right email and social channels.",
	path: "/contact",
	keywords: [
		"contact talkwer",
		"editorial inquiries",
		"travel magazine contact",
		"press talkwer",
		"reader support",
	],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Contact", path: "/contact" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ContactPage />
		</>
	);
}
