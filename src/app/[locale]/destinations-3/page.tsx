import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Destinations3Page from "@/features/destinations-3/destinations-3-page";
import { DESTINATIONS_3_LIST_PATH } from "@/features/destinations-3/lib/destinations-3-list-path";
import {
	computeDestinationsGridResult,
	getDestinationsQuickSearchLinks,
	parseDestinationsListParams,
} from "@/features/destinations/lib/destinations-list-params";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{
		q?: string;
		tag?: string;
		maxPrice?: string;
		page?: string;
		filter?: string;
	}>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Destinations — culture & places",
		description:
			"Browse Talkwer destinations through a field-guide index — people, culture, and named places, with a third long-form story layout.",
		path: DESTINATIONS_3_LIST_PATH,
		locale,
		keywords: [
			"travel destinations",
			"culture travel",
			"places guides",
			"Talkwer destinations",
			"field guide",
		],
	});
}

export default async function Page({ params, searchParams }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const sp = await searchParams;
	const parsed = parseDestinationsListParams({
		q: typeof sp.q === "string" ? sp.q : undefined,
		tag: typeof sp.tag === "string" ? sp.tag : undefined,
		maxPrice: typeof sp.maxPrice === "string" ? sp.maxPrice : undefined,
		page: typeof sp.page === "string" ? sp.page : undefined,
		filter: typeof sp.filter === "string" ? sp.filter : undefined,
	});
	const grid = computeDestinationsGridResult(DESTINATIONS, parsed);
	const quickLinks = getDestinationsQuickSearchLinks(DESTINATIONS_3_LIST_PATH);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations — culture & places", path: DESTINATIONS_3_LIST_PATH },
	]);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Destinations3Page list={parsed} grid={grid} quickLinks={quickLinks} />
		</>
	);
}
