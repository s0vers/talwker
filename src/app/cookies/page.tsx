import type { Metadata } from "next";
import CookiesPage from "@/features/cookies/cookies-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Cookie Policy",
	description: "Essential and preference cookies on Talkwer, consent, and how to withdraw.",
	path: "/cookies",
	keywords: ["cookie policy", "talkwer cookies", "cookie consent"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Cookie Policy", path: "/cookies" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CookiesPage />
		</>
	);
}
