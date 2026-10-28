import Head from "next/head";
import type { Locale } from "@/i18n/routing";
import {
	SEO_DEFAULTS,
	createPageMetadata,
	getOrganizationJsonLd,
	getWebsiteJsonLd,
	resolveCanonicalUrl
} from "@/lib/seo";

export function HomeHead({ locale }: { locale: Locale }) {
	const title = SEO_DEFAULTS.defaultTitle;
	const description = SEO_DEFAULTS.defaultDescription;
	const metadata = createPageMetadata({
		title,
		description,
		path: "/",
		absoluteTitle: true,
		locale
	});
	const canonical = metadata.alternates?.canonical?.toString();
	const image = resolveCanonicalUrl(SEO_DEFAULTS.defaultImagePath);
	const languages = { en: "/", es: "/es", ja: "/ja" };
	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={description} />
			<meta name="application-name" content={SEO_DEFAULTS.siteName} />
			<meta name="category" content="travel" />
			<meta name="keywords" content={SEO_DEFAULTS.defaultKeywords.join(", ")} />
			<meta name="robots" content="index, follow" />
			<meta
				name="googlebot"
				content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			/>
			<link rel="canonical" href={canonical} />
			{Object.entries(languages).map(([language, path]) => (
				<link
					key={language}
					rel="alternate"
					hrefLang={language}
					href={resolveCanonicalUrl(path)}
				/>
			))}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={canonical} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={SEO_DEFAULTS.siteName} />
			<meta
				property="og:locale"
				content={
					locale === "es" ? "es_ES" : locale === "ja" ? "ja_JP" : "en_US"
				}
			/>
			<meta property="og:image" content={image} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={title} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:creator" content={SEO_DEFAULTS.twitterCreator} />
			<meta name="twitter:image" content={image} />
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<link rel="icon" href="/icon.svg" type="image/svg+xml" />
			<script
				key="organization-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getOrganizationJsonLd()).replace(
						/</g,
						"\\u003c"
					)
				}}
			/>
			<script
				key="website-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getWebsiteJsonLd()).replace(/</g, "\\u003c")
				}}
			/>
		</Head>
	);
}
