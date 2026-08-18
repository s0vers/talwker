import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AboutPage from "@/features/about/about-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "About",
		description:
			"Learn about Talkwer, our editorial approach to modern travel stories, and the team behind the magazine.",
		path: "/about",
		locale,
		keywords: [
			"about talkwer",
			"travel editorial team",
			"travel magazine mission",
			"talkwer story",
		],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<AboutPage />
		</>
	);
}
