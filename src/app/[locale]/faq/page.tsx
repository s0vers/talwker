import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import FaqPage from "@/features/faq/faq-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "FAQ",
		description:
			"Frequently asked questions about booking, travel details, and planning with Talkwer.",
		path: "/faq",
		locale,
		keywords: ["faq", "talkwer help", "travel questions", "booking answers"],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "FAQ", path: "/faq" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<FaqPage />
		</>
	);
}
