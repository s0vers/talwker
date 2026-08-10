import type { Metadata } from "next";
import CancellationPage from "@/features/cancellation/cancellation-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Cancellation Policy",
	description: "Talkwer cancellation windows, refunds, credits, and force majeure guidance.",
	path: "/cancellation",
	keywords: ["cancellation policy", "talkwer refunds", "travel credits"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Cancellation Policy", path: "/cancellation" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CancellationPage />
		</>
	);
}
