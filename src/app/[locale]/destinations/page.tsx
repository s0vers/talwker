import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DESTINATIONS } from "@/features/home/content/destinations";
import DestinationsPage from "@/features/destinations/destinations-page";
import {
	computeDestinationsGridResult,
	getDestinationsQuickSearchLinks,
	parseDestinationsListParams
} from "@/features/destinations/lib/destinations-list-params";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{
		q?: string;
		tag?: string;
		maxPrice?: string;
		page?: string;
		/** @deprecated use `tag` / `maxPrice` */
		filter?: string;
	}>;
};

export async function generateMetadata({
	params
}: PageProps): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Destinations",
		description:
			"Browse Talkwer's curated destinations — handpicked places with story, texture, and real on-the-ground detail.",
		path: "/destinations",
		locale,
		keywords: [
			"travel destinations",
			"curated places",
			"Talkwer destinations",
			"where to travel",
			"inspired journeys"
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
	const quickLinks = getDestinationsQuickSearchLinks();

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Destinations", path: "/destinations" }
	]);

	return (
		<RouteMessages namespaces={["Destinations"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<DestinationsPage list={parsed} grid={grid} quickLinks={quickLinks} />
			</>
		</RouteMessages>
	);
}
