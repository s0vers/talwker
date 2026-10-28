import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TOURS } from "@/features/home/content/tours";
import {
	filterToursByDestinationSlug,
	parseToursListParams
} from "@/features/tours/lib/tours-list-params";
import ToursPage from "@/features/tours/tours-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Tours",
		description:
			"Browse Talkwer's curated tours — hand-built itineraries with room for wonder, taste, and the road less scripted.",
		path: "/tours",
		locale,
		keywords: [
			"curated tours",
			"travel itineraries",
			"Talkwer tours",
			"small group travel"
		]
	});
}

export default async function Page({ params, searchParams }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const sp = await searchParams;
	const { destination } = parseToursListParams(sp);
	const tours = filterToursByDestinationSlug(TOURS, destination);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Tours", path: "/tours" }
	]);

	return (
		<RouteMessages namespaces={["Tours"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<ToursPage tours={tours} destinationFilter={destination} />
			</>
		</RouteMessages>
	);
}
