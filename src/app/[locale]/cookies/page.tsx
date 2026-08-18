import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CookiesPage from "@/features/cookies/cookies-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Cookie Policy",
		description: "How Talkwer uses cookies, tracking technologies, and consent choices.",
		path: "/cookies",
		locale,
		keywords: ["cookie policy", "tracking policy", "talkwer cookies"],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Cookie Policy", path: "/cookies" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CookiesPage />
		</>
	);
}
