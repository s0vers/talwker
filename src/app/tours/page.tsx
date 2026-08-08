import type { Metadata } from "next";
import { TOURS } from "@/features/home/content/tours";
import {
	filterToursByDestinationSlug,
	parseToursListParams,
} from "@/features/tours/lib/tours-list-params";
import ToursPage from "@/features/tours/tours-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Tours",
	description:
		"Browse Talkwer's curated tours — hand-built itineraries with room for wonder, taste, and the road less scripted.",
	path: "/tours",
	keywords: ["curated tours", "travel itineraries", "Talkwer tours", "small group travel"],
});

type PageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
	const sp = await searchParams;
	const { destination } = parseToursListParams(sp);
	const tours = filterToursByDestinationSlug(TOURS, destination);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Tours", path: "/tours" },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ToursPage tours={tours} destinationFilter={destination} />
		</>
	);
}
