import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import BookingPage from "@/features/booking/booking-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Book a consult",
		description: "Schedule a Talkwer agent consult about a specific tour.",
		path: "/booking",
		locale,
		keywords: ["talkwer booking", "tour consult", "agent call"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Book a consult", path: "/booking" }
	]);

	return (
		<RouteMessages namespaces={["Booking"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<Suspense fallback={<div className="min-h-[100svh] bg-[#050505]" />}>
					<BookingPage />
				</Suspense>
			</>
		</RouteMessages>
	);
}
