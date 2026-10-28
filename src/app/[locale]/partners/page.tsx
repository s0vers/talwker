import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PartnersPage from "@/features/partners/partners-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Partners",
		description:
			"Partner with Talkwer — for local guides, lodges, and operators who share our editorial standards.",
		path: "/partners",
		locale,
		keywords: ["talkwer partners", "travel partnerships", "local guides"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Partners", path: "/partners" }
	]);

	return (
		<RouteMessages namespaces={["Partners"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<PartnersPage />
			</>
		</RouteMessages>
	);
}
