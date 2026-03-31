import type { Metadata } from "next";
import AboutPage from "@/features/about/about-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "About",
	description:
		"Learn about Talkwer, our editorial approach to modern travel stories, and the team behind the magazine.",
	path: "/about",
	keywords: [
		"about talkwer",
		"travel editorial team",
		"travel magazine mission",
		"talkwer story",
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
