import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import DestinationDetails2Page from "@/features/destination-details-2/destination-details-2-page";
import {
	destinationToSlug,
	findDestinationBySlug,
} from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const destination = findDestinationBySlug(DESTINATIONS, slug);

	if (!destination) {
		return createPageMetadata({
			title: "Destination not found",
			description: "The destination you requested could not be found.",
			path: `${DESTINATIONS_2_LIST_PATH}/${slug}`,
			locale,
		});
	}

	return createPageMetadata({
		title: `${destination.name}, ${destination.country}`,
		description: `An alternate dossier-style guide to ${destination.name} — ${destination.country} — on Talkwer.`,
		path: `${DESTINATIONS_2_LIST_PATH}/${destinationToSlug(destination)}`,
		locale,
		keywords: [
			`${destination.name} travel`,
			`${destination.country} destination`,
			"Talkwer destinations",
			"alternate layout",
		],
	});
}

export function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		DESTINATIONS.map((destination) => ({
			locale,
			slug: destinationToSlug(destination),
		})),
	);
}

export default async function Page({ params }: PageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const destination = findDestinationBySlug(DESTINATIONS, slug);
	if (!destination) {
		notFound();
	}

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations (alt)", path: DESTINATIONS_2_LIST_PATH },
		{ name: destination.name, path: `${DESTINATIONS_2_LIST_PATH}/${destinationToSlug(destination)}` },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<DestinationDetails2Page destination={destination} />
		</>
	);
}
