import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ContactPage from "@/features/contact/contact-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Contact",
		description:
			"Reach Talkwer for editorial pitches, partnerships, press inquiries, and reader support. Find the right email and social channels.",
		path: "/contact",
		locale,
		keywords: [
			"contact talkwer",
			"editorial inquiries",
			"travel magazine contact",
			"press talkwer",
			"reader support",
		],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Contact", path: "/contact" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ContactPage />
		</>
	);
}
