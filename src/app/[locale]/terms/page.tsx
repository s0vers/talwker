import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import TermsPage from "@/features/terms/terms-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Terms of Service",
		description: "Terms and conditions governing your use of Talkwer services and content.",
		path: "/terms",
		locale,
		keywords: ["terms of service", "user agreement", "talkwer terms"],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Terms", path: "/terms" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<TermsPage />
		</>
	);
}
