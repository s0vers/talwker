import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DESTINATIONS_2_LIST_PATH } from "@/features/destinations-2/lib/destinations-2-list-path";
import Destinations2Page from "@/features/destinations-2/destinations-2-page";
import {
	computeDestinationsGridResult,
	getDestinationsQuickSearchLinks,
	parseDestinationsListParams
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

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Destinations (alt)",
		description:
			"Browse Talkwer destinations through an alternate editorial index — same curated places, different layout, linking to the second story experience.",
		path: DESTINATIONS_2_LIST_PATH,
		locale,
		keywords: [
			"travel destinations",
			"curated places",
			"Talkwer destinations",
			"alternate layout"
		]
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
		filter: typeof sp.filter === "string" ? sp.filter : undefined
	});
	const grid = computeDestinationsGridResult(DESTINATIONS, parsed);
	const quickLinks = getDestinationsQuickSearchLinks(DESTINATIONS_2_LIST_PATH);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations (alt)", path: DESTINATIONS_2_LIST_PATH }
	]);

	return (
		<RouteMessages namespaces={["Destinations2", "Destinations"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<Destinations2Page list={parsed} grid={grid} quickLinks={quickLinks} />
			</>
		</RouteMessages>
	);
}
