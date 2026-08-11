import type { Metadata } from "next";
import { Suspense } from "react";
import BookingPage from "@/features/booking/booking-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Book a consult",
	description: "Schedule a Talkwer agent consult about a specific tour.",
	path: "/booking",
	keywords: ["talkwer booking", "tour consult", "agent call"],
});

export default function Page() {
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Book a consult", path: "/booking" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Suspense fallback={<main className="min-h-[100svh] bg-[#050505]" />}>
				<BookingPage />
			</Suspense>
		</>
	);
}
