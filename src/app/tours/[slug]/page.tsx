import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOURS } from "@/features/home/content/tours";
import { findTourBySlug, getTourSlug } from "@/features/tours/lib/tour-slug";
import TourDetailsPage from "@/features/tours/tour-details-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const tour = findTourBySlug(TOURS, slug);

	if (!tour) {
		return createPageMetadata({
			title: "Tour not found",
			description: "The tour you requested could not be found.",
			path: `/tours/${slug}`,
		});
	}

	return createPageMetadata({
		title: tour.title,
		description: tour.summary,
		path: `/tours/${getTourSlug(tour)}`,
		keywords: [
			tour.title,
			tour.destination,
			`${tour.destination} tour`,
			"curated itinerary",
			"Talkwer tours",
		],
	});
}

export function generateStaticParams() {
	return TOURS.map((tour) => ({
		slug: getTourSlug(tour),
	}));
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const tour = findTourBySlug(TOURS, slug);

	if (!tour) {
		notFound();
	}

	const tourSlug = getTourSlug(tour);
	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Tours", path: "/tours" },
		{ name: tour.title, path: `/tours/${tourSlug}` },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<TourDetailsPage tour={tour} />
		</>
	);
}
