import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CareersPage from "@/features/careers/careers-page";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Careers",
		description:
			"Talkwer hires rarely. Learn how we work and introduce yourself if your craft fits our editorial travel studio.",
		path: "/careers",
		locale,
		keywords: ["talkwer careers", "travel editorial jobs", "talkwer hiring"]
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Careers", path: "/careers" }
	]);

	return (
		<RouteMessages namespaces={["Careers"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<CareersPage />
			</>
		</RouteMessages>
	);
}
