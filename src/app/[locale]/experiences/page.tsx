import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ExperiencesPage from "@/features/experiences/experiences-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Experiences",
		description:
			"Curated ways to experience the world through Talkwer travel styles, themes, and itineraries.",
		path: "/experiences",
		locale,
		keywords: ["experiences", "travel styles", "curated travel", "signature journeys"],
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Experiences", path: "/experiences" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ExperiencesPage />
		</>
	);
}
