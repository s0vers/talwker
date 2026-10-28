import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PrivacyPage from "@/features/privacy/privacy-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Privacy Policy",
		description:
			"How Talkwer collects, stores, and protects personal information.",
		path: "/privacy",
		locale,
		keywords: ["privacy policy", "data privacy", "talkwer privacy"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Privacy", path: "/privacy" }
	]);

	return (
		<RouteMessages namespaces={["Legal"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<PrivacyPage />
			</>
		</RouteMessages>
	);
}
