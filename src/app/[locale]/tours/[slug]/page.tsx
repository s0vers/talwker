import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { TOURS } from "@/features/home/content/tours";
import { findTourBySlug, getTourSlug } from "@/features/tours/lib/tour-slug";
import TourDetailsPage from "@/features/tours/tour-details-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

function toImagePath(path: string): `/${string}` {
	return (path.startsWith("/") ? path : `/${path}`) as `/${string}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const tour = findTourBySlug(TOURS, slug);

	if (!tour) {
		return createPageMetadata({
			title: "Tour not found",
			description: "The tour you requested could not be found.",
			path: `/tours/${slug}`,
			locale,
		});
	}

	return createPageMetadata({
		title: tour.title,
		description: tour.summary,
		path: `/tours/${getTourSlug(tour)}`,
		locale,
		imagePath: toImagePath(tour.image),
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
	return routing.locales.flatMap((locale) =>
		TOURS.map((tour) => ({
			locale,
			slug: getTourSlug(tour),
		})),
	);
}

export default async function Page({ params }: PageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

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
