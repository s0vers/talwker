import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CheckoutSuccessPage from "@/features/checkout/checkout-success-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Booking confirmed",
		description:
			"Your Talkwer agent consult demo confirmation. No payment was taken.",
		path: "/checkout/success",
		locale,
		keywords: ["talkwer booking confirmation", "consult reserved"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Checkout", path: "/checkout" },
		{ name: "Booking confirmed", path: "/checkout/success" }
	]);

	return (
		<RouteMessages namespaces={["Checkout"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<CheckoutSuccessPage />
			</>
		</RouteMessages>
	);
}
