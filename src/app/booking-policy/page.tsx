import type { Metadata } from "next";
import BookingPolicyPage from "@/features/booking-policy/booking-policy-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Booking Policy",
	description: "How Talkwer bookings, deposits, and confirmations work.",
	path: "/booking-policy",
	keywords: ["booking policy", "talkwer reservations"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Booking Policy", path: "/booking-policy" },
	]);
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<BookingPolicyPage />
		</>
	);
}
