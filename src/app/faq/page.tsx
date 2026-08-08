import type { Metadata } from "next";
import FaqPage from "@/features/faq/faq-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "FAQ",
	description: "Frequently asked questions about booking, travel details, and planning with Talkwer.",
	path: "/faq",
	keywords: ["faq", "talkwer help", "travel questions", "booking answers"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "FAQ", path: "/faq" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<FaqPage />
		</>
	);
}
