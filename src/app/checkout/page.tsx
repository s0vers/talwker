import type { Metadata } from "next";
import CheckoutPage from "@/features/checkout/checkout-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Checkout",
	description:
		"Confirm your Talkwer agent consult. Demo checkout — no payment is processed.",
	path: "/checkout",
	keywords: ["talkwer checkout", "agent consult", "tour booking"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Checkout", path: "/checkout" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CheckoutPage />
		</>
	);
}
