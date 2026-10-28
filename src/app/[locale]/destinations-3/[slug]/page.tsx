import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import DestinationDetails3Page from "@/features/destination-details-3/destination-details-3-page";
import {
	destinationToSlug,
	findDestinationBySlug
} from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS_3_LIST_PATH } from "@/features/destinations-3/lib/destinations-3-list-path";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const destination = findDestinationBySlug(DESTINATIONS, slug);

	if (!destination) {
		return createPageMetadata({
			title: "Destination not found",
			description: "The destination you requested could not be found.",
			path: `${DESTINATIONS_3_LIST_PATH}/${slug}`,
			locale
		});
	}

	return createPageMetadata({
		title: `${destination.name}, ${destination.country} — culture & places`,
		description: `People, culture, and named places in ${destination.name}, ${destination.country} — a field-guide style read on Talkwer.`,
		path: `${DESTINATIONS_3_LIST_PATH}/${destinationToSlug(destination)}`,
		locale,
		keywords: [
			`${destination.name} culture`,
			`${destination.country} places`,
			"Talkwer field guide",
			"editorial travel"
		]
	});
}

export function generateStaticParams() {
	return routing.locales.flatMap(locale =>
		DESTINATIONS.map(destination => ({
			locale,
			slug: destinationToSlug(destination)
		}))
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
		{ name: "Destinations — culture & places", path: DESTINATIONS_3_LIST_PATH },
		{
			name: destination.name,
			path: `${DESTINATIONS_3_LIST_PATH}/${destinationToSlug(destination)}`
		}
	]);

	return (
		<RouteMessages>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<DestinationDetails3Page destination={destination} />
			</>
		</RouteMessages>
	);
}
