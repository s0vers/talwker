import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import CheckoutPage from "@/features/checkout/checkout-page";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Checkout",
		description:
			"Confirm your Talkwer agent consult. Demo checkout — no payment is processed.",
		path: "/checkout",
		locale,
		keywords: ["talkwer checkout", "agent consult", "tour booking"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Checkout", path: "/checkout" }
	]);

	return (
		<RouteMessages namespaces={["Checkout"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<Suspense
					fallback={
						<div className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
							{CHECKOUT_COPY.redirectingLabel}
						</div>
					}
				>
					<CheckoutPage />
				</Suspense>
			</>
		</RouteMessages>
	);
}
