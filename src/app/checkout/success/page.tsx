import type { Metadata } from "next";
import CheckoutSuccessPage from "@/features/checkout/checkout-success-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Booking confirmed",
	description:
		"Your Talkwer agent consult demo confirmation. No payment was taken.",
	path: "/checkout/success",
	keywords: ["talkwer booking confirmation", "consult reserved"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Checkout", path: "/checkout" },
		{ name: "Booking confirmed", path: "/checkout/success" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CheckoutSuccessPage />
		</>
	);
}
