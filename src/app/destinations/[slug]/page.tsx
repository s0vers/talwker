import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetailsPage from "@/features/destination-details/destination-details-page";
import {
	destinationToSlug,
	findDestinationBySlug,
} from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const destination = findDestinationBySlug(DESTINATIONS, slug);

	if (!destination) {
		return createPageMetadata({
			title: "Destination not found",
			description: "The destination you requested could not be found.",
			path: `/destinations/${slug}`,
		});
	}

	return createPageMetadata({
		title: `${destination.name}, ${destination.country}`,
		description: `Discover ${destination.name} in ${destination.country} through culture, people, landscapes, and practical local context curated by Talkwer.`,
		path: `/destinations/${destinationToSlug(destination)}`,
		keywords: [
			`${destination.name} travel`,
			`${destination.country} destination`,
			`${destination.name} itinerary`,
			"curated travel guides",
			"Talkwer destinations",
		],
	});
}

export function generateStaticParams() {
	return DESTINATIONS.map((destination) => ({
		slug: destinationToSlug(destination),
	}));
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const destination = findDestinationBySlug(DESTINATIONS, slug);

	if (!destination) {
		notFound();
	}

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations", path: "/destinations" },
		{ name: destination.name, path: `/destinations/${destinationToSlug(destination)}` },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<DestinationDetailsPage destination={destination} />
		</>
	);
}
