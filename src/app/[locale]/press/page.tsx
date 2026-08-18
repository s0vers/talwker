import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PressPage from "@/features/press/press-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Press",
		description:
			"Media inquiries for talkwer. — brand positioning, quotes, and editorial collaboration requests.",
		path: "/press",
		locale,
		keywords: ["talkwer press", "travel media", "talkwer brand"],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Press", path: "/press" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<PressPage />
		</>
	);
}
