import "@/app/full-site.css";
import { RouteMessages } from "@/i18n/route-messages";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ContactPage from "@/features/contact/contact-page";
import { parseContactDraft } from "@/features/contact/lib/contact-draft";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Contact",
		description:
			"Reach Talkwer for editorial pitches, partnerships, press inquiries, and reader support. Find the right email and social channels.",
		path: "/contact",
		locale,
		keywords: [
			"contact talkwer",
			"editorial inquiries",
			"travel magazine contact",
			"press talkwer",
			"reader support"
		]
	});
}

export default async function Page({ params, searchParams }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const draft = parseContactDraft(await searchParams);

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Contact", path: "/contact" }
	]);

	return (
		<RouteMessages namespaces={["Contact"]}>
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
				<ContactPage
					initialMessage={draft.message}
					initialTopic={draft.topic}
				/>
			</>
		</RouteMessages>
	);
}
