import type { Metadata } from "next";
import AboutPage from "@/features/about/about-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "About Talkwer",
	description:
		"Discover the story behind Talkwer — our mission, values, and the passionate team crafting extraordinary travel experiences since 2010.",
	path: "/about",
	keywords: [
		"about talkwer",
		"travel company",
		"our story",
		"travel team",
		"sustainable travel",
	],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<AboutPage />
		</>
	);
}
