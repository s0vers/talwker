import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CancellationPage from "@/features/cancellation/cancellation-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Cancellation & Refund Policy",
		description:
			"Understand Talkwer cancellation windows, fees, and refund procedures.",
		path: "/cancellation",
		locale,
		keywords: ["cancellation policy", "refund policy", "talkwer refund"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Cancellation", path: "/cancellation" }
	]);

	return (
		<RouteMessages namespaces={["Legal"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<CancellationPage />
			</>
		</RouteMessages>
	);
}
