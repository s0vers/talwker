import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import BookingPolicyPage from "@/features/booking-policy/booking-policy-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Booking Policy",
		description: "How Talkwer bookings, deposits, and confirmations work.",
		path: "/booking-policy",
		locale,
		keywords: ["booking policy", "talkwer reservations"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Booking Policy", path: "/booking-policy" }
	]);

	return (
		<RouteMessages namespaces={["Legal"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<BookingPolicyPage />
			</>
		</RouteMessages>
	);
}
