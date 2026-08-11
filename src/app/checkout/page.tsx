import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutPage from "@/features/checkout/checkout-page";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
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
			<Suspense
				fallback={
					<main className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
						{CHECKOUT_COPY.redirectingLabel}
					</main>
				}
			>
				<CheckoutPage />
			</Suspense>
		</>
	);
}
